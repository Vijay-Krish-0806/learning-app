# Stack

Every version is pinned exactly in `package.json` (no `^`/`~`), and `pnpm-lock.yaml` is committed.
Versions were checked on the npm registry on **2026-11-15**.

## Toolchain

| Tool    | Version                     | Notes                                           |
| ------- | --------------------------- | ----------------------------------------------- |
| Node.js | 24.10.0 (local), `24` in CI | `engines.node: >=24`                            |
| pnpm    | 12.21.0                     | Set in `packageManager`; CI reads it from there |

## Runtime dependencies

| Package                    | Version | Why                                                          |
| -------------------------- | ------- | ------------------------------------------------------------ |
| next                       | 16.4.6  | App Router, static export (ADR-0001)                         |
| react, react-dom           | 19.3.1  | Required by Next 16 / Fumadocs                               |
| fumadocs-core, fumadocs-ui | 16.19.0 | Docs shell (ADR-0002)                                        |
| fumadocs-mdx               | 15.6.0  | MDX content source + build-time frontmatter validation       |
| zod                        | 4.6.7   | Frontmatter schema; Fumadocs' `pageSchema` is a Zod 4 schema |

## Dev dependencies

| Package                                                                       | Version | Why                                                              |
| ----------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------- |
| typescript                                                                    | 6.0.3   | Strict mode. See "Not the latest" below                          |
| tailwindcss, @tailwindcss/postcss                                             | 4.3.5   | Styling; Fumadocs UI requires Tailwind 4                         |
| eslint                                                                        | 9.39.5  | See "Not the latest" below                                       |
| eslint-config-next                                                            | 16.4.6  | `core-web-vitals` + `typescript` flat configs                    |
| eslint-config-prettier                                                        | 10.1.8  | Turns off ESLint style rules that conflict with Prettier         |
| prettier                                                                      | 3.10.1  | Formatting                                                       |
| vitest                                                                        | 5.1.0   | Unit tests for logic (schema now; SM-2 and progress store later) |
| @types/node 26.6.6, @types/react / @types/react-dom 19.3.0, @types/mdx 2.0.14 |         | Types                                                            |

## Not the latest: deliberate choices

- **TypeScript 6.0.3, not 7.0.2.** `typescript-eslint` 8.72.2 (used by `eslint-config-next/typescript`)
  declares `typescript >=4.8.4 <6.1.0`. TypeScript 7 would break linting. Revisit when typescript-eslint
  supports 7.
- **ESLint 9.39.5, not 10.15.0.** The Next.js ESLint docs (updated 2026-10-15) say `eslint-config-next`
  supports ESLint 10. But with ESLint 10, `pnpm peers check` reported unmet peers: `eslint-plugin-react`
  7.37.5, `eslint-plugin-jsx-a11y` 6.10.2 and `eslint-plugin-import` 2.32.0 declare ESLint 9 at most.
  ESLint 9 satisfies everything. Revisit when those plugins declare ESLint 10.
- **Fumadocs 16.19.0 / fumadocs-mdx 15.6.0, not 16.19.3 / 15.6.2.** pnpm 12 has a minimum-release-age
  supply-chain check, and 16.19.3 (published 2026-11-14) was too new, so pnpm wanted to add a
  `minimumReleaseAgeExclude` exception. The project does not bypass that check, so it uses the
  2026-11-11 release pair instead. The exact age threshold was not confirmed:
  `pnpm config get minimumReleaseAge` printed `undefined`.

## Supply-chain settings (`pnpm-workspace.yaml`)

- pnpm blocks dependency install scripts by default. Only `esbuild` is allowed (`allowBuilds`), because
  `fumadocs-mdx` uses it and its install script sets up its native binary.

## CI (`.github/workflows/ci.yml`)

`actions/checkout@v7`, `pnpm/action-setup@v6` (supports pnpm 12; reads `packageManager`),
`actions/setup-node@v7` with `cache: pnpm`. Major tags were checked on the GitHub releases pages on 2026-11-15.

## Planned (not installed yet)

| Package          | Version seen | Phase                          |
| ---------------- | ------------ | ------------------------------ |
| mermaid          | 12.3.0       | A1 (ADR-0005)                  |
| @playwright/test | 1.65.1       | A1 smoke tests                 |
| pagefind         | 1.6.0        | Only if ADR-0003 is superseded |
