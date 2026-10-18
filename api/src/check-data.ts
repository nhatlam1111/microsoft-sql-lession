/** Compares row counts and checksums of the 7 HRM_Demo tables with database/HRM_Demo.checksums.json; --write saves them. Read only. */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRunner } from './runner';
import { localConfig } from './local-config';

const TABLES = ['PhongBan', 'ChucDanh', 'NhanVien', 'HopDong', 'ChamCong', 'DonNghiPhep', 'BangLuong'];
const FILE = new URL('../../database/HRM_Demo.checksums.json', import.meta.url);

const runner = createRunner(localConfig());
const pool = await runner.getPool();
const now: Record<string, { n: number; c: number }> = {};
for (const t of TABLES) {
  const r = await pool.request().query(`SELECT COUNT(*) AS n, CHECKSUM_AGG(BINARY_CHECKSUM(*)) AS c FROM dbo.${t}`);
  now[t] = { n: r.recordset[0].n, c: r.recordset[0].c };
}
await runner.close();

if (process.argv.includes('--write')) {
  writeFileSync(FILE, JSON.stringify(now, null, 2) + '\n');
  console.log('Đã ghi checksum chuẩn của 7 bảng.');
  process.exit(0);
}
const saved = JSON.parse(readFileSync(FILE, 'utf8')) as typeof now;
const changed = TABLES.filter(t => saved[t]?.n !== now[t].n || saved[t]?.c !== now[t].c);
if (changed.length) {
  console.log(`Lệch ở: ${changed.join(', ')}. Chạy lại database/HRM_Demo.sql để đưa dữ liệu về chuẩn.`);
  process.exit(1);
}
console.log('Không bảng nào lệch.');
