'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
const seoContent = require('@/data/tools/shopify-qrcode-generator.json');
import { cn } from '@/lib/utils';
import { Download, Plus, Trash2 } from 'lucide-react';
import QRCodeLib from 'qrcode';
import { QRCodeCanvas } from 'qrcode.react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

interface Subsection {
  title: string;
  content: string;
}

interface Section {
  title: string;
  content: string;
  subsections?: Subsection[];
}

interface SEOContent {
  title: string;
  description: string;
  sections: {
    whatIsIt: Section;
    howItWorks: Section;
    useCases: Section;
    features: Section;
    faq: {
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
}

const typedSeoContent: SEOContent = seoContent;

interface QRCodeItem {
  id: string;
  url: string;
  label: string;
  size: number;
  fgColor: string;
  bgColor: string;
}

export function QRCodeGeneratorPage() {
  const [qrCodes, setQrCodes] = useState<QRCodeItem[]>([
    {
      id: '1',
      url: '',
      label: 'QR Code 1',
      size: 256,
      fgColor: '#000000',
      bgColor: '#ffffff',
    },
    {
      id: '2',
      url: '',
      label: 'QR Code 2',
      size: 256,
      fgColor: '#000000',
      bgColor: '#ffffff',
    },
    {
      id: '3',
      url: '',
      label: 'QR Code 3',
      size: 256,
      fgColor: '#000000',
      bgColor: '#ffffff',
    },
  ]);

  const addQRCode = useCallback(() => {
    const newId = Date.now().toString();
    setQrCodes((prev) => [
      ...prev,
      {
        id: newId,
        url: '',
        label: `QR Code ${prev.length + 1}`,
        size: 256,
        fgColor: '#000000',
        bgColor: '#ffffff',
      },
    ]);
  }, []);

  const removeQRCode = useCallback((id: string) => {
    setQrCodes((prev) => prev.filter((qr) => qr.id !== id));
  }, []);

  const updateQRCode = useCallback(
    (id: string, updates: Partial<QRCodeItem>) => {
      setQrCodes((prev) =>
        prev.map((qr) => (qr.id === id ? { ...qr, ...updates } : qr))
      );
    },
    []
  );

  const downloadQRCode = useCallback(
    async (id: string, format: 'png' | 'svg') => {
      const qrCode = qrCodes.find((qr) => qr.id === id);
      if (!qrCode || !qrCode.url) {
        toast.error('QR Code not found or URL is empty');
        return;
      }

      try {
        if (format === 'png') {
          const canvas = document.getElementById(
            `qr-${id}`
          ) as HTMLCanvasElement;
          if (!canvas) {
            toast.error('QR Code canvas not found');
            return;
          }

          const url = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `${qrCode.label.replace(/\s+/g, '_')}.png`;
          link.href = url;
          link.click();
        } else {
          // Generate SVG using qrcode library
          const svgString = await QRCodeLib.toString(qrCode.url, {
            type: 'svg',
            width: qrCode.size,
            color: {
              dark: qrCode.fgColor,
              light: qrCode.bgColor,
            },
            margin: 2,
          });

          const blob = new Blob([svgString], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${qrCode.label.replace(/\s+/g, '_')}.svg`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }

        toast.success(`${qrCode.label} downloaded as ${format.toUpperCase()}`);
      } catch (error) {
        console.error('Download error:', error);
        toast.error(`Failed to download ${format.toUpperCase()}`);
      }
    },
    [qrCodes]
  );

  const downloadAllQRCodes = useCallback(
    async (format: 'png' | 'svg') => {
      const validQRCodes = qrCodes.filter((qr) => qr.url);
      if (validQRCodes.length === 0) {
        toast.error('No QR codes with URLs to download');
        return;
      }

      toast.info(`Downloading ${validQRCodes.length} QR codes...`);

      for (const qrCode of validQRCodes) {
        await downloadQRCode(qrCode.id, format);
        // Small delay to prevent browser blocking multiple downloads
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    },
    [qrCodes, downloadQRCode]
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shopify QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate custom QR codes for your Shopify store pages, products, and
            checkout links
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            onClick={addQRCode}
            className="bg-[#008060] hover:bg-[#004C3F] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add QR Code
          </Button>

          {qrCodes.some((qr) => qr.url) && (
            <div className="flex gap-2">
              <Button
                onClick={() => downloadAllQRCodes('png')}
                variant="outline"
                className="border-[#008060] text-[#008060] hover:bg-[#008060] hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All PNG
              </Button>
              <Button
                onClick={() => downloadAllQRCodes('svg')}
                variant="outline"
                className="border-[#008060] text-[#008060] hover:bg-[#008060] hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All SVG
              </Button>
            </div>
          )}
        </div>

        {/* QR Codes Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {qrCodes.map((qrCode) => (
            <Card key={qrCode.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    <Input
                      value={qrCode.label}
                      onChange={(e) =>
                        updateQRCode(qrCode.id, { label: e.target.value })
                      }
                      className="border-none p-0 h-auto text-lg font-semibold bg-transparent"
                      placeholder="QR Code Label"
                    />
                  </CardTitle>
                  {qrCodes.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQRCode(qrCode.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <Label htmlFor={`url-${qrCode.id}`}>Shopify Page URL</Label>
                  <Input
                    id={`url-${qrCode.id}`}
                    value={qrCode.url}
                    onChange={(e) =>
                      updateQRCode(qrCode.id, { url: e.target.value })
                    }
                    placeholder="https://your-store.myshopify.com/products/example"
                    className="w-full"
                  />
                  {/* Quick Fill Buttons */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      {
                        label: 'Homepage',
                        url: 'https://your-store.myshopify.com',
                      },
                      {
                        label: 'Products',
                        url: 'https://your-store.myshopify.com/products/example',
                      },
                      {
                        label: 'Cart',
                        url: 'https://your-store.myshopify.com/cart',
                      },
                      {
                        label: 'Collections',
                        url: 'https://your-store.myshopify.com/collections/all',
                      },
                    ].map((example) => (
                      <Button
                        key={example.label}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQRCode(qrCode.id, { url: example.url })
                        }
                        className="text-xs h-6 px-2"
                      >
                        {example.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* QR Code Preview */}
                <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                  {qrCode.url ? (
                    <QRCodeCanvas
                      id={`qr-${qrCode.id}`}
                      value={qrCode.url}
                      size={qrCode.size}
                      fgColor={qrCode.fgColor}
                      bgColor={qrCode.bgColor}
                      level="M"
                      includeMargin={true}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500"
                      style={{
                        width: qrCode.size,
                        height: qrCode.size,
                      }}
                    >
                      Enter URL to generate QR code
                    </div>
                  )}
                </div>

                <Separator />

                {/* Customization Options */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-gray-700">
                    Customize
                  </h4>

                  {/* Size */}
                  <div className="space-y-2">
                    <Label className="text-sm">Size: {qrCode.size}px</Label>
                    <Slider
                      value={[qrCode.size]}
                      onValueChange={([value]) =>
                        updateQRCode(qrCode.id, { size: value })
                      }
                      min={128}
                      max={512}
                      step={32}
                      className="w-full"
                    />
                  </div>

                  {/* Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Foreground</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={qrCode.fgColor}
                          onChange={(e) =>
                            updateQRCode(qrCode.id, { fgColor: e.target.value })
                          }
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={qrCode.fgColor}
                          onChange={(e) =>
                            updateQRCode(qrCode.id, { fgColor: e.target.value })
                          }
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Background</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={qrCode.bgColor}
                          onChange={(e) =>
                            updateQRCode(qrCode.id, { bgColor: e.target.value })
                          }
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={qrCode.bgColor}
                          onChange={(e) =>
                            updateQRCode(qrCode.id, { bgColor: e.target.value })
                          }
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Download Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => downloadQRCode(qrCode.id, 'png')}
                    disabled={!qrCode.url}
                    className="flex-1 bg-[#008060] hover:bg-[#004C3F] text-white"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PNG
                  </Button>
                  <Button
                    onClick={() => downloadQRCode(qrCode.id, 'svg')}
                    disabled={!qrCode.url}
                    variant="outline"
                    className="flex-1"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    SVG
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-gray">
          {/* What is it */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {typedSeoContent.sections.whatIsIt.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {typedSeoContent.sections.whatIsIt.content}
            </p>
            {typedSeoContent.sections.whatIsIt.subsections?.map(
              (subsection, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {subsection.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {subsection.content}
                  </p>
                </div>
              )
            )}
          </section>

          {/* How it works */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {typedSeoContent.sections.howItWorks.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {typedSeoContent.sections.howItWorks.content}
            </p>
            {typedSeoContent.sections.howItWorks.subsections?.map(
              (subsection, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {subsection.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {subsection.content}
                  </p>
                </div>
              )
            )}
          </section>

          {/* Use cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {typedSeoContent.sections.useCases.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {typedSeoContent.sections.useCases.content}
            </p>
            {typedSeoContent.sections.useCases.subsections?.map(
              (subsection, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {subsection.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {subsection.content}
                  </p>
                </div>
              )
            )}
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {typedSeoContent.sections.features.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {typedSeoContent.sections.features.content}
            </p>
            {typedSeoContent.sections.features.subsections?.map(
              (subsection, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {subsection.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {subsection.content}
                  </p>
                </div>
              )
            )}
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {typedSeoContent.sections.faq.title}
            </h2>
            <div className="space-y-6">
              {typedSeoContent.sections.faq.items.map((item, index) => (
                <div key={index} className="border-l-4 border-[#008060] pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
