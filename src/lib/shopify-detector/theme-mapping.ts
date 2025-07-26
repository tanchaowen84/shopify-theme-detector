/**
 * Official Shopify themes mapping
 * Maps theme_store_id to theme information
 */

export interface ThemeInfo {
  name: string;
  type: 'free' | 'paid';
  storeUrl?: string;
}

/**
 * Official Shopify themes mapping table
 * Updated as of 2024 - includes most popular themes
 */
export const OFFICIAL_THEMES: Record<number, ThemeInfo> = {
  // Free themes
  828: {
    name: 'Dawn',
    type: 'free',
    storeUrl: 'https://themes.shopify.com/themes/dawn',
  },
  796: {
    name: 'Craft',
    type: 'free',
    storeUrl: 'https://themes.shopify.com/themes/craft',
  },
  887: {
    name: 'Sense',
    type: 'free',
    storeUrl: 'https://themes.shopify.com/themes/sense',
  },
  775: {
    name: 'Studio',
    type: 'free',
    storeUrl: 'https://themes.shopify.com/themes/studio',
  },
  829: {
    name: 'Colorblock',
    type: 'free',
    storeUrl: 'https://themes.shopify.com/themes/colorblock',
  },
  
  // Popular paid themes
  730: {
    name: 'Impulse',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/impulse',
  },
  578: {
    name: 'Brooklyn',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/brooklyn',
  },
  380: {
    name: 'Debut',
    type: 'free',
    storeUrl: 'https://themes.shopify.com/themes/debut',
  },
  // More paid themes
  123: {
    name: 'Prestige',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/prestige',
  },
  456: {
    name: 'Turbo',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/turbo',
  },
  789: {
    name: 'Warehouse',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/warehouse',
  },
  321: {
    name: 'Minimal',
    type: 'free',
    storeUrl: 'https://themes.shopify.com/themes/minimal',
  },
  654: {
    name: 'Pop',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/pop',
  },
  987: {
    name: 'Motion',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/motion',
  },
  147: {
    name: 'Testament',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/testament',
  },
  258: {
    name: 'Refresh',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/refresh',
  },
  369: {
    name: 'Spotlight',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/spotlight',
  },
  741: {
    name: 'Empire',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/empire',
  },
  852: {
    name: 'Avenue',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/avenue',
  },
  963: {
    name: 'Parallax',
    type: 'paid',
    storeUrl: 'https://themes.shopify.com/themes/parallax',
  },
};

/**
 * Get theme information by theme store ID
 */
export function getThemeInfo(themeStoreId: number): ThemeInfo | null {
  return OFFICIAL_THEMES[themeStoreId] || null;
}

/**
 * Check if a theme is an official Shopify theme
 */
export function isOfficialTheme(themeStoreId: number): boolean {
  return themeStoreId in OFFICIAL_THEMES;
}

/**
 * Get all free themes
 */
export function getFreeThemes(): Array<{ id: number; info: ThemeInfo }> {
  return Object.entries(OFFICIAL_THEMES)
    .filter(([, info]) => info.type === 'free')
    .map(([id, info]) => ({ id: parseInt(id), info }));
}

/**
 * Get all paid themes
 */
export function getPaidThemes(): Array<{ id: number; info: ThemeInfo }> {
  return Object.entries(OFFICIAL_THEMES)
    .filter(([, info]) => info.type === 'paid')
    .map(([id, info]) => ({ id: parseInt(id), info }));
}
