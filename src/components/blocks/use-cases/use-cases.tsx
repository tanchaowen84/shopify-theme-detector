import { HeaderSection } from '@/components/layout/header-section';
import { Card } from '@/components/ui/card';
import { Store, Users, Code, TrendingUp, Search, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type * as React from 'react';

export default function UseCasesSection() {
  const t = useTranslations('HomePage.useCases');

  const useCases = [
    {
      icon: Store,
      title: t('items.item-1.title'),
      description: t('items.item-1.description'),
    },
    {
      icon: Users,
      title: t('items.item-2.title'),
      description: t('items.item-2.description'),
    },
    {
      icon: Code,
      title: t('items.item-3.title'),
      description: t('items.item-3.description'),
    },
    {
      icon: TrendingUp,
      title: t('items.item-4.title'),
      description: t('items.item-4.description'),
    },
    {
      icon: Search,
      title: t('items.item-5.title'),
      description: t('items.item-5.description'),
    },
    {
      icon: Zap,
      title: t('items.item-6.title'),
      description: t('items.item-6.description'),
    },
  ];

  return (
    <section id="use-cases" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          subtitleAs="h2"
          descriptionAs="p"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              icon={useCase.icon}
              title={useCase.title}
              description={useCase.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const UseCaseCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
}) => {
  return (
    <Card className="group p-8 hover:bg-accent/50 dark:hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-l-4 border-l-[#008060]/20 hover:border-l-[#008060]">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#008060]/10 flex items-center justify-center group-hover:bg-[#008060]/20 transition-colors">
            <Icon className="w-5 h-5" style={{ color: '#008060' }} />
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-[#008060] transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};
