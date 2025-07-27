import { HeaderSection } from '@/components/layout/header-section';
import { X, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ComparisonSection() {
  const t = useTranslations('HomePage.comparison');

  const traditionalTools = [
    t('traditional.item-1'),
    t('traditional.item-2'),
    t('traditional.item-3'),
    t('traditional.item-4'),
    t('traditional.item-5'),
    t('traditional.item-6'),
    t('traditional.item-7'),
    t('traditional.item-8'),
  ];

  const ourTool = [
    t('shopifyThemeDetector.item-1'),
    t('shopifyThemeDetector.item-2'),
    t('shopifyThemeDetector.item-3'),
    t('shopifyThemeDetector.item-4'),
    t('shopifyThemeDetector.item-5'),
    t('shopifyThemeDetector.item-6'),
    t('shopifyThemeDetector.item-7'),
    t('shopifyThemeDetector.item-8'),
  ];

  return (
    <section id="comparison" className="px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-8 lg:space-y-16">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          subtitleAs="h2"
          descriptionAs="p"
        />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Traditional Methods */}
          <div className="lg:pr-0">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-muted-foreground">
                {t('traditional.title')}
              </h3>
              <p className="mt-4 text-muted-foreground">
                {t('traditional.subtitle')}
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
                {t('shopifyThemeDetector.title')}
              </h3>
              <p className="mt-4 text-muted-foreground">
                {t('shopifyThemeDetector.subtitle')}
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
