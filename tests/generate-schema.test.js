import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const binPath = path.join(__dirname, '../bin/generate-schema.js');
const testDir = path.join(__dirname, 'tmp');

describe('generate-schema CLI', () => {
  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should create schema.config.json example when config is missing', () => {
    const configPath = path.join(testDir, 'schema.config.json');
    const htmlPath = path.join(testDir, 'index.html');

    try {
      execSync(`node ${binPath} "${configPath}" "${htmlPath}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
      expect.fail('Should have exited with error');
    } catch (error) {
      expect(error.status).toBe(1);
      const output = error.stdout || error.stderr || '';
      expect(output).toContain('Config file not found');
    }
  });

  it('should throw error if name is missing in config', () => {
    const configPath = path.join(testDir, 'schema.config.json');
    const htmlPath = path.join(testDir, 'index.html');
    fs.writeFileSync(configPath, JSON.stringify({ url: 'https://example.com' }));

    try {
      execSync(`node ${binPath} "${configPath}" "${htmlPath}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
      expect.fail('Should have exited with error');
    } catch (error) {
      expect(error.status).toBe(1);
      const output = error.stdout || error.stderr || '';
      expect(output).toContain('"name" is required');
    }
  });

  it('should inject schema into index.html', () => {
    const configPath = path.join(testDir, 'schema.config.json');
    const htmlPath = path.join(testDir, 'index.html');

    const config = {
      name: 'Test Organization',
      url: 'https://example.com',
      description: 'Test description',
    };

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <h1>Test</h1>
</body>
</html>`;

    fs.writeFileSync(configPath, JSON.stringify(config));
    fs.writeFileSync(htmlPath, html);

    const output = execSync(`node ${binPath} "${configPath}" "${htmlPath}"`, { encoding: 'utf-8' });
    expect(output).toContain('Schema added in index.html');

    const updatedHtml = fs.readFileSync(htmlPath, 'utf-8');
    expect(updatedHtml).toContain('application/ld+json');
    expect(updatedHtml).toContain('Test Organization');
    expect(updatedHtml).toContain('https://example.com');
  });

  it('should update existing schema in index.html', () => {
    const configPath = path.join(testDir, 'schema.config.json');
    const htmlPath = path.join(testDir, 'index.html');

    const config = {
      name: 'Updated Organization',
      url: 'https://example.com/updated',
    };

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
    <!-- Structured Data for Search Engines -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Old Organization"
    }
    </script>
</head>
<body>
  <h1>Test</h1>
</body>
</html>`;

    fs.writeFileSync(configPath, JSON.stringify(config));
    fs.writeFileSync(htmlPath, html);

    const output = execSync(`node ${binPath} "${configPath}" "${htmlPath}"`, { encoding: 'utf-8' });
    expect(output).toContain('Schema updated in index.html');

    const updatedHtml = fs.readFileSync(htmlPath, 'utf-8');
    expect(updatedHtml).toContain('Updated Organization');
    expect(updatedHtml).not.toContain('Old Organization');
  });

  it('should throw error if index.html is missing', () => {
    const configPath = path.join(testDir, 'schema.config.json');
    const htmlPath = path.join(testDir, 'index.html');
    const config = {
      name: 'Test Organization',
    };

    fs.writeFileSync(configPath, JSON.stringify(config));

    try {
      execSync(`node ${binPath} "${configPath}" "${htmlPath}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
      expect.fail('Should have exited with error');
    } catch (error) {
      expect(error.status).toBe(1);
      const output = error.stdout || error.stderr || '';
      expect(output).toContain('index.html not found');
    }
  });

  it('should throw error if index.html has no </head> tag', () => {
    const configPath = path.join(testDir, 'schema.config.json');
    const htmlPath = path.join(testDir, 'index.html');

    const config = {
      name: 'Test Organization',
    };

    const html = `<!DOCTYPE html>
<html>
<body>
  <h1>Test</h1>
</body>
</html>`;

    fs.writeFileSync(configPath, JSON.stringify(config));
    fs.writeFileSync(htmlPath, html);

    try {
      execSync(`node ${binPath} "${configPath}" "${htmlPath}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
      expect.fail('Should have exited with error');
    } catch (error) {
      expect(error.status).toBe(1);
      const output = error.stdout || error.stderr || '';
      expect(output).toContain('Could not find </head> tag');
    }
  });
});
