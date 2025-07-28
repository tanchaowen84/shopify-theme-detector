import { Metadata } from 'next';
import { AppDetectorPage } from './app-detector-page';

export const metadata: Metadata = {
  title: 'Shopify App Detector - Detect Apps on Any Shopify Store',
  description: 'Discover which apps are installed on any Shopify store by analyzing app blocks and scripts. Free tool for competitive analysis.',
  keywords: 'shopify app detector, shopify apps, store analysis, competitive analysis, shopify tools',
  openGraph: {
    title: 'Shopify App Detector - Detect Apps on Any Shopify Store',
    description: 'Discover which apps are installed on any Shopify store by analyzing app blocks and scripts. Free tool for competitive analysis.',
    type: 'website',
  },
};

export default function Page() {
  return <AppDetectorPage />;
}
