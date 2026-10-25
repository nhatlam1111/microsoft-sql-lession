import type { FlowStep } from '../../src/lib/run-flow';

// Deliberately small fake rows for topology/render tests, not HRM_Demo results.
export const unionQuery = 'SELECT MaNV\nFROM DonNghiPhep\nUNION\nSELECT MaNV\nFROM ChamCong\nORDER BY MaNV;';
export function unionFlow(): FlowStep[] {
  const common = { columns: ['MaNV'], meaning: 'Chọn mã trong nguồn.', detail: 'Các dòng kiểm thử minh họa cấu trúc.' };
  return [
    { ...common, clause: 'SELECT', title: 'Nhánh đơn nghỉ.', focus: 'SELECT MaNV\nFROM DonNghiPhep', sql: 'SELECT MaNV FROM DonNghiPhep;', rows: [['NV005']], total: 1 },
    { ...common, clause: 'SELECT', title: 'Nhánh chấm công.', focus: 'SELECT MaNV\nFROM ChamCong', sql: 'SELECT MaNV FROM ChamCong;', rows: [['NV005'], ['NV012']], total: 2 },
    { ...common, clause: 'UNION', title: 'Gộp và bỏ dòng trùng.', focus: 'UNION', sql: unionQuery.replace('\nORDER BY MaNV;', ';'), rows: [['NV005'], ['NV012']], total: 2 },
    { ...common, clause: 'ORDER BY', title: 'Sắp kết quả chung.', focus: 'ORDER BY MaNV', sql: unionQuery, rows: [['NV005'], ['NV012']], total: 2 },
  ];
}
