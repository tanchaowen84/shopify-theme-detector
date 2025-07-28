import type { Metadata } from 'next';
import { AppDetectorPage } from './app-detector-page';

export const metadata: Metadata = {
  title: 'Shopify App Detector - Identify Apps on Any Shopify Store',
  description:
    'Discover which apps are installed on any Shopify store. Detect email marketing tools, review apps, analytics, and more with our free Shopify app detection tool.',
  keywords:
    'shopify app detector, shopify apps, ecommerce tools, shopify store analysis, app detection',
  openGraph: {
    title: 'Shopify App Detector - Identify Apps on Any Shopify Store',
    description:
      'Discover which apps are installed on any Shopify store. Detect email marketing tools, review apps, analytics, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify App Detector - Identify Apps on Any Shopify Store',
    description:
      'Discover which apps are installed on any Shopify store. Detect email marketing tools, review apps, analytics, and more.',
  },
};

export default function Page() {
  return <AppDetectorPage />;
}
