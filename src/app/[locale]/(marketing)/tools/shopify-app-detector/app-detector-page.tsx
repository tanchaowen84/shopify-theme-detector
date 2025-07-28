'use client';

import { AppDetectionResultSimple } from '@/components/app-detector/app-detection-result-simple';
import { AppDetectorForm } from '@/components/app-detector/app-detector-form';
import {
  FAQSection,
  FeaturesSection,
  HowItWorksSection,
  UseCasesSection,
  WhatIsItSection,
} from '@/components/app-detector/seo-content';
import appDetectorContent from '@/data/app-detector-content.json';
import type { AppDetectionResult as AppDetectionResultType } from '@/types/app-detection';
import { useState } from 'react';

export function AppDetectorPage() {
  const [result, setResult] = useState<AppDetectionResultType | null>(null);

  const handleResult = (newResult: AppDetectionResultType) => {
    setResult(newResult);
  };

  const handleTryAgain = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#008060] to-[#004C3F] bg-clip-text text-transparent">
              {appDetectorContent.hero.title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
              {appDetectorContent.hero.subtitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {appDetectorContent.hero.description}
            </p>
          </div>

          {/* Main Tool */}
          <div className="max-w-4xl mx-auto">
            {!result ? (
              <div className="text-center">
                <AppDetectorForm onResult={handleResult} className="mx-auto" />
              </div>
            ) : (
              <AppDetectionResultSimple
                result={result}
                onTryAgain={handleTryAgain}
              />
            )}
          </div>
        </div>
      </div>

      {/* SEO Content Sections */}
      <WhatIsItSection />
      <HowItWorksSection />
      <UseCasesSection />
      <FeaturesSection />
      <FAQSection />
    </div>
  );
}
