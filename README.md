# react-seo-optimize

[![Tests](https://github.com/liljemery/react-seo-optimize/workflows/Tests/badge.svg)](https://github.com/liljemery/react-seo-optimize/actions)
[![npm version](https://img.shields.io/npm/v/react-seo-optimize.svg)](https://www.npmjs.com/package/react-seo-optimize)
[![npm downloads](https://img.shields.io/npm/dm/react-seo-optimize.svg)](https://www.npmjs.com/package/react-seo-optimize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

Simple and intuitive SEO component for React with JSON-LD schema generation and HTML injection.

<img width="694" height="568" alt="Screenshot 2026-01-18 at 6 29 22 PM" src="https://github.com/user-attachments/assets/7e430f06-d0da-489c-af4e-7275fd0d9506" />

## Features

- 🚀 Simple React component for SEO meta tags
- 📊 JSON-LD schema generators (9 types: Organization, Article, Product, FAQ, HowTo, LocalBusiness, and more)
- 🔧 CLI tool to inject schemas into HTML files (with dry-run and backup support)
- 🎯 Open Graph and Twitter Card support (with secure URLs and article tags)
- 💡 Intuitive API with smart defaults
- ✅ SSR/SSG ready with native DOM manipulation (no dependencies)
- 🔒 Type-safe with full TypeScript support
- 🎨 Multiple schema composition support

## Installation

```bash
npm install react-seo-optimize
# or
pnpm add react-seo-optimize
# or
yarn add react-seo-optimize
```

**Peer Dependencies:**

```bash
npm install react
```

> **⚠️ Breaking Change in v2.0:** The library no longer requires `react-helmet` or `react-helmet-async`. It now uses native DOM manipulation for better performance and SSR compatibility. See [Migration Guide](./MIGRATION_GUIDE.md) for details.

## Quick Start

### 1. Install Dependencies

```bash
# Install the package
npm install react-seo-optimize

# Install peer dependencies
npm install react
```

### 2. Basic Usage in Your React Component

```jsx
import { SEOptimize } from 'react-seo-optimize';

const HomePage = () => {
  return (
    <>
      <SEOptimize
        title="Home | My Company"
        description="Welcome to My Company - We provide amazing services"
        canonical="https://example.com"
      />
      
      <h1>Welcome to My Company</h1>
      {/* Your page content */}
    </>
  );
};
```

That's it! The component will automatically add all necessary meta tags to your page's `<head>`.

## Tutorial

### Step 1: Basic Page SEO

Start by adding the `SEOptimize` component to your pages with essential SEO information:

```jsx
import { SEOptimize } from 'react-seo-optimize';

const AboutPage = () => {
  return (
    <>
      <SEOptimize
        title="About Us | My Company"
        description="Learn more about My Company and our mission to deliver excellence."
        keywords="about us, company, mission"
        canonical="https://example.com/about"
      />
      
      <main>
        <h1>About Us</h1>
        <p>Content goes here...</p>
      </main>
    </>
  );
};
```

### Step 2: Add Open Graph Tags for Social Media

![unnamed](https://github.com/user-attachments/assets/de7a3720-ed5f-489b-8437-48ee758aa095)

Enhance your social media sharing with Open Graph tags:

```jsx
<SEOptimize
  title="Product Page | My Company"
  description="Check out our amazing product"
  canonical="https://example.com/product"
  ogImage="https://example.com/images/product-og.jpg"
  ogImageWidth="1200"
  ogImageHeight="630"
  ogType="product"
/>
```

### Step 3: Add Twitter Card Tags

<img width="585" height="537" alt="card tag" src="https://github.com/user-attachments/assets/7481749a-9a95-4f25-8236-99fcca0a9734" />

Optimize how your links appear on Twitter:

```jsx
<SEOptimize
  title="Blog Post | My Company"
  description="Read our latest blog post"
  canonical="https://example.com/blog/post"
  twitterCard="summary_large_image"
  twitterImage="https://example.com/images/blog-twitter.jpg"
/>
```

### Step 4: Add JSON-LD Schema Markup

Add structured data to help search engines understand your content better.

#### Organization Schema (Homepage/Global)

```jsx
import { SEOptimize, generateOrganizationSchema } from 'react-seo-optimize';

const HomePage = () => {
  const orgSchema = generateOrganizationSchema({
    name: 'My Company',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
    description: 'Leading provider of amazing services',
    sameAs: [
      'https://facebook.com/mycompany',
      'https://twitter.com/mycompany',
      'https://linkedin.com/company/mycompany',
    ],
  });

  return (
    <>
      <SEOptimize
        title="Home | My Company"
        description="Welcome to My Company"
        canonical="https://example.com"
        schema={orgSchema}
      />
      {/* Content */}
    </>
  );
};
```

#### Breadcrumb Schema (Navigation)

```jsx
import { SEOptimize, generateBreadcrumbSchema } from 'react-seo-optimize';

const ProductPage = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://example.com' },
    { name: 'Products', url: 'https://example.com/products' },
    { name: 'Product Name', url: 'https://example.com/products/123' },
  ]);

  return (
    <>
      <SEOptimize
        title="Product Name | My Company"
        description="Product description"
        canonical="https://example.com/products/123"
        schema={breadcrumbSchema}
      />
      {/* Product content */}
    </>
  );
};
```

#### Professional Service Schema

```jsx
import { SEOptimize, generateProfessionalServiceSchema } from 'react-seo-optimize';

const ServicesPage = () => {
  const serviceSchema = generateProfessionalServiceSchema({
    name: 'Professional Services',
    description: 'We offer professional consulting services',
    url: 'https://example.com/services',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: 'Consulting',
  });

  return (
    <>
      <SEOptimize
        title="Our Services | My Company"
        description="Professional services we offer"
        canonical="https://example.com/services"
        schema={serviceSchema}
      />
      {/* Services content */}
    </>
  );
};
```

### Step 5: Use CLI to Inject Global Schema

For static HTML files or global organization schema, use the CLI tool:

1. Create `schema.config.json` in your project root:

```json
{
  "name": "My Organization",
  "url": "https://example.com",
  "logo": "https://example.com/logo.svg",
  "description": "Organization description",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressLocality": "City"
  },
  "sameAs": [
    "https://facebook.com/myorg",
    "https://twitter.com/myorg"
  ]
}
```

2. Run the CLI command:

```bash
# Basic usage
npx react-seo-generate-schema

# Preview changes without modifying files
npx react-seo-generate-schema --dry-run

# Create backup before modifying
npx react-seo-generate-schema --backup

# Custom paths
npx react-seo-generate-schema --config ./config.json --html ./public/index.html

# Help
npx react-seo-generate-schema --help
```

Or add to your `package.json` scripts:

```json
{
  "scripts": {
    "generate:schema": "react-seo-generate-schema"
  }
}
```

Then run:

```bash
npm run generate:schema
```

This will automatically inject the JSON-LD schema into your `index.html` file.

## Complete Example

Here's a complete example combining multiple features:

```jsx
import { SEOptimize, generateOrganizationSchema } from 'react-seo-optimize';

const ArticlePage = ({ article }) => {
  // Generate schema for the organization
  const orgSchema = generateOrganizationSchema({
    name: 'My Company',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
  });

  return (
    <>
      <SEOptimize
        title={`${article.title} | My Company Blog`}
        description={article.excerpt}
        keywords={article.tags.join(', ')}
        canonical={`https://example.com/blog/${article.slug}`}
        ogTitle={article.title}
        ogDescription={article.excerpt}
        ogImage={article.featuredImage}
        ogType="article"
        ogImageWidth="1200"
        ogImageHeight="630"
        twitterCard="summary_large_image"
        twitterImage={article.featuredImage}
        robots={article.published ? 'index, follow' : 'noindex, nofollow'}
        author={article.author.name}
        htmlLang="en"
        themeColor="#ffffff"
        twitterSite="@mycompany"
        twitterCreator={article.author.twitter}
        ogImageSecureUrl={article.featuredImage}
        articlePublishedTime={article.publishedAt}
        articleModifiedTime={article.updatedAt}
        articleAuthor={article.author.name}
        articleSection="Technology"
        articleTag={article.tags}
        structuredData={orgSchema}
      />
      
      <article>
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </>
  );
};
```

## Advanced Usage

### Multiple Schema Support

You can now combine multiple schemas on a single page:

```jsx
import { SEOptimize, generateOrganizationSchema, generateBreadcrumbSchema, generateArticleSchema } from 'react-seo-optimize';

const ArticlePage = ({ article }) => {
  const orgSchema = generateOrganizationSchema({
    name: 'My Company',
    url: 'https://example.com',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://example.com' },
    { name: 'Blog', url: 'https://example.com/blog' },
    { name: article.title, url: `https://example.com/blog/${article.slug}` },
  ]);

  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: article.author.name },
  });

  return (
    <SEOptimize
      title={`${article.title} | My Company`}
      description={article.excerpt}
      canonical={`https://example.com/blog/${article.slug}`}
      structuredData={[orgSchema, breadcrumbSchema, articleSchema]}
    />
  );
};
```

### Schema Generators Reference

All available schema generators:

```jsx
import { 
  generateOrganizationSchema,
  generateProfessionalServiceSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateArticleSchema,
  generateProductSchema,
  generateFAQPageSchema,
  generateHowToSchema,
  generateLocalBusinessSchema,
} from 'react-seo-optimize';

// Organization schema
const orgSchema = generateOrganizationSchema({
  name: 'My Company',
  url: 'https://example.com',
  logo: 'https://example.com/logo.svg',
  description: 'Company description',
  sameAs: [
    'https://facebook.com/mycompany',
    'https://twitter.com/mycompany',
  ],
});

// Article schema
const articleSchema = generateArticleSchema({
  headline: 'Article Title',
  description: 'Article description',
  datePublished: '2024-01-01T00:00:00Z',
  author: { '@type': 'Person', name: 'John Doe' },
});

// Product schema
const productSchema = generateProductSchema({
  name: 'Product Name',
  description: 'Product description',
  image: 'https://example.com/product.jpg',
  offers: {
    '@type': 'Offer',
    price: '99.99',
    priceCurrency: 'USD',
  },
});

// FAQ schema
const faqSchema = generateFAQPageSchema({
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is this?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This is an answer.',
      },
    },
  ],
});

