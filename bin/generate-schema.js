#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateOrganizationSchema = (config) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    ...(config.alternateName && { alternateName: config.alternateName }),
    ...(config.url && { url: config.url }),
    ...(config.logo && { logo: config.logo }),
    ...(config.description && { description: config.description }),
    ...(config.address && { address: config.address }),
    ...(config.contactPoint && { contactPoint: config.contactPoint }),
    ...(config.sameAs && config.sameAs.length > 0 && { sameAs: config.sameAs }),
    ...(config.areaServed && { areaServed: config.areaServed }),
    ...(config.hasOfferCatalog && { hasOfferCatalog: config.hasOfferCatalog }),
  };

  return schema;
};

const getProjectRoot = () => {
  let currentDir = process.cwd();
  let indexHtmlPath = path.join(currentDir, 'index.html');
  
  while (!fs.existsSync(indexHtmlPath) && currentDir !== path.dirname(currentDir)) {
    currentDir = path.dirname(currentDir);
    indexHtmlPath = path.join(currentDir, 'index.html');
  }
  
  return fs.existsSync(indexHtmlPath) ? currentDir : process.cwd();
};

const configPath = process.argv[2] || path.join(getProjectRoot(), 'schema.config.json');
const indexHtmlPath = process.argv[3] || path.join(getProjectRoot(), 'index.html');

let config = {};

if (fs.existsSync(configPath)) {
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (error) {
    console.error(`❌ Error reading config file: ${error.message}`);
    process.exit(1);
  }
} else {
  console.log(`⚠️  Config file not found at ${configPath}`);
  console.log('Please create a schema.config.json file with your organization details.');
  console.log('Example:');
  console.log(JSON.stringify({
    name: 'Your Organization',
    url: 'https://example.com',
    description: 'Your description',
  }, null, 2));
  process.exit(1);
}

if (!config.name) {
  console.error('❌ "name" is required in schema.config.json');
  process.exit(1);
}

const schema = generateOrganizationSchema(config);

try {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`❌ index.html not found at ${indexHtmlPath}`);
    process.exit(1);
  }

  let htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

  const schemaJsonString = JSON.stringify(schema, null, 2);
  const indentedSchema = schemaJsonString
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');
  
  const schemaScript = `    <!-- Structured Data for Search Engines -->
    <script type="application/ld+json">
${indentedSchema}
    </script>`;

  const scriptRegex = /    <!-- Structured Data for Search Engines -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/;
  
  if (scriptRegex.test(htmlContent)) {
    htmlContent = htmlContent.replace(scriptRegex, schemaScript);
    console.log('✅ Schema updated in index.html');
  } else {
    const headEndRegex = /(<\/head>)/;
    if (headEndRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(headEndRegex, `${schemaScript}\n  $1`);
      console.log('✅ Schema added to index.html');
    } else {
      console.error('❌ Could not find </head> tag in index.html');
      process.exit(1);
    }
  }

  fs.writeFileSync(indexHtmlPath, htmlContent, 'utf-8');
  console.log(`✅ Schema successfully written to ${indexHtmlPath}`);
  
} catch (error) {
  console.error(`❌ Error updating index.html: ${error.message}`);
  process.exit(1);
}
