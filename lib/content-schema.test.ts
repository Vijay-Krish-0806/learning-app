import { describe, expect, it } from 'vitest';
import { topicSchema, trackMetaSchema } from './content-schema';

const validPage = {
  title: 'Cache-aside and cache stampede',
  track: 'caching',
  order: 2,
  levelsCovered: ['fundamentals', 'intermediate', 'production', 'staff'],
  prerequisites: ['caching/why-cache'],
  readingTimeMin: 25,
  tags: ['caching', 'redis'],
  interviewPatterns: ['cache-invalidation', 'thundering-herd'],
  appliedIn: ['notifyx-m5'],
  priority: 'core',
  status: 'draft',
  lastVerified: '2026-11-20',
  reviewAfter: '2027-05-20',
};

/** Paths of the fields that failed validation, e.g. ["priority"]. */
function errorPaths(input: unknown): string[] {
  const result = topicSchema.safeParse(input);
  if (result.success) return [];
  return result.error.issues.map((issue) => issue.path.join('.'));
}

describe('topicSchema', () => {
  it('accepts a complete, valid page', () => {
    expect(topicSchema.safeParse(validPage).success).toBe(true);
  });

  it('fills defaults for optional list fields', () => {
    const parsed = topicSchema.parse({
      ...validPage,
      prerequisites: undefined,
      tags: undefined,
      interviewPatterns: undefined,
      appliedIn: undefined,
    });
    expect(parsed.prerequisites).toEqual([]);
    expect(parsed.tags).toEqual([]);
    expect(parsed.sources).toEqual([]);
  });

  it('rejects a missing priority', () => {
    expect(errorPaths({ ...validPage, priority: undefined })).toContain('priority');
  });

  it('rejects an unknown priority value', () => {
    expect(errorPaths({ ...validPage, priority: 'maybe' })).toContain('priority');
  });

  it('rejects an unknown level', () => {
    expect(errorPaths({ ...validPage, levelsCovered: ['basic'] })).toContain('levelsCovered.0');
  });

  it('rejects an empty levelsCovered list', () => {
    expect(errorPaths({ ...validPage, levelsCovered: [] })).toContain('levelsCovered');
  });

  it('rejects a date that is not YYYY-MM-DD', () => {
    expect(errorPaths({ ...validPage, lastVerified: '20/11/2026' })).toContain('lastVerified');
  });

  it('rejects reviewAfter that is not after lastVerified', () => {
    expect(errorPaths({ ...validPage, reviewAfter: '2026-11-20' })).toContain('reviewAfter');
  });

  it('rejects tags and prerequisites that are not kebab-case slugs', () => {
    const paths = errorPaths({ ...validPage, tags: ['Caching'], prerequisites: ['Caching/Why'] });
    expect(paths).toContain('tags.0');
    expect(paths).toContain('prerequisites.0');
  });
});

describe('trackMetaSchema', () => {
  it('accepts Fumadocs meta fields plus a summary', () => {
    const meta = { title: 'Caching', summary: 'Why and how to cache.', pages: ['why-cache'] };
    expect(trackMetaSchema.safeParse(meta).success).toBe(true);
  });
});
