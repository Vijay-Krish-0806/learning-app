# ADR-0005: Mermaid diagrams rendered client-side

- **Status:** Accepted
- **Date:** 2026-11-15

## Context

Pages need diagrams that show real mechanisms: the order of events and where things fail (§3.1 rule 10).
Diagrams should be text inside the MDX (diff-able), work with static export, and follow the dark/light
theme. Fumadocs documents a Mermaid integration: a `'use client'` component that lazy-loads `mermaid`
and re-renders with the dark theme when the `dark` class on `<html>` changes, plus a `remarkMdxMermaid`
plugin that turns `mermaid` code blocks into that component.

## Decision

The app renders Mermaid diagrams in the browser, using the Fumadocs-documented `Mermaid` client component
and `remarkMdxMermaid` from `fumadocs-core/mdx-plugins`. Implementation is in phase A1.

## Alternatives considered

### Build-time rendering to SVG

- Render diagrams to static SVG during `next build`.
- Not chosen now: it adds a build-time renderer and its dependencies, and dark/light variants need extra
  work. Not evaluated hands-on; reconsider if the client-side JavaScript cost becomes a problem.

### Hand-drawn SVG or images

- Draw diagrams in a tool and commit the image files.
- Not chosen: images are not diff-able as text and are harder to keep accurate as pages change.

## Consequences

**Positive**

- Diagrams are plain text in MDX, and following the theme is handled by the documented component.
- No build-time browser or extra tooling.

**Negative**

- The `mermaid` library is downloaded and run in the browser (lazy-loaded). Its bundle cost is not yet
  measured.
- Diagrams are not in the HTML until JavaScript runs, so they do not appear without JavaScript.

**Follow-ups**

- A1: add the component; check rendering in both themes and in print; measure the added JavaScript.

## References

- https://fumadocs.dev/docs/next/markdown/mermaid (read 2026-11-15)
- `mermaid` 12.3.0 on npm (checked 2026-11-15)
