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
    website: 'https://apps.shopify.com/klaviyo-email-marketing',
    iconUrl: 'https://logo.clearbit.com/klaviyo.com',
    detectionPatterns: {
      appBlocks: ['klaviyo', 'Klaviyo'],
      scriptDomains: ['klaviyo.com'], // Full domain matching
      cssClasses: ['klaviyo-form', 'kl-private-reset-css-Xuajs1'],
      htmlElements: ['data-klaviyo-*', 'klaviyo-onsite-embed'],
    },
  },

  loox: {
    id: 'loox',
    name: 'Loox: Product Reviews App',
    category: 'Reviews & Ratings',
    description: 'Photo reviews and user-generated content to boost sales',
    website: 'https://apps.shopify.com/loox',
    iconUrl: 'https://logo.clearbit.com/loox.io',
    detectionPatterns: {
      appBlocks: ['loox', 'Loox'],
      scriptDomains: ['loox.io'], // Full domain matching
      cssClasses: ['loox-rating', 'loox-reviews'],
      htmlElements: ['data-loox-*', 'loox-reviews-default'],
    },
  },

  yotpo: {
    id: 'yotpo',
    name: 'Yotpo: Product Reviews & UGC',
    category: 'Reviews & Ratings',
    description: 'Reviews, ratings, and user-generated content platform',
    website: 'https://apps.shopify.com/yotpo-social-reviews',
    iconUrl: 'https://logo.clearbit.com/yotpo.com',
    detectionPatterns: {
      appBlocks: ['yotpo', 'Yotpo'],
      scriptDomains: ['yotpo.com'], // Full domain matching
      cssClasses: ['yotpo', 'yotpo-main-widget'],
      htmlElements: ['data-yotpo-*', 'yotpo-widget-instance'],
    },
  },

  judgeme: {
    id: 'judgeme',
    name: 'Judge.me Product Reviews',
    category: 'Reviews & Ratings',
    description: 'Product reviews and ratings with photo reviews',
    website: 'https://apps.shopify.com/judgeme',
    iconUrl: 'https://logo.clearbit.com/judge.me',
    detectionPatterns: {
      appBlocks: ['judge.me', 'judgeme'],
      scriptDomains: ['judge.me'], // Full domain matching
      cssClasses: ['jdgm-widget', 'jdgm-rev-widg'],
      htmlElements: ['data-jdgm-*', 'jdgm-widget'],
    },
  },

  reconvert: {
    id: 'reconvert',
    name: 'ReConvert Post Purchase Upsell',
    category: 'Conversion Optimization',
    description: 'Post-purchase upsells and thank you page optimization',
    website: 'https://apps.shopify.com/reconvert-post-purchase-upsell',
    iconUrl: 'https://logo.clearbit.com/reconvert.io',
    detectionPatterns: {
      appBlocks: ['reconvert', 'ReConvert'],
      scriptDomains: ['reconvert.io'], // Full domain matching
      cssClasses: ['reconvert-app', 'rc-widget'],
      htmlElements: ['data-reconvert-*', 'reconvert-upsell'],
    },
  },

  minmaxify: {
    id: 'minmaxify',
    name: 'MinMaxify Order Limits',
    category: 'Order Management',
    description:
      'Set minimum and maximum order limits for products and collections',
    website: 'https://apps.shopify.com/order-limits-minmaxify',
    iconUrl: 'https://logo.clearbit.com/minmaxify.com',
    detectionPatterns: {
      appBlocks: ['minmaxify-order-limits', 'minmaxify'],
      scriptDomains: ['minmaxify.com'], // Full domain matching
      cssClasses: ['minmaxify-widget', 'minmaxify-limits'],
      htmlElements: ['data-minmaxify-*', 'minmaxify-order-limits'],
    },
  },

  recart: {
    id: 'recart',
    name: 'ReCart: SMS Marketing',
    category: 'Email Marketing',
    description: 'SMS marketing and abandoned cart recovery',
    website: 'https://apps.shopify.com/recart',
    iconUrl: 'https://logo.clearbit.com/recart.com',
    detectionPatterns: {
      appBlocks: ['recart', 'ReCart'],
      scriptDomains: ['recart.com'], // Full domain matching
      cssClasses: ['recart-widget'],
      htmlElements: ['data-recart-*'],
    },
  },

  tidio: {
    id: 'tidio',
    name: 'Tidio Live Chat & AI Chatbots',
    category: 'Customer Support',
    description: 'Live chat, chatbots, and customer communication',
    website: 'https://apps.shopify.com/tidio-chat',
    iconUrl: 'https://logo.clearbit.com/tidio.com',
    detectionPatterns: {
      appBlocks: ['tidio', 'Tidio'],
      scriptDomains: ['tidio.co'], // Full domain matching
      cssClasses: ['tidio-chat'],
      htmlElements: ['tidio-chat'],
    },
  },

  stampedio: {
    id: 'stampedio',
    name: 'Stamped.io Product Reviews & UGC',
    category: 'Reviews & Ratings',
    description: 'Product reviews, ratings, and user-generated content',
    website: 'https://apps.shopify.com/stamped-io',
    iconUrl: 'https://logo.clearbit.com/stamped.io',
    detectionPatterns: {
      appBlocks: ['stamped', 'stamped.io'],
      scriptDomains: ['stamped.io'], // Full domain matching
      cssClasses: ['stamped-reviews'],
      htmlElements: ['stamped-reviews'],
    },
  },

  luckyorange: {
    id: 'luckyorange',
    name: 'Lucky Orange Heatmaps & Replay',
    category: 'Analytics',
    description: 'Heatmaps, session recordings, and conversion optimization',
    website: 'https://apps.shopify.com/lucky-orange',
    iconUrl: 'https://logo.clearbit.com/luckyorange.com',
    detectionPatterns: {
      appBlocks: ['lucky-orange', 'luckyorange'],
      scriptDomains: ['luckyorange.com'], // Full domain matching
      cssClasses: [],
      htmlElements: ['luckyorange'],
    },
  },

  googleAnalytics: {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Analytics',
    description: 'Web analytics and tracking',
    website: 'https://analytics.google.com',
    iconUrl: 'https://logo.clearbit.com/google.com',
    detectionPatterns: {
      appBlocks: ['google analytics', 'gtag'],
      scriptDomains: ['googletagmanager.com', 'google-analytics.com'], // Full domain matching
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
    iconUrl: 'https://logo.clearbit.com/facebook.com',
    detectionPatterns: {
      appBlocks: ['facebook pixel', 'fbq'],
      scriptDomains: ['facebook.com'], // Full domain matching
      cssClasses: [],
      htmlElements: ['fbq(', 'facebook-jssdk'],
    },
  },

  gorgias: {
    id: 'gorgias',
    name: 'Gorgias: Helpdesk & Live Chat',
    category: 'Customer Support',
    description: 'Customer support and helpdesk solution',
    website: 'https://apps.shopify.com/gorgias',
    iconUrl: 'https://logo.clearbit.com/gorgias.com',
    detectionPatterns: {
      appBlocks: ['gorgias'],
      scriptDomains: ['gorgias.com'], // Full domain matching
      cssClasses: ['gorgias-chat-container'],
      htmlElements: ['data-gorgias-*', 'gorgias-chat-messenger'],
    },
  },

  privy: {
    id: 'privy',
    name: 'Privy: Pop Ups, Email, & SMS',
    category: 'Email Marketing',
    description: 'Email capture and marketing automation',
    website: 'https://apps.shopify.com/privy',
    iconUrl: 'https://logo.clearbit.com/privy.com',
    detectionPatterns: {
      appBlocks: ['privy'],
      scriptDomains: ['privy.com'], // Full domain matching
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
    iconUrl: 'https://logo.clearbit.com/shopify.com',
    detectionPatterns: {
      appBlocks: ['shopify-chat', 'shop-chat'],
      scriptDomains: ['shopify.com'], // Full domain matching
      cssClasses: ['shopify-chat', 'ShopifyChat'],
      htmlElements: ['shopify-chat', 'data-shop-id'],
    },
  },

  crazyEgg: {
    id: 'crazy-egg',
    name: 'Crazy Egg: Heatmaps & Recordings',
    category: 'Analytics',
    description:
      'Heatmaps and Recordings can help increase sales by knowing where & why visitors click.',
    website: 'https://apps.shopify.com/crazy-egg',
    iconUrl: 'https://logo.clearbit.com/crazyegg.com',
    detectionPatterns: {
      appBlocks: ['crazy-egg', 'crazyegg'],
      scriptDomains: ['crazyegg.com'], // Full domain matching
      cssClasses: [],
      htmlElements: ['crazyegg'],
    },
  },

  omnisend: {
    id: 'omnisend',
    name: 'Omnisend Email Marketing & SMS',
    category: 'Email Marketing',
    description: 'Email marketing, SMS, and automation platform',
    website: 'https://apps.shopify.com/omnisend',
    iconUrl: 'https://logo.clearbit.com/omnisend.com',
    detectionPatterns: {
      appBlocks: ['omnisend'],
      scriptDomains: ['omnisend.com'], // Full domain matching
      cssClasses: ['omnisend-form'],
      htmlElements: ['omnisend'],
    },
  },

  smileio: {
    id: 'smileio',
    name: 'Smile: Loyalty & Rewards',
    category: 'Loyalty & Rewards',
    description: 'Loyalty program and rewards platform',
    website: 'https://apps.shopify.com/smile-io',
    iconUrl: 'https://logo.clearbit.com/smile.io',
    detectionPatterns: {
      appBlocks: ['smile', 'smile.io'],
      scriptDomains: ['smile.io'], // Full domain matching
      cssClasses: ['smile-launcher'],
      htmlElements: ['smile-ui'],
    },
  },

  okendo: {
    id: 'okendo',
    name: 'Okendo: Reviews & Loyalty',
    category: 'Reviews & Ratings',
    description: 'Product reviews and customer loyalty platform',
    website: 'https://apps.shopify.com/okendo',
    iconUrl: 'https://logo.clearbit.com/okendo.io',
    detectionPatterns: {
      appBlocks: ['okendo'],
      scriptDomains: ['okendo.io'], // Full domain matching
      cssClasses: ['okendo-reviews'],
      htmlElements: ['okendo-reviews-widget'],
    },
  },

  zendesk: {
    id: 'zendesk',
    name: 'Zendesk Chat',
    category: 'Customer Support',
    description: 'Customer support and live chat solution',
    website: 'https://apps.shopify.com/zendesk-chat',
    iconUrl: 'https://logo.clearbit.com/zendesk.com',
    detectionPatterns: {
      appBlocks: ['zendesk'],
      scriptDomains: ['zendesk.com'], // Full domain matching
      cssClasses: ['zopim'],
      htmlElements: ['zopim'],
    },
  },

  wiserUpsell: {
    id: 'wiser-upsell',
    name: 'Wiser Upsell & Cross-sell',
    category: 'Conversion Optimization',
    description:
      'Increase average order value with smart upsell and cross-sell recommendations.',
    website: 'https://apps.shopify.com/recommended-products-wiser',
    iconUrl: 'https://logo.clearbit.com/wiser.com',
    detectionPatterns: {
      appBlocks: ['wiser-upsell-cross-sell', 'wiser', 'upsell'],
      scriptDomains: ['wiser.com'], // Full domain matching
      cssClasses: [],
      htmlElements: [],
    },
  },

  langshop: {
    id: 'langshop',
    name: 'LangShop AI Language Translate',
    category: 'Localization',
    description: 'Translate your store into multiple languages and currencies.',
    website: 'https://apps.shopify.com/langshop',
    iconUrl: 'https://logo.clearbit.com/langshop.app',
    detectionPatterns: {
      appBlocks: ['langshop', 'translation'],
      scriptDomains: ['langshop.app'], // Full domain matching
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
    website: 'https://apps.shopify.com/seery',
    iconUrl: 'https://logo.clearbit.com/seery.io',
    detectionPatterns: {
      appBlocks: ['seery', 'predictive analytics'],
      scriptDomains: ['seery.io'], // Full domain matching
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
    website: 'https://apps.shopify.com/swym-wishlist-plus',
    iconUrl: 'https://logo.clearbit.com/swym.it',
    detectionPatterns: {
      appBlocks: ['swym', 'wishlist'],
      scriptDomains: ['swym.it'], // Full domain matching
      cssClasses: ['swym-wishlist'],
      htmlElements: ['swym-wishlist'],
    },
  },

  hotjar: {
    id: 'hotjar',
    name: 'Hotjar: Heatmaps & Recordings',
    category: 'Analytics',
    description: 'Heatmaps, session recordings, and user behavior analytics',
    website: 'https://apps.shopify.com/hotjar',
    iconUrl: 'https://logo.clearbit.com/hotjar.com',
    detectionPatterns: {
      appBlocks: ['hotjar'],
      scriptDomains: ['hotjar.com'], // Full domain matching
      cssClasses: [],
      htmlElements: ['hotjar'],
    },
  },

  intercom: {
    id: 'intercom',
    name: 'Intercom',
    category: 'Customer Support',
    description: 'Customer messaging and support platform',
    website: 'https://apps.shopify.com/intercom',
    iconUrl: 'https://logo.clearbit.com/intercom.com',
    detectionPatterns: {
      appBlocks: ['intercom'],
      scriptDomains: ['intercom.com'], // Full domain matching
      cssClasses: ['intercom-messenger'],
      htmlElements: ['intercom-frame'],
    },
  },

  mailchimp: {
    id: 'mailchimp',
    name: 'Mailchimp: Email & SMS',
    category: 'Email Marketing',
    description: 'Email marketing and automation platform',
    website: 'https://apps.shopify.com/mailchimp',
    iconUrl: 'https://logo.clearbit.com/mailchimp.com',
    detectionPatterns: {
      appBlocks: ['mailchimp'],
      scriptDomains: ['mailchimp.com'], // Full domain matching
      cssClasses: ['mc-embedded-subscribe'],
      htmlElements: ['mailchimp'],
    },
  },

  trustpilot: {
    id: 'trustpilot',
    name: 'Trustpilot Reviews',
    category: 'Reviews & Ratings',
    description: 'Customer reviews and trust badges',
    website: 'https://apps.shopify.com/trustpilot-reviews',
    iconUrl: 'https://logo.clearbit.com/trustpilot.com',
    detectionPatterns: {
      appBlocks: ['trustpilot'],
      scriptDomains: ['trustpilot.com'], // Full domain matching
      cssClasses: ['trustpilot-widget'],
      htmlElements: ['trustpilot-widget'],
    },
  },

  aftership: {
    id: 'aftership',
    name: 'AfterShip Order Tracking',
    category: 'Shipping & Fulfillment',
    description: 'Order tracking and shipping notifications',
    website: 'https://apps.shopify.com/aftership',
    iconUrl: 'https://logo.clearbit.com/aftership.com',
    detectionPatterns: {
      appBlocks: ['aftership'],
      scriptDomains: ['aftership.com'], // Full domain matching
      cssClasses: ['aftership-tracking'],
      htmlElements: ['aftership'],
    },
  },

  shipstation: {
    id: 'shipstation',
    name: 'ShipStation',
    category: 'Shipping & Fulfillment',
    description: 'Shipping software and order fulfillment',
    website: 'https://apps.shopify.com/shipstation',
    iconUrl: 'https://logo.clearbit.com/shipstation.com',
    detectionPatterns: {
      appBlocks: ['shipstation'],
      scriptDomains: ['shipstation.com'], // Full domain matching
      cssClasses: [],
      htmlElements: ['shipstation'],
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
