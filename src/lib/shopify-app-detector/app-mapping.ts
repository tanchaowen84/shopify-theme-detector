import type { ShopifyApp } from '@/types/app-detection';

/**
 * Common Shopify Apps Database
 * MVP version with most popular apps
 */
export const SHOPIFY_APPS: Record<string, ShopifyApp> = {
  klaviyo: {
    id: 'klaviyo',
    name: 'Klaviyo: Email Marketing & SMS',
    category: 'Email Marketing',
    description:
      'Grow smarter with automation and personalization for email marketing, sms, and more.',
    website: 'https://www.klaviyo.com',
    detectionPatterns: {
      appBlocks: ['klaviyo', 'Klaviyo'],
      scriptDomains: ['static.klaviyo.com', 'a.klaviyo.com'],
      cssClasses: ['klaviyo-form', 'kl-private-reset-css-Xuajs1'],
      htmlElements: ['data-klaviyo-*', 'klaviyo-onsite-embed'],
    },
  },

  loox: {
    id: 'loox',
    name: 'Loox',
    category: 'Reviews & Ratings',
    description: 'Photo reviews and user-generated content',
    website: 'https://loox.app',
    detectionPatterns: {
      appBlocks: ['loox', 'Loox'],
      scriptDomains: ['loox.io', 'cdn.loox.app'],
      cssClasses: ['loox-rating', 'loox-reviews'],
      htmlElements: ['data-loox-*', 'loox-reviews-default'],
    },
  },

  yotpo: {
    id: 'yotpo',
    name: 'Yotpo',
    category: 'Reviews & Ratings',
    description: 'Reviews, ratings, and user-generated content',
    website: 'https://www.yotpo.com',
    detectionPatterns: {
      appBlocks: ['yotpo', 'Yotpo'],
      scriptDomains: ['staticw2.yotpo.com', 'cdn-widgetsrepository.yotpo.com'],
      cssClasses: ['yotpo', 'yotpo-main-widget'],
      htmlElements: ['data-yotpo-*', 'yotpo-widget-instance'],
    },
  },

  judgeme: {
    id: 'judgeme',
    name: 'Judge.me',
    category: 'Reviews & Ratings',
    description: 'Product reviews and ratings',
    website: 'https://judge.me',
    detectionPatterns: {
      appBlocks: ['judge.me', 'judgeme'],
      scriptDomains: ['cdn.judge.me', 'cache.judge.me'],
      cssClasses: ['jdgm-widget', 'jdgm-rev-widg'],
      htmlElements: ['data-jdgm-*', 'jdgm-widget'],
    },
  },

  reconvert: {
    id: 'reconvert',
    name: 'ReConvert',
    category: 'Conversion Optimization',
    description: 'Post-purchase upsells and thank you page optimization',
    website: 'https://reconvert.com',
    detectionPatterns: {
      appBlocks: ['reconvert', 'ReConvert'],
      scriptDomains: ['reconvert.com', 'cdn.reconvert.com'],
      cssClasses: ['reconvert-app', 'rc-widget'],
      htmlElements: ['data-reconvert-*', 'reconvert-upsell'],
    },
  },

  googleAnalytics: {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Analytics',
    description: 'Web analytics and tracking',
    website: 'https://analytics.google.com',
    detectionPatterns: {
      appBlocks: ['google analytics', 'gtag'],
      scriptDomains: ['googletagmanager.com', 'google-analytics.com'],
      cssClasses: [],
      htmlElements: ['gtag(', 'ga(', 'data-gtm-*'],
    },
  },

  facebookPixel: {
    id: 'facebook-pixel',
    name: 'Facebook Pixel',
    category: 'Analytics',
    description: 'Facebook advertising and tracking pixel',
    website: 'https://business.facebook.com',
    detectionPatterns: {
      appBlocks: ['facebook pixel', 'fbq'],
      scriptDomains: ['connect.facebook.net'],
      cssClasses: [],
      htmlElements: ['fbq(', 'facebook-jssdk'],
    },
  },

  gorgias: {
    id: 'gorgias',
    name: 'Gorgias',
    category: 'Customer Support',
    description: 'Customer support and helpdesk',
    website: 'https://www.gorgias.com',
    detectionPatterns: {
      appBlocks: ['gorgias'],
      scriptDomains: ['config.gorgias.chat', 'gorgias-chat.s3.amazonaws.com'],
      cssClasses: ['gorgias-chat-container'],
      htmlElements: ['data-gorgias-*', 'gorgias-chat-messenger'],
    },
  },

  privy: {
    id: 'privy',
    name: 'Privy',
    category: 'Email Marketing',
    description: 'Email capture and marketing automation',
    website: 'https://privy.com',
    detectionPatterns: {
      appBlocks: ['privy'],
      scriptDomains: ['widget.privy.com', 'd2eebagvwr542c.cloudfront.net'],
      cssClasses: ['privy-overlay', 'privy-popup'],
      htmlElements: ['data-privy-*', 'privy-overlay-container'],
    },
  },

  shopifyInbox: {
    id: 'shopify-inbox',
    name: 'Shopify Inbox',
    category: 'Customer Support',
    description: 'Shopify native chat support',
    website: 'https://www.shopify.com/inbox',
    detectionPatterns: {
      appBlocks: ['shopify-chat', 'shop-chat'],
      scriptDomains: ['web.shopifychat.com'],
      cssClasses: ['shopify-chat', 'ShopifyChat'],
      htmlElements: ['shopify-chat', 'data-shop-id'],
    },
  },

  crazyEgg: {
    id: 'crazy-egg',
    name: 'Crazy Egg',
    category: 'Analytics',
    description:
      'Heatmaps and Recordings can help increase sales by knowing where & why visitors click.',
    website: 'https://www.crazyegg.com',
    detectionPatterns: {
      appBlocks: ['crazy-egg', 'crazyegg'],
      scriptDomains: ['script.crazyegg.com'],
      cssClasses: [],
      htmlElements: ['crazyegg'],
    },
  },

  wiserUpsell: {
    id: 'wiser-upsell',
    name: 'Wiser Upsell & Cross-sell',
    category: 'Conversion Optimization',
    description:
      'Increase average order value with smart upsell and cross-sell recommendations.',
    website: 'https://apps.shopify.com/wiser-upsell-cross-sell',
    detectionPatterns: {
      appBlocks: ['wiser-upsell-cross-sell', 'wiser', 'upsell'],
      scriptDomains: [],
      cssClasses: [],
      htmlElements: [],
    },
  },

  langshop: {
    id: 'langshop',
    name: 'LangShop',
    category: 'Localization',
    description: 'Translate your store into multiple languages and currencies.',
    website: 'https://langshop.app',
    detectionPatterns: {
      appBlocks: ['langshop', 'translation'],
      scriptDomains: [],
      cssClasses: [],
      htmlElements: [],
    },
  },

  seery: {
    id: 'seery',
    name: 'Predictive AI Analytics: Seery',
    category: 'Analytics',
    description:
      'Seery is an AI-powered app that helps merchants forecast sales & powerful AI-driven insights.',
    website: 'https://seery.io',
    detectionPatterns: {
      appBlocks: ['seery', 'predictive analytics'],
      scriptDomains: ['seery.io'],
      cssClasses: [],
      htmlElements: ['seery'],
    },
  },

  swymWishlist: {
    id: 'swym-wishlist',
    name: 'Swym Wishlist Plus',
    category: 'Conversion Optimization',
    description:
      'Boost sales with an easy-to-set-up Wishlist for all customer touchpoints. Top-rated app.',
    website: 'https://swym.it',
    detectionPatterns: {
      appBlocks: ['swym', 'wishlist'],
      scriptDomains: ['swym-a.akamaihd.net', 'cdn.swym.it'],
      cssClasses: ['swym-wishlist'],
      htmlElements: ['swym-wishlist'],
    },
  },
};

/**
 * Get app by ID
 */
export function getAppById(id: string): ShopifyApp | null {
  return SHOPIFY_APPS[id] || null;
}

/**
 * Get all apps
 */
export function getAllApps(): ShopifyApp[] {
  return Object.values(SHOPIFY_APPS);
}

/**
 * Get apps by category
 */
export function getAppsByCategory(category: string): ShopifyApp[] {
  return Object.values(SHOPIFY_APPS).filter((app) => app.category === category);
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(
    Object.values(SHOPIFY_APPS).map((app) => app.category)
  );
  return Array.from(categories);
}
