import { getThemeInfo, isOfficialTheme } from '@/lib/shopify-detector/theme-mapping';
import { NextRequest, NextResponse } from 'next/server';

export interface ThemeDetectionResult {
  success: boolean;
  theme: {
    name: string | null;
    schema_name: string | null;
    theme_store_id: number | null;
    id: string | null;
    type: 'official' | 'custom';
  } | null;
  recommendation?: string;
  themeStoreUrl?: string;
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
 * Extract theme information from HTML based on Shopify.theme object
 */
function extractThemeInfo(html: string): {
  name: string | null;
  schema_name: string | null;
  theme_store_id: number | null;
  id: string | null;
} {
  let name: string | null = null;
  let schema_name: string | null = null;
  let theme_store_id: number | null = null;
  let id: string | null = null;

  try {
    // Primary method: Look for complete Shopify.theme object
    const themeRegex = /Shopify\.theme\s*=\s*({[^}]*})/i;
    const themeMatch = html.match(themeRegex);

    if (themeMatch) {
      try {
        const themeObj = JSON.parse(themeMatch[1]);

        // Extract all required fields from Shopify.theme
        if (themeObj.name) {
          name = themeObj.name;
        }
        if (themeObj.schema_name) {
          schema_name = themeObj.schema_name;
        }
        if (themeObj.theme_store_id) {
          theme_store_id = parseInt(themeObj.theme_store_id);
        }
        if (themeObj.id) {
          id = themeObj.id.toString();
        }
      } catch (e) {
        console.error('Error parsing Shopify.theme object:', e);
      }
    }

    // Fallback methods if Shopify.theme object is incomplete or missing
    if (!theme_store_id) {
      const storeIdRegex = /theme_store_id['":\s]*(\d+)/i;
      const storeIdMatch = html.match(storeIdRegex);
      if (storeIdMatch) {
        theme_store_id = parseInt(storeIdMatch[1]);
      }
    }

    if (!name) {
      const namePatterns = [
        /<meta[^>]*name=['"]theme['"][^>]*content=['"]([^'"]+)['"]/i,
        /<!--[^>]*theme[:\s]*([^-\s]+)/i,
        /theme[_-]name['":\s]*['"]([^'"]+)['"]/i,
      ];

      for (const pattern of namePatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          name = match[1].trim();
          break;
        }
      }
    }

  } catch (error) {
    console.error('Error extracting theme info:', error);
  }

  return { name, schema_name, theme_store_id, id };
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
        success: false,
        theme: null,
        error: `Failed to fetch website: ${response.status} ${response.statusText}`,
      };
    }

    const html = await response.text();

    // Check if it's a Shopify store
    if (!isShopifyStore(html)) {
      return {
        success: false,
        theme: null,
        error: 'This website is not a Shopify store',
      };
    }

    // Extract theme information
    const { name, schema_name, theme_store_id, id } = extractThemeInfo(html);

    // Check if we found any theme information
    if (!name && !schema_name && !theme_store_id) {
      return {
        success: false,
        theme: null,
        error: 'No theme information detected',
      };
    }

    // Determine if it's an official theme
    const isOfficial = theme_store_id ? isOfficialTheme(theme_store_id) : false;
    const themeInfo = theme_store_id ? getThemeInfo(theme_store_id) : null;

    // Build the result according to the new structure
    const result: ThemeDetectionResult = {
      success: true,
      theme: {
        name: themeInfo?.name || name || 'Unknown Theme',
        schema_name: schema_name,
        theme_store_id: theme_store_id,
        id: id,
        type: isOfficial ? 'official' : 'custom',
      },
      storeUrl: url,
    };

    // Add theme store URL if it's an official theme
    if (themeInfo?.storeUrl) {
      result.themeStoreUrl = themeInfo.storeUrl;
    }

    // Add recommendation based on the detection result
    if (isOfficial) {
      result.recommendation = `This is an official Shopify theme available in the theme store.`;
    } else if (schema_name) {
      result.recommendation = `Based on schema_name "${schema_name}", this is a custom theme built on ${schema_name}. For official version, search Shopify theme store by schema_name.`;
    } else {
      result.recommendation = `This appears to be a custom theme. Check the theme name or contact the store owner for more details.`;
    }

    return result;

  } catch (error) {
    console.error('Error analyzing Shopify store:', error);
    return {
      success: false,
      theme: null,
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
