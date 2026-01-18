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

  it('should use default twitter:card value', async () => {
    render(<SEOptimize title="Test" />);

    await waitFor(() => {
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      expect(twitterCard).toBeTruthy();
      expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
    });
  });

  it('should render robots meta tag with default value', async () => {
    render(<SEOptimize title="Test" />);

    await waitFor(() => {
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots).toBeTruthy();
      expect(robots?.getAttribute('content')).toBe('index, follow');
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

  it('should render extra meta tags', async () => {
    render(<SEOptimize title="Test" customMeta="custom-value" />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="customMeta"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toBe('custom-value');
    });
  });

  it('should not render optional fields if not provided', () => {
    render(<SEOptimize title="Test" />);

    expect(document.querySelector('meta[name="keywords"]')).toBeNull();
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('meta[property="og:image"]')).toBeNull();
  });
});
