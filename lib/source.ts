import { loader } from 'fumadocs-core/source';
import { defineDocs } from 'fumadocs-mdx/macro';
import { topicSchema, trackMetaSchema } from '@/lib/content-schema';

// The macro is expanded at build time by the fumadocs-mdx bundler plugin into
// static imports of every file under `content/`. `dir` must be a string literal.
const docs = defineDocs({
  dir: 'content',
  docs: { schema: topicSchema },
  meta: { schema: trackMetaSchema },
});

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
