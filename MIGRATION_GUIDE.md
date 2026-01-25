# Migration Guide: v1.x → v2.0.0

## Breaking Changes

### 1. Peer Dependency Change

**Before:**
```bash
npm install react react-helmet
```

**After:**
```bash
npm install react
```

The library no longer requires `react-helmet` or `react-helmet-async`. It now uses native DOM manipulation for better performance and SSR compatibility.

### 2. Robots Meta Tag Default

**Before:**
```jsx
// Default was 'index, follow'
<SEOptimize title="Page" />
```

**After:**
```jsx
// No default - must be explicit
<SEOptimize title="Page" robots="index, follow" />
```

### 3. Schema Prop → StructuredData

**Before:**
```jsx
<SEOptimize schema={orgSchema} />
```

**After:**
```jsx
// Both work, but structuredData is preferred
<SEOptimize structuredData={orgSchema} />
// Or use schema (still supported for backward compatibility)
<SEOptimize schema={orgSchema} />
```

### 4. Canonical URL Validation

**Before:**
```jsx
// Relative URLs were accepted
<SEOptimize canonical="/page" />
```

**After:**
```jsx
// Must be absolute URLs
<SEOptimize canonical="https://example.com/page" />
// Relative URLs will be rejected with a console error
```

### 5. ExtraMeta → CustomMeta

**Before:**
```jsx
<SEOptimize title="Page" extraKey="value" />
```

**After:**
```jsx
<SEOptimize title="Page" customMeta={{ extraKey: "value" }} />
```

## New Features

### 1. Multiple Schema Support

**New:**
```jsx
const orgSchema = generateOrganizationSchema({ name: 'Org' });
const breadcrumbSchema = generateBreadcrumbSchema([...]);

<SEOptimize 
  title="Page" 
  structuredData={[orgSchema, breadcrumbSchema]} 
/>
```

### 2. New Schema Generators

New schema generators available:
- `generateArticleSchema`
- `generateProductSchema`
- `generateFAQPageSchema`
- `generateHowToSchema`
- `generateLocalBusinessSchema`

### 3. New SEO Props

```jsx
<SEOptimize
  title="Page"
  htmlLang="en"
  themeColor="#ffffff"
  twitterSite="@username"
  twitterCreator="@author"
  ogImageSecureUrl="https://example.com/image.jpg"
  articlePublishedTime="2024-01-01T00:00:00Z"
  articleModifiedTime="2024-01-02T00:00:00Z"
  articleAuthor="John Doe"
  articleSection="Technology"
  articleTag={['react', 'seo']}
/>
```

### 4. CLI Improvements

**New flags:**
```bash
# Dry-run mode (preview changes)
npx react-seo-generate-schema --dry-run

# Create backup before modifying
npx react-seo-generate-schema --backup

# Custom paths
npx react-seo-generate-schema --config ./config.json --html ./public/index.html

# Help
npx react-seo-generate-schema --help
```

## Migration Steps

1. **Update dependencies:**
   ```bash
   npm uninstall react-helmet react-helmet-async
   # No additional dependencies needed!
   ```

2. **Update imports (if needed):**
   ```jsx
   // No changes needed - component works without any provider
   // For SSR, you can use renderSEOTags utility:
   import { renderSEOTags } from 'react-seo-optimize';
   ```

3. **Add explicit robots meta tags:**
   ```jsx
   // Before
   <SEOptimize title="Page" />
   
   // After
   <SEOptimize title="Page" robots="index, follow" />
   ```

4. **Fix canonical URLs:**
   ```jsx
   // Before
   <SEOptimize canonical="/page" />
   
   // After
   <SEOptimize canonical="https://example.com/page" />
   ```

5. **Update extraMeta usage:**
   ```jsx
   // Before
   <SEOptimize title="Page" customKey="value" />
   
   // After
   <SEOptimize title="Page" customMeta={{ customKey: "value" }} />
   ```

6. **Optional: Use structuredData prop:**
   ```jsx
   // Both work, but structuredData is clearer
   <SEOptimize structuredData={schema} />
   ```

## Backward Compatibility

The following features remain backward compatible:
- `schema` prop (still works, but `structuredData` is preferred)
- All existing props continue to work
- Existing schema generators unchanged

## Need Help?

If you encounter issues during migration, please open an issue on GitHub.
