import { DatabaseSync } from 'node:sqlite';
import { seedRows, type SeedRow } from './hrm-seed';
export type AttendanceTables = Record<'ChamCong' | 'BangLuong' | 'DonNghiPhep', SeedRow[]>;

// Public seed-generation arithmetic for DAY COUNTS only. No database connection and no money fields.
// This is not SQL Server execution, typing, collation, procedure execution or a general T-SQL parser.
export function attendanceFixture(): AttendanceTables {
  const employees = seedRows('NhanVien'), forms = seedRows('DonNghiPhep'), contracts = seedRows('HopDong');
  const work: string[] = [];
  for (let d = new Date('2026-08-01T00:00:00Z'); d <= new Date('2026-09-30T00:00:00Z'); d.setUTCDate(d.getUTCDate()+1)) {
    const day = d.toISOString().slice(0,10);
    if (d.getUTCDay()!==0 && d.getUTCDay()!==6 && !['2026-09-01','2026-09-02'].includes(day)) work.push(day);
  }
  const leave = new Map<string,string>();
  for (const r of forms) if (r.TrangThai==='Đã duyệt') for (const day of work) {
    if (day>=String(r.TuNgay) && day<=String(r.DenNgay)) leave.set(`${r.MaNV}/${day}`,String(r.LoaiNghi));
  }
  const ChamCong: SeedRow[] = [], BangLuong: SeedRow[] = [];
  const september = work.filter(d=>d.startsWith('2026-09'));
  for (const nv of employees) {
    const code=String(nv.MaNV), num=Number(code.slice(2));
    const active=september.filter(d=>d>=String(nv.NgayVaoLam) && (nv.NgayNghiViec===null || d<=String(nv.NgayNghiViec)));
    const before=ChamCong.length;
    for (const day of active) if (!leave.has(`${code}/${day}`) && (num*3+Number(day.slice(-2)))%31!==0) {
      const dom=Number(day.slice(-2));
      ChamCong.push({MaNV:code,Ngay:day,GioVao:(num*dom)%17===0?'08:25:00':'08:00:00',
        GioRa:(num+dom)%29===0?null:num%5===0&&dom%4===0?'18:30:00':'17:30:00'});
    }
    const eligible=contracts.some(h=>h.MaNV===code && String(h.NgayBatDau)<='2026-09-30' &&
      (h.NgayKetThuc===null || (String(h.NgayKetThuc)>='2026-09-01' && String(h.NgayKetThuc)>=String(h.NgayBatDau))));
    if (active.length && eligible) {
      const paid=september.filter(d=>leave.get(`${code}/${d}`)==='Phép năm').length;
      BangLuong.push({KyLuong:'2026-09',MaNV:code,NgayCongChuan:20,
        NgayCongThucTe:ChamCong.length-before+paid+Number(['NV013','NV032'].includes(code))});
    }
  }
  return {ChamCong,BangLuong,DonNghiPhep:forms};
}

const columns: Record<keyof AttendanceTables,string[]> = {
  ChamCong:['MaNV','Ngay','GioVao','GioRa'],
  BangLuong:['KyLuong','MaNV','NgayCongChuan','NgayCongThucTe'],
  DonNghiPhep:['MaDon','MaNV','LoaiNghi','TuNgay','DenNgay','SoNgay','TrangThai'],
};
export function attendanceQuery(sql: string, overrides: Partial<AttendanceTables> = {}): {columns:string[];rows:(string|number|null)[][]} {
  const db=new DatabaseSync(':memory:');
  try {
    const source=attendanceFixture();
    for (const table of Object.keys(columns) as (keyof AttendanceTables)[]) {
      const cols=columns[table]; db.exec(`CREATE TABLE ${table} (${cols.map(c=>`[${c}]`).join(',')})`);
      const insert=db.prepare(`INSERT INTO ${table} VALUES (${cols.map(()=>'?').join(',')})`);
      for (const row of overrides[table]??source[table]) insert.run(...cols.map(c=>row[c]));
    }
    let adapted=sql.replace(/\bN'/g,"'").replace(/'(\d{4})(\d{2})(\d{2})'/g,"'$1-$2-$3'")
      .replace(/\bdbo\.(ChamCong|BangLuong|DonNghiPhep)\b/g,'$1');
    // ONLY the provided literal date-list CTE: SQLite lacks SQL Server's derived VALUES column alias.
    const calendar=/LichLam AS \(\s*SELECT CAST\(l\.Ngay AS date\) AS \[Ngay\]\s*FROM \(VALUES\s*((?:\('\d{4}-\d{2}-\d{2}'\)\s*,?\s*)+)\) AS l\(Ngay\)\s*\)/;
    adapted=adapted.replace(calendar,(_all,values:string)=>`LichLam(Ngay) AS (VALUES ${values})`);
    if (/\bCAST\s*\(|\bFROM\s*\(VALUES/i.test(adapted)) throw new Error('Unsupported dialect outside the literal LichLam CTE fixture model');
    const statement=db.prepare(adapted);statement.setReturnArrays(true);
    return {columns:statement.columns().map(c=>c.name),rows:statement.all() as unknown as (string|number|null)[][]};
  } finally {db.close();}
}
