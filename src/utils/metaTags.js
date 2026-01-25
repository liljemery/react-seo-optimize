export const validateCanonicalUrl = (url) => {
  if (!url) return null;
  if (typeof url !== 'string') {
    throw new Error('Canonical URL must be a string');
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    throw new Error(`Canonical URL must be absolute. Received: "${url}"`);
  }
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error(`Invalid canonical URL: "${url}"`);
  }
};

export const ensureAbsoluteUrl = (url, baseUrl) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (baseUrl) {
    try {
      return new URL(url, baseUrl).toString();
    } catch {
      return url;
    }
  }
  return url;
};

export const validateImageDimensions = (width, height) => {
  if (!width || !height) return { valid: true };
  
  const w = parseInt(width, 10);
  const h = parseInt(height, 10);
  
  if (isNaN(w) || isNaN(h)) {
    console.warn('Image dimensions must be valid numbers');
    return { valid: false };
  }
  
  if (w < 200 || h < 200) {
    console.warn('Open Graph images should be at least 200x200px. Recommended: 1200x630px');
  }
  
  return { valid: true, width: w, height: h };
};

export const mergeSchemas = (schemas) => {
  if (!schemas) return null;
  
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
  
  if (schemaArray.length === 0) return null;
  if (schemaArray.length === 1) return schemaArray[0];
  
  return {
    '@context': 'https://schema.org',
    '@graph': schemaArray
  };
};
