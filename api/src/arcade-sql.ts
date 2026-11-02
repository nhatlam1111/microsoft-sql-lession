/** Turns a test's tables and rows into SQL. Everything here comes from the challenge files, never from the learner. */
import type { Cell } from '../../src/lib/grade';
import type { TableDefs, TableRows } from '../../src/lib/arcade-types';

// One VALUES list takes at most 1000 rows.
const MAX_VALUES = 1000;

const quote = (text: string) => `'${text.replace(/'/g, "''")}'`;

export function sqlLiteral(value: Cell, columnType: string): string {
  if (value === null) return 'NULL';
  if (typeof value === 'boolean') return value ? '1' : '0';
  if (typeof value === 'number') return String(value);
  return /^n(var)?char\b/i.test(columnType.trim()) ? `N${quote(value)}` : quote(value);
}

// Throttling, used-up resources, a database going to sleep and deadlocks say nothing about the statement that met them.
const TRANSIENT_ERRORS = new Set([1205, 10928, 10929, 40501, 40613]);

export const isTransientSqlError = (number?: number) => number !== undefined && TRANSIENT_ERRORS.has(number);

/** `reverse` inserts the rows backwards, to show that a result does not depend on the order they went in. */
export function buildSetup(tables: TableDefs, rows: TableRows, { reverse = false }: { reverse?: boolean } = {}): string {
  const statements: string[] = [];
  for (const [table, columns] of Object.entries(tables)) {
    const declared = Object.entries(columns).map(([name, type]) => `[${name}] ${type}`).join(', ');
    statements.push(`CREATE TABLE dbo.[${table}] (${declared});`);
    const types = Object.values(columns);
    const list = [...(rows[table] ?? [])];
    if (reverse) list.reverse();
    for (let i = 0; i < list.length; i += MAX_VALUES) {
      const values = list.slice(i, i + MAX_VALUES).map(row => `(${row.map((v, c) => sqlLiteral(v, types[c])).join(', ')})`);
      statements.push(`INSERT INTO dbo.[${table}] VALUES ${values.join(', ')};`);
    }
  }
  return statements.join('\n');
}
