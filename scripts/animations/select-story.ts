import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

/** The pilot storyboard depicts one specific projection, not arbitrary SQL. */
export function selectStory(query: string, steps: FlowStep[]) {
  const problems = checkFlow(steps, query);
  if (problems.length) throw new Error(problems.join('\n'));
  const [source, result] = steps;
  const names = [...query.matchAll(/(\w+) AS \[([^\]]+)\]/g)].map(match => match[1]);
  const illustratedQuery = `SELECT ${names.map((name, i) => `${name} AS [${result.columns[i]}]`).join(', ')} FROM NhanVien;`;
  const normalize = (sql: string) => sql.replace(/\s+/g, ' ').trim();
  if (steps.length !== 2 || source.clause !== 'FROM' || result.clause !== 'SELECT'
    || normalize(query) !== illustratedQuery || normalize(source.sql) !== 'SELECT * FROM NhanVien;'
    || normalize(result.sql) !== illustratedQuery || source.total !== result.total
    || JSON.stringify(names) !== JSON.stringify(['MaNV', 'HoTen', 'NgayVaoLam'])
    || source.rows.length !== 4 || source.rows[3][0] !== 'NV033'
    || source.rows[3][source.columns.indexOf('TrangThai')] !== 'Đã nghỉ') {
    throw new Error('Kịch bản bài 2.1 cần cập nhật trước khi dựng SQL hoặc dữ liệu có ngữ nghĩa khác.');
  }
  if (result.rows.length !== source.rows.length || source.rows.some((row, i) =>
    names.some((name, j) => row[source.columns.indexOf(name)] !== result.rows[i][j]))) {
    throw new Error('Dữ liệu SELECT không khớp phép chọn cột');
  }
  return { source, result, names };
}
