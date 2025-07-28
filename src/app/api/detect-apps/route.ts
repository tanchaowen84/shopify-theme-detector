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
function detectAppsByAppBlocks(html: string): DetectedApp[] {
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

  return detectedApps;
}

/**
 * Detect apps from HTML content using enhanced script domain matching
 * Checks both script src URLs and script tag content for domain patterns
 * Uses contains matching for better detection coverage
 */
function detectAppsByScriptDomains(html: string): DetectedApp[] {
  const apps = getAllApps();
  const detectedApps: DetectedApp[] = [];

  // Extract all script src URLs
  const scriptSrcRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const scriptSrcMatches = html.matchAll(scriptSrcRegex);

  // Extract all script tag content (including inline scripts)
  const scriptContentRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  const scriptContentMatches = html.matchAll(scriptContentRegex);

  const foundDomains = new Set<string>();
  const allScriptUrls = new Set<string>();
  const allScriptContent = new Set<string>();

  // Process script src URLs
  for (const match of scriptSrcMatches) {
    try {
      const scriptUrl = match[1];
      const url = new URL(scriptUrl);
      foundDomains.add(url.hostname);
      allScriptUrls.add(scriptUrl.toLowerCase());
    } catch {
      // Skip invalid URLs, but still add the raw URL for pattern matching
      allScriptUrls.add(match[1].toLowerCase());
    }
  }

  // Process script tag content
  for (const match of scriptContentMatches) {
    const scriptContent = match[1];
    if (scriptContent?.trim()) {
      allScriptContent.add(scriptContent.toLowerCase());
    }
  }

  console.log('Found script domains:', Array.from(foundDomains));

  // Match domain patterns with app database
  for (const app of apps) {
    if (app.detectionPatterns.scriptDomains.length === 0) continue;

    let appDetected = false;

    for (const domainPattern of app.detectionPatterns.scriptDomains) {
      if (appDetected) break;

      const lowerDomainPattern = domainPattern.toLowerCase();

      // Check script src URLs for domain pattern
      for (const scriptUrl of allScriptUrls) {
        if (scriptUrl.includes(lowerDomainPattern)) {
          console.log(
            `Script URL domain match: "${domainPattern}" found in script URL for app ${app.name}`
          );

          detectedApps.push({
            app,
            confidence: 'high',
            detectedSignals: [`Script URL domain: ${domainPattern}`],
            weight: 90,
          });
          appDetected = true;
          break;
        }
      }

      // Check script tag content for domain pattern
      if (!appDetected) {
        for (const scriptContent of allScriptContent) {
          if (scriptContent.includes(lowerDomainPattern)) {
            console.log(
              `Script content domain match: "${domainPattern}" found in script content for app ${app.name}`
            );

            detectedApps.push({
              app,
              confidence: 'high',
              detectedSignals: [`Script content domain: ${domainPattern}`],
              weight: 85, // Slightly lower weight for content matches
            });
            appDetected = true;
            break;
          }
        }
      }

      // Check extracted domain names for pattern
      if (!appDetected) {
        for (const domain of foundDomains) {
          if (domain.toLowerCase().includes(lowerDomainPattern)) {
            console.log(
              `Script domain match: "${domainPattern}" found in domain ${domain} for app ${app.name}`
            );

            detectedApps.push({
              app,
              confidence: 'high',
              detectedSignals: [`Script domain: ${domain}`],
              weight: 90,
            });
            appDetected = true;
            break;
          }
        }
      }
    }
  }

  return detectedApps;
}

/**
 * Main detection function that combines multiple detection methods
 */
function detectApps(html: string): DetectedApp[] {
  // Detect apps using app blocks
  const appBlockApps = detectAppsByAppBlocks(html);

  // Detect apps using script domains
  const scriptDomainApps = detectAppsByScriptDomains(html);

  // Combine results and remove duplicates
  const allDetectedApps = [...appBlockApps, ...scriptDomainApps];

  // Remove duplicates based on app ID, keeping the one with higher weight
  const uniqueApps = allDetectedApps.reduce((acc, current) => {
    const existing = acc.find((app) => app.app.id === current.app.id);
    if (!existing) {
      acc.push(current);
    } else if (current.weight > existing.weight) {
      // Replace with higher weight detection
      const index = acc.indexOf(existing);
      acc[index] = current;
    } else if (current.weight === existing.weight) {
      // Merge detection signals if same weight
      existing.detectedSignals = [
        ...existing.detectedSignals,
        ...current.detectedSignals,
      ];
    }
    return acc;
  }, [] as DetectedApp[]);

  // Sort by weight (higher weight first), then by name
  return uniqueApps.sort((a, b) => {
    if (a.weight !== b.weight) {
      return b.weight - a.weight;
    }
    return a.app.name.localeCompare(b.app.name);
  });
}
