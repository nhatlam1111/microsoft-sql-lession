import { runInNewContext } from 'node:vm';
import type { FlowCell, FlowStep } from '../../src/lib/run-flow';
import { readLessonFiles } from './lessons';

const literal = <T>(s: string): T => JSON.parse(JSON.stringify(runInNewContext(`(${s})`)));
export function lessonBlocks(slug: string) {
  const lesson = readLessonFiles().find(l => l.slug === slug);
  if (!lesson) throw new Error(`Missing lesson: ${slug}`);
  // MDX/JavaScript normalize literal line endings; compare captured source the same way on Windows.
  const body = lesson.body.replace(/\r\n?/g, '\n');
  const flow = body.match(/<RunFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\}(?: note="[^"]*")? \/>/);
  const results = [...body.matchAll(/<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}([^>]*?)\/>/g)]
    .map(m => ({ columns: literal<string[]>(m[1]), rows: literal<FlowCell[][]>(m[2]),
      total: Number(m[3].match(/total=\{(\d+)\}/)?.[1] ?? literal<FlowCell[][]>(m[2]).length) }));
  return { ...lesson, body, results, query: flow ? literal<string>('`' + flow[1] + '`') : '', steps: flow ? literal<FlowStep[]>(flow[2]) : [] };
}
