import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function localPath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (clean === '/') return path.join(root, 'index.html');
  const relative = clean.replace(/^\//, '');
  return clean.endsWith('/') ? path.join(root, relative, 'index.html') : path.join(root, relative);
}

const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));
const canonicals = new Map();
const titles = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(root, file);
  const html = fs.readFileSync(file, 'utf8');
  const noindex = /<meta\s+name=["']robots["'][^>]*noindex/i.test(html);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;

  if (!/<html\s+lang=["'][^"']+/i.test(html)) failures.push(`${rel}: missing html lang`);
  if (!title) failures.push(`${rel}: missing title`);
  if (!noindex && !/<meta\s+name=["']description["']/i.test(html)) failures.push(`${rel}: missing description`);
  if (!noindex && !canonical) failures.push(`${rel}: missing canonical`);
  if (!noindex && !/<meta\s+property=["']og:title["']/i.test(html)) failures.push(`${rel}: missing Open Graph title`);
  if (!noindex && !/<meta\s+property=["']og:description["']/i.test(html)) failures.push(`${rel}: missing Open Graph description`);
  if (!noindex && !/<meta\s+property=["']og:url["']/i.test(html)) failures.push(`${rel}: missing Open Graph URL`);
  if (h1Count !== 1) failures.push(`${rel}: expected one H1, found ${h1Count}`);

  if (title) {
    if (titles.has(title)) failures.push(`${rel}: duplicate title with ${titles.get(title)}`);
    titles.set(title, rel);
  }
  if (canonical) {
    if (canonicals.has(canonical)) failures.push(`${rel}: duplicate canonical with ${canonicals.get(canonical)}`);
    canonicals.set(canonical, rel);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(`${rel}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/(?:href|src)=["'](\/[^"']*)["']/gi)) {
    const value = match[1];
    if (value.startsWith('//')) continue;
    const target = localPath(value);
    if (!fs.existsSync(target)) failures.push(`${rel}: missing local target ${value}`);
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/lordtuna\.com[^<]+)<\/loc>/g)].map((match) => match[1]);
for (const canonical of canonicals.keys()) {
  if (!sitemapUrls.includes(canonical)) failures.push(`sitemap: missing ${canonical}`);
}
for (const url of sitemapUrls) {
  if (!fs.existsSync(localPath(new URL(url).pathname))) failures.push(`sitemap: URL has no local file ${url}`);
}

if (!/Sitemap:\s+https:\/\/lordtuna\.com\/sitemap\.xml/i.test(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8'))) {
  failures.push('robots.txt: sitemap declaration missing');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files and ${sitemapUrls.length} sitemap URLs.`);
