import { HeaderSection } from '@/components/layout/header-section';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DemoSection() {
  const t = useTranslations('HomePage.demo');

  return (
    <section id="demo" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          subtitleAs="h2"
          descriptionAs="p"
        />

        <div className="mt-12 space-y-8">
          {/* Main Demo Interface */}
          <div className="bg-background w-full relative flex overflow-hidden rounded-2xl border p-2">
            <div className="aspect-video bg-background relative w-full rounded-2xl">
              <div className="size-full overflow-hidden rounded-2xl border bg-gradient-to-br from-[#008060]/5 to-[#004C3F]/5 shadow-md relative flex items-center justify-center">
                <div className="text-center p-8 max-w-2xl">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#008060]/10 flex items-center justify-center">
                    <Search
                      className="w-10 h-10"
                      style={{ color: '#008060' }}
                    />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: '#008060' }}
                  >
                    Live Theme Detection Demo
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our Shopify Theme Detector analyzes any Shopify store URL
                    and instantly identifies the theme being used, including
                    theme name, version, and whether it's an official or custom
                    theme.
                  </p>
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-3 h-3 rounded-full bg-[#008060]" />
                      <span>Real-time analysis</span>
                      <div className="w-3 h-3 rounded-full bg-[#008060]" />
                      <span>No registration required</span>
                      <div className="w-3 h-3 rounded-full bg-[#008060]" />
                      <span>100% free</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BorderBeam
              duration={6}
              size={200}
              className="from-transparent via-[#008060] to-transparent dark:via-[#008060]/50"
            />
          </div>

          {/* Demo Features */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DemoFeature
              title={t('features.feature-1.title')}
              description={t('features.feature-1.description')}
            />
            <DemoFeature
              title={t('features.feature-2.title')}
              description={t('features.feature-2.description')}
            />
            <DemoFeature
              title={t('features.feature-3.title')}
              description={t('features.feature-3.description')}
            />
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg">
              <LocaleLink href="/canvas">{t('tryItNow')}</LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const DemoFeature = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center space-y-2">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
