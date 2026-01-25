import { describe, it, expect } from 'vitest';
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
} from '../src/schemaGenerators.js';

describe('generateOrganizationSchema', () => {
  it('should generate a valid Organization schema with required fields', () => {
    const schema = generateOrganizationSchema({
      name: 'Test Organization',
    });

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
    });
  });

  it('should generate schema with all optional fields', () => {
    const schema = generateOrganizationSchema({
      name: 'Test Organization',
      alternateName: 'Test Org',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png',
      description: 'Test description',
      address: { '@type': 'PostalAddress', addressCountry: 'US' },
      sameAs: ['https://facebook.com/test', 'https://twitter.com/test'],
    });

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
      alternateName: 'Test Org',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png',
      description: 'Test description',
      address: { '@type': 'PostalAddress', addressCountry: 'US' },
      sameAs: ['https://facebook.com/test', 'https://twitter.com/test'],
    });
  });

  it('should throw error if name is missing', () => {
    expect(() => {
      generateOrganizationSchema({});
    }).toThrow('Required field "name" is missing.');
  });

  it('should throw error if url is invalid', () => {
    expect(() => {
      generateOrganizationSchema({
        name: 'Test',
        url: 'not-a-valid-url',
      });
    }).toThrow('Invalid url: "not-a-valid-url". Must be a valid URL.');
  });

  it('should throw error if logo is invalid URL', () => {
    expect(() => {
      generateOrganizationSchema({
        name: 'Test',
        logo: 'invalid-logo',
      });
    }).toThrow('Invalid logo: "invalid-logo". Must be a valid URL.');
  });

  it('should not include sameAs if array is empty', () => {
    const schema = generateOrganizationSchema({
      name: 'Test',
      sameAs: [],
    });

    expect(schema.sameAs).toBeUndefined();
  });

  it('should throw error if sameAs is not an array', () => {
    expect(() => {
      generateOrganizationSchema({
        name: 'Test',
        sameAs: 'not-an-array',
      });
    }).toThrow('"sameAs" must be an array.');
  });
});

describe('generateProfessionalServiceSchema', () => {
  it('should generate a valid ProfessionalService schema', () => {
    const schema = generateProfessionalServiceSchema({
      name: 'Test Service',
      description: 'Service description',
      url: 'https://example.com',
    });

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Test Service',
      description: 'Service description',
      url: 'https://example.com',
    });
  });

  it('should generate schema with only provided fields', () => {
    const schema = generateProfessionalServiceSchema({
      name: 'Test Service',
    });

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Test Service',
    });
  });

  it('should throw error if url is invalid', () => {
    expect(() => {
      generateProfessionalServiceSchema({
        name: 'Test',
        url: 'invalid-url',
      });
    }).toThrow('Invalid url: "invalid-url". Must be a valid URL.');
  });
});

describe('generateBreadcrumbSchema', () => {
  it('should generate a valid Breadcrumb schema', () => {
    const items = [
      { name: 'Home', url: 'https://example.com' },
      { name: 'Products', url: 'https://example.com/products' },
    ];

    const schema = generateBreadcrumbSchema(items);

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://example.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: 'https://example.com/products',
        },
      ],
    });
  });

  it('should throw error if items is missing', () => {
    expect(() => {
      generateBreadcrumbSchema();
    }).toThrow('Required field "items" is missing.');
  });

  it('should throw error if items is not an array', () => {
    expect(() => {
      generateBreadcrumbSchema('not-an-array');
    }).toThrow('"items" must be an array.');
  });

  it('should throw error if items array is empty', () => {
    expect(() => {
      generateBreadcrumbSchema([]);
    }).toThrow('Breadcrumb items array cannot be empty.');
  });

  it('should throw error if item is missing name', () => {
    expect(() => {
      generateBreadcrumbSchema([
        { url: 'https://example.com' },
      ]);
    }).toThrow('Breadcrumb item at index 0 is missing required field "name".');
  });

  it('should throw error if item is missing url', () => {
    expect(() => {
      generateBreadcrumbSchema([
        { name: 'Home' },
      ]);
    }).toThrow('Breadcrumb item at index 0 is missing required field "url".');
  });

  it('should throw error if item url is invalid', () => {
    expect(() => {
      generateBreadcrumbSchema([
        { name: 'Home', url: 'invalid-url' },
      ]);
    }).toThrow('Invalid items[0].url: "invalid-url". Must be a valid URL.');
  });
});

