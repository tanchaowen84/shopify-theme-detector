'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { AppDetectionResult, DetectedApp } from '@/types/app-detection';
import { AlertCircle, ExternalLink, Info, RefreshCw } from 'lucide-react';

interface AppDetectionResultProps {
  result: AppDetectionResult;
  onTryAgain: () => void;
  className?: string;
}

export function AppDetectionResultSimple({
  result,
  onTryAgain,
  className,
}: AppDetectionResultProps) {
  if (!result.success) {
    return (
      <Card className={cn('w-full max-w-4xl mx-auto', className)}>
        <CardContent className="pt-6">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">Detection Failed</h3>
            <p className="text-muted-foreground mb-4">{result.error}</p>
            <Button onClick={onTryAgain} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto space-y-6', className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">App</h2>
        <p className="text-muted-foreground">
          Found{' '}
          <span className="font-semibold text-[#008060]">
            {result.totalApps}
          </span>{' '}
          apps on <span className="font-mono text-sm">{result.storeUrl}</span>
        </p>
      </div>

      {/* Apps Grid */}
      {result.totalApps > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.detectedApps.map((detectedApp: DetectedApp) => (
            <Card
              key={detectedApp.app.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* App Icon/Logo */}
                  <div className="w-16 h-16 rounded-lg bg-[#008060]/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {detectedApp.app.iconUrl ? (
                      <img
                        src={detectedApp.app.iconUrl}
                        alt={`${detectedApp.app.name} icon`}
                        className="w-12 h-12 object-contain rounded-md"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-2xl">${
                              detectedApp.app.category === 'Email Marketing'
                                ? '📧'
                                : detectedApp.app.category ===
                                    'Reviews & Ratings'
                                  ? '⭐'
                                  : detectedApp.app.category === 'Analytics'
                                    ? '📊'
                                    : detectedApp.app.category ===
                                        'Customer Support'
                                      ? '💬'
                                      : detectedApp.app.category ===
                                          'Conversion Optimization'
                                        ? '🎯'
                                        : detectedApp.app.category ===
                                            'Localization'
                                          ? '🌐'
                                          : detectedApp.app.category === 'Other'
                                            ? '📱'
                                            : '🔧'
                            }</span>`;
                          }
                        }}
                      />
                    ) : (
                      <span className="text-2xl">
                        {detectedApp.app.category === 'Email Marketing'
                          ? '📧'
                          : detectedApp.app.category === 'Reviews & Ratings'
                            ? '⭐'
                            : detectedApp.app.category === 'Analytics'
                              ? '📊'
                              : detectedApp.app.category === 'Customer Support'
                                ? '💬'
                                : detectedApp.app.category ===
                                    'Conversion Optimization'
                                  ? '🎯'
                                  : detectedApp.app.category === 'Localization'
                                    ? '🌐'
                                    : detectedApp.app.category === 'Other'
                                      ? '📱'
                                      : '🔧'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">
                      {detectedApp.app.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {detectedApp.app.description}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-[#008060] border-[#008060] hover:bg-[#008060] hover:text-white"
                    >
                      <a
                        href={detectedApp.app.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Get App
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Info className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Apps Detected</h3>
              <p className="text-muted-foreground">
                No app blocks were found on this store.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Try Again Button */}
      <div className="text-center mt-8">
        <Button onClick={onTryAgain} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Detect Another Store
        </Button>
      </div>
    </div>
  );
}

export default AppDetectionResultSimple;
