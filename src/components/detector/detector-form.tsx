'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, Loader2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { ThemeDetectionResult } from '@/app/api/detect/route';

interface DetectorFormProps {
  onResult: (result: ThemeDetectionResult) => void;
  className?: string;
}

export function DetectorForm({ onResult, className }: DetectorFormProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Handle input change
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

  // Memoized class names for performance
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

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!input.trim()) {
        toast.error('Please enter a Shopify store URL');
        return;
      }

      setIsLoading(true);

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

        onResult(data);

        if (data.success) {
          toast.success('Theme detected successfully!');
        } else {
          toast.error(data.error || 'Not a Shopify store');
        }
      } catch (error) {
        console.error('Error detecting theme:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to detect theme');
      } finally {
        setIsLoading(false);
      }
    },
    [input, onResult]
  );

  return (
    <div className={cn("w-full max-w-4xl", className)}>
      <form onSubmit={handleSubmit} className="w-full">
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
            {isLoading ? (
              <Loader2 className={iconClassName} />
            ) : (
              <Search className={iconClassName} />
            )}
          </Button>
        </div>
      </form>
      
      {/* Helper text */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Enter any Shopify store URL to instantly detect its theme
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
          <span>Examples:</span>
          <button
            type="button"
            onClick={() => setInput('shop.shopify.com')}
            className="text-[#008060] hover:text-[#004C3F] underline"
          >
            shop.shopify.com
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setInput('example.myshopify.com')}
            className="text-[#008060] hover:text-[#004C3F] underline"
          >
            example.myshopify.com
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetectorForm;
