import { websiteConfig } from './config/website';

/**
 * The routes for the application
 */
export enum Routes {
  Root = '/',

  // marketing pages (simplified for Shopify Theme Detector)
  FAQ = '/#faq',
  Features = '/#features',
  // Pricing = '/pricing', // Disabled for Shopify Theme Detector
  Blog = '/blog', // Enabled for SEO purposes
  // Docs = '/docs', // Disabled for Shopify Theme Detector

  // Waitlist = '/waitlist', // Disabled for Shopify Theme Detector
  // Changelog = '/changelog', // Disabled for Shopify Theme Detector
  Roadmap = 'https://github.com/your-repo/shopify-theme-detector', // Updated for project
  CookiePolicy = '/cookie',
  PrivacyPolicy = '/privacy',
  TermsOfService = '/terms',

  // auth routes (disabled for Shopify Theme Detector)
  // Login = '/auth/login',
  // Register = '/auth/register',
  // AuthError = '/auth/error',
  // ForgotPassword = '/auth/forgot-password',
  // ResetPassword = '/auth/reset-password',

  // dashboard routes (disabled for Shopify Theme Detector)
  // Dashboard = '/dashboard',
  // AdminUsers = '/admin/users',
  // SettingsProfile = '/settings/profile',
  // SettingsBilling = '/settings/billing',
  // SettingsSecurity = '/settings/security',
  // SettingsNotifications = '/settings/notifications',

  // AI routes (disabled for Shopify Theme Detector)
  // AIText = '/ai/text',
  // AIImage = '/ai/image',
  // AIVideo = '/ai/video',
  // AIAudio = '/ai/audio',

  // block routes (disabled for Shopify Theme Detector)
  // MagicuiBlocks = '/magicui',
  // HeroBlocks = '/blocks/hero-section',
  // LogoCloudBlocks = '/blocks/logo-cloud',
  // FeaturesBlocks = '/blocks/features',
  // IntegrationsBlocks = '/blocks/integrations',
  // ContentBlocks = '/blocks/content',
  // StatsBlocks = '/blocks/stats',
  // TeamBlocks = '/blocks/team',
  // TestimonialsBlocks = '/blocks/testimonials',
  // CallToActionBlocks = '/blocks/call-to-action',
  // FooterBlocks = '/blocks/footer',
  // PricingBlocks = '/blocks/pricing',
  // ComparatorBlocks = '/blocks/comparator',
  // FAQBlocks = '/blocks/faqs',
  // LoginBlocks = '/blocks/login',
  // SignupBlocks = '/blocks/sign-up',
  // ForgotPasswordBlocks = '/blocks/forgot-password',
  // ContactBlocks = '/blocks/contact',
}

/**
 * The routes that can not be accessed by logged in users
 * Disabled for Shopify Theme Detector (no auth system)
 */
export const routesNotAllowedByLoggedInUsers: string[] = [];

/**
 * The routes that are protected and require authentication
 * Disabled for Shopify Theme Detector (no auth system)
 */
export const protectedRoutes: string[] = [];

/**
 * The default redirect path after logging in
 * Disabled for Shopify Theme Detector (no auth system)
 */
export const DEFAULT_LOGIN_REDIRECT = Routes.Root;
