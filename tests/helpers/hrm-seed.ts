import { readFileSync } from 'node:fs';

export type SeedCell = string | number | null;
export type SeedRow = Record<string, SeedCell>;

/** Read literal INSERT rows only. This is a source fixture, not a T-SQL engine. */
export function seedRows(table: 'NhanVien' | 'DonNghiPhep' | 'PhongBan' | 'ChucDanh' | 'HopDong'): SeedRow[] {
  const seed = readFileSync('database/HRM_Demo.sql', 'utf8');
  const insert = seed.match(new RegExp(`INSERT INTO dbo\\.${table} \\(([^)]+)\\) VALUES\\s*([\\s\\S]*?);`));
  if (!insert) throw new Error(`Missing literal seed for ${table}`);
  const columns = insert[1].split(',').map(c => c.trim());
  return [...insert[2].matchAll(/^\((.+)\)[,;]?$/gm)].map(m => {
    const cells: SeedCell[] = [...m[1].matchAll(/N?'((?:''|[^'])*)'|\bNULL\b|-?\d+(?:\.\d+)?/g)]
      .map(t => t[1] !== undefined ? t[1].replace(/''/g, "'") : t[0] === 'NULL' ? null : Number(t[0]));
    if (cells.length !== columns.length) throw new Error(`Seed row shape changed: ${table}`);
    return Object.fromEntries(columns.map((c, i) => [c, cells[i]]));
  });
}

export function countsBy(rows: SeedRow[], keys: string[]): SeedCell[][] {
  const groups = new Map<string, number>();
  for (const row of rows) {
    const key = JSON.stringify(keys.map(k => row[k]));
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  return [...groups].map(([key, n]) => [...JSON.parse(key), n]);
}

export function leaveStartingIn(month: string, approvedOnly = true): SeedRow[] {
  return seedRows('DonNghiPhep').filter(r => String(r.TuNgay).startsWith(month)
    && (!approvedOnly || r.TrangThai === 'Đã duyệt'));
}
