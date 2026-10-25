/**
 * The statement guard for exercises. It runs before anything reaches the database, but it is only the
 * second line of defence: the API's SQL user can only read and change data, and every run is rolled back.
 */

const MAX_LENGTH = 4000;
const STARTS = ['select', 'with', 'insert', 'update', 'delete'];
const BLOCKED = new Set([
  'begin', 'commit', 'rollback', 'save', 'exec', 'execute', 'use', 'go',
  'create', 'alter', 'drop', 'truncate', 'merge', 'grant', 'revoke', 'deny',
  'backup', 'restore', 'dbcc', 'waitfor', 'openrowset', 'openquery', 'opendatasource',
  'bulk', 'kill', 'shutdown', 'reconfigure',
]);
const TRANSACTION_COMMANDS = new Set(['begin', 'commit', 'rollback', 'save']);

/** Completion hides the same unconditional commands as the server guard; SET and INTO remain context-dependent. */
export function isBlockedCompletionKeyword(word: string): boolean {
  return BLOCKED.has(word.toLowerCase());
}

// Recognize complete binary/decimal literals before identifiers: 0x1ROLLBACK is 0x1 then ROLLBACK,
// just as 1COMMIT is 1 then COMMIT. A name such as Ma1COMMIT remains one identifier.
const TOKENS = /0x[0-9a-f]*|\d+(?:\.\d*)?(?:e[+-]?\d+)?|\.\d+(?:e[+-]?\d+)?|[\p{L}_@#][\p{L}\p{N}\p{M}_@#$]*|[^\s]/giu;

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

const refuse = (reason: string): GuardResult => ({ ok: false, reason });

/** Line breaks as SQL Server reads them: a bare CR ends a -- comment too. The API sends this form to the database. */
export function normalizeSql(text: string): string {
  return text.replace(/\r\n?/g, '\n');
}

export function guardExercise(text: string): GuardResult {
  if (!text.trim()) return refuse('Chưa có câu lệnh nào.');
  if (text.length > MAX_LENGTH) return refuse('Câu lệnh dài quá 4.000 ký tự.');
  let stripped: string;
  try {
    stripped = sanitize(normalizeSql(text)).trim().replace(/;+\s*$/, '');
  } catch {
    return refuse('Có chuỗi hoặc chú thích chưa đóng.');
  }
  if (!stripped) return refuse('Chưa có câu lệnh nào.');
  if (stripped.includes(';')) return refuse('Mỗi lần chỉ chạy một câu lệnh.');
  const tokens = (stripped.match(TOKENS) ?? []).map(token => token.toLowerCase());
  const blockedAt = tokens.findIndex(isBlockedCompletionKeyword);
  if (blockedAt !== -1) {
    const command = tokens[blockedAt];
    const word = command === 'begin' && /^tran(?:saction)?$/.test(tokens[blockedAt + 1] ?? '') ? 'BEGIN TRAN' : command.toUpperCase();
    const explanation = TRANSACTION_COMMANDS.has(command) ? '; hệ thống tự mở và hoàn tác giao dịch cho mỗi lần chạy.' : '.';
    return refuse(`Lệnh ${word} không dùng được trong bài tập${explanation}`);
  }
  if (!STARTS.includes(tokens[0] ?? '')) return refuse('Bài tập chỉ nhận câu bắt đầu bằng SELECT, WITH, INSERT, UPDATE hoặc DELETE.');
  // A SET of its own (SET ROWCOUNT, SET NOCOUNT…) would change the pooled connection for later runs.
  const count = (word: string) => tokens.filter(token => token === word).length;
  if (count('set') > count('update')) return refuse('Lệnh SET không dùng được trong bài tập.');
  if (tokens.some((token, i) => token === 'into' && tokens[i - 1] !== 'insert')) {
    return refuse('SELECT … INTO tạo bảng mới nên không dùng được trong bài tập.');
  }
  return { ok: true };
}
