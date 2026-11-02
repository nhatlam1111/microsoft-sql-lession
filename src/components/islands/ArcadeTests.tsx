import { useState } from 'react';
import { ARCADE_RULES } from '../../data/arcade';
import type { PublicChallenge } from '../../lib/arcade-types';
import { TEST_STATUS_LABEL, type TestRow } from '../../lib/arcade-view';
import { verdictText } from '../../lib/exercise-messages';
import ArcadeTable from './ArcadeTable';

interface Props {
  challenge: PublicChallenge;
  rows: TestRow[];
  selected: number;
  onSelect: (id: number) => void;
  /** null until the learner's data has loaded. */
  coins: number | null;
  opening: boolean;
  onOpen: (id: number) => void;
}

const KIND_NOTE: Record<TestRow['kind'], string> = { unit: '', opened: ' (đã mở)', hidden: ' (khóa)' };

function TestDetail({ challenge, row }: { challenge: PublicChallenge; row: TestRow }) {
  const test = row.test!;
  const mine = row.result?.shown ? row.result : null;
  return (
    <>
      {mine && !mine.passed && <p className="ac-why">{verdictText(false, mine.reason)}</p>}
      <div className="ac-trio">
        <div>
          {Object.keys(challenge.tables).map(table => (
            <div key={table}>
              <h3>Dữ liệu vào: {table}</h3>
              <ArcadeTable columns={Object.keys(challenge.tables[table])} rows={test.rows[table] ?? []} />
            </div>
          ))}
        </div>
        <div>
          <h3>Kết quả mong đợi</h3>
          <ArcadeTable columns={challenge.columns} rows={test.expected} />
        </div>
        <div>
          <h3>Kết quả của bạn</h3>
          {!mine && <p className="ac-hint">Bấm Chạy thử để xem.</p>}
          {mine?.error && <pre className="res-messages is-error">{mine.error}</pre>}
          {mine && !mine.error && <ArcadeTable columns={mine.columns} rows={mine.rows} />}
          {mine?.truncated && <p className="ac-hint">Đã cắt, chỉ hiện 200 dòng đầu.</p>}
        </div>
      </div>
    </>
  );
}

function LockedTest({ row, coins, opening, onOpen }: { row: TestRow; coins: number | null; opening: boolean; onOpen: (id: number) => void }) {
  const [asking, setAsking] = useState(false);
  const cost = ARCADE_RULES.openCost;
  const enough = coins !== null && coins >= cost;
  return (
    <div className="ac-lock">
      <div>
        <strong>Test {row.id} đang khóa{row.status === 'idle' ? '' : ` và ${TEST_STATUS_LABEL[row.status].toLowerCase()}`}</strong>
        <p>Mở test để xem dữ liệu vào và kết quả mong đợi. Mở rồi xem được mãi.</p>
        {asking && <p>Mở test {row.id} với {cost} coin? Bạn đang có {coins} coin.{!enough && ' Chưa đủ coin.'}</p>}
      </div>
      {asking ? (
        <div className="ac-lock-actions">
          <button type="button" className="ws-btn is-primary" disabled={!enough || opening} onClick={() => onOpen(row.id)}>Mở test</button>
          <button type="button" className="ws-btn" onClick={() => setAsking(false)}>Thôi</button>
        </div>
      ) : (
        <button type="button" className="ws-btn" disabled={coins === null} onClick={() => setAsking(true)}>Mở test {row.id} ({cost} coin)</button>
      )}
    </div>
  );
}

export default function ArcadeTests({ challenge, rows, selected, onSelect, coins, opening, onOpen }: Props) {
  const current = rows.find(r => r.id === selected) ?? rows[0];
  return (
    <div className="ac-tests">
      <div className="ac-tabs" role="tablist" aria-label="Các test">
        {rows.map(r => (
          <button
            key={r.id} type="button" role="tab" id={`ac-tab-${r.id}`} aria-selected={r.id === current.id} aria-controls="ac-detail"
            className={`ac-tab is-${r.status}${r.id === current.id ? ' is-active' : ''}`} onClick={() => onSelect(r.id)}
          >
            <strong>Test {r.id}<span>{KIND_NOTE[r.kind]}</span></strong>
            <small>{TEST_STATUS_LABEL[r.status]}</small>
          </button>
        ))}
      </div>
      <div className="ac-detail" id="ac-detail" role="tabpanel" aria-labelledby={`ac-tab-${current.id}`}>
        {current.test
          ? <TestDetail challenge={challenge} row={current} />
          : <LockedTest key={current.id} row={current} coins={coins} opening={opening} onOpen={onOpen} />}
      </div>
    </div>
  );
}