describe('generateWebPageSchema', () => {
  it('should generate a valid WebPage schema with default language', () => {
    const schema = generateWebPageSchema({
      name: 'Test Page',
      description: 'Page description',
      url: 'https://example.com/page',
    });

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Test Page',
      description: 'Page description',
      url: 'https://example.com/page',
      inLanguage: 'es',
    });
  });

  it('should generate schema with custom language', () => {
    const schema = generateWebPageSchema({
      name: 'Test Page',
      inLanguage: 'en',
    });

    expect(schema.inLanguage).toBe('en');
  });

  it('should throw error if url is invalid', () => {
    expect(() => {
      generateWebPageSchema({
        name: 'Test',
        url: 'invalid-url',
      });
    }).toThrow('Invalid url: "invalid-url". Must be a valid URL.');
  });
});

describe('generateArticleSchema', () => {
  it('should generate a valid Article schema with required fields', () => {
    const schema = generateArticleSchema({
      headline: 'Test Article',
    });

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Test Article',
    });
  });

  it('should generate schema with all optional fields', () => {
    const schema = generateArticleSchema({
      headline: 'Test Article',
      description: 'Article description',
      image: 'https://example.com/image.jpg',
      datePublished: '2024-01-01',
      dateModified: '2024-01-02',
      author: { '@type': 'Person', name: 'John Doe' },
      publisher: { '@type': 'Organization', name: 'Test Org' },
      articleSection: 'Technology',
      articleTag: ['react', 'seo'],
      url: 'https://example.com/article',
    });

    expect(schema.headline).toBe('Test Article');
    expect(schema.description).toBe('Article description');
    expect(schema.articleTag).toEqual(['react', 'seo']);
  });

  it('should throw error if headline is missing', () => {
    expect(() => {
      generateArticleSchema({});
    }).toThrow('Required field "headline" is missing.');
  });
});

describe('generateProductSchema', () => {
  it('should generate a valid Product schema with required fields', () => {
    const schema = generateProductSchema({
      name: 'Test Product',
    });

    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Test Product',
    });
  });

  it('should generate schema with all optional fields', () => {
    const schema = generateProductSchema({
      name: 'Test Product',
      description: 'Product description',
      image: 'https://example.com/product.jpg',
      brand: { '@type': 'Brand', name: 'Test Brand' },
      sku: 'SKU123',
      offers: { '@type': 'Offer', price: '99.99', priceCurrency: 'USD' },
      url: 'https://example.com/product',
    });

    expect(schema.name).toBe('Test Product');
    expect(schema.sku).toBe('SKU123');
  });

  it('should throw error if name is missing', () => {
    expect(() => {
      generateProductSchema({});
    }).toThrow('Required field "name" is missing.');
  });
});

describe('generateFAQPageSchema', () => {
  it('should generate a valid FAQPage schema', () => {
    const schema = generateFAQPageSchema({
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is this?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'This is a test.',
          },
        },
      ],
    });

    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity.length).toBe(1);
    expect(schema.mainEntity[0].name).toBe('What is this?');
  });

  it('should throw error if mainEntity is missing', () => {
    expect(() => {
      generateFAQPageSchema({});
    }).toThrow('Required field "mainEntity" is missing.');
  });

  it('should throw error if mainEntity is empty', () => {
    expect(() => {
      generateFAQPageSchema({ mainEntity: [] });
    }).toThrow('FAQ mainEntity array cannot be empty.');
  });
});

describe('generateHowToSchema', () => {
  it('should generate a valid HowTo schema', () => {
    const schema = generateHowToSchema({
      name: 'How to Test',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Step 1',
          text: 'Do this first',
        },
      ],
    });

    expect(schema['@type']).toBe('HowTo');
    expect(schema.name).toBe('How to Test');
    expect(schema.step.length).toBe(1);
  });

  it('should throw error if name is missing', () => {
    expect(() => {
      generateHowToSchema({
        step: [{ '@type': 'HowToStep', name: 'Step', text: 'Text' }],
      });
    }).toThrow('Required field "name" is missing.');
  });

  it('should throw error if step is missing', () => {
    expect(() => {
      generateHowToSchema({ name: 'Test' });
    }).toThrow('Required field "step" is missing.');
  });
});

describe('generateLocalBusinessSchema', () => {
  it('should generate a valid LocalBusiness schema', () => {
    const schema = generateLocalBusinessSchema({
      name: 'Test Business',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Main St',
        addressLocality: 'City',
        addressCountry: 'US',
      },
    });

    expect(schema['@type']).toBe('LocalBusiness');
    expect(schema.name).toBe('Test Business');
    expect(schema.address).toBeTruthy();
  });

  it('should throw error if name is missing', () => {
    expect(() => {
      generateLocalBusinessSchema({
        address: { '@type': 'PostalAddress' },
      });
    }).toThrow('Required field "name" is missing.');
  });

  it('should throw error if address is missing', () => {
    expect(() => {
      generateLocalBusinessSchema({ name: 'Test' });
    }).toThrow('Required field "address" is missing.');
  });
});
