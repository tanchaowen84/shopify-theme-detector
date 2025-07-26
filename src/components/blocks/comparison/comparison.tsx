import { HeaderSection } from '@/components/layout/header-section';
import { X, Check } from 'lucide-react';

export default function ComparisonSection() {
  const traditionalTools = [
    'Manual inspection of source code',
    'Limited theme database coverage',
    'Time-consuming analysis process',
    'Requires technical knowledge',
    'Often inaccurate results',
    'No direct theme store links',
    'Paid subscriptions required',
    'Complex setup and configuration',
  ];

  const ourTool = [
    'Instant automated detection',
    'Comprehensive official theme database',
    'Results in seconds, not hours',
    'No technical skills required',
    'High accuracy detection algorithm',
    'Direct links to Shopify theme store',
    'Completely free to use',
    'Simple one-click operation',
  ];

  return (
    <section id="comparison" className="px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-8 lg:space-y-16">
        <HeaderSection
          title="Why Choose Us"
          subtitle="Better Than Traditional Methods"
          description="See how our advanced Shopify theme detector outperforms traditional manual methods and other tools in the market."
          subtitleAs="h2"
          descriptionAs="p"
        />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Traditional Methods */}
          <div className="lg:pr-0">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-muted-foreground">
                Traditional Methods
              </h3>
              <p className="mt-4 text-muted-foreground">
                Manual inspection and basic tools with limited capabilities
              </p>
            </div>

            <ul className="space-y-4">
              {traditionalTools.map((item, index) => (
                <li key={index} className="pb-4 border-b border-dashed">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Tool */}
          <div className="lg:pl-0">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold" style={{ color: '#008060' }}>
                Our Shopify Theme Detector
              </h3>
              <p className="mt-4 text-muted-foreground">
                Advanced automated detection with comprehensive features
              </p>
            </div>

            <ul className="space-y-4">
              {ourTool.map((item, index) => (
                <li key={index} className="pb-4 border-b border-dashed">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#008060' }} />
                    <span className="text-sm leading-relaxed text-foreground">
                      {item}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 rounded-lg bg-[#008060]/5 border border-[#008060]/20">
              <div className="flex items-center gap-3 mb-3">
                <Check className="w-6 h-6" style={{ color: '#008060' }} />
                <h4 className="font-semibold" style={{ color: '#008060' }}>
                  100% Free Forever
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                No hidden costs, no registration required, no usage limits.
                Get unlimited theme detections completely free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
