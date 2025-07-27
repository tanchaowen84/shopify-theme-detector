'use client';

import { HeaderSection } from '@/components/layout/header-section';
import { Button } from '@/components/ui/button';
import { ChevronRight, Link, Search, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type * as React from 'react';

export default function HowItWorksSection() {
  const t = useTranslations('HomePage.howItWorks');

  const steps = [
    {
      number: 1,
      icon: Link,
      title: t('steps.step-1.title'),
      description: t('steps.step-1.description'),
      details: [
        t('steps.step-1.details.0'),
        t('steps.step-1.details.1'),
        t('steps.step-1.details.2'),
        t('steps.step-1.details.3'),
      ],
    },
    {
      number: 2,
      icon: Search,
      title: t('steps.step-2.title'),
      description: t('steps.step-2.description'),
      details: [
        t('steps.step-2.details.0'),
        t('steps.step-2.details.1'),
        t('steps.step-2.details.2'),
      ],
    },
    {
      number: 3,
      icon: CheckCircle,
      title: t('steps.step-3.title'),
      description: t('steps.step-3.description'),
      details: [
        t('steps.step-3.details.0'),
        t('steps.step-3.details.1'),
        t('steps.step-3.details.2'),
      ],
    },
  ];

  return (
    <section id="how-it-works" className="px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-8 lg:space-y-20">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          subtitleAs="h2"
          descriptionAs="p"
        />

        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <ul className="divide-y border-y *:flex *:items-start *:gap-4 *:py-4">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <li key={step.number}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-semibold flex-shrink-0 mt-1" style={{ backgroundColor: '#008060' }}>
                      {step.number}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" style={{ color: '#008060' }} />
                        <h3 className="font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {step.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span style={{ color: '#008060' }}>•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
            <div className="bg-linear-to-b aspect-[4/3] relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <div className="h-full w-full rounded-[15px] bg-gradient-to-br from-[#008060]/5 to-[#004C3F]/5 dark:from-[#008060]/10 dark:to-[#004C3F]/10 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[#008060]/10 flex items-center justify-center">
                    <Search className="w-16 h-16" style={{ color: '#008060' }} />
                  </div>
                  <h4 className="text-2xl font-semibold mb-4" style={{ color: '#008060' }}>
                    Shopify Theme Detection
                  </h4>
                  <p className="text-muted-foreground">
                    Advanced algorithm analyzes store structure to identify themes instantly
                  </p>
                  <div className="mt-6 flex justify-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#008060]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#008060]/60"></div>
                    <div className="w-3 h-3 rounded-full bg-[#008060]/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="gap-2 text-white hover:bg-[#004C3F]"
            style={{ backgroundColor: '#008060' }}
            onClick={() => {
              const heroSection = document.getElementById('hero');
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
{t('getStarted')}
            <ChevronRight className="!size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
