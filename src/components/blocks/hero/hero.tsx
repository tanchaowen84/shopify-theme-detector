'use client';

import { Ripple } from '@/components/magicui/ripple';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { ThemeDetectionResult } from '@/app/api/detect/route';

export default function HeroSection() {

  // State for the input and detection result
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [result, setResult] = useState<ThemeDetectionResult | null>(null);

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
      isFocused && 'border-[#008060] shadow-lg shadow-[#008060]/20 scale-[1.02]',
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
        toast.error(error instanceof Error ? error.message : 'Failed to detect theme');
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
                  Shopify Theme Detector
                </h1>

                {/* description */}
                <p className="mx-auto mt-8 max-w-4xl text-balance text-lg text-muted-foreground">
                  Instantly identify any Shopify store's theme. Enter a URL and discover the theme name, type, and get direct links to official themes in the Shopify store.
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
                </div>
              </div>
            </div>

            {/* Detection Result */}
            {result && (
              <div className="mt-8 sm:mt-12">
                <div className="mx-auto max-w-4xl">
                  <div className="bg-background relative overflow-hidden rounded-2xl border p-6 shadow-lg">
                    {result.success && result.theme ? (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-[#008060]" />
                          <h3 className="text-xl font-semibold text-foreground">
                            Shopify Theme Detected
                          </h3>
                        </div>

                        {/* A. Basic Theme Information */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-foreground">Basic Theme Information</h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-muted-foreground">
                                Theme Name
                              </p>
                              <p className="text-lg font-semibold text-foreground">
                                {result.theme.name || 'Unknown Theme'}
                              </p>
                            </div>

                            {result.theme.schema_name && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Schema Name (Base Template)
                                </p>
                                <p className="text-lg font-semibold text-foreground">
                                  {result.theme.schema_name}
                                </p>
                              </div>
                            )}

                            {result.theme.theme_store_id && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Theme Store ID
                                </p>
                                <p className="text-lg font-semibold text-foreground">
                                  {result.theme.theme_store_id}
                                </p>
                              </div>
                            )}

                            {result.theme.id && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Theme Instance ID
                                </p>
                                <p className="text-lg font-semibold text-foreground">
                                  {result.theme.id}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* B. Theme Type Explanation */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-foreground">Theme Type</h4>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                              result.theme.type === 'official'
                                ? "bg-[#008060]/10 text-[#008060]"
                                : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                            )}>
                              {result.theme.type === 'official' ? 'Official Theme' : 'Custom Theme'}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.theme.type === 'official'
                              ? 'This theme is available in the Shopify Theme Store and can be purchased or downloaded.'
                              : result.theme.theme_store_id === null
                                ? 'This theme is not published in the Shopify Theme Store and may be privately customized.'
                                : 'This appears to be a customized version of an official theme.'
                            }
                          </p>
                        </div>

                        {/* C. Recommendation */}
                        {result.recommendation && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-medium text-foreground">Recommendation</h4>
                            <div className="rounded-lg bg-muted/50 p-4">
                              <p className="text-sm text-muted-foreground">
                                {result.recommendation}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* D. Further Actions */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-foreground">Actions</h4>
                          <div className="flex flex-wrap gap-3">
                            {result.themeStoreUrl && (
                              <Button
                                variant="default"
                                size="sm"
                                className="gap-2 bg-[#008060] hover:bg-[#008060]/90"
                                onClick={() => window.open(result.themeStoreUrl, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                                View in Shopify Theme Store
                              </Button>
                            )}

                            {result.theme?.schema_name && result.theme.type === 'custom' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => window.open(`https://themes.shopify.com/search?q=${encodeURIComponent(result.theme?.schema_name || '')}`, '_blank')}
                              >
                                <Search className="h-4 w-4" />
                                Search "{result.theme.schema_name}" in Theme Store
                              </Button>
                            )}
                          </div>
                        </div>

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
                          {result.error || 'This website does not appear to be a Shopify store.'}
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