// HowTo schema
const howToSchema = generateHowToSchema({
  name: 'How to Do Something',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Step 1',
      text: 'First, do this',
    },
  ],
});

// LocalBusiness schema
const localBusinessSchema = generateLocalBusinessSchema({
  name: 'My Business',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main St',
    addressLocality: 'City',
    addressCountry: 'US',
  },
});
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Page title |
| `description` | string | - | Meta description |
| `keywords` | string | - | Meta keywords (deprecated by search engines) |
| `canonical` | string | - | Canonical URL (must be absolute) |
| `ogTitle` | string | `title` | Open Graph title |
| `ogDescription` | string | `description` | Open Graph description |
| `ogUrl` | string | `canonical` | Open Graph URL |
| `ogImage` | string | - | Open Graph image |
| `ogImageSecureUrl` | string | - | Open Graph secure image URL |
| `ogType` | string | `'website'` | Open Graph type |
| `ogImageWidth` | string | - | Open Graph image width |
| `ogImageHeight` | string | - | Open Graph image height |
| `ogImageAlt` | string | - | Open Graph image alt |
| `ogSiteName` | string | - | Open Graph site name |
| `ogLocale` | string | - | Open Graph locale |
| `articlePublishedTime` | string | - | Article published time (ISO 8601) |
| `articleModifiedTime` | string | - | Article modified time (ISO 8601) |
| `articleAuthor` | string | - | Article author |
| `articleSection` | string | - | Article section |
| `articleTag` | string[] | - | Article tags |
| `twitterCard` | string | `'summary_large_image'` | Twitter card type |
| `twitterTitle` | string | `title` | Twitter title |
| `twitterDescription` | string | `description` | Twitter description |
| `twitterImage` | string | `ogImage` | Twitter image |
| `twitterImageAlt` | string | - | Twitter image alt |
| `twitterSite` | string | - | Twitter site (@username) |
| `twitterCreator` | string | - | Twitter creator (@username) |
| `schema` | object \| object[] | - | JSON-LD schema object(s) (deprecated, use `structuredData`) |
| `structuredData` | object \| object[] | - | JSON-LD schema object(s) |
| `robots` | string | - | Robots meta tag (no default in v2.0) |
| `author` | string | - | Author meta tag |
| `htmlLang` | string | - | HTML lang attribute |
| `themeColor` | string | - | Theme color for mobile browsers |
| `viewport` | string | - | Viewport meta tag |
| `charset` | string | `'UTF-8'` | Charset meta tag |
| `customMeta` | Record<string, string> | - | Additional meta tags |

