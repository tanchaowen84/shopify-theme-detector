'use client';

import { Button } from '@/components/ui/button';
import { Search, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CallToActionSection() {
  const t = useTranslations('HomePage.calltoaction');

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="call-to-action" className="px-4 py-24 bg-gradient-to-br from-[#008060]/5 to-[#004C3F]/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl" style={{ color: '#008060' }}>
            {t('title')}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t('description')}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 text-white hover:bg-[#004C3F]"
              style={{ backgroundColor: '#008060' }}
              onClick={scrollToHero}
            >
              <Search className="w-5 h-5" />
              <span>{t('primaryButton')}</span>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-[#008060] text-[#008060] hover:bg-[#008060]/10"
            >
              <a
                href="https://themes.shopify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5" />
                <span>{t('secondaryButton')}</span>
              </a>
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>✓ 100% Free Forever  ✓ No Registration Required  ✓ Instant Results</p>
          </div>
        </div>
      </div>
    </section>
  );
}
