import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Last, so it switches off any style rules that would fight Prettier.
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', '.source/**', 'next-env.d.ts']),
]);
