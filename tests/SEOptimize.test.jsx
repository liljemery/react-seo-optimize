import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import SEOptimize from '../src/SEOptimize.jsx';

describe('SEOptimize', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('should render title meta tag', async () => {
    render(<SEOptimize title="Test Title" />);

    await waitFor(() => {
      const title = document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title?.textContent).toBe('Test Title');
    });
  });

  it('should render description meta tag', async () => {
    render(<SEOptimize description="Test description" />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toBe('Test description');
    });
  });

  it('should render keywords meta tag', async () => {
    render(<SEOptimize keywords="keyword1, keyword2" />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="keywords"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toBe('keyword1, keyword2');
    });
  });

  it('should render canonical link', async () => {
    render(<SEOptimize canonical="https://example.com/page" />);

    await waitFor(() => {
      const link = document.querySelector('link[rel="canonical"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('href')).toBe('https://example.com/page');
    });
  });

  it('should not render canonical link for relative URLs', async () => {
    const consoleError = console.error;
    console.error = () => {};
    
    render(<SEOptimize canonical="/page" />);

    await waitFor(() => {
      const link = document.querySelector('link[rel="canonical"]');
      expect(link).toBeNull();
    });
    
    console.error = consoleError;
  });

  it('should render Open Graph meta tags', async () => {
    render(
      <SEOptimize
        title="Test Title"
        description="Test description"
        canonical="https://example.com"
        ogImage="https://example.com/image.png"
      />
    );

    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).toBeTruthy();
      expect(ogTitle?.getAttribute('content')).toBe('Test Title');
    });

    const ogDescription = document.querySelector('meta[property="og:description"]');
    expect(ogDescription?.getAttribute('content')).toBe('Test description');

    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('https://example.com/image.png');

    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType?.getAttribute('content')).toBe('website');
  });

  it('should render og:image:secure_url for HTTPS images', async () => {
    render(
      <SEOptimize
        title="Test"
        ogImage="https://example.com/image.png"
      />
    );

    await waitFor(() => {
      const secureUrl = document.querySelector('meta[property="og:image:secure_url"]');
      expect(secureUrl).toBeTruthy();
      expect(secureUrl?.getAttribute('content')).toBe('https://example.com/image.png');
    });
  });

  it('should use title as default for og:title if ogTitle not provided', async () => {
    render(<SEOptimize title="Page Title" />);

    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).toBeTruthy();
      expect(ogTitle?.getAttribute('content')).toBe('Page Title');
    });
  });

  it('should use ogTitle if provided', async () => {
    render(<SEOptimize title="Page Title" ogTitle="OG Title" />);

    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).toBeTruthy();
      expect(ogTitle?.getAttribute('content')).toBe('OG Title');
    });
  });

  it('should render Twitter Card meta tags', async () => {
    render(
      <SEOptimize
        title="Test Title"
        description="Test description"
        twitterCard="summary"
      />
    );

    await waitFor(() => {
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      expect(twitterCard).toBeTruthy();
      expect(twitterCard?.getAttribute('content')).toBe('summary');
    });

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle?.getAttribute('content')).toBe('Test Title');

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    expect(twitterDescription?.getAttribute('content')).toBe('Test description');
  });

  it('should render twitter:site and twitter:creator', async () => {
    render(
      <SEOptimize
        title="Test"
        twitterSite="@testsite"
        twitterCreator="@testcreator"
      />
    );

    await waitFor(() => {
      const twitterSite = document.querySelector('meta[name="twitter:site"]');
      expect(twitterSite).toBeTruthy();
      expect(twitterSite?.getAttribute('content')).toBe('@testsite');

      const twitterCreator = document.querySelector('meta[name="twitter:creator"]');
      expect(twitterCreator).toBeTruthy();
      expect(twitterCreator?.getAttribute('content')).toBe('@testcreator');
    });
  });

  it('should use default twitter:card value', async () => {
    render(<SEOptimize title="Test" />);

    await waitFor(() => {
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      expect(twitterCard).toBeTruthy();
      expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
    });
  });

  it('should not render robots meta tag by default', async () => {
    render(<SEOptimize title="Test" />);

    await waitFor(() => {
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots).toBeNull();
    });
  });

  it('should render custom robots meta tag', async () => {
    render(<SEOptimize title="Test" robots="noindex, nofollow" />);

    await waitFor(() => {
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots).toBeTruthy();
      expect(robots?.getAttribute('content')).toBe('noindex, nofollow');
    });
  });

  it('should render JSON-LD schema', async () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
    };

    render(<SEOptimize title="Test" schema={schema} />);

    await waitFor(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      expect(JSON.parse(script.textContent)).toEqual(schema);
    });
  });

  it('should render structuredData prop', async () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
    };

    render(<SEOptimize title="Test" structuredData={schema} />);

    await waitFor(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      expect(JSON.parse(script.textContent)).toEqual(schema);
    });
  });

  it('should merge multiple schemas', async () => {
    const schema1 = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
    };
    const schema2 = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [],
    };

    render(<SEOptimize title="Test" structuredData={[schema1, schema2]} />);

    await waitFor(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      const parsed = JSON.parse(script.textContent);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@graph']).toBeTruthy();
      expect(parsed['@graph'].length).toBe(2);
    });
  });

  it('should render custom meta tags', async () => {
    render(<SEOptimize title="Test" customMeta={{ customMeta: 'custom-value' }} />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="customMeta"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toBe('custom-value');
    });
  });

  it('should render htmlLang attribute', async () => {
    render(<SEOptimize title="Test" htmlLang="es" />);

    await waitFor(() => {
      const html = document.querySelector('html');
      expect(html?.getAttribute('lang')).toBe('es');
    });
  });

  it('should render theme-color meta tag', async () => {
    render(<SEOptimize title="Test" themeColor="#ffffff" />);

    await waitFor(() => {
      const themeColor = document.querySelector('meta[name="theme-color"]');
      expect(themeColor).toBeTruthy();
      expect(themeColor?.getAttribute('content')).toBe('#ffffff');
    });
  });

  it('should render article meta tags when ogType is article', async () => {
    render(
      <SEOptimize
        title="Test"
        ogType="article"
        articlePublishedTime="2024-01-01T00:00:00Z"
        articleModifiedTime="2024-01-02T00:00:00Z"
        articleAuthor="John Doe"
        articleSection="Technology"
        articleTag={['react', 'seo']}
      />
    );

    await waitFor(() => {
      const publishedTime = document.querySelector('meta[property="article:published_time"]');
      expect(publishedTime?.getAttribute('content')).toBe('2024-01-01T00:00:00Z');

      const modifiedTime = document.querySelector('meta[property="article:modified_time"]');
      expect(modifiedTime?.getAttribute('content')).toBe('2024-01-02T00:00:00Z');

      const author = document.querySelector('meta[property="article:author"]');
      expect(author?.getAttribute('content')).toBe('John Doe');

      const section = document.querySelector('meta[property="article:section"]');
      expect(section?.getAttribute('content')).toBe('Technology');

      const tags = document.querySelectorAll('meta[property="article:tag"]');
      expect(tags.length).toBe(2);
    });
  });

  it('should not render optional fields if not provided', () => {
    render(<SEOptimize title="Test" />);

    expect(document.querySelector('meta[name="keywords"]')).toBeNull();
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('meta[property="og:image"]')).toBeNull();
  });

  it('should not render empty meta tags', () => {
    render(<SEOptimize />);

    expect(document.querySelector('meta[property="og:title"]')).toBeNull();
    expect(document.querySelector('meta[property="og:description"]')).toBeNull();
  });
});
