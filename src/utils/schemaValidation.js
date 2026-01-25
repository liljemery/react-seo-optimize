export const validateSchemaStructure = (schema) => {
  if (!schema || typeof schema !== 'object') {
    return { valid: false, errors: ['Schema must be an object'] };
  }
  
  const errors = [];
  
  if (!schema['@context']) {
    errors.push('Schema must include @context');
  }
  
  if (!schema['@type']) {
    errors.push('Schema must include @type');
  }
  
  if (schema['@context'] && schema['@context'] !== 'https://schema.org') {
    console.warn(`Unexpected @context: ${schema['@context']}. Expected: https://schema.org`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateSchemaBeforeRender = (schema) => {
  if (!schema) return { valid: true };
  
  if (Array.isArray(schema)) {
    return schema.every(s => validateSchemaStructure(s).valid);
  }
  
  return validateSchemaStructure(schema);
};
