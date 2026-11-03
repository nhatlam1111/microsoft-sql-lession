import { useEffect, useState } from 'react';
import type { DbTable } from '../../lib/db-schema';
import { EVENTS } from '../../lib/events';
import { DbDiagramDialog } from './DbDiagram';

/** One page-wide diagram, shared by navigation and exercise buttons. */
export default function DbDiagramPopup({ tables }: { tables: DbTable[] }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(EVENTS.openDiagram, onOpen);
    return () => window.removeEventListener(EVENTS.openDiagram, onOpen);
  }, []);
  return <DbDiagramDialog tables={tables} open={open} onClose={() => setOpen(false)} />;
}
