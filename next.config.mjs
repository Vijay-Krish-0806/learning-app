import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Static export: `next build` writes plain HTML/JS/CSS to `out/`. No server needed (ADR 0001).
  output: 'export',
  // Next's image optimizer needs a server, so it is turned off for static export.
  images: { unoptimized: true },
};

// Fumadocs MDX is ESM-only, which is why this file is `.mjs`.
const withMDX = createMDX();

export default withMDX(config);
