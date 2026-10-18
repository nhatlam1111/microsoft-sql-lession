/** Reads the tables, columns and keys of HRM_Demo from its creation script, for the database diagram. */

export interface DbColumn { name: string; type: string; nullable: boolean }

export interface DbTable {
  name: string;
  columns: DbColumn[];
  primaryKey: string[];
  foreignKeys: { column: string; refTable: string; refColumn: string }[];
}

const TABLE = /CREATE TABLE dbo\.(\w+) \(([\s\S]*?)\n\);/g;
const REFERENCES = /REFERENCES dbo\.(\w+) \((\w+)\)/i;

/** Every `CREATE TABLE dbo.X (…);` block; table variables (`DECLARE @x TABLE`) are left out. */
export function parseSchema(sql: string): DbTable[] {
  const tables: DbTable[] = [];
  for (const [, name, body] of sql.matchAll(TABLE)) {
    const table: DbTable = { name, columns: [], primaryKey: [], foreignKeys: [] };
    for (const raw of body.split('\n')) {
      const line = raw.trim().replace(/,$/, '');
      if (!line) continue;
      if (/^CONSTRAINT\b/i.test(line)) {
        const pk = line.match(/PRIMARY KEY \(([^)]+)\)/i);
        if (pk) table.primaryKey.push(...pk[1].split(',').map(s => s.trim()));
        const fk = line.match(/FOREIGN KEY \((\w+)\)\s+REFERENCES dbo\.(\w+) \((\w+)\)/i);
        if (fk) table.foreignKeys.push({ column: fk[1], refTable: fk[2], refColumn: fk[3] });
        continue;
      }
      const [column, type] = line.split(/\s+/);
      table.columns.push({ name: column, type, nullable: !/\bNOT NULL\b/i.test(line) });
      if (/\bPRIMARY KEY\b/i.test(line)) table.primaryKey.push(column);
      const ref = line.match(REFERENCES);
      if (ref) table.foreignKeys.push({ column, refTable: ref[1], refColumn: ref[2] });
    }
    tables.push(table);
  }
  return tables;
}

/** A column as SSMS Object Explorer lists it, e.g. "MaNV (PK, FK, varchar(10), not null)". */
export function ssmsColumnLabel(table: DbTable, column: DbColumn): string {
  const keys = [
    ...(table.primaryKey.includes(column.name) ? ['PK'] : []),
    ...(table.foreignKeys.some(f => f.column === column.name) ? ['FK'] : []),
  ];
  return `${column.name} (${[...keys, column.type, column.nullable ? 'null' : 'not null'].join(', ')})`;
}
