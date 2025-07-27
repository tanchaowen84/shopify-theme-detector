'use client';

import Container from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { ModeSwitcherHorizontal } from '@/components/layout/mode-switcher-horizontal';
import { getFooterLinks } from '@/config/footer-config';
import { LocaleLink } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { ThemeSelector } from './theme-selector';

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const footerLinks = getFooterLinks();

  return (
    <footer className={cn('border-t', className)}>
      <Container className="px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8 py-16">
          {/* Left side - Logo and tagline */}
          <div className="flex flex-col items-start">
            <div className="space-y-4">
              {/* logo and name */}
              <div className="items-center space-x-2 flex">
                <Logo />
                <span className="text-xl font-semibold">
                  {t('Metadata.name')}
                </span>
              </div>

              {/* tagline */}
              <p className="text-muted-foreground text-base py-2 md:pr-12">
                {t('Marketing.footer.tagline')}
              </p>
            </div>
          </div>

          {/* Right side - Footer links */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            {footerLinks?.map((section) => (
              <div key={section.title} className="flex flex-col items-start">
                <span className="text-sm font-semibold uppercase">
                  {section.title}
                </span>
                <ul className="mt-4 list-inside space-y-3">
                  {section.items?.map(
                    (item) =>
                      item.href && (
                        <li key={item.title}>
                          <LocaleLink
                            href={item.href || '#'}
                            target={item.external ? '_blank' : undefined}
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            {item.title}
                          </LocaleLink>
                        </li>
                      )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t py-8">
        <Container className="px-4 flex items-center justify-between gap-x-4">
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {t('Metadata.name')} All Rights
            Reserved.
          </span>

          <div className="flex items-center gap-x-4">
            {/* <ThemeSelector /> */}
            <ModeSwitcherHorizontal />
          </div>
        </Container>
      </div>
    </footer>
  );
}
