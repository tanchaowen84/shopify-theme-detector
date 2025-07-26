'use client';

import { HeaderSection } from '@/components/layout/header-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FaqSection() {
  const faqItems: FAQItem[] = [
    {
      id: 'item-1',
      question: 'How does the Shopify theme detector work?',
      answer: 'Our detector analyzes the HTML structure, JavaScript, and CSS of any Shopify store to identify theme-specific patterns and metadata. It cross-references this information with our comprehensive database of official Shopify themes to provide accurate identification.',
    },
    {
      id: 'item-2',
      question: 'Is this tool completely free to use?',
      answer: 'Yes! Our Shopify theme detector is 100% free with no hidden costs, registration requirements, or usage limits. You can detect unlimited themes without any restrictions.',
    },
    {
      id: 'item-3',
      question: 'How accurate is the theme detection?',
      answer: 'Our detection algorithm has a 99.9% accuracy rate for official Shopify themes. For custom themes, we can still identify if a store is using Shopify and provide relevant information about the store structure.',
    },
    {
      id: 'item-4',
      question: 'What types of Shopify stores can I analyze?',
      answer: 'You can analyze any Shopify store, including those with custom domains (like store.com) and myshopify.com subdomains. Our tool works with stores from all countries and markets.',
    },
    {
      id: 'item-5',
      question: 'What information do I get about the detected theme?',
      answer: 'You\'ll receive the theme name, whether it\'s an official or custom theme, theme store ID (if applicable), direct links to the Shopify theme store, and pricing information for official themes.',
    },
    {
      id: 'item-6',
      question: 'Can you detect custom or modified themes?',
      answer: 'While we excel at identifying official Shopify themes, we can also detect when a store uses a custom theme or heavily modified official theme. In these cases, we\'ll indicate it as a "Custom Theme" and provide what information is available.',
    },
    {
      id: 'item-7',
      question: 'Why does detection sometimes fail?',
      answer: 'Detection may fail if the website is not a Shopify store, if the store has heavy customizations that obscure theme identifiers, or if the store is password-protected or has restricted access.',
    },
    {
      id: 'item-8',
      question: 'Do you store or track the URLs I analyze?',
      answer: 'No, we don\'t store or track any URLs you analyze. Each detection is processed in real-time and no data is saved on our servers, ensuring your privacy and the privacy of the stores you analyze.',
    },
    {
      id: 'item-9',
      question: 'Can I use this for competitive research?',
      answer: 'Absolutely! Many e-commerce professionals use our tool for competitive analysis, market research, and to discover successful theme choices in their industry. It\'s a valuable tool for understanding market trends.',
    },
  ];

  return (
    <section id="faqs" className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <HeaderSection
          title="Frequently Asked Questions"
          titleAs="h2"
          subtitle="Everything you need to know about our Shopify theme detector"
          subtitleAs="p"
        />

        <div className="mx-auto max-w-4xl mt-12">
          <Accordion
            type="single"
            collapsible
            className="ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-muted-foreground">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
