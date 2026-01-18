import { describe, it, expect } from 'vitest';
import {
  generateOrganizationSchema,
  generateProfessionalServiceSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
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
