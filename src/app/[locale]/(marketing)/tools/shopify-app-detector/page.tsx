import { getBaseUrl } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import { AppDetectorPage } from './app-detector-page';

export const metadata: Metadata = {
  title: 'Free Shopify App Detector | Discover Store Apps',
  description:
    'Free Shopify app detector to analyze any store and detect installed apps instantly. Perfect for competitive analysis and research.',
  openGraph: {
    title: 'Free Shopify App Detector | Discover Store Apps',
    description:
      'Free Shopify app detector to analyze any store and detect installed apps instantly. Perfect for competitive analysis and research.',
    type: 'website',
    siteName: 'Shopify Theme Detector',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Shopify App Detector | Discover Store Apps',
    description:
      'Free Shopify app detector to analyze any store and detect installed apps instantly. Perfect for competitive analysis and research.',
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
