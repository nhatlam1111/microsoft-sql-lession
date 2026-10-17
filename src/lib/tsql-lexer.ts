export type RawTokenType = 'space' | 'comment' | 'string' | 'variable' | 'word' | 'number' | 'symbol';
export interface RawToken { text: string; type: RawTokenType }

// Tried in order at each position; every rule is sticky so it only matches at the cursor.
const RULES: [RawTokenType, RegExp][] = [
  ['space', /\s+/y],
  ['comment', /--[^\r\n]*/y],
  ['comment', /\/\*[\s\S]*?(?:\*\/|$)/y],
  ['string', /[Nn]?'(?:[^']|'')*(?:'|$)/y],
  ['variable', /@@?[\p{L}\p{N}_]+/uy],
  ['word', /\[[^\]]*\]?/y],
  ['word', /[\p{L}_][\p{L}\p{N}_$#]*/uy],
  ['number', /\d+(?:\.\d+)?/y],
  ['symbol', /<>|<=|>=|!=/y],
  ['symbol', /[\s\S]/uy],
];

/** Split T-SQL into tokens without losing a single character. */
export function lexTsql(code: string): RawToken[] {
  const tokens: RawToken[] = [];
  let pos = 0;
  while (pos < code.length) {
    for (const [type, re] of RULES) {
      re.lastIndex = pos;
      const m = re.exec(code);
      if (m && m[0].length > 0) {
        tokens.push({ text: m[0], type });
        pos += m[0].length;
        break;
      }
    }
  }
  return tokens;
}

/** String literals holding non-ASCII text that lack the N prefix (they would turn into "?"). */
export function findUnprefixedUnicodeStrings(code: string): string[] {
  return lexTsql(code)
    .filter(t => t.type === 'string' && /[^\x00-\x7F]/.test(t.text) && !/^[Nn]/.test(t.text))
    .map(t => t.text);
}
