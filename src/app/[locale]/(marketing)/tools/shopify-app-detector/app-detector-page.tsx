'use client';

import { AppDetectionResultSimple } from '@/components/app-detector/app-detection-result-simple';
import { AppDetectorForm } from '@/components/app-detector/app-detector-form';
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#008060] to-[#004C3F] bg-clip-text text-transparent">
            Shopify App Detector
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter a Shopify store URL to detect installed apps
          </p>
        </div>

        {/* Main Content */}
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
  );
}
