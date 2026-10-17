export type LevelNo = 1 | 2 | 3 | 4 | 5 | 6;
export type AreaId = 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8';

export interface LevelDef { no: LevelNo; name: string; outcome: string; color: string; soft: string }
export interface AreaDef { id: AreaId; name: string; side: 'right' | 'left'; order: number }

export const LEVELS: LevelDef[] = [
  { no: 1, name: 'Làm quen', outcome: 'Biết dữ liệu của hệ thống nhân sự nằm ở đâu, mở ra đọc được', color: '#0F8B8D', soft: '#DCF2F2' },
  { no: 2, name: 'Cơ bản', outcome: 'Tự lấy danh sách nhân viên theo điều kiện bất kỳ', color: '#2F6FD6', soft: '#E3ECFC' },
  { no: 3, name: 'Trung cấp', outcome: 'Tự làm báo cáo từ nhiều bảng, thay cho VLOOKUP và PivotTable', color: '#5B4BC4', soft: '#EBE8FA' },
  { no: 4, name: 'Phân tích', outcome: 'Phân tích, đối soát dữ liệu và viết yêu cầu báo cáo rõ ràng', color: '#9B3FAE', soft: '#F4E6F7' },
  { no: 5, name: 'Nâng cao', outcome: 'Hiểu thiết kế database, sửa dữ liệu an toàn, biết vì sao truy vấn chậm', color: '#C4581F', soft: '#FBEADF' },
  { no: 6, name: 'Cấp cứu dữ liệu', outcome: 'Biết phải làm gì khi dữ liệu gặp sự cố (lý thuyết)', color: '#8A2D16', soft: '#F6E2DB' },
];

export const AREAS: AreaDef[] = [
  { id: 'A1', name: 'Nền tảng database', side: 'right', order: 0 },
  { id: 'A2', name: 'Lấy và lọc dữ liệu', side: 'right', order: 1 },
  { id: 'A3', name: 'Tính toán trong câu lệnh', side: 'right', order: 2 },
  { id: 'A4', name: 'Kết bảng / lệnh JOIN', side: 'right', order: 3 },
  { id: 'A5', name: 'Tổng hợp và phân tích', side: 'left', order: 0 },
  { id: 'A6', name: 'Làm việc với dữ liệu thật', side: 'left', order: 1 },
  { id: 'A7', name: 'Sửa dữ liệu và hiệu năng', side: 'left', order: 2 },
  { id: 'A8', name: 'An toàn và cấp cứu dữ liệu', side: 'left', order: 3 },
];
