import { describe, expect, it } from 'vitest';
import {
  acceptsPresentationSnapshot, isPresentationMessage, normalizePresentationState,
  presentationFromUrl, presentationShareUrl, presentationStateUrl, transitionPresentation,
} from '../src/lib/presentation-state';
import { readFileSync } from 'node:fs';

const slides = [{ id: 'intro', hasAnswer: false }, { id: 'question', hasAnswer: true }, { id: 'ending', hasAnswer: false }];
const beginning = { slideId: 'intro', step: 0 as const, revision: 8 };
const run = 'run_12345678';

describe('presentation sequence', () => {
  it('reveals the answer before the next slide and reverses every step', () => {
    const question = transitionPresentation(slides, beginning, 'next');
    const revealed = transitionPresentation(slides, question, 'next');
    const ending = transitionPresentation(slides, revealed, 'next');
    expect(question).toEqual({ slideId: 'question', step: 0, revision: 9 });
    expect(revealed).toEqual({ slideId: 'question', step: 1, revision: 10 });
    expect(transitionPresentation(slides, ending, 'prev')).toMatchObject({ slideId: 'question', step: 1 });
    expect(transitionPresentation(slides, revealed, 'prev')).toMatchObject({ slideId: 'question', step: 0 });
    expect(transitionPresentation(slides, question, 'prev')).toMatchObject({ slideId: 'intro', step: 0 });
  });
  it('jumps to the question, clamps ends and ignores unknown IDs', () => {
    expect(transitionPresentation(slides, { slideId: 'question', step: 1, revision: 9 }, { slideId: 'question' })).toMatchObject({ step: 0, revision: 10 });
    expect(transitionPresentation(slides, beginning, 'prev')).toEqual(beginning);
    expect(transitionPresentation(slides, beginning, { slideId: 'missing' })).toEqual(beginning);
    expect(transitionPresentation(slides, beginning, 'last')).toMatchObject({ slideId: 'ending', step: 0 });
  });
  it('sanitizes unknown slides and non-answer reveal flags', () => {
    expect(normalizePresentationState(slides, { slideId: 'missing', step: 1, revision: -2 })).toEqual({ slideId: 'intro', step: 0, revision: 0 });
    expect(normalizePresentationState(slides, { slideId: 'question', step: 1, revision: Infinity })).toEqual({ slideId: 'question', step: 1, revision: 0 });
  });
});

describe('URL restoration and sharing', () => {
  it('restores legacy query and hash aliases as canonical slide IDs across reload and share', () => {
    const renamed = [{ id: 'intro', hasAnswer: false }, { id: 'current', aliases: ['old-question'], hasAnswer: true }];
    for (const suffix of ['?slide=old-question', '#old-question', '#old%2Dquestion']) {
      const result = presentationFromUrl(new URL(`https://example.org/${suffix}`), renamed);
      expect(result.state).toEqual({ slideId: 'current', step: 0, revision: 0 });
      const restored = presentationStateUrl(new URL('https://example.org/'), result.state, run);
      expect(restored.searchParams.get('slide')).toBe('current');
      expect(presentationFromUrl(restored, renamed)).toEqual({ state: result.state, run });
      expect(presentationShareUrl(restored, result.state.slideId).search).toBe('?slide=current');
    }
    expect(presentationFromUrl(new URL('https://example.org/?slide=old-question&step=1&rev=7'), renamed).state)
      .toEqual({ slideId: 'current', step: 1, revision: 7 });
    expect(presentationFromUrl(new URL('https://example.org/?slide=unknown#old-question'), renamed).state.slideId).toBe('intro');
    expect(normalizePresentationState([{ id: 'intro', aliases: ['current'], hasAnswer: false }, ...renamed.slice(1)], { slideId: 'current' }).slideId).toBe('current');
  });
  it('restores the authoritative revision and reveal after presenter reload', () => {
    const state = { slideId: 'question', step: 1 as const, revision: 42 };
    const url = presentationStateUrl(new URL('https://example.org/base/bai-giang/deck/nguoi-giang/?noise=1#old'), state, run);
    expect(presentationFromUrl(url, slides)).toEqual({ state, run });
    expect(url.hash).toBe('');
    expect(url.searchParams.has('noise')).toBe(false);
  });
  it('strips teaching session, reveal and revision from shared links', () => {
    expect(presentationShareUrl(new URL(`https://example.org/base/bai-giang/deck/?run=${run}&step=1&rev=5#old`), 'question').href)
      .toBe('https://example.org/base/bai-giang/deck/?slide=question');
  });
  it('rejects malformed runs and revision values', () => {
    expect(presentationFromUrl(new URL('https://example.org/?run=x&slide=question&step=1&rev=-4'), slides)).toEqual({ state: { slideId: 'question', step: 1, revision: 0 }, run: null });
  });
  it('restores a native no-JS anchor and prefers an explicit slide query', () => {
    expect(presentationFromUrl(new URL('https://example.org/#question'), slides).state).toMatchObject({ slideId: 'question', step: 0 });
    expect(presentationFromUrl(new URL('https://example.org/?slide=ending#question'), slides).state.slideId).toBe('ending');
    expect(presentationFromUrl(new URL('https://example.org/#%zz'), slides).state.slideId).toBe('intro');
  });
});

describe('two-window protocol', () => {
  const snapshot = { version: 1, deck: 'deck', run, type: 'STATE', sender: 'presenter', state: { slideId: 'question', step: 1, revision: 7 } };
  it('accepts full validated snapshots and session requests', () => {
    expect(isPresentationMessage(snapshot, 'deck', run, slides)).toBe(true);
    expect(isPresentationMessage({ version: 1, deck: 'deck', run, type: 'REQUEST_STATE', sender: 'audience' }, 'deck', run, slides)).toBe(true);
  });
  it('isolates decks/runs and rejects invalid state and senders', () => {
    expect(isPresentationMessage(snapshot, 'other', run, slides)).toBe(false);
    expect(isPresentationMessage(snapshot, 'deck', 'run_98765432', slides)).toBe(false);
    expect(isPresentationMessage({ ...snapshot, sender: 'audience' }, 'deck', run, slides)).toBe(false);
    for (const bad of [null, {}, { ...snapshot, version: 2 }, { ...snapshot, state: { slideId: 'intro', step: 1, revision: 7 } }, { ...snapshot, state: { slideId: 'question', step: 0, revision: NaN } }]) {
      expect(isPresentationMessage(bad, 'deck', run, slides)).toBe(false);
    }
  });
  it('allows equal-revision full sync after manual navigation, rejecting older snapshots', () => {
    expect(acceptsPresentationSnapshot({ slideId: 'question', step: 0, revision: 7 }, 7)).toBe(true);
    expect(acceptsPresentationSnapshot({ slideId: 'question', step: 0, revision: 6 }, 7)).toBe(false);
  });
  it('has no learning progress or storage owner', () => {
    const source = readFileSync(new URL('../src/scripts/presentation.ts', import.meta.url), 'utf8');
    expect(source).not.toMatch(/localStorage|sessionStorage|useProgress|progress-store/);
  });
});
