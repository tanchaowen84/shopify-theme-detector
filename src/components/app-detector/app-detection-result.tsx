'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { AppDetectionResult, DetectedApp } from '@/types/app-detection';
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Info,
  RefreshCw,
} from 'lucide-react';

interface AppDetectionResultProps {
  result: AppDetectionResult;
  onTryAgain: () => void;
  className?: string;
}

export function AppDetectionResultComponent({
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

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    const variants = {
      high: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      medium:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      low: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };

    return (
      <Badge
        className={
          variants[confidence as keyof typeof variants] || variants.low
        }
      >
        {confidence} confidence
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Email Marketing': '📧',
      'Reviews & Ratings': '⭐',
      Analytics: '📊',
      'Customer Support': '💬',
      'Conversion Optimization': '🎯',
    };
    return icons[category] || '🔧';
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto space-y-6', className)}>
      {/* Summary Card */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6 text-[#008060]" />
            Apps Detected Successfully
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Found{' '}
            <span className="font-semibold text-[#008060]">
              {result.totalApps}
            </span>{' '}
            apps on <span className="font-mono">{result.storeUrl}</span>
          </div>
        </CardHeader>
      </Card>

      {/* Apps by Category */}
      {Object.entries(result.categories).map(([category, apps]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{getCategoryIcon(category)}</span>
              {category}
              <Badge variant="secondary">{apps.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apps.map((detectedApp: DetectedApp) => (
                <div
                  key={detectedApp.app.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getConfidenceIcon(detectedApp.confidence)}
                      <h4 className="font-semibold">{detectedApp.app.name}</h4>
                      {getConfidenceBadge(detectedApp.confidence)}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {detectedApp.app.description}
                    </p>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Detection Signals:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {detectedApp.detectedSignals
                          .slice(0, 3)
                          .map((signal, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {signal}
                            </Badge>
                          ))}
                        {detectedApp.detectedSignals.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{detectedApp.detectedSignals.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={detectedApp.app.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Visit
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* No Apps Found */}
      {result.totalApps === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Info className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Apps Detected</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't detect any common Shopify apps on this store. This
                could mean:
              </p>
              <ul className="text-sm text-muted-foreground text-left max-w-md mx-auto space-y-1">
                <li>• The store uses custom or less common apps</li>
                <li>• Apps are loaded dynamically after page load</li>
                <li>• The store has minimal third-party integrations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Try Again Button */}
      <div className="text-center">
        <Button onClick={onTryAgain} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Detect Another Store
        </Button>
      </div>
    </div>
  );
}

export default AppDetectionResultComponent;
export { AppDetectionResultComponent as AppDetectionResult };
