/** Calls the Arcade API from the browser. Every failure comes back as an ApiFailure, never as a thrown error. */
import type { ArcadeRunResponse, ChallengeState, MeResponse, OpenResponse, SubmitResponse } from './arcade-types';
import { createApiCaller } from './exercise-client';

export function createArcadeClient(base: string, fetchImpl?: typeof fetch, opts?: { slowMs: number; timeoutMs: number }) {
  const call = createApiCaller(base, fetchImpl, opts);
  return {
    /** Also wakes the database. */
    me: (code: string, onSlow?: () => void) => call<MeResponse>('arcade/me', undefined, code, onSlow),
    challenge: (id: string, code: string, onSlow?: () => void) =>
      call<ChallengeState>(`arcade/challenges/${encodeURIComponent(id)}`, undefined, code, onSlow),
    run: (id: string, sql: string, code: string, onSlow?: () => void) =>
      call<ArcadeRunResponse>('arcade/run', { challenge: id, sql }, code, onSlow),
    submit: (id: string, sql: string, code: string, onSlow?: () => void) =>
      call<SubmitResponse>('arcade/submit', { challenge: id, sql }, code, onSlow),
    open: (id: string, test: number, code: string) => call<OpenResponse>('arcade/open', { challenge: id, test }, code),
  };
}
