import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import appDetectorContent from '@/data/app-detector-content.json';
import {
  ArrowRight,
  CheckCircle,
  Infinity,
  Info,
  RefreshCw,
  Search,
  User,
  Zap,
} from 'lucide-react';

const iconMap = {
  search: Search,
  zap: Zap,
  infinity: Infinity,
  info: Info,
  user: User,
  refresh: RefreshCw,
};

export function WhatIsItSection() {
  const { whatIsIt } = appDetectorContent;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {whatIsIt.title}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed">
            {whatIsIt.description}
          </p>

          <h3 className="text-2xl font-semibold mb-6 text-center">
            Key Benefits of Our Shopify App Detector
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatIsIt.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#008060] mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const { howItWorks } = appDetectorContent;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {howItWorks.title}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {howItWorks.description}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.steps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 bg-[#008060] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
                {index < howItWorks.steps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto mt-6 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function UseCasesSection() {
  const { useCases } = appDetectorContent;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {useCases.title}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {useCases.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.cases.map((useCase, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                  <CardDescription className="text-base">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4 text-[#008060] flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const { features } = appDetectorContent;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {features.title}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {features.description}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.list.map((feature, index) => {
              const IconComponent =
                iconMap[feature.icon as keyof typeof iconMap] || Info;

              return (
                <Card key={index} className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-[#008060]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-[#008060]" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const { faqs } = appDetectorContent;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {faqs.title}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {faqs.description}
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faqs.questions.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
