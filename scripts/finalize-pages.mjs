import { readFile, writeFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist/client');
const pages = new URL(
  process.env.PAGES_BASE_URL || 'https://solvialab.github.io/kadernictvo-hamuliakovo/',
);
const base = pages.pathname.replace(/\/+$/, '');
const manifest = JSON.parse(
  await readFile('dist/server/vinext-prerender.json', 'utf8'),
);
if (
  !manifest.routes.some(
    (route) => route.route === '/' && route.status === 'rendered',
  )
) {
  throw new Error('The static homepage was not rendered.');
}
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(html|css|js|rsc|json)$/.test(entry.name)) {
      const original = await readFile(file, 'utf8');
      // vinext beta.5 emits next/font URLs at root even with assetPrefix.
      const result = original.replace(
        /(?<![\w/:.-])\/_next\/static\/_vinext_fonts\//g,
        `${base}/_next/static/_vinext_fonts/`,
      );
      if (result !== original) await writeFile(file, result);
    }
  }
}
await walk(output);
const html = await readFile(path.join(output, 'index.html'), 'utf8');
if (
  !html.includes('Kaderníctvo Hamuliakovo') ||
  !html.includes('id="cennik"')
) {
  throw new Error('The exported homepage is missing required content.');
}
const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(
  (match) => match[1],
);
for (const value of urls) {
  if (value.startsWith('#') || /^(tel:|mailto:)/.test(value)) continue;
  const url = new URL(value.replaceAll('&amp;', '&'), pages);
  if (url.origin !== pages.origin) continue;
  if (!url.pathname.startsWith(`${base}/`))
    throw new Error(`Unprefixed asset: ${url.pathname}`);
  const relative = decodeURIComponent(url.pathname.slice(base.length + 1));
  if (relative) await access(path.join(output, relative));
}
await writeFile(path.join(output, '.nojekyll'), '');
console.log(
  'GitHub Pages export verified: homepage, price list and linked assets.',
);
