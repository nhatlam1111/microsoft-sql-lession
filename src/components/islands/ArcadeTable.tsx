import type { Cell } from '../../lib/grade';

interface Props { columns: string[]; rows: Cell[][] }

const dots = (spaces: string) => <span className="ac-space" title="dấu cách">{'·'.repeat(spaces.length)}</span>;

/** A table swallows spaces at the ends of a text and shows nothing for '', yet both count when graded. */
function Text({ value }: { value: string }) {
  if (value === '') return <span className="ac-space">(chuỗi rỗng)</span>;
  const [, lead, body, trail] = value.match(/^( *)(.*?)( *)$/s)!;
  return <>{lead && dots(lead)}{body}{trail && dots(trail)}</>;
}

/** One test's data, in the same grid as the course's Results tab. */
export default function ArcadeTable({ columns, rows }: Props) {
  return (
    <div className="res-scroll">
      <table className="res-grid">
        <thead><tr>{columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((v, i) => {
                if (v === null) return <td key={i} className="res-null">NULL</td>;
                return <td key={i}>{typeof v === 'string' ? <Text value={v} /> : String(v)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
