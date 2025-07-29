import { getBaseUrl } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import { QRCodeGeneratorPage } from './qrcode-generator-page';

export const metadata: Metadata = {
  title: 'Free Shopify QR Code Generator | Create Custom QR Codes',
  description:
    'Free Shopify QR code generator to create custom QR codes for your store pages, products, and checkout. Download as PNG or SVG.',
  openGraph: {
    title: 'Free Shopify QR Code Generator | Create Custom QR Codes',
    description:
      'Free Shopify QR code generator to create custom QR codes for your store pages, products, and checkout. Download as PNG or SVG.',
    type: 'website',
    siteName: 'Shopify Theme Detector',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Shopify QR Code Generator | Create Custom QR Codes',
    description:
      'Free Shopify QR code generator to create custom QR codes for your store pages, products, and checkout. Download as PNG or SVG.',
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
