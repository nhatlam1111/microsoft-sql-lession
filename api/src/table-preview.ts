/** Server-only schema input: read CREATE TABLE metadata; never execute the creation or seed script. */
import schemaSql from '../../database/HRM_Demo.sql?raw';
import { parseSchema } from '../../src/lib/db-schema';

export const PREVIEW_PAGE_SIZE = 50;
const MAX_OFFSET = 2_147_483_647;
const ALLOWED_TABLES = new Set(['PhongBan', 'ChucDanh', 'NhanVien', 'HopDong', 'ChamCong', 'DonNghiPhep', 'BangLuong']);
const tables = new Map(parseSchema(schemaSql).filter(table => ALLOWED_TABLES.has(table.name)).map(table => [table.name, table]));

/** Only the canonical table and zero-based page are inputs; columns and order always come from our schema. */
export function prepareTablePreview(query: URLSearchParams): { table: string; page: number; sql: string } | null {
  if ([...query.keys()].some(key => key !== 'table' && key !== 'page')) return null;
  if (query.getAll('table').length !== 1 || query.getAll('page').length !== 1) return null;
  const table = tables.get(query.get('table')!);
  const rawPage = query.get('page')!;
  if (!table || !/^\d+$/.test(rawPage)) return null;
  const page = Number(rawPage);
  const offset = page * PREVIEW_PAGE_SIZE;
  if (!Number.isSafeInteger(page) || page < 0 || offset > MAX_OFFSET) return null;
  if (!table.columns.length || !table.primaryKey.length) return null;
  const name = (value: string) => `[${value.replace(/]/g, ']]')}]`;
  return {
    table: table.name,
    page,
    sql: `SELECT ${table.columns.map(column => name(column.name)).join(', ')}\nFROM [dbo].${name(table.name)}\nORDER BY ${table.primaryKey.map(name).join(', ')}\nOFFSET ${offset} ROWS FETCH NEXT ${PREVIEW_PAGE_SIZE + 1} ROWS ONLY;`,
  };
}