> **Note:** The `schema` prop is still supported for backward compatibility, but `structuredData` is preferred. Both support single objects or arrays for multiple schemas.

## SSR Support

For server-side rendering, use the `renderSEOTags` utility:

```jsx
import { renderSEOTags } from 'react-seo-optimize';

// In your SSR function
const seoTags = renderSEOTags({
  title: 'Page Title',
  description: 'Page description',
  canonical: 'https://example.com/page',
});

// Inject into your HTML template
const html = `
<!DOCTYPE html>
<html>
<head>
  ${seoTags}
</head>
<body>...</body>
</html>
`;
```

## Migration from v1.x

If you're upgrading from v1.x, please see the [Migration Guide](./MIGRATION_GUIDE.md) for breaking changes and upgrade instructions.

## Examples

See `EXAMPLE_USAGE.jsx` in the package for more examples.

## License

MIT

## Changelog

### v2.0.0

**Breaking Changes:**
- Removed `react-helmet` and `react-helmet-async` dependencies (now uses native DOM manipulation)
- Removed default value for `robots` prop (must be explicit)
- `canonical` URLs must now be absolute (relative URLs rejected)
- Changed `extraMeta` to `customMeta` (object instead of spread props)

**New Features:**
- Added 5 new schema generators: Article, Product, FAQPage, HowTo, LocalBusiness
- Support for multiple schemas via `structuredData` prop (array)
- Added `ogImageSecureUrl` for HTTPS images
- Added `twitterSite` and `twitterCreator` props
- Added `htmlLang`, `themeColor`, `viewport`, `charset` props
- Added article-specific meta tags (`articlePublishedTime`, `articleModifiedTime`, etc.)
- CLI now supports `--dry-run` and `--backup` flags
- Improved TypeScript types (removed `any`, added proper types)
- Better validation for canonical URLs and image dimensions
