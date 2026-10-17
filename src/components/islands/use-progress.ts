import { useEffect, useSyncExternalStore } from 'react';
import { getServerSnapshot, getSnapshot, initProgressStore, subscribe, type StoreSnapshot } from '../../lib/progress-store';

/** Progress for an island: empty while rendering on the server, the saved progress once in the browser. */
export function useProgress(knownNums: string[]): StoreSnapshot {
  useEffect(() => { initProgressStore(knownNums); }, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
