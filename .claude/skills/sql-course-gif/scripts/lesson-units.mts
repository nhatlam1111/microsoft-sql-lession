import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { FlowCell, FlowStep } from '../../../../src/lib/run-flow.ts';

const repoRequire = createRequire(resolve('package.json'));
const { createProcessor } = await import(pathToFileURL(repoRequire.resolve('@mdx-js/mdx')).href);
const { parse } = repoRequire('yaml');
const { normalizeSql } = await import(pathToFileURL(resolve('src/lib/sql-guard.ts')).href);
const { checkFlow } = await import(pathToFileURL(resolve('src/lib/run-flow.ts')).href);

interface StoryTable {
  title?: string;
  columns: string[];
  rows: FlowCell[][];
  total?: number;
  scope?: string;
  keys?: string[];
}

interface ConceptStep extends StoryTable {
  state: string;
  title: string;
  meaning: string;
  detail: string;
  scope: string;
}

interface Concept {
  title: string;
  assumptions: string;
  steps: ConceptStep[];
}

const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const isCell = (value: unknown): value is FlowCell =>
  value === null || typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));

function validateTable(value: unknown, where: string): asserts value is StoryTable {
  const table = value as StoryTable;
  if (!table || !Array.isArray(table.columns) || table.columns.length === 0 || !table.columns.every(isText))
    throw new Error(`${where} thiếu tên cột.`);
  if (!Array.isArray(table.rows) ||
      table.rows.some(row => !Array.isArray(row) || row.length !== table.columns.length || !row.every(isCell)))
    throw new Error(`${where} có dòng mẫu sai kích thước hoặc giá trị.`);
  if (table.total !== undefined && (!Number.isSafeInteger(table.total) || table.total < table.rows.length))
    throw new Error(`${where} có tổng nhỏ hơn mẫu hoặc không hợp lệ.`);
  if (table.keys !== undefined && (!Array.isArray(table.keys) || !table.keys.length ||
      table.keys.some(key => !table.columns.includes(key))))
    throw new Error(`${where} có khóa ngoài bảng.`);
}

function validateConcept(value: unknown): asserts value is Concept {
  const concept = value as Concept;
  if (!concept || !isText(concept.title) || !isText(concept.assumptions) ||
      !Array.isArray(concept.steps) || concept.steps.length === 0)
    throw new Error('Diễn biến cần tiêu đề, giả định và ít nhất một trạng thái.');
  for (const [index, step] of concept.steps.entries()) {
    const label = `trạng thái ${index + 1}`;
    validateTable(step, label);
    if (![step.state, step.title, step.meaning, step.detail, step.scope].every(isText))
      throw new Error(`${label} thiếu tên, mô tả hoặc phạm vi.`);
  }
}

interface Owner {
  num: string;
  slug: string;
}

export type LessonUnit = Owner & { id: string } & (
  { kind: 'sql'; query: string; steps: FlowStep[] } |
  { kind: 'concept'; concept: Concept }
);

const processor = createProcessor();
const validId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Read only the literal data from JSX. Import statements and other expressions in MDX never run.
function literal(node: any): unknown {
  switch (node?.type) {
    case 'Literal':
      return node.value;
    case 'TemplateLiteral':
      if (node.expressions.length === 0) return node.quasis[0].value.cooked;
      break;
    case 'ArrayExpression':
      return node.elements.map(literal);
    case 'ObjectExpression':
      return Object.fromEntries(node.properties.map((property: any) => {
        if (property.type !== 'Property' || property.kind !== 'init' || property.computed || property.method)
          throw new Error('Thuộc tính phải dùng dữ liệu viết trực tiếp.');
        const key = property.key.type === 'Identifier' ? property.key.name : literal(property.key);
        return [key, literal(property.value)];
      }));
    case 'UnaryExpression':
      if (node.operator === '-' && typeof node.argument.value === 'number') return -node.argument.value;
      break;
  }
  throw new Error('Thuộc tính phải dùng dữ liệu viết trực tiếp.');
}

function attribute(element: any, name: string): unknown {
  const entry = element.attributes.find((item: any) => item.name === name);
  if (typeof entry?.value === 'string') return entry.value;
  return entry ? literal(entry.value?.data?.estree?.body[0]?.expression) : undefined;
}

