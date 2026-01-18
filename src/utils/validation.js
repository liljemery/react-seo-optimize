export const isValidUrl = (url) => {
  if (typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateUrl = (url, fieldName = 'url') => {
  if (url && !isValidUrl(url)) {
    throw new Error(`Invalid ${fieldName}: "${url}". Must be a valid URL.`);
  }
  return true;
};

export const validateRequired = (value, fieldName) => {
  if (!value) {
    throw new Error(`Required field "${fieldName}" is missing.`);
  }
  return true;
};

export const validateArray = (value, fieldName) => {
  if (value && !Array.isArray(value)) {
    throw new Error(`"${fieldName}" must be an array.`);
  }
  return true;
};
