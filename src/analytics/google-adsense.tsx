'use client';

import Script from 'next/script';

/**
 * Google AdSense Component
 *
 * Loads Google AdSense script for automatic ads and ad placement.
 * Only loads in production environment when client ID is configured.
 *
 * Environment Variables:
 * - NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID: Your AdSense client ID (format: ca-pub-xxxxxxxxxx)
 *
 * Setup:
 * 1. Create an AdSense account at https://www.google.com/adsense/
 * 2. Add your site and get approved
 * 3. Get your client ID from AdSense dashboard
 * 4. Add NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID to your environment variables
 *
 * Features:
 * - Automatic ads placement
 * - Manual ad units support
 * - GDPR compliant
 * - Performance optimized loading
 *
 * Documentation: https://developers.google.com/adsense/platforms/direct
 */
export function GoogleAdSense() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

  // Only load in production and if client ID is configured
  if (process.env.NODE_ENV !== 'production' || !clientId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
