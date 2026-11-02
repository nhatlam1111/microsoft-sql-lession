import type { Cell } from '../../lib/grade';

interface Props { columns: string[]; rows: Cell[][] }

/** One test's data, in the same grid as the course's Results tab. */
export default function ArcadeTable({ columns, rows }: Props) {
  return (
    <div className="res-scroll">
      <table className="res-grid">
        <thead><tr>{columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((v, i) => (v === null ? <td key={i} className="res-null">NULL</td> : <td key={i}>{String(v)}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
