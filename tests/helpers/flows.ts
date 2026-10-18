import type { FlowCell, FlowStep } from '../../src/lib/run-flow';

/** The final query of lesson 3.5, comment included. */
export function sampleQuery(): string {
  return [
    'SELECT nv.MaNV, nv.HoTen, nv.MaPB, nv.NgayVaoLam',
    'FROM NhanVien AS nv',
    'LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV',
    'WHERE hd.MaHD IS NULL   -- dò không ra hợp đồng nào',
    'ORDER BY nv.MaNV;',
  ].join('\n');
}

const nv = (i: number) => `NV${String(i).padStart(3, '0')}`;
const people = (n: number, row: (i: number) => FlowCell[]) => Array.from({ length: n }, (_, i) => row(i + 1));
const NV_COLUMNS = ['MaNV', 'HoTen', 'GioiTinh', 'NgaySinh', 'SoCCCD', 'Email', 'NgayVaoLam', 'NgayNghiViec', 'MaPB', 'MaCD', 'MaQuanLy', 'TrangThai'];
const LATE = [['NV047', 'Người 47', 'NS', '2026-10-01'], ['NV048', 'Người 48', 'IT', '2026-10-05']];

/** Five steps shaped like lesson 3.5's flow, with made-up rows. */
export function sampleFlow(): FlowStep[] {
  return [
    {
      clause: 'FROM', title: 'Lấy bảng NhanVien làm bảng gốc.', focus: 'FROM NhanVien AS nv',
      meaning: '`FROM` cho biết lấy dữ liệu từ bảng nào.', detail: 'Bảng `NhanVien` có 48 người.',
      sql: 'SELECT *\nFROM NhanVien AS nv;', columns: NV_COLUMNS, total: 48,
      rows: people(10, i => [nv(i), `Người ${i}`, 'Nữ', '1990-01-01', '000000000000', 'a@b.vn', '2024-01-01', null, 'KT', 'CV', 'NV004', 'Đang làm']),
    },
    {
      clause: 'LEFT JOIN', title: 'Ghép mỗi nhân viên với hợp đồng của họ.', focus: 'LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV',
      meaning: '`LEFT JOIN` ghép bảng bên trái với các dòng khớp ở bảng bên phải theo điều kiện sau `ON`.',
      detail: 'Bảng `NhanVien` có 48 người, thành 57 dòng.',
      sql: 'SELECT nv.MaNV, nv.HoTen, hd.MaHD, nv.MaPB, nv.NgayVaoLam\nFROM NhanVien AS nv\nLEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV;',
      columns: ['MaNV', 'HoTen', 'MaHD', 'MaPB', 'NgayVaoLam'], total: 57,
      rows: people(10, i => [nv(i), `Người ${i}`, i === 1 ? null : `HD-${i}`, 'KT', '2024-01-01']),
    },
    {
      clause: 'WHERE', title: 'Chỉ giữ những dòng không dò ra hợp đồng.', focus: 'WHERE hd.MaHD IS NULL',
      meaning: '`WHERE` giữ lại những dòng đúng điều kiện.', detail: 'Còn 2 dòng.',
      sql: 'SELECT nv.MaNV, nv.HoTen, hd.MaHD\nFROM NhanVien AS nv\nLEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV\nWHERE hd.MaHD IS NULL;',
      columns: ['MaNV', 'HoTen', 'MaHD'], total: 2, rows: LATE.map(r => [r[0], r[1], null]),
    },
    {
      clause: 'SELECT', title: 'Chọn 4 cột.', focus: 'SELECT nv.MaNV, nv.HoTen, nv.MaPB, nv.NgayVaoLam',
      meaning: '`SELECT` chọn cột để đưa ra.', detail: 'Còn 4 cột.',
      sql: 'SELECT nv.MaNV, nv.HoTen, nv.MaPB, nv.NgayVaoLam\nFROM NhanVien AS nv\nLEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV\nWHERE hd.MaHD IS NULL;',
      columns: ['MaNV', 'HoTen', 'MaPB', 'NgayVaoLam'], total: 2, rows: LATE,
    },
    {
      clause: 'ORDER BY', title: 'Sắp xếp theo mã nhân viên.', focus: 'ORDER BY nv.MaNV',
      meaning: '`ORDER BY` sắp xếp các dòng.', detail: 'Hai dòng theo thứ tự mã.',
      sql: sampleQuery(), columns: ['MaNV', 'HoTen', 'MaPB', 'NgayVaoLam'], total: 2, rows: LATE,
    },
  ];
}
