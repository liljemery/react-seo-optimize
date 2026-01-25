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

export const generateArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  articleSection,
  articleTag,
  url,
}) => {
  validateRequired(headline, 'headline');
  if (url) validateUrl(url, 'url');
  if (image) validateUrl(image, 'image');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    ...(description && { description }),
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(author && { author }),
    ...(publisher && { publisher }),
    ...(articleSection && { articleSection }),
    ...(articleTag && Array.isArray(articleTag) && articleTag.length > 0 && { articleTag }),
    ...(url && { url }),
  };

  return schema;
};

export const generateProductSchema = ({
  name,
  description,
  image,
  brand,
  sku,
  offers,
  aggregateRating,
  review,
  url,
}) => {
  validateRequired(name, 'name');
  if (url) validateUrl(url, 'url');
  if (image) {
    if (Array.isArray(image)) {
      image.forEach((img, index) => validateUrl(img, `image[${index}]`));
    } else {
      validateUrl(image, 'image');
    }
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    ...(description && { description }),
    ...(image && { image }),
    ...(brand && { brand }),
    ...(sku && { sku }),
    ...(offers && { offers }),
    ...(aggregateRating && { aggregateRating }),
    ...(review && Array.isArray(review) && review.length > 0 && { review }),
    ...(url && { url }),
  };

  return schema;
};

export const generateFAQPageSchema = ({ mainEntity }) => {
  validateRequired(mainEntity, 'mainEntity');
  validateArray(mainEntity, 'mainEntity');

  if (mainEntity.length === 0) {
    throw new Error('FAQ mainEntity array cannot be empty.');
  }

  mainEntity.forEach((item, index) => {
    if (!item['@type']) {
      throw new Error(`FAQ item at index ${index} is missing required field "@type".`);
    }
    if (item['@type'] !== 'Question') {
      throw new Error(`FAQ item at index ${index} must have @type "Question".`);
    }
    if (!item.name) {
      throw new Error(`FAQ item at index ${index} is missing required field "name".`);
    }
    if (!item.acceptedAnswer || !item.acceptedAnswer['@type']) {
      throw new Error(`FAQ item at index ${index} is missing required field "acceptedAnswer" with @type.`);
    }
    if (item.acceptedAnswer['@type'] !== 'Answer') {
      throw new Error(`FAQ item at index ${index} acceptedAnswer must have @type "Answer".`);
    }
    if (!item.acceptedAnswer.text) {
      throw new Error(`FAQ item at index ${index} acceptedAnswer is missing required field "text".`);
    }
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity.map((item) => ({
      '@type': 'Question',
      name: item.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.acceptedAnswer.text,
      },
    })),
  };

  return schema;
};

export const generateHowToSchema = ({
  name,
  description,
  image,
  totalTime,
  estimatedCost,
  supply,
  tool,
  step,
}) => {
  validateRequired(name, 'name');
  validateRequired(step, 'step');
  validateArray(step, 'step');

  if (step.length === 0) {
    throw new Error('HowTo step array cannot be empty.');
  }

  if (image) {
    if (Array.isArray(image)) {
      image.forEach((img, index) => validateUrl(img, `image[${index}]`));
    } else {
      validateUrl(image, 'image');
    }
  }

  step.forEach((item, index) => {
    if (!item['@type']) {
      throw new Error(`HowTo step at index ${index} is missing required field "@type".`);
    }
    if (item['@type'] !== 'HowToStep') {
      throw new Error(`HowTo step at index ${index} must have @type "HowToStep".`);
    }
    if (!item.name) {
      throw new Error(`HowTo step at index ${index} is missing required field "name".`);
    }
    if (!item.text) {
      throw new Error(`HowTo step at index ${index} is missing required field "text".`);
    }
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    ...(description && { description }),
    ...(image && { image }),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && { estimatedCost }),
    ...(supply && Array.isArray(supply) && supply.length > 0 && { supply }),
    ...(tool && Array.isArray(tool) && tool.length > 0 && { tool }),
    step: step.map((item) => ({
      '@type': 'HowToStep',
      name: item.name,
      text: item.text,
      ...(item.image && { image: item.image }),
      ...(item.url && { url: item.url }),
    })),
  };

  return schema;
};

export const generateLocalBusinessSchema = ({
  name,
  description,
  image,
  address,
  telephone,
  priceRange,
  openingHoursSpecification,
  servesCuisine,
  acceptsReservations,
  url,
  sameAs,
}) => {
  validateRequired(name, 'name');
  validateRequired(address, 'address');
  if (url) validateUrl(url, 'url');
  if (image) validateUrl(image, 'image');
  validateArray(sameAs, 'sameAs');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    ...(description && { description }),
    ...(image && { image }),
    address,
    ...(telephone && { telephone }),
    ...(priceRange && { priceRange }),
    ...(openingHoursSpecification && Array.isArray(openingHoursSpecification) && openingHoursSpecification.length > 0 && { openingHoursSpecification }),
    ...(servesCuisine && { servesCuisine }),
    ...(acceptsReservations !== undefined && { acceptsReservations }),
    ...(url && { url }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
  };

  return schema;
};
