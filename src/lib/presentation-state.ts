/** Presentation state is independent of learning progress and browser storage. */
export interface SlideSpec { id: string; hasAnswer: boolean }
export interface PresentationState { slideId: string; step: 0 | 1; revision: number }
export type PresentationAction = 'next' | 'prev' | 'first' | 'last' | { slideId: string };

export function normalizePresentationState(slides: SlideSpec[], candidate: Partial<PresentationState>): PresentationState {
  if (!slides.length) throw new Error('A presentation needs at least one slide.');
  const slide = slides.find(s => s.id === candidate.slideId) ?? slides[0];
  return {
    slideId: slide.id,
    step: slide.hasAnswer && candidate.step === 1 ? 1 : 0,
    revision: Number.isSafeInteger(candidate.revision) && candidate.revision! >= 0 ? candidate.revision! : 0,
  };
}

/** Next reveals the answer first; previous reverses that same sequence. */
export function transitionPresentation(slides: SlideSpec[], state: PresentationState, action: PresentationAction): PresentationState {
  const current = normalizePresentationState(slides, state);
  const index = slides.findIndex(s => s.id === current.slideId);
  let target = index;
  let step: 0 | 1 = current.step;
  if (typeof action === 'object') {
    target = slides.findIndex(s => s.id === action.slideId);
    if (target < 0) return current;
    step = 0;
  } else if (action === 'next') {
    if (slides[index].hasAnswer && current.step === 0) step = 1;
    else if (index < slides.length - 1) { target++; step = 0; }
  } else if (action === 'prev') {
    if (current.step === 1) step = 0;
    else if (index > 0) { target--; step = slides[target].hasAnswer ? 1 : 0; }
  } else {
    target = action === 'first' ? 0 : slides.length - 1;
    step = 0;
  }
  if (target === index && step === current.step) return current;
  return { slideId: slides[target].id, step, revision: Math.min(current.revision + 1, Number.MAX_SAFE_INTEGER) };
}

const RUN_ID = /^[a-zA-Z0-9_-]{8,100}$/;
export function validRunId(value: unknown): value is string { return typeof value === 'string' && RUN_ID.test(value); }

export function presentationFromUrl(url: URL, slides: SlideSpec[]): { state: PresentationState; run: string | null } {
  const rawRevision = url.searchParams.get('rev');
  const revision = rawRevision && /^\d+$/.test(rawRevision) ? Number(rawRevision) : 0;
  // Native no-JS table-of-contents anchors also remain valid when JavaScript returns.
  let anchor: string | undefined;
  try { anchor = decodeURIComponent(url.hash.slice(1)) || undefined; } catch { /* Ignore malformed anchors. */ }
  return {
    state: normalizePresentationState(slides, {
      slideId: url.searchParams.get('slide') ?? anchor,
      step: url.searchParams.get('step') === '1' ? 1 : 0,
      revision,
    }),
    run: validRunId(url.searchParams.get('run')) ? url.searchParams.get('run') : null,
  };
}

export function presentationStateUrl(input: URL, state: PresentationState, run: string | null): URL {
  const url = new URL(input);
  url.search = '';
  url.hash = '';
  url.searchParams.set('slide', state.slideId);
  if (run) url.searchParams.set('run', run);
  url.searchParams.set('step', String(state.step));
  url.searchParams.set('rev', String(state.revision));
  return url;
}

/** Share a stable question view, never the teaching session or revealed answer. */
export function presentationShareUrl(audienceUrl: URL, slideId: string): URL {
  const url = new URL(audienceUrl);
  url.search = '';
  url.hash = '';
  url.searchParams.set('slide', slideId);
  return url;
}

export const PRESENTATION_PROTOCOL = 1;
export type PresentationMessage =
  | { version: 1; deck: string; run: string; type: 'REQUEST_STATE'; sender: 'audience' }
  | { version: 1; deck: string; run: string; type: 'PRESENTER_READY'; sender: 'presenter' }
  | { version: 1; deck: string; run: string; type: 'STATE'; sender: 'presenter'; state: PresentationState };

/** Reject malformed messages and messages for a different deck or teaching run. */
export function isPresentationMessage(value: unknown, deck: string, run: string, slides: SlideSpec[]): value is PresentationMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  if (message.version !== PRESENTATION_PROTOCOL || message.deck !== deck || message.run !== run || !validRunId(message.run)) return false;
  if (message.type === 'REQUEST_STATE') return message.sender === 'audience';
  if (message.type === 'PRESENTER_READY') return message.sender === 'presenter';
  if (message.type !== 'STATE' || message.sender !== 'presenter' || !message.state || typeof message.state !== 'object') return false;
  const state = message.state as Record<string, unknown>;
  const slide = slides.find(s => s.id === state.slideId);
  return !!slide && (state.step === 0 || (state.step === 1 && slide.hasAnswer))
    && typeof state.revision === 'number' && Number.isSafeInteger(state.revision) && state.revision >= 0;
}

/** Equal revisions are idempotent snapshots and must restore a manual viewer on follow. */
export function acceptsPresentationSnapshot(incoming: PresentationState, lastPresenterRevision: number): boolean {
  return incoming.revision >= lastPresenterRevision;
}
