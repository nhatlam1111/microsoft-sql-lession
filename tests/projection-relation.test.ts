import { beforeAll, describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectionRelation from '../src/components/presentations/ProjectionRelation.astro';

let container: AstroContainer;
beforeAll(async () => { container = await AstroContainer.create(); });

const tables = [
  { name: 'PhongBan', columns: ['MaPB', 'TenPB'] },
  { name: 'NhanVien', columns: ['MaNV', 'HoTen', 'MaPB'] },
  { name: 'HopDong', columns: ['MaHD', 'MaNV'] },
];

describe('projection relationship diagram', () => {
  it('introduces the schema without teaching key or cardinality symbols prematurely', async () => {
    const html = await container.renderToString(ProjectionRelation, { props: { tables, variant: 'overview' } });
    for (const name of ['PhongBan', 'NhanVien', 'HopDong', 'HoTen', 'TenPB', 'MaHD']) expect(html).toContain(name);
    expect(html.indexOf('Bảng PhongBan')).toBeLessThan(html.indexOf('Bảng NhanVien'));
    expect(html.indexOf('Bảng NhanVien')).toBeLessThan(html.indexOf('Bảng HopDong'));
    expect(html.match(/class="relation-connector"/g)).toHaveLength(2);
    expect(html).not.toMatch(/>PK<|>FK<|∞|<figcaption\b/);
  });

  it('keeps declared keys and both FK-to-PK paths in the default detailed view', async () => {
    const html = await container.renderToString(ProjectionRelation, { props: { tables } });
    expect(html).toContain('>PK</span>');
    expect(html).toContain('>FK</span>');
    expect(html.match(/1 ← ∞/g)).toHaveLength(2);
    for (const column of ['NhanVien.MaPB', 'PhongBan.MaPB', 'HopDong.MaNV', 'NhanVien.MaNV']) expect(html).toContain(column);
  });

  it.each([
    { name: 'unknown table', tables: [{ name: 'KhongCo', columns: ['Ma'] }], error: 'không có bảng KhongCo' },
    { name: 'unknown column', tables: [{ name: 'NhanVien', columns: ['KhongCo'] }], error: 'không có cột NhanVien.KhongCo' },
    { name: 'undeclared direct relationship', tables: [tables[0], tables[2]], error: 'không có liên kết đã khai báo' },
  ])('still rejects $name in the overview', async ({ tables, error }) => {
    await expect(container.renderToString(ProjectionRelation, { props: { tables, variant: 'overview' } })).rejects.toThrow(error);
  });
});
