import { getThemeInfo, isOfficialTheme } from '@/lib/shopify-detector/theme-mapping';
import { NextRequest, NextResponse } from 'next/server';

export interface ThemeDetectionResult {
  isShopify: boolean;
  themeName: string | null;
  themeStoreId: number | null;
  isOfficialTheme: boolean;
  themeStoreUrl?: string;
  customTheme?: boolean;
  error?: string;
  storeUrl?: string;
}

/**
 * Validate and normalize Shopify URL
 */
function validateShopifyUrl(url: string): string | null {
  try {
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    const urlObj = new URL(url);
    
    // Check for common Shopify patterns
    const hostname = urlObj.hostname.toLowerCase();
    
    // Direct myshopify.com domains
    if (hostname.endsWith('.myshopify.com')) {
      return urlObj.toString();
    }
    
    // Custom domains - we'll validate these by checking for Shopify indicators
    if (hostname.includes('.') && !hostname.includes('localhost')) {
      return urlObj.toString();
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Check if the website is a Shopify store
 */
function isShopifyStore(html: string): boolean {
  const shopifyIndicators = [
    'window.Shopify',
    'Shopify.theme',
    'cdn.shopify.com',
    'shopify-section',
    'shopify-block',
    'Shopify.shop',
    'shopify_pay',
    'shopify-features',
  ];

  const htmlLower = html.toLowerCase();
  
  return shopifyIndicators.some(indicator => 
    htmlLower.includes(indicator.toLowerCase())
  );
}

/**
 * Extract theme information from HTML
 */
function extractThemeInfo(html: string): {
  themeName: string | null;
  themeStoreId: number | null;
} {
  let themeName: string | null = null;
  let themeStoreId: number | null = null;

  try {
    // Method 1: Look for Shopify.theme object
    const themeRegex = /Shopify\.theme\s*=\s*({[^}]+})/i;
    const themeMatch = html.match(themeRegex);
    
    if (themeMatch) {
      try {
        const themeObj = JSON.parse(themeMatch[1]);
        if (themeObj.name) {
          themeName = themeObj.name;
        }
        if (themeObj.theme_store_id) {
          themeStoreId = parseInt(themeObj.theme_store_id);
        }
      } catch (e) {
        // Continue to other methods
      }
    }

    // Method 2: Look for theme_store_id pattern
    if (!themeStoreId) {
      const storeIdRegex = /theme_store_id['":\s]*(\d+)/i;
      const storeIdMatch = html.match(storeIdRegex);
      if (storeIdMatch) {
        themeStoreId = parseInt(storeIdMatch[1]);
      }
    }

    // Method 3: Look for theme name in meta tags or comments
    if (!themeName) {
      const namePatterns = [
        /<meta[^>]*name=['"]theme['"][^>]*content=['"]([^'"]+)['"]/i,
        /<!--[^>]*theme[:\s]*([^-\s]+)/i,
        /theme[_-]name['":\s]*['"]([^'"]+)['"]/i,
      ];

      for (const pattern of namePatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          themeName = match[1].trim();
          break;
        }
      }
    }

  } catch (error) {
    console.error('Error extracting theme info:', error);
  }

  return { themeName, themeStoreId };
}

/**
 * Fetch and analyze Shopify store
 */
async function analyzeShopifyStore(url: string): Promise<ThemeDetectionResult> {
  try {
    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    if (!response.ok) {
      return {
        isShopify: false,
        themeName: null,
        themeStoreId: null,
        isOfficialTheme: false,
        error: `Failed to fetch website: ${response.status} ${response.statusText}`,
      };
    }

    const html = await response.text();

    // Check if it's a Shopify store
    if (!isShopifyStore(html)) {
      return {
        isShopify: false,
        themeName: null,
        themeStoreId: null,
        isOfficialTheme: false,
        error: 'This website is not a Shopify store',
      };
    }

    // Extract theme information
    const { themeName, themeStoreId } = extractThemeInfo(html);

    // Determine if it's an official theme
    const isOfficial = themeStoreId ? isOfficialTheme(themeStoreId) : false;
    const themeInfo = themeStoreId ? getThemeInfo(themeStoreId) : null;

    const result: ThemeDetectionResult = {
      isShopify: true,
      themeName: themeInfo?.name || themeName || 'Custom Theme',
      themeStoreId,
      isOfficialTheme: isOfficial,
      customTheme: !isOfficial,
      storeUrl: url,
    };

    // Add theme store URL if it's an official theme
    if (themeInfo?.storeUrl) {
      result.themeStoreUrl = themeInfo.storeUrl;
    }

    return result;

  } catch (error) {
    console.error('Error analyzing Shopify store:', error);
    return {
      isShopify: false,
      themeName: null,
      themeStoreId: null,
      isOfficialTheme: false,
      error: error instanceof Error ? error.message : 'Failed to analyze the website',
    };
  }
}

/**
 * POST /api/detect
 * Detect Shopify theme from URL
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body as { url: string };

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    const validatedUrl = validateShopifyUrl(url);
    if (!validatedUrl) {
      return NextResponse.json(
        { error: 'Please enter a valid URL' },
        { status: 400 }
      );
    }

    // Analyze the store
    const result = await analyzeShopifyStore(validatedUrl);

    return NextResponse.json(result);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
