'use client';

import type { ThemeDetectionResult } from '@/app/api/detect/route';
import { Ripple } from '@/components/magicui/ripple';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AlertCircle, ChevronRight, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');

  // State for the input and detection result
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [result, setResult] = useState<ThemeDetectionResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto scroll to result when detection completes
  useEffect(() => {
    if (result && resultRef.current) {
      // Small delay to ensure the result is rendered
      setTimeout(() => {
        const element = resultRef.current;
        if (element) {
          // Calculate position with some offset for better visibility
          const elementTop =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offset = 80; // Add some space from top

          window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth',
          });
        }
      }, 150);
    }
  }, [result]);

  // 使用useCallback稳定函数引用
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // 使用useMemo缓存className计算结果
  const inputClassName = useMemo(() => {
    return cn(
      // 基础样式
      'w-full h-16 text-lg px-6 pr-16 rounded-2xl border-2',
      'transition-all duration-300 ease-in-out',
      // Shopify 配色聚焦状态
      isFocused &&
        'border-[#008060] shadow-lg shadow-[#008060]/20 scale-[1.02]',
      !isFocused && 'border-border hover:border-[#008060]/50',
      // 加载状态
      isLoading && 'opacity-50 cursor-not-allowed'
    );
  }, [isFocused, isLoading]);

  const buttonClassName = useMemo(() => {
    return cn(
      // 基础样式
      'absolute right-2 top-1/2 -translate-y-1/2',
      'h-12 w-12 rounded-full',
      'transition-all duration-300 ease-in-out',
      // Shopify 配色方案
      input.trim() && !isLoading
        ? 'bg-[#008060] hover:bg-[#004C3F] text-white scale-100'
        : 'bg-muted-foreground/20 scale-90'
    );
  }, [input, isLoading]);

  const iconClassName = useMemo(() => {
    return cn(
      'h-5 w-5 transition-transform duration-300',
      isLoading ? 'animate-spin' : 'group-hover:scale-110'
    );
  }, [isLoading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!input.trim()) {
        toast.error('Please enter a Shopify store URL');
        return;
      }

      setIsLoading(true);
      setResult(null);

      try {
        const response = await fetch('/api/detect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: input.trim() }),
        });

        const data: ThemeDetectionResult = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to detect theme');
        }

        setResult(data);

        if (data.success) {
          toast.success('Theme detected successfully!');
        } else {
          toast.error(data.error || 'Detection failed');
        }
      } catch (error) {
        console.error('Error detecting theme:', error);
        toast.error(
          error instanceof Error ? error.message : 'Failed to detect theme'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [input]
  );

  return (
    <>
      <main id="hero" className="overflow-hidden">
        {/* background, light shadows on top of the hero section */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section>
          <div className="relative pt-12">
            <div className="mx-auto max-w-7xl px-6">
              <Ripple />

              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                {/* title */}
                <h1 className="mt-8 text-balance text-5xl font-bricolage-grotesque lg:mt-16 xl:text-[5rem] text-[#008060]">
                  {t('title')}
                </h1>

                {/* description */}
                <p className="mx-auto mt-8 max-w-4xl text-balance text-lg text-muted-foreground">
                  {t('description')}
                </p>

                {/* input form */}
                <div className="mt-12 flex flex-col items-center justify-center gap-6">
                  <form onSubmit={handleSubmit} className="w-full max-w-4xl">
                    <div className="relative group">
                      <Input
                        value={input}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Enter Shopify store URL (e.g., example.myshopify.com)"
                        className={inputClassName}
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        className={buttonClassName}
                      >
                        <Search className={iconClassName} />
                      </Button>
                    </div>
                  </form>

                  {/* Example URLs */}
                  <div className="text-center space-y-3 max-w-4xl">
                    <p className="text-sm text-muted-foreground">Examples:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        'store.sho.com',
                        'shop.stereogum.com',
                        'shop.in-n-out.com',
                        'shop.singletracks.com',
                        'shop.spacex.com',
                      ].map((example) => (
                        <button
                          key={example}
                          onClick={() => setInput(`https://${example}`)}
                          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors border"
                          disabled={isLoading}
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground display-none hidden">
                      12123123123
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detection Result */}
            {result && (
              <div ref={resultRef} className="mt-8 sm:mt-12">
                <div className="mx-auto max-w-4xl">
                  <div className="bg-background relative overflow-hidden rounded-2xl border p-6 shadow-lg">
                    {result.success && result.theme ? (
                      <div className="space-y-6">
                        {/* Main Result - Simplified like competitor */}
                        <div className="text-center space-y-6">
                          {/* Store URL display */}
                          <div className="text-lg text-muted-foreground">
                            {new URL(result.storeUrl || '').hostname} is built
                            using
                          </div>

                          {/* Schema Name - Most prominent display */}
                          <div className="space-y-4">
                            {result.theme.schema_name ? (
                              <h2 className="text-4xl md:text-5xl font-bold text-foreground underline decoration-[#008060] decoration-2 underline-offset-8">
                                {result.theme.schema_name}
                              </h2>
                            ) : (
                              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                                {result.theme.name || 'Custom Theme'}
                              </h2>
                            )}

                            {/* Theme type badge */}
                            <div className="flex justify-center">
                              <span
                                className={cn(
                                  'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium',
                                  result.theme.type === 'official'
                                    ? 'bg-[#008060]/10 text-[#008060]'
                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                                )}
                              >
                                {result.theme.type === 'official'
                                  ? 'Official Theme'
                                  : 'Custom Theme'}
                              </span>
                            </div>
                          </div>

                          {/* Primary Action Button */}
                          <div className="space-y-3">
                            {result.themeStoreUrl ? (
                              <Button
                                size="lg"
                                className="w-full sm:w-auto bg-[#008060] hover:bg-[#008060]/90 text-white px-8 py-3 text-lg font-semibold"
                                onClick={() =>
                                  window.open(result.themeStoreUrl, '_blank')
                                }
                              >
                                Get This Theme
                              </Button>
                            ) : result.theme.schema_name ? (
                              <Button
                                size="lg"
                                className="w-full sm:w-auto bg-[#008060] hover:bg-[#008060]/90 text-white px-8 py-3 text-lg font-semibold"
                                onClick={() =>
                                  window.open(
                                    `https://themes.shopify.com/search?q=${encodeURIComponent(result.theme?.schema_name || '')}`,
                                    '_blank'
                                  )
                                }
                              >
                                Find Similar Themes
                              </Button>
                            ) : (
                              <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold"
                                onClick={() =>
                                  window.open(
                                    'https://themes.shopify.com/',
                                    '_blank'
                                  )
                                }
                              >
                                Browse Shopify Themes
                              </Button>
                            )}

                            {/* Secondary note */}
                            {result.theme.type === 'official' && (
                              <p className="text-sm text-muted-foreground">
                                * Click the button to view this theme in Shopify
                                Theme Store
                              </p>
                            )}
                          </div>
                        </div>

                        {/* More Information - Collapsible */}
                        <details className="group border rounded-lg">
                          <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                            <span className="font-medium text-foreground">
                              More Information
                            </span>
                            <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                          </summary>

                          <div className="p-4 pt-0 space-y-4 border-t">
                            {/* Detailed Information */}
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Theme Name
                                </p>
                                <p className="text-sm text-foreground">
                                  {result.theme.name || 'Unknown Theme'}
                                </p>
                              </div>

                              {result.theme.schema_name && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Schema Name
                                  </p>
                                  <p className="text-sm text-foreground">
                                    {result.theme.schema_name}
                                  </p>
                                </div>
                              )}

                              {result.theme.theme_store_id && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Theme Store ID
                                  </p>
                                  <p className="text-sm text-foreground">
                                    {result.theme.theme_store_id}
                                  </p>
                                </div>
                              )}

                              {result.theme.id && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Theme Instance ID
                                  </p>
                                  <p className="text-sm text-foreground">
                                    {result.theme.id}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Recommendation */}
                            {result.recommendation && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Analysis
                                </p>
                                <div className="rounded-lg bg-muted/50 p-3">
                                  <p className="text-sm text-muted-foreground">
                                    {result.recommendation}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </details>

                        <div className="pt-4 border-t">
                          <Button
                            onClick={() => {
                              setResult(null);
                              setInput('');
                            }}
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            Try Another URL
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="h-6 w-6 text-destructive" />
                          <h3 className="text-xl font-semibold text-foreground">
                            Not a Shopify Store
                          </h3>
                        </div>

                        <p className="text-muted-foreground">
                          {result.error ||
                            'This website does not appear to be a Shopify store.'}
                        </p>

                        <Button
                          onClick={() => {
                            setResult(null);
                            setInput('');
                          }}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          Try Another URL
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
