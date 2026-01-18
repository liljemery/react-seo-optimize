# react-seo-optimize

Simple and intuitive SEO component for React with JSON-LD schema generation and HTML injection.

## Features

- 🚀 Simple React component for SEO meta tags
- 📊 JSON-LD schema generators (Organization, ProfessionalService, Breadcrumb, WebPage)
- 🔧 CLI tool to inject schemas into HTML files
- 🎯 Open Graph and Twitter Card support
- 💡 Intuitive API with smart defaults

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
npm install react react-helmet
```

## Quick Start

### 1. Install Dependencies

```bash
# Install the package
npm install react-seo-optimize

# Install peer dependencies
npm install react react-helmet
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
npx react-seo-generate-schema
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
        schema={orgSchema}
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

### Schema Generators Reference

All available schema generators:

```jsx
import { 
  generateOrganizationSchema,
  generateProfessionalServiceSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema
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

// WebPage schema
const webPageSchema = generateWebPageSchema({
  name: 'Page Title',
  description: 'Page description',
  url: 'https://example.com/page',
  inLanguage: 'en',
});
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Page title |
| `description` | string | - | Meta description |
| `keywords` | string | - | Meta keywords |
| `canonical` | string | - | Canonical URL |
| `ogTitle` | string | `title` | Open Graph title |
| `ogDescription` | string | `description` | Open Graph description |
| `ogUrl` | string | `canonical` | Open Graph URL |
| `ogImage` | string | - | Open Graph image |
| `ogType` | string | `'website'` | Open Graph type |
| `ogImageWidth` | string | - | Open Graph image width |
| `ogImageHeight` | string | - | Open Graph image height |
| `ogImageAlt` | string | - | Open Graph image alt |
| `ogSiteName` | string | - | Open Graph site name |
| `ogLocale` | string | - | Open Graph locale |
| `twitterCard` | string | `'summary_large_image'` | Twitter card type |
| `twitterTitle` | string | `title` | Twitter title |
| `twitterDescription` | string | `description` | Twitter description |
| `twitterImage` | string | `ogImage` | Twitter image |
| `schema` | object | - | JSON-LD schema object |
| `robots` | string | `'index, follow'` | Robots meta tag |
| `author` | string | - | Author meta tag |
| `...extraMeta` | object | - | Additional meta tags |

## Examples

See `EXAMPLE_USAGE.jsx` in the package for more examples.

## License

MIT
