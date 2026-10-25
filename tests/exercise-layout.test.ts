import { expect, it } from 'vitest';
import { clampEditorHeight, splitterKeyHeight, workspaceTabFromKey } from '../src/lib/exercise-layout';

it('keeps both panes reachable at their minimum sizes', () => {
  expect(clampEditorHeight(20, 560)).toBe(180);
  expect(clampEditorHeight(900, 560)).toBe(392);
  expect(splitterKeyHeight('ArrowDown', 240, 560)).toBe(264);
  expect(splitterKeyHeight('ArrowUp', 190, 560)).toBe(180);
  expect(splitterKeyHeight('Home', 240, 560)).toBe(180);
  expect(splitterKeyHeight('End', 240, 560)).toBe(392);
  expect(splitterKeyHeight('Tab', 240, 560)).toBeNull();
});

it('moves focus and selection together through the four workspace tabs', () => {
  expect(workspaceTabFromKey('ArrowRight', 'results')).toBe('messages');
  expect(workspaceTabFromKey('ArrowLeft', 'results')).toBe('structure');
  expect(workspaceTabFromKey('Home', 'data')).toBe('results');
  expect(workspaceTabFromKey('End', 'messages')).toBe('structure');
  expect(workspaceTabFromKey('Tab', 'results')).toBeNull();
});
