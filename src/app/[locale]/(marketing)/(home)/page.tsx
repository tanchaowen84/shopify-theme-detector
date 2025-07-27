import { AiCapabilitiesSection } from '@/components/blocks/ai-capabilities';
import CallToActionSection from '@/components/blocks/calltoaction/calltoaction';
import { ComparisonSection } from '@/components/blocks/comparison';
import FaqSection from '@/components/blocks/faqs/faqs';
import FeaturesSection from '@/components/blocks/features/features';
import HeroSection from '@/components/blocks/hero/hero';
import { HowItWorksSection } from '@/components/blocks/how-it-works';
import { UseCasesSection } from '@/components/blocks/use-cases';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    canonicalUrl: getUrlWithLocale('', locale),
  });
}

export default async function HomePage() {
  return (
    <>
      <div className="flex flex-col">
        <HeroSection />

        <UseCasesSection />

        <FeaturesSection />

        <HowItWorksSection />

        <AiCapabilitiesSection />

        {/* <ComparisonSection /> */}

        <FaqSection />

        <CallToActionSection />
      </div>
    </>
  );
}
