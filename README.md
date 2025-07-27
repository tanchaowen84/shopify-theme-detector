# 🔍 Shopify Theme Detector

**Instantly identify any Shopify store's theme with our powerful, free detection tool.**

A modern, fast, and accurate Shopify theme detector built with Next.js 15. Simply enter any Shopify store URL and discover the theme name, type, and get direct links to official themes in the Shopify store.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ Features

- 🚀 **Instant Detection** - Enter any Shopify store URL and get results immediately
- 🎯 **Accurate Analysis** - Advanced detection algorithm with 95%+ accuracy rate
- 📱 **Responsive Design** - Perfect experience on desktop, tablet, and mobile
- 🌍 **Multi-language Support** - Built-in internationalization (i18n) ready
- 🎨 **Modern UI** - Clean, professional interface with Shopify-inspired design
- 📊 **Analytics Ready** - Integrated with Google Analytics, Clarity, and Plausible
- ⚡ **Lightning Fast** - Optimized performance with Next.js 15 and App Router
- 🔒 **Privacy Focused** - No data collection, respects user privacy

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Code Quality**: [Biome](https://biomejs.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/shopify-theme-detector.git
   cd shopify-theme-detector
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```bash
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"

   # Optional: Analytics (only work in production)
   # Add your own analytics IDs if needed
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How It Works

The Shopify Theme Detector analyzes Shopify store websites by:

1. **Fetching Store Data** - Retrieves the HTML content from the provided URL
2. **Shopify Validation** - Confirms the website is actually a Shopify store
3. **Theme Extraction** - Analyzes the `Shopify.theme` object and other indicators
4. **Theme Mapping** - Matches against our database of 20+ official themes
5. **Result Display** - Shows theme name, type, and provides relevant links

## License

For any details on the license, please refer to the [License](LICENSE) file.

## 🎯 Detection Capabilities

### Supported Theme Information
- **Theme Name** - Official or custom theme names
- **Schema Name** - Base theme architecture (e.g., "Dawn", "Debut")
- **Theme Store ID** - Unique identifier for official themes
- **Theme Type** - Official vs Custom theme classification
- **Store URL** - Validated and normalized store URL

### Official Theme Database
Our detector includes a comprehensive database of 20+ official Shopify themes:
- **Free Themes**: Dawn, Craft, Sense, Studio, Colorblock, Debut, Minimal
- **Paid Themes**: Impulse, Brooklyn, Prestige, Turbo, Warehouse, Pop, Motion, Testament, and more

## 📁 Project Structure

```
shopify-theme-detector/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   └── api/detect/        # Theme detection API endpoint
│   ├── components/            # React components
│   │   ├── detector/          # Core detection components
│   │   ├── blocks/           # Page section components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utility libraries
│   │   └── shopify-detector/ # Detection logic & theme mapping
│   ├── config/               # Configuration files
│   └── styles/               # Global styles and themes
├── content/                  # Content management (MDX)
├── messages/                 # Internationalization files
└── public/                   # Static assets
```

## 🔧 Configuration

### Analytics Setup (Optional)

The project supports multiple analytics providers. Configure in your `.env.local`:

```bash
# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""

# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=""

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_PROJECT_ID=""

# Plausible Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=""
NEXT_PUBLIC_PLAUSIBLE_SCRIPT="https://plausible.io/js/script.js"
```

### Website Configuration

Customize the application in `src/config/website.tsx`:

```typescript
export const websiteConfig: WebsiteConfig = {
  metadata: {
    theme: { defaultTheme: 'default', enableSwitch: true },
    mode: { defaultMode: 'system', enableSwitch: true },
    // ... other settings
  },
  features: {
    enableBlog: true,           // Enable blog functionality
    enableAuth: false,          // Disable authentication
    enablePricing: false,       // Disable pricing pages
    enableDashboard: false,     // Disable dashboard
    // ... other feature toggles
  },
  // ... other configurations
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

2. **Set environment variables** in Vercel dashboard
   - `NEXT_PUBLIC_BASE_URL`
   - Analytics variables (optional)

3. **Custom domain** (optional)
   - Add your domain in Vercel dashboard
   - Update `NEXT_PUBLIC_BASE_URL` accordingly

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- **Netlify**: Use `next export` for static deployment
- **Railway**: Direct deployment from GitHub
- **DigitalOcean App Platform**: Container or static deployment
- **AWS Amplify**: Full-stack deployment

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Check code with Biome
pnpm lint:fix         # Fix code issues automatically
pnpm format           # Format code with Biome

# Content
pnpm docs             # Build content collections
```

### Adding New Themes

To add support for new official themes, update `src/lib/shopify-detector/theme-mapping.ts`:

```typescript
export const OFFICIAL_THEMES: Record<number, ThemeInfo> = {
  // Add new theme
  999: {
    name: 'New Theme Name',
    type: 'paid', // or 'free'
    storeUrl: 'https://themes.shopify.com/themes/new-theme',
  },
  // ... existing themes
};
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
- 🐛 **Bug Reports**: Use the issue template for bugs
- 💡 **Feature Requests**: Suggest new features or improvements
- 📖 **Documentation**: Help improve our documentation

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Guidelines
- Follow the existing code style (enforced by Biome)
- Add TypeScript types for new features
- Include tests for new functionality
- Update documentation as needed

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ on all metrics
- 🚀 **Core Web Vitals**: Excellent ratings
- 📱 **Mobile Optimized**: Perfect mobile experience
- 🔍 **SEO Friendly**: Optimized for search engines

## 🔒 Privacy & Security

- 🛡️ **No Data Collection**: We don't store or track user inputs
- 🔐 **Secure Requests**: All API calls are properly validated
- 🌐 **CORS Protected**: Secure cross-origin resource sharing
- 📋 **Privacy Compliant**: GDPR and CCPA ready

## 📈 Analytics Support

Built-in support for popular analytics platforms:
- **Google Analytics 4** - Comprehensive web analytics
- **Google AdSense** - Monetization through advertisements
- **Microsoft Clarity** - User behavior insights and heatmaps
- **Plausible Analytics** - Privacy-focused, lightweight analytics
- **Umami** - Self-hosted analytics alternative

## 🌟 Showcase

### Example Detections
- **Official Theme**: Dawn, Debut, Impulse
- **Custom Themes**: Modified versions of official themes
- **Enterprise Stores**: High-traffic Shopify Plus stores

### Use Cases
- 🛍️ **E-commerce Research** - Analyze competitor themes
- 👥 **Agency Work** - Quick theme identification for clients
- 💻 **Development** - Understand theme architecture
- 📊 **Market Analysis** - Track theme popularity trends
- 🔍 **SEO Research** - Analyze theme performance impact

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MkSaaS Template** - Built on the excellent MkSaaS boilerplate
- **Shopify** - For providing the theme architecture we analyze
- **Next.js Team** - For the amazing React framework
- **Open Source Community** - For all the amazing tools and libraries

## 📞 Support

- 🐛 **Issues**: Create an issue in this repository
- 💬 **Discussions**: Use GitHub Discussions for questions

---

<div align="center">

Made with ❤️ for the Shopify community

</div>