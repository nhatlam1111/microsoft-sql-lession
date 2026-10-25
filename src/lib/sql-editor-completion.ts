import { type Completion, type CompletionContext, type CompletionSource } from '@codemirror/autocomplete';
import { syntaxTree } from '@codemirror/language';
import { MSSQL, keywordCompletionSource, schemaCompletionSource, type SQLConfig } from '@codemirror/lang-sql';
import type { DbTable } from './db-schema';
import { isBlockedCompletionKeyword } from './sql-guard';

function insideLiteralOrComment(context: CompletionContext): boolean {
  for (let node = syntaxTree(context.state).resolveInner(context.pos, -1); node; node = node.parent!) {
    if (/^(?:String|LineComment|BlockComment)$/.test(node.name)) return true;
  }
  return false;
}

function outsideLiterals(source: CompletionSource): CompletionSource {
  return context => insideLiteralOrComment(context) ? null : source(context);
}

/** Only public schema metadata is used here; completion is a typing aid, never SQL validation. */
export function sqlCompletionConfig(tables: readonly DbTable[]): SQLConfig {
  return {
    dialect: MSSQL,
    defaultSchema: 'dbo',
    upperCaseKeywords: true,
    schema: {
      dbo: Object.fromEntries(tables.map(table => [table.name, {
        self: { label: table.name, type: 'class', detail: 'bảng' },
        children: table.columns.map(column => ({ label: column.name, type: 'property', detail: column.type })),
      }])),
    },
  };
}

function statementTables(context: CompletionContext, tables: readonly DbTable[]) {
  let statement = syntaxTree(context.state).resolveInner(context.pos, -1);
  while (statement.parent && statement.name !== 'Statement') statement = statement.parent;
  const used = new Set<DbTable>();
  const aliases = new Map<string, DbTable>();
  let afterTableKeyword = false;
  const unquote = (name: string) => name.replace(/^\[|\]$|^"|"$/g, '').toLowerCase();
  for (let node = statement.firstChild; node; node = node.nextSibling) {
    const text = context.state.sliceDoc(node.from, node.to);
    if (node.name === 'Keyword') {
      afterTableKeyword = /^(?:FROM|JOIN|UPDATE|INTO)$/i.test(text);
    } else if (afterTableKeyword && /^(?:CompositeIdentifier|Identifier|QuotedIdentifier)$/.test(node.name)) {
      const name = unquote(text.split('.').at(-1)!);
      const table = tables.find(table => table.name.toLowerCase() === name);
      if (table) {
        used.add(table);
        let alias = node.nextSibling;
        if (alias && /^AS$/i.test(context.state.sliceDoc(alias.from, alias.to))) alias = alias.nextSibling;
        if (alias && /^(?:Identifier|QuotedIdentifier)$/.test(alias.name)) {
          aliases.set(unquote(context.state.sliceDoc(alias.from, alias.to)), table);
        }
      }
      afterTableKeyword = false;
    }
  }
  return { used, aliases };
}

/** Extend schema completion for SQL Server's ordinary case-insensitive identifiers and aliases. */
function qualifiedColumns(tables: readonly DbTable[]): CompletionSource {
  return context => {
    const before = context.matchBefore(/([\p{L}_][\p{L}\p{N}_$#]*)\s*\.\s*([\p{L}\p{N}_$#]*)/u);
    const match = before?.text.match(/^([\p{L}_][\p{L}\p{N}_$#]*)\s*\.\s*([\p{L}\p{N}_$#]*)$/u);
    if (!before || !match) return null;
    const parent = match[1].toLowerCase();
    const from = context.pos - match[2].length;
    if (parent === 'dbo') return {
      from, options: tables.map(table => ({ label: table.name, type: 'class', detail: 'bảng' })), validFor: /^[\p{L}\p{N}_$#]*$/u,
    };
    const { aliases } = statementTables(context, tables);
    const table = aliases.get(parent) ?? tables.find(table => table.name.toLowerCase() === parent);
    return table ? {
      from, options: table.columns.map(column => ({ label: column.name, type: 'property', detail: column.type })), validFor: /^[\p{L}\p{N}_$#]*$/u,
    } : null;
  };
}

/** Bare columns use tables in the current statement, including tables written after the caret. */
function referencedColumns(tables: readonly DbTable[]): CompletionSource {
  return context => {
    const word = context.matchBefore(/[\p{L}\p{N}_$#]*/u);
    if (!word || (!context.explicit && word.from === word.to)) return null;
    if (context.state.sliceDoc(word.from - 1, word.from) === '.') return null;
    const { used } = statementTables(context, tables);
    const options = new Map<string, Completion>();
    for (const table of used) {
      for (const column of table.columns) {
        options.set(column.name.toLowerCase(), { label: column.name, type: 'property', detail: column.type });
      }
    }
    return options.size ? { from: word.from, options: [...options.values()], validFor: /^[\p{L}\p{N}_$#]*$/u } : null;
  };
}

export function createSqlCompletionSources(tables: readonly DbTable[]): CompletionSource[] {
  const keywords = keywordCompletionSource(MSSQL, true);
  const safeKeywords: CompletionSource = async context => {
    const result = await keywords(context);
    return result ? { ...result, options: result.options.filter(option => !isBlockedCompletionKeyword(option.label)) } : null;
  };
  return [
    outsideLiterals(schemaCompletionSource(sqlCompletionConfig(tables))),
    outsideLiterals(qualifiedColumns(tables)),
    outsideLiterals(referencedColumns(tables)),
    outsideLiterals(safeKeywords),
  ];
}