export function readLessonUnits(slug: string, source: string, draftFlowId?: string) {
  const frontmatter = normalizeSql(source).match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!frontmatter) throw new Error(`Bài ${slug} thiếu frontmatter.`);
  const { num, slug: explicitSlug } = parse(frontmatter[1]);
  if (typeof num !== 'string' || !/^\d+\.\d+$/.test(num)) throw new Error(`Mã bài không hợp lệ trong ${slug}.`);
  const owner = { num, slug: explicitSlug ?? slug };
  const units: LessonUnit[] = [];
  // A heading starts a new section. Prose between a SQL block and its player is allowed.
  const body = normalizeSql(source).slice(frontmatter[0].length);
  let previousSql: unknown;
  for (const child of processor.parse(body).children) {
    if (child.type === 'heading') previousSql = undefined;
    if (child.type !== 'mdxJsxFlowElement') continue;
    if (child.name === 'Sql') {
      previousSql = child;
      continue;
    }
    const draft = draftFlowId && child.name === 'RunFlow';
    if (child.name !== 'AnimatedFlow' && !draft) continue;

    let id: unknown;
    try {
      id = draft ? draftFlowId : attribute(child, 'animation');
      if (typeof id !== 'string' || !validId.test(id)) throw new Error('Asset ID không hợp lệ.');
      const concept = attribute(child, 'concept');
      const query = attribute(child, 'query');
      const steps = attribute(child, 'steps');
      if (concept !== undefined) {
        if (query !== undefined || steps !== undefined) throw new Error('Concept chỉ dùng bảng trạng thái.');
        validateConcept(concept);
        units.push({ ...owner, id, kind: 'concept', concept });
      } else {
        if (typeof query !== 'string' || !Array.isArray(steps)) throw new Error('Thiếu query hoặc steps.');
        const code = previousSql && attribute(previousSql, 'code');
        if (typeof code !== 'string' || normalizeSql(code) !== normalizeSql(query) || !query.trim()) {
          throw new Error('Query phải khớp câu SQL đầy đủ ngay trước player trong cùng mục.');
        }
        for (const [index, step] of steps.entries())
          validateTable(step, `bước ${index + 1} (${step?.clause ?? '?'})`);
        const problems = checkFlow(steps, normalizeSql(query));
        if (problems.length) throw new Error(problems.join(' '));
        units.push({ ...owner, id, kind: 'sql', query: normalizeSql(query), steps });
      }
    } catch (error) {
      throw new Error(`Bài ${num}, unit ${id ?? '?'}, dòng ${(child.position?.start.line ?? 1) + frontmatter[0].split('\n').length - 1}. ${(error as Error).message}`);
    }
    previousSql = undefined;
  }
  return { ...owner, units };
}

export function lessonUnits(sources: Record<string, string>, lesson: string, assetId?: string): LessonUnit[] {
  const catalog = Object.entries(sources).map(([slug, source]) => readLessonUnits(slug, source));
  const byId = new Map<string, LessonUnit>();
  for (const { units } of catalog) {
    for (const unit of units) {
      const previous = byId.get(unit.id);
      if (previous) throw new Error(`Unit ${unit.id} trùng ở bài ${previous.num} (${previous.slug}) và ${unit.num} (${unit.slug}).`);
      byId.set(unit.id, unit);
    }
  }
  const matches = catalog.filter(item => item.num === lesson || item.slug === lesson);
  if (matches.length !== 1) throw new Error(`Cần đúng một bài cho ${lesson}, tìm thấy ${matches.length}.`);
  const selected = matches[0];
  if (!assetId) return selected.units;
  const unit = byId.get(assetId);
  if (!unit) throw new Error(`Bài ${selected.num} không tìm thấy unit ${assetId}.`);
  if (unit.slug !== selected.slug || unit.num !== selected.num)
    throw new Error(`Bài ${selected.num} không sở hữu unit ${assetId} của bài ${unit.num}.`);
  return [unit];
}

export function loadLessonUnits(lesson: string, assetId?: string, folder = 'src/content/lessons') {
  const sources = Object.fromEntries(readdirSync(folder).filter(file => file.endsWith('.mdx')).map(file =>
    [file.slice(0, -4), readFileSync(join(folder, file), 'utf8')]));
  return lessonUnits(sources, lesson, assetId);
}
