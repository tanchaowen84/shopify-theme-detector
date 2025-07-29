import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Developer Tools - Shopify Theme Detector',
  description:
    'Collection of useful tools for Shopify developers and store owners',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ToolsPage() {
  const toolCategories = [
    {
      title: 'Store Analysis',
      tools: [
        {
          title: 'Shopify Theme Detector',
          description: 'Identify the theme used by any Shopify store',
          href: '/',
        },
        {
          title: 'Shopify App Detector',
          description:
            'Detect installed Shopify apps on any store by analyzing app blocks and scripts',
          href: '/tools/shopify-app-detector',
        },
      ],
    },
    {
      title: 'Marketing Tools',
      tools: [
        {
          title: 'Shopify QR Code Generator',
          description:
            'Generate custom QR codes for your Shopify store pages, products, and checkout links',
          href: '/tools/shopify-qrcode-generator',
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Tools</h1>
        </div>

        {/* Tool Categories */}
        <div className="space-y-12">
          {toolCategories.map((category) => (
            <div key={category.title} className="grid md:grid-cols-12 gap-8">
              {/* Category Title */}
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h2>
              </div>

              {/* Tools List */}
              <div className="md:col-span-9">
                {category.tools.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.tools.map((tool) => (
                      <div key={tool.href} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#008060] flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        <div className="flex-1">
                          <Link
                            href={tool.href}
                            className="text-lg font-semibold text-[#008060] hover:text-[#004C3F] transition-colors"
                          >
                            {tool.title}
                          </Link>
                          <p className="text-gray-600 mt-1 text-sm">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">Coming soon...</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
