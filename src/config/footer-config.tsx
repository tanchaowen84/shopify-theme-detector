'use client';

import { websiteConfig } from '@/config/website';
import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { useTranslations } from 'next-intl';

/**
 * Get footer config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://mksaas.com/docs/config/footer
 *
 * @returns The footer config with translated titles
 */
export function getFooterLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.footer');

  return [
    {
      title: t('product.title'),
      items: [
        {
          title: t('product.items.features'),
          href: Routes.Features,
          external: false,
        },
        // Pricing disabled for Shopify Theme Detector
        // {
        //   title: t('product.items.pricing'),
        //   href: Routes.Pricing,
        //   external: false,
        // },
        {
          title: t('product.items.faq'),
          href: Routes.FAQ,
          external: false,
        },
      ],
    },
    {
      title: t('resources.title'),
      items: [
        // Blog enabled for SEO purposes
        {
          title: t('resources.items.blog'),
          href: Routes.Blog,
          external: false,
        },
        ...(websiteConfig.features.enableDocsPage
          ? [
              {
                title: t('resources.items.docs'),
                href: Routes.Root,
                external: false,
              },
            ]
          : []),
        // Changelog disabled for Shopify Theme Detector
        // {
        //   title: t('resources.items.changelog'),
        //   href: Routes.Changelog,
        //   external: false,
        // },
      ],
    },

    {
      title: t('legal.title'),
      items: [
        {
          title: t('legal.items.cookiePolicy'),
          href: Routes.CookiePolicy,
          external: false,
        },
        {
          title: t('legal.items.privacyPolicy'),
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: t('legal.items.termsOfService'),
          href: Routes.TermsOfService,
          external: false,
        },
      ],
    },
  ];
}
