import type { WorkspaceTab } from './exercise-workflow';

export const WORKSPACE_TABS: WorkspaceTab[] = ['results', 'messages', 'data', 'structure'];
export const clampEditorHeight = (height: number, available: number) => Math.max(180, Math.min(height, available - 8 - 160));
export function splitterKeyHeight(key: string, current: number, available: number): number | null {
  if (key === 'Home') return 180;
  if (key === 'End') return clampEditorHeight(available, available);
  if (key === 'ArrowUp' || key === 'ArrowDown') return clampEditorHeight(current + (key === 'ArrowUp' ? -24 : 24), available);
  return null;
}
export function workspaceTabFromKey(key: string, current: WorkspaceTab): WorkspaceTab | null {
  if (key === 'Home') return 'results';
  if (key === 'End') return 'structure';
  const index = WORKSPACE_TABS.indexOf(current);
  if (key === 'ArrowLeft') return WORKSPACE_TABS[(index + 3) % 4];
  if (key === 'ArrowRight') return WORKSPACE_TABS[(index + 1) % 4];
  return null;
}
