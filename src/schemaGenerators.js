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
