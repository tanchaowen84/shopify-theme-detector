const seoContent = require('@/data/seo/shopify-qrcode-generator.json');
import { getBaseUrl } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import { QRCodeGeneratorPage } from './qrcode-generator-page';

export const metadata: Metadata = {
  title: seoContent.title,
  description: seoContent.description,
  openGraph: {
    title: seoContent.title,
    description: seoContent.description,
    type: 'website',
    siteName: 'Shopify Theme Detector',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoContent.title,
    description: seoContent.description,
  },
  alternates: {
    canonical: `${getBaseUrl()}/tools/shopify-qrcode-generator`,
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
  return <QRCodeGeneratorPage />;
}
