import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { presentationSchema, sortPresentations } from '../../src/lib/presentations';

export function readPresentations() {
  const dir = 'src/content/presentations';
  return sortPresentations((existsSync(dir) ? readdirSync(dir) : []).filter(name => name.endsWith('.mdx')).map(name => {
    const raw = readFileSync(join(dir, name), 'utf8');
    const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!frontmatter) throw new Error(`${name}: missing frontmatter`);
    return { slug: name.replace(/\.mdx$/, ''), ...presentationSchema.parse(parse(frontmatter[1])) };
  }));
}
