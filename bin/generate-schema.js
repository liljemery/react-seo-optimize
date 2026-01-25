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

const parseArgs = () => {
  const args = process.argv.slice(2);
  const options = {
    config: null,
    html: null,
    dryRun: false,
    backup: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--dry-run' || arg === '-d') {
      options.dryRun = true;
    } else if (arg === '--backup' || arg === '-b') {
      options.backup = true;
    } else if (arg === '--config' || arg === '-c') {
      options.config = args[++i];
    } else if (arg === '--html' || arg === '-h') {
      options.html = args[++i];
    } else if (arg === '--help') {
      console.log(`
Usage: react-seo-generate-schema [options]

Options:
  --config, -c <path>    Path to schema.config.json (default: ./schema.config.json)
  --html, -h <path>      Path to index.html (default: ./index.html)
  --dry-run, -d          Preview changes without modifying files
  --backup, -b           Create backup before modifying index.html
  --help                 Show this help message

Examples:
  react-seo-generate-schema
  react-seo-generate-schema --dry-run
  react-seo-generate-schema --backup
  react-seo-generate-schema --config ./config.json --html ./public/index.html
`);
      process.exit(0);
    } else if (!arg.startsWith('-') && !options.config) {
      options.config = arg;
    } else if (!arg.startsWith('-') && options.config && !options.html) {
      options.html = arg;
    }
  }

  return options;
};

const validateConfig = (config) => {
  const errors = [];
  
  if (!config.name) {
    errors.push('"name" is required');
  }
  
  if (config.url && !config.url.startsWith('http://') && !config.url.startsWith('https://')) {
    errors.push('"url" must be an absolute URL');
  }
  
  if (config.logo && !config.logo.startsWith('http://') && !config.logo.startsWith('https://')) {
    errors.push('"logo" must be an absolute URL');
  }
  
  if (config.sameAs && !Array.isArray(config.sameAs)) {
    errors.push('"sameAs" must be an array');
  }
  
  if (config.sameAs && Array.isArray(config.sameAs)) {
    config.sameAs.forEach((url, index) => {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        errors.push(`"sameAs[${index}]" must be an absolute URL`);
      }
    });
  }
  
  return errors;
};

const options = parseArgs();
const projectRoot = getProjectRoot();
const configPath = options.config || path.join(projectRoot, 'schema.config.json');
const indexHtmlPath = options.html || path.join(projectRoot, 'index.html');

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

const validationErrors = validateConfig(config);
if (validationErrors.length > 0) {
  console.error('❌ Config validation errors:');
  validationErrors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}

const schema = generateOrganizationSchema(config);

try {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`❌ index.html not found at ${indexHtmlPath}`);
    process.exit(1);
  }

  let htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
  const originalContent = htmlContent;

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
  
  let action = 'unchanged';
  if (scriptRegex.test(htmlContent)) {
    htmlContent = htmlContent.replace(scriptRegex, schemaScript);
    action = 'updated';
  } else {
    const headEndRegex = /(<\/head>)/;
    if (headEndRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(headEndRegex, `${schemaScript}\n  $1`);
      action = 'added';
    } else {
      console.error('❌ Could not find </head> tag in index.html');
      process.exit(1);
    }
  }

  if (options.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
    console.log('Schema that would be generated:');
    console.log(JSON.stringify(schema, null, 2));
    console.log('\nAction:', action === 'unchanged' ? 'No changes needed' : `Schema would be ${action}`);
    if (action !== 'unchanged') {
      console.log('\nDiff preview:');
      const diffStart = htmlContent.indexOf('<!-- Structured Data');
      const diffEnd = htmlContent.indexOf('</script>', diffStart) + 8;
      if (diffStart !== -1) {
        console.log(htmlContent.substring(diffStart, diffEnd));
      }
    }
    process.exit(0);
  }

  if (options.backup && action !== 'unchanged') {
    const backupPath = `${indexHtmlPath}.backup.${Date.now()}`;
    fs.copyFileSync(indexHtmlPath, backupPath);
    console.log(`📦 Backup created: ${backupPath}`);
  }

  if (action !== 'unchanged') {
    fs.writeFileSync(indexHtmlPath, htmlContent, 'utf-8');
    console.log(`✅ Schema ${action} in index.html`);
    console.log(`✅ Schema successfully written to ${indexHtmlPath}`);
  } else {
    console.log('✅ Schema already exists and is up to date');
  }
  
} catch (error) {
  console.error(`❌ Error updating index.html: ${error.message}`);
  process.exit(1);
}
