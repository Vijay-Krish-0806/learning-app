# ADR-0001: Next.js and MDX as a static site

- **Status:** Accepted
- **Date:** 2026-11-15

## Context

The Systems Handbook is a personal knowledge base of roughly 120-180 pages (LEARNING_APP_PLAN.md §8)
with interactive revision tools: hidden Q&A answers, flashcards with spaced repetition, quizzes and
progress tracking (§4). Constraints from §4.4: no backend, no database, no accounts, no paid services.
Content must stay portable, diff-able plain text in git so it is never locked into the app. The
owner works daily with Next.js, so the app code should be readable and changeable without learning a
new framework.

## Decision

The Handbook is a Next.js (App Router, TypeScript strict) application that renders MDX files from
`content/` and is built with `output: 'export'` into static HTML/CSS/JS in `out/`. All user state lives
in the browser (see ADR-0004).

## Alternatives considered

### Single Claude artifact (one HTML/React file)

- A single page holding all content.
- Not chosen: a 150-page knowledge base in one file is hard to author, search, review and version.

### Plain HTML/CSS/JS

- Hand-written pages without a framework.
- Not chosen: navigation, search, MDX components and diagrams would all be rebuilt by hand.

### Notion or Obsidian

- Existing note-taking tools.
- Not chosen: no custom revision tools (spaced repetition, scenario drills, progress map) and no
  build-time quality gates such as frontmatter validation.

## Consequences

**Positive**

- Content is plain MDX in git: reviewable in diffs and usable without the app.
- Custom React components (Quiz, Flashcards, Level) can be used inside pages.
- A static build needs no server; it runs locally or on any free static host.

**Negative**

- Static export rules out server features: route handlers with dynamic responses, server-side image
  optimization (disabled via `images.unoptimized`), and middleware/proxy.
- All interactivity and state handling run client-side.

**Follow-ups**

- Hosting choice (local vs static host) is decided later in ADR-0008.

## References

- LEARNING_APP_PLAN.md §2, §4, §5
- Fumadocs static export guide: https://fumadocs.dev/docs/deploying/static (read 2026-11-15)
