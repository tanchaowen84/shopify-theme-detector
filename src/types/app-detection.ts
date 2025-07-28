export interface ShopifyApp {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  iconUrl?: string; // App icon URL
  detectionPatterns: {
    appBlocks: string[]; // App block comments
    scriptDomains: string[]; // Script domains
    cssClasses: string[]; // CSS classes
    htmlElements: string[]; // HTML elements
  };
}

export interface DetectedApp {
  app: ShopifyApp;
  confidence: 'high' | 'medium' | 'low';
  detectedSignals: string[];
  weight: number;
}

export interface AppDetectionResult {
  success: boolean;
  storeUrl?: string;
  detectedApps: DetectedApp[];
  totalApps: number;
  categories: {
    [category: string]: DetectedApp[];
  };
  error?: string;
}
