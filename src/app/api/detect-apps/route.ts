import { getAllApps } from '@/lib/shopify-app-detector/app-mapping';
import type {
  AppDetectionResult,
  DetectedApp,
  ShopifyApp,
} from '@/types/app-detection';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Normalize URL
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch HTML content
    const html = await fetchHtmlContent(normalizedUrl);
    if (!html) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch website content' },
        { status: 400 }
      );
    }

    // Check if it's a Shopify store
    if (!isShopifyStore(html)) {
      return NextResponse.json(
        { success: false, error: 'This does not appear to be a Shopify store' },
        { status: 400 }
      );
    }

    // Detect apps
    const detectedApps = detectApps(html);

    // Group by categories
    const categories: { [category: string]: DetectedApp[] } = {};
    detectedApps.forEach((detectedApp) => {
      const category = detectedApp.app.category;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(detectedApp);
    });

    const result: AppDetectionResult = {
      success: true,
      storeUrl: normalizedUrl,
      detectedApps,
      totalApps: detectedApps.length,
      categories,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error detecting apps:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Normalize and validate URL
 */
function normalizeUrl(url: string): string | null {
  try {
    let normalizedUrl = url.trim();

    // Add protocol if missing
    if (
      !normalizedUrl.startsWith('http://') &&
      !normalizedUrl.startsWith('https://')
    ) {
      normalizedUrl = 'https://' + normalizedUrl;
    }

    const urlObj = new URL(normalizedUrl);
    return urlObj.href;
  } catch {
    return null;
  }
}

/**
 * Fetch HTML content from URL
 */
async function fetchHtmlContent(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ShopifyAppDetector/1.0)',
      },
      timeout: 10000,
    });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  }
}

/**
 * Check if the website is a Shopify store
 */
function isShopifyStore(html: string): boolean {
  const shopifyIndicators = [
    'Shopify.shop',
    'window.Shopify',
    'cdn.shopify.com',
    'shopify-section',
    'shopify-block',
  ];

  return shopifyIndicators.some((indicator) =>
    html.toLowerCase().includes(indicator.toLowerCase())
  );
}

/**
 * Detect apps from HTML content using BEGIN app block comments
 */
function detectApps(html: string): DetectedApp[] {
  const apps = getAllApps();
  const detectedApps: DetectedApp[] = [];

  // Look for BEGIN app block comments with Shopify app URLs
  const appBlockRegex =
    /<!--\s*BEGIN\s+app\s+block:\s*shopify:\/\/apps\/([^\/]+)/gi;
  const matches = html.matchAll(appBlockRegex);

  const foundAppNames = new Set<string>();
  for (const match of matches) {
    const appName = match[1].trim().toLowerCase();
    foundAppNames.add(appName);
  }

  console.log('Found app blocks:', Array.from(foundAppNames));

  // Process each found app
  for (const foundAppName of foundAppNames) {
    let matched = false;

    // First, try to match with our database
    for (const app of apps) {
      for (const pattern of app.detectionPatterns.appBlocks) {
        const patternLower = pattern.toLowerCase();

        const isMatch =
          foundAppName.includes(patternLower) ||
          patternLower.includes(foundAppName) ||
          foundAppName.replace(/-/g, ' ').includes(patternLower) ||
          foundAppName
            .replace(/-/g, '')
            .includes(patternLower.replace(/\s/g, ''));

        if (isMatch) {
          console.log(
            `Database match: ${foundAppName} matches ${patternLower} for app ${app.name}`
          );
          detectedApps.push({
            app,
            confidence: 'high',
            detectedSignals: [
              `BEGIN app block: shopify://apps/${foundAppName}`,
            ],
            weight: 100,
          });
          matched = true;
          break;
        }
      }
      if (matched) break;
    }

    // If no database match, create a generic app entry
    if (!matched) {
      console.log(
        `No database match for: ${foundAppName}, creating generic entry`
      );

      // Convert app name to display format
      const displayName = foundAppName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const genericApp: ShopifyApp = {
        id: foundAppName,
        name: displayName,
        category: 'Other',
        description: `Shopify app: ${displayName}`,
        website: `https://apps.shopify.com/${foundAppName}`,
        iconUrl: `https://logo.clearbit.com/${foundAppName.replace(/-/g, '')}.com`,
        detectionPatterns: {
          appBlocks: [foundAppName],
          scriptDomains: [],
          cssClasses: [],
          htmlElements: [],
        },
      };

      detectedApps.push({
        app: genericApp,
        confidence: 'high',
        detectedSignals: [`BEGIN app block: shopify://apps/${foundAppName}`],
        weight: 50, // Lower weight for generic apps
      });
    }
  }

  // Remove duplicates and sort by weight (database apps first), then by name
  const uniqueApps = detectedApps.filter(
    (app, index, self) =>
      index === self.findIndex((a) => a.app.id === app.app.id)
  );

  return uniqueApps.sort((a, b) => {
    // Sort by weight first (higher weight first), then by name
    if (a.weight !== b.weight) {
      return b.weight - a.weight;
    }
    return a.app.name.localeCompare(b.app.name);
  });
}
