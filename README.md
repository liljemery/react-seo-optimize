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

## Usage

### React Component

```jsx
import { SEOptimize, generateProfessionalServiceSchema } from 'react-seo-optimize';

const MyPage = () => {
  const schema = generateProfessionalServiceSchema({
    name: 'My Company',
    description: 'Company description',
    url: 'https://example.com',
  });

  return (
    <>
      <SEOptimize
        title="My Page | My Company"
        description="Page description"
        keywords="keyword1, keyword2"
        canonical="https://example.com/my-page"
        ogImage="https://example.com/image.png"
        schema={schema}
      />
      
      {/* Your content */}
    </>
  );
};
```

### Schema Generators

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

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://example.com' },
  { name: 'Products', url: 'https://example.com/products' },
  { name: 'Product 1', url: 'https://example.com/products/1' },
]);
```

### CLI Tool

Generate and inject JSON-LD schema into your `index.html`:

1. Create a `schema.config.json` file in your project root:

```json
{
  "name": "My Organization",
  "alternateName": "My Org",
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

2. Run the generator:

```bash
npx react-seo-generate-schema
```

Or add to your `package.json`:

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
