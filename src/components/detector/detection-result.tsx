'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExternalLink, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import type { ThemeDetectionResult } from '@/app/api/detect/route';

interface DetectionResultProps {
  result: ThemeDetectionResult;
  onTryAgain: () => void;
  className?: string;
}

export function DetectionResult({ result, onTryAgain, className }: DetectionResultProps) {
  return (
    <div className={cn("mx-auto max-w-4xl", className)}>
      <div className="bg-background relative overflow-hidden rounded-2xl border p-6 shadow-lg">
        {result.isShopify ? (
          <div className="space-y-4">
            {/* Success Header */}
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-[#008060]" />
              <h3 className="text-xl font-semibold text-foreground">
                Shopify Store Detected
              </h3>
            </div>
            
            {/* Theme Information Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Theme Name
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {result.themeName}
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Theme Type
                </p>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    result.isOfficialTheme 
                      ? "bg-[#008060]/10 text-[#008060]" 
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                  )}>
                    {result.isOfficialTheme ? 'Official Theme' : 'Custom Theme'}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {result.themeStoreId && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Theme Store ID
                </p>
                <p className="text-sm text-foreground font-mono">
                  {result.themeStoreId}
                </p>
              </div>
            )}

            {/* Store URL */}
            {result.storeUrl && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Store URL
                </p>
                <a
                  href={result.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#008060] hover:text-[#004C3F] transition-colors break-all"
                >
                  {result.storeUrl}
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                </a>
              </div>
            )}

            {/* Theme Store Link */}
            {result.themeStoreUrl && (
              <div className="pt-4 border-t">
                <a
                  href={result.themeStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#008060] hover:text-[#004C3F] transition-colors font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  View in Shopify Theme Store
                </a>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onTryAgain}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Another URL
              </Button>
              
              {result.storeUrl && (
                <Button
                  asChild
                  variant="default"
                  className="bg-[#008060] hover:bg-[#004C3F] text-white"
                >
                  <a
                    href={result.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Store
                  </a>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Error Header */}
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <h3 className="text-xl font-semibold text-foreground">
                Not a Shopify Store
              </h3>
            </div>
            
            {/* Error Message */}
            <div className="space-y-2">
              <p className="text-muted-foreground">
                {result.error || 'This website does not appear to be a Shopify store.'}
              </p>
              
              <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                <p className="font-medium mb-1">Tips for better detection:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Make sure the URL is correct and accessible</li>
                  <li>Try adding 'https://' if not included</li>
                  <li>Check if the website is actually a Shopify store</li>
                  <li>Some stores may have detection protection enabled</li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t">
              <Button
                onClick={onTryAgain}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Another URL
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetectionResult;
