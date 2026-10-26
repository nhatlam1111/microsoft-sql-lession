import { DatabaseSync } from 'node:sqlite';
import { runInNewContext } from 'node:vm';
import { seedRows, type SeedRow } from './hrm-seed';
import { lessonBlocks } from './lesson-blocks';

// Source-fixture arithmetic only, NOT a SQL Server syntax/type/collation or live check.
// SQLite shares the SELECT/CTE/window subset used here. Adapt Unicode/date literals,
// and implement the one-argument EOMONTH used by 4.3. No other T-SQL is emulated.
export function fixtureQuery(sql: string, overrides: Partial<Record<'NhanVien' | 'DonNghiPhep' | 'HopDong', SeedRow[]>> = {}) {
  const db = new DatabaseSync(':memory:');
  try {
    for (const table of ['NhanVien', 'DonNghiPhep', 'HopDong'] as const) {
      const rows = overrides[table] ?? seedRows(table), columns = Object.keys(rows[0]);
      db.exec(`CREATE TABLE ${table} (${columns.map(c => `[${c}]`).join(',')})`);
      const insert = db.prepare(`INSERT INTO ${table} VALUES (${columns.map(() => '?').join(',')})`);
      for (const row of rows) insert.run(...columns.map(c => row[c]));
    }
    db.function('EOMONTH', value => {
      const [y, m] = String(value).split('-').map(Number);
      return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
    });
    const adapted = sql.replace(/\bN'/g, "'").replace(/'(\d{4})(\d{2})(\d{2})'/g, "'$1-$2-$3'");
    const statement = db.prepare(adapted);
    statement.setReturnArrays(true);
    return { columns: statement.columns().map(c => c.name), rows: statement.all() as unknown as (string | number | null)[][] };
  } finally { db.close(); }
}

export function lessonExamples(slug: string) {
  const lesson = lessonBlocks(slug);
  const pairs = [...lesson.body.matchAll(/<Sql\b[^>]*code=\{`([^`]*?)`\}[^>]*\/>\s*<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}([^>]*?)\/>/g)].map(m => ({
    sql: runInNewContext('`' + m[1] + '`') as string,
    columns: JSON.parse(m[2]) as string[],
    rows: JSON.parse(m[3]) as (string | number | null)[][],
    total: Number(m[4].match(/total=\{(\d+)\}/)?.[1]),
  }));
  return { ...lesson, pairs };
}
