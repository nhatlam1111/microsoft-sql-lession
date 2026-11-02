/**
 * The statement guard for exercises. It runs before anything reaches the database, but it is only the
 * second line of defence: the API's SQL user can only read and change data, and every run is rolled back.
 */

const MAX_LENGTH = 4000;
const STARTS = ['select', 'with', 'insert', 'update', 'delete'];
const BLOCKED = /\b(commit|rollback|save|begin\s+tran(?:saction)?|exec|execute|use|go|create|alter|drop|truncate|merge|grant|revoke|deny|backup|restore|dbcc|waitfor|openrowset|openquery|opendatasource|bulk|kill|shutdown|reconfigure)\b/i;

/**
 * T-SQL with its strings, quoted names and comments taken out, read the way SQL Server reads it:
 * '…' becomes '', […] and "…" become [], -- and nested /* *\/ comments become a space.
 * Throws when a string, name or comment is never closed.
 */
export function sanitize(text: string): string {
  let out = '';
  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '-' && next === '-') {
      const end = text.indexOf('\n', i);
      i = end === -1 ? n : end;
      out += ' ';
    } else if (c === '/' && next === '*') {
      let depth = 1;
      i += 2;
      while (i < n && depth > 0) {
        const pair = text.slice(i, i + 2);
        if (pair === '/*') depth++;
        else if (pair === '*/') depth--;
        i += pair === '/*' || pair === '*/' ? 2 : 1;
      }
      if (depth > 0) throw new Error('Unterminated /* comment.');
      out += ' ';
    } else if (c === "'" || c === '"' || c === '[') {
      const close = c === '[' ? ']' : c;
      i++;
      for (;;) {
        if (i >= n) throw new Error(`Unterminated ${c} literal or identifier.`);
        if (text[i] === close) {
          if (text[i + 1] === close) i += 2;
          else break;
        } else i++;
      }
      i++;
      out += c === "'" ? "''" : '[]';
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

export type GuardResult = { ok: true } | { ok: false; reason: string };

const refuse = (reason: string): Extract<GuardResult, { ok: false }> => ({ ok: false, reason });

/** Line breaks as SQL Server reads them: a bare CR ends a -- comment too. The API sends this form to the database. */
export function normalizeSql(text: string): string {
  return text.replace(/\r\n?/g, '\n');
}

/** The checks every statement goes through; a refusal, or the text with strings and comments taken out. */
function inspect(text: string, starts: string[], startsReason: string): Extract<GuardResult, { ok: false }> | string {
  if (!text.trim()) return refuse('Chưa có câu lệnh nào.');
  if (text.length > MAX_LENGTH) return refuse('Câu lệnh dài quá 4.000 ký tự.');
  let stripped: string;
  try {
    // SQL Server ends a number at the first letter, so "1=1COMMIT" is "1=1 COMMIT": split them before matching words.
    stripped = sanitize(normalizeSql(text)).trim().replace(/;+\s*$/, '').replace(/(\d)([a-z_@#$])/gi, '$1 $2');
  } catch {
    return refuse('Có chuỗi hoặc chú thích chưa đóng.');
  }
  if (!stripped) return refuse('Chưa có câu lệnh nào.');
  if (stripped.includes(';')) return refuse('Mỗi lần chỉ chạy một câu lệnh.');
  const first = (stripped.match(/^[a-z]+/i)?.[0] ?? '').toLowerCase();
  if (!starts.includes(first)) return refuse(startsReason);
  const hit = stripped.match(BLOCKED);
  if (hit) {
    const word = /^begin/i.test(hit[1]) ? 'BEGIN TRAN' : hit[1].toUpperCase();
    return refuse(`Lệnh ${word} không dùng được trong bài tập.`);
  }
  // A SET of its own (SET ROWCOUNT, SET NOCOUNT…) would change the pooled connection for later runs.
  const count = (re: RegExp) => stripped.match(re)?.length ?? 0;
  if (count(/\bset\b/gi) > count(/\bupdate\b/gi)) return refuse('Lệnh SET không dùng được trong bài tập.');
  if (/\binto\b/i.test(stripped.replace(/\binsert\s+into\b/gi, ' '))) {
    return refuse('SELECT … INTO tạo bảng mới nên không dùng được trong bài tập.');
  }
  return stripped;
}

export function guardExercise(text: string): GuardResult {
  const seen = inspect(text, STARTS, 'Bài tập chỉ nhận câu bắt đầu bằng SELECT, WITH, INSERT, UPDATE hoặc DELETE.');
  return typeof seen === 'string' ? { ok: true } : seen;
}

/** Arcade runs queries only, so a data change is refused here and not left to the rollback. */
export function guardArcade(text: string): GuardResult {
  const seen = inspect(text, ['select', 'with'], 'Bài luyện chỉ nhận câu bắt đầu bằng SELECT hoặc WITH.');
  if (typeof seen !== 'string') return seen;
  return /\b(insert|update|delete|declare|cursor)\b/i.test(seen) ? refuse('Bài luyện chỉ nhận câu truy vấn.') : { ok: true };
}
