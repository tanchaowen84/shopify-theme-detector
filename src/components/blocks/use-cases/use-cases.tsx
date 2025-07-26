import { HeaderSection } from '@/components/layout/header-section';
import { Card } from '@/components/ui/card';
import { Store, Users, Code, TrendingUp, Search, Zap } from 'lucide-react';
import type * as React from 'react';

export default function UseCasesSection() {
  const useCases = [
    {
      icon: Store,
      title: 'E-commerce Entrepreneurs',
      description: 'Discover successful competitors\' themes to replicate winning designs and boost your store\'s conversion rates.',
    },
    {
      icon: Users,
      title: 'Design & Marketing Teams',
      description: 'Quickly identify if a website uses Shopify and which theme powers it for competitive analysis and client research.',
    },
    {
      icon: Code,
      title: 'Theme & Plugin Developers',
      description: 'Track popular theme adoption trends across different industries to guide your development roadmap.',
    },
    {
      icon: TrendingUp,
      title: 'Market Researchers',
      description: 'Analyze e-commerce trends by identifying which themes are most popular in specific niches or markets.',
    },
    {
      icon: Search,
      title: 'SEO & Conversion Specialists',
      description: 'Research high-performing stores to understand which themes contribute to better user experience and conversions.',
    },
    {
      icon: Zap,
      title: 'Dropshipping & Affiliate Marketers',
      description: 'Find proven theme choices from successful stores to accelerate your own store setup and optimization.',
    },
  ];

  return (
    <section id="use-cases" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <HeaderSection
          title="Perfect for Every E-commerce Professional"
          subtitle="Who Benefits from Shopify Theme Detection"
          description="Whether you're building your first store or managing multiple e-commerce projects, our theme detector provides valuable insights for every stage of your journey."
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
