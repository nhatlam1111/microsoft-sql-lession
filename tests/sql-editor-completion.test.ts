import { describe, expect, it } from 'vitest';
import { CompletionContext } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { MSSQL } from '@codemirror/lang-sql';
import { createSqlCompletionSources } from '../src/lib/sql-editor-completion';
import type { DbTable } from '../src/lib/db-schema';

const table = (name: string, columns: string[]): DbTable => ({
  name, columns: columns.map(name => ({ name, type: 'nvarchar(50)', nullable: false })),
  primaryKey: [], foreignKeys: [],
});
const tables = [
  table('NhanVien', ['MaNV', 'HoTen', 'MaPB']), table('PhongBan', ['MaPB', 'TenPB']),
  table('ChucDanh', ['MaCD', 'TenCD']), table('HopDong', ['MaHD', 'MaNV']),
  table('BangLuong', ['MaNV', 'LuongCoBan']), table('ChamCong', ['MaNV', 'SoNgayCong']),
  table('LichSuCongTac', ['MaNV', 'NgayBatDau']),
];

async function complete(marked: string, explicit = true) {
  const pos = marked.indexOf('|');
  const doc = marked.replace('|', '');
  const state = EditorState.create({ doc, extensions: MSSQL.extension });
  const results = await Promise.all(createSqlCompletionSources(tables).map(source => source(new CompletionContext(state, pos, explicit))));
  return results.flatMap(result => result?.options ?? []);
}
const labels = async (sql: string) => (await complete(sql)).map(option => option.label);

describe('the real MSSQL completion sources', () => {
  it('offers the seven supplied tables through the default dbo schema', async () => {
    const options = await labels('SELECT * FROM |');
    expect(options).toEqual(expect.arrayContaining(tables.map(table => table.name)));
    expect(await labels('SELECT * FROM dbo.|')).toEqual(expect.arrayContaining(tables.map(table => table.name)));
  });

  it('offers columns through table names, aliases, qualified names and bare column positions', async () => {
    for (const query of [
      'SELECT NhanVien.| FROM NhanVien', 'SELECT nv.| FROM NhanVien AS nv',
      'SELECT nv.| FROM dbo.NhanVien nv', 'SELECT nv.| FROM [dbo].[NhanVien] AS nv',
      'SELECT NV.| FROM dbo.nhanvien AS nv', 'SELECT nhanvien.| FROM nhanvien',
      'SELECT | FROM NhanVien',
    ]) {
      const options = await labels(query);
      expect(options, query).toEqual(expect.arrayContaining(['MaNV', 'HoTen', 'MaPB']));
      expect(options, query).not.toContain('LuongCoBan');
    }
    expect(await labels('SELECT pb.| FROM NhanVien nv JOIN PhongBan pb ON pb.MaPB = nv.MaPB'))
      .toEqual(expect.arrayContaining(['MaPB', 'TenPB']));
    expect(await labels('SELECT * FROM DBO.|')).toEqual(expect.arrayContaining(tables.map(table => table.name)));
  });

  it('uses uppercase keyword hints and removes transaction, execution and DDL commands', async () => {
    const options = await complete('|');
    expect(options.map(option => option.label)).toEqual(expect.arrayContaining(['SELECT', 'FROM', 'WHERE', 'UPDATE', 'SET']));
    for (const word of ['COMMIT', 'ROLLBACK', 'BEGIN', 'SAVE', 'EXEC', 'EXECUTE', 'CREATE', 'ALTER', 'DROP', 'TRUNCATE', 'USE', 'BACKUP', 'RESTORE', 'GO']) {
      expect(options.map(option => option.label)).not.toContain(word);
    }
    expect(options.filter(option => option.type === 'keyword').every(option => option.label === option.label.toUpperCase())).toBe(true);
  });

  it.each([
    "SELECT N'Nhân |viên' FROM NhanVien", "SELECT 'it''s |text' FROM NhanVien",
    'SELECT * FROM NhanVien -- ghi |chú', 'SELECT /* ghi |chú */ * FROM NhanVien',
    "SELECT N'chưa đóng |", 'SELECT /* chưa đóng |',
  ])('never opens suggestions inside strings or comments: %s', async query => {
    expect(await complete(query)).toEqual([]);
  });

  it('keeps schema names even when they happen to match a blocked keyword', async () => {
    const state = EditorState.create({ doc: 'SELECT NhanVien.', extensions: MSSQL.extension });
    const sources = createSqlCompletionSources([table('NhanVien', ['Save', 'Commit'])]);
    const results = await Promise.all(sources.map(source => source(new CompletionContext(state, state.doc.length, true))));
    expect(results.flatMap(result => result?.options.map(option => option.label) ?? [])).toEqual(expect.arrayContaining(['Save', 'Commit']));
  });
});
