import type { Cell } from '../../lib/grade';

/** Read-only grids share the same overflow and NULL treatment for execution and browsing. */
export default function ExerciseGrid({ columns, rows, offset = 0, label, empty }: {
  columns: string[]; rows: Cell[][]; offset?: number; label: string; empty: string;
}) {
  return <div className="ws-grid-scroll" tabIndex={0} role="region" aria-label={label}>
    {columns.length > 0 && <table className="res-grid ws-grid">
      <caption className="ws-sr-only">{label}</caption>
      <thead><tr><th scope="col" className="res-rn"><span className="ws-sr-only">Dòng</span></th>{columns.map((column, index) => <th scope="col" key={index}>{column}</th>)}</tr></thead>
      <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>
        <th scope="row" className="res-rn">{offset + rowIndex + 1}</th>
        {row.map((cell, index) => <td key={index} className={cell === null ? 'res-null' : undefined}>{cell === null ? 'NULL' : String(cell)}</td>)}
      </tr>)}</tbody>
    </table>}
    {rows.length === 0 && <p className="ws-empty">{empty}</p>}
  </div>;
}
