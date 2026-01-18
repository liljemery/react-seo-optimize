import { validateRequired, validateUrl, validateArray } from './utils/validation.js';

export const generateOrganizationSchema = ({
  name,
  alternateName,
  url,
  logo,
  description,
  address,
  contactPoint,
  sameAs = [],
  areaServed,
  hasOfferCatalog,
}) => {
  validateRequired(name, 'name');

  if (url) validateUrl(url, 'url');
  if (logo) validateUrl(logo, 'logo');
  validateArray(sameAs, 'sameAs');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    ...(alternateName && { alternateName }),
    ...(url && { url }),
    ...(logo && { logo }),
    ...(description && { description }),
    ...(address && { address }),
    ...(contactPoint && { contactPoint }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(areaServed && { areaServed }),
    ...(hasOfferCatalog && { hasOfferCatalog }),
  };

  return schema;
};

export const generateProfessionalServiceSchema = ({
  name,
  description,
  url,
  areaServed,
  serviceType,
  provider,
}) => {
  if (url) validateUrl(url, 'url');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    ...(name && { name }),
    ...(description && { description }),
    ...(url && { url }),
    ...(areaServed && { areaServed }),
    ...(serviceType && { serviceType }),
    ...(provider && { provider }),
  };

  return schema;
};

export const generateBreadcrumbSchema = (items) => {
  validateRequired(items, 'items');
  validateArray(items, 'items');

  if (items.length === 0) {
    throw new Error('Breadcrumb items array cannot be empty.');
  }

  items.forEach((item, index) => {
    if (!item.name) {
      throw new Error(`Breadcrumb item at index ${index} is missing required field "name".`);
    }
    if (!item.url) {
      throw new Error(`Breadcrumb item at index ${index} is missing required field "url".`);
    }
    validateUrl(item.url, `items[${index}].url`);
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return schema;
};

export const generateWebPageSchema = ({
  name,
  description,
  url,
  inLanguage = 'es',
  isPartOf,
}) => {
  if (url) validateUrl(url, 'url');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    ...(name && { name }),
    ...(description && { description }),
    ...(url && { url }),
    ...(inLanguage && { inLanguage }),
    ...(isPartOf && { isPartOf }),
  };

  return schema;
};
