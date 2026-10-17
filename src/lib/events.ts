/** Page-wide events that let static buttons open the island dialogs. */
export const EVENTS = { openRoadmap: 'roadmap:open', openSearch: 'search:open' } as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export function emit(name: EventName): void {
  window.dispatchEvent(new CustomEvent(name));
}
