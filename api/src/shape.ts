/** Turns a driver recordset into the rows the grader compares; kept apart from the driver so it can be tested. */
import { formatCell, type ResultColumn, type Shape } from '../../src/lib/grade';

interface ColumnMeta { name: string; type?: { declaration?: string }; scale?: number }
export type RecordsetLike = unknown[] & { columns?: unknown };

export function shapeOf(recordset: RecordsetLike): Shape {
  const meta = (Array.isArray(recordset.columns) ? recordset.columns : Object.values(recordset.columns ?? {})) as ColumnMeta[];
  const columns: ResultColumn[] = meta.map(c => ({ name: c.name, type: (c.type?.declaration ?? '').toLowerCase(), scale: c.scale }));
  // FOR JSON and FOR XML come back glued into one row that is an object, even in array row mode.
  const rows = recordset.map(row => (Array.isArray(row) ? row : Object.values(row as object))
    .map((v, i) => formatCell(v, columns[i] ?? { name: '', type: '' })));
  return { columns, rows };
}
