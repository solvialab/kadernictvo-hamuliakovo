import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

const pagesUrl = new URL(
  process.env.PAGES_BASE_URL || 'https://solvialab.github.io/kadernictvo-hamuliakovo/',
);
const basePath = pagesUrl.pathname.replace(/\/+$/, '');

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  define: { 'process.env.NEXT_PUBLIC_BASE_PATH': JSON.stringify(basePath) },
  plugins: [
    vinext({
      nextConfig: {
        output: 'export',
        // This single-page site uses native hash links. vinext beta.5's
        // prerender requests omit basePath; keep framework routing at root.
        basePath: '',
        // This vinext version places bundles at artifact root for absolute prefixes.
        assetPrefix: `${pagesUrl.origin}${basePath}`,
        trailingSlash: true,
        images: { unoptimized: true },
      },
    }),
  ],
});
