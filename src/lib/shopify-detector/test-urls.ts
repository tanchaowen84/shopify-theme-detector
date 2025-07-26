/**
 * Test URLs for Shopify theme detection
 * These are known Shopify stores for testing purposes
 */

export const TEST_SHOPIFY_STORES = [
  // Official Shopify stores
  'shop.shopify.com',
  'hardware.shopify.com',
  
  // Popular Shopify stores with known themes
  'gymshark.com',
  'allbirds.com',
  'bombas.com',
  'mvmt.com',
  'colourpop.com',
  'fashionnova.com',
  'kylie-cosmetics.com',
  'jeffreestarcosmetics.com',
  
  // MyShopify domains
  'example.myshopify.com',
  'demo-store.myshopify.com',
] as const;

export const NON_SHOPIFY_STORES = [
  'amazon.com',
  'google.com',
  'facebook.com',
  'apple.com',
  'microsoft.com',
] as const;

/**
 * Get a random test Shopify store URL
 */
export function getRandomShopifyStore(): string {
  const randomIndex = Math.floor(Math.random() * TEST_SHOPIFY_STORES.length);
  return TEST_SHOPIFY_STORES[randomIndex];
}

/**
 * Get a random non-Shopify store URL
 */
export function getRandomNonShopifyStore(): string {
  const randomIndex = Math.floor(Math.random() * NON_SHOPIFY_STORES.length);
  return NON_SHOPIFY_STORES[randomIndex];
}
