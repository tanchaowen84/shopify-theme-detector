'use client';

import { HeaderSection } from '@/components/layout/header-section';
import { BorderBeam } from '@/components/magicui/border-beam';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Search,
  Zap,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * https://nsui.irung.me/features
 * pnpm dlx shadcn@canary add https://nsui.irung.me/r/features-12.json
 */
export default function FeaturesSection() {
  const t = useTranslations('HomePage.features');
  type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4';
  const [activeItem, setActiveItem] = useState<ImageKey>('item-1');

  const images = {
    'item-1': {
      image: '/images/features/instant-detection.png',
      darkImage: '/images/features/instant-detection-dark.png',
      alt: 'Instant Theme Detection',
    },
    'item-2': {
      image: '/images/features/accurate-results.png',
      darkImage: '/images/features/accurate-results-dark.png',
      alt: 'Accurate Theme Identification',
    },
    'item-3': {
      image: '/images/features/official-themes.png',
      darkImage: '/images/features/official-themes-dark.png',
      alt: 'Official Theme Database',
    },
    'item-4': {
      image: '/images/features/free-unlimited.png',
      darkImage: '/images/features/free-unlimited-dark.png',
      alt: 'Free Unlimited Usage',
    },
  };

  const features = [
    {
      id: 'item-1',
      icon: Search,
      title: 'Instant Detection',
      description: 'Get immediate results by simply entering any Shopify store URL. Our advanced detection algorithm analyzes the store and identifies the theme within seconds.',
    },
    {
      id: 'item-2',
      icon: Zap,
      title: 'Accurate Identification',
      description: 'Powered by comprehensive theme database and smart parsing technology, we provide highly accurate theme identification with detailed information.',
    },
    {
      id: 'item-3',
      icon: Shield,
      title: 'Official Theme Database',
      description: 'Access to complete Shopify official theme database with direct links to theme store, pricing information, and theme specifications.',
    },
    {
      id: 'item-4',
      icon: ExternalLink,
      title: 'Free & Unlimited',
      description: 'Completely free to use with no registration required. Detect unlimited Shopify themes without any restrictions or hidden costs.',
    },
  ];

  return (
    <section id="features" className="px-4 py-16">
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]" />
      <div className="mx-auto max-w-6xl space-y-8 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          subtitleAs="h2"
          description={t('description')}
          descriptionAs="p"
        />

        <div className="grid gap-12 sm:px-12 lg:grid-cols-12 lg:gap-24 lg:px-0">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="lg:pr-0 text-left">
              <h3 className="text-3xl font-semibold lg:text-4xl leading-normal py-1" style={{ color: '#008060' }}>
                Advanced Detection Technology
              </h3>
              <p className="mt-4 text-muted-foreground">
                Our cutting-edge detection system combines multiple analysis techniques to provide the most accurate and comprehensive theme identification available.
              </p>
            </div>
            <Accordion
              type="single"
              value={activeItem}
              onValueChange={(value) => setActiveItem(value as ImageKey)}
              className="w-full"
            >
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <AccordionItem key={feature.id} value={feature.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2 text-base">
                        <IconComponent className="size-4" style={{ color: '#008060' }} />
                        {feature.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {feature.description}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          <div className="bg-background w-full relative flex overflow-hidden rounded-2xl border p-2 lg:h-auto lg:col-span-7">
            <div className="aspect-76/59 bg-background relative w-full rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-id`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-2xl border bg-gradient-to-br from-[#008060]/5 to-[#004C3F]/5 dark:from-[#008060]/10 dark:to-[#004C3F]/10 shadow-md flex items-center justify-center"
                >
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#008060]/10 flex items-center justify-center">
                      {(() => {
                        const feature = features.find(f => f.id === activeItem);
                        if (feature) {
                          const IconComponent = feature.icon;
                          return <IconComponent className="w-12 h-12" style={{ color: '#008060' }} />;
                        }
                        return null;
                      })()}
                    </div>
                    <h4 className="text-xl font-semibold mb-2" style={{ color: '#008060' }}>
                      {features.find(f => f.id === activeItem)?.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {features.find(f => f.id === activeItem)?.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam
              duration={6}
              size={200}
              className="from-transparent via-[#008060] to-transparent dark:via-[#008060]/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
