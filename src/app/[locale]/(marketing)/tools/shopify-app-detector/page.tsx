import { getBaseUrl } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import { AppDetectorPage } from './app-detector-page';

export const metadata: Metadata = {
  title:
    'Free Shopify App Detector - Discover Apps on Any Shopify Store | Competitive Analysis Tool',
  description:
    'Analyze any Shopify store to detect installed apps instantly. Free Shopify app detector for competitive analysis, market research, and discovering new tools. Get detailed app insights in seconds.',
  openGraph: {
    title: 'Free Shopify App Detector - Discover Apps on Any Shopify Store',
    description:
      'Analyze any Shopify store to detect installed apps instantly. Free tool for competitive analysis and market research.',
    type: 'website',
    siteName: 'Shopify Theme Detector',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Shopify App Detector - Discover Apps on Any Shopify Store',
    description:
      'Analyze any Shopify store to detect installed apps instantly. Free tool for competitive analysis and market research.',
  },
  alternates: {
    canonical: `${getBaseUrl()}/tools/shopify-app-detector`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Page() {
  return <AppDetectorPage />;
}
