/**
 * Frontmatter schema for Handbook pages (LEARNING_APP_PLAN.md §7.1).
 *
 * Fumadocs MDX validates every page against this at build time, so a page with
 * bad frontmatter fails `pnpm build`. It lives in its own file so Vitest can
 * test it without running Next.js.
 *
 * Note: the page slug is NOT a frontmatter field. Fumadocs derives it from the
 * file path (content/caching/cache-aside.mdx -> caching/cache-aside), so the
 * path is the single source of truth (see docs/adr/0002).
 */
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

/** The four depth layers of every page (§7.2). */
export const LEVELS = ['fundamentals', 'intermediate', 'production', 'staff'] as const;
export const levelSchema = z.enum(LEVELS);

/** kebab-case, e.g. `cache-invalidation`. */
const kebab = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case (lowercase words joined by "-")');

/** A page slug such as `caching/why-cache`: kebab-case segments joined by "/". */
const slugRef = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/,
    'must be a page slug like "caching/why-cache"',
  );

export const topicSchema = pageSchema
  .extend({
    track: kebab,
    order: z.number().int().nonnegative(),
    levelsCovered: z.array(levelSchema).min(1),
    prerequisites: z.array(slugRef).default([]),
    readingTimeMin: z.number().int().positive(),
    tags: z.array(kebab).default([]),
    interviewPatterns: z.array(kebab).default([]),
    appliedIn: z.array(kebab).default([]),
    priority: z.enum(['core', 'extended']),
    status: z.enum(['draft', 'reviewed']),
    lastVerified: z.iso.date(),
    reviewAfter: z.iso.date(),
    sources: z.array(kebab).default([]),
  })
  // ISO dates (YYYY-MM-DD) compare correctly as plain strings.
  .refine((page) => page.reviewAfter > page.lastVerified, {
    message: 'reviewAfter must be later than lastVerified',
    path: ['reviewAfter'],
  });

export type TopicFrontmatter = z.infer<typeof topicSchema>;

/** `meta.json` for a track folder: Fumadocs fields + a short track summary. */
export const trackMetaSchema = metaSchema.extend({
  summary: z.string().optional(),
});
