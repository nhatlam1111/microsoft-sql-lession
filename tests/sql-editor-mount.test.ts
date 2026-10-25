import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ComponentProps } from 'react';
import type SqlEditorComponent from '../src/components/islands/SqlEditor';

type Props = ComponentProps<typeof SqlEditorComponent>;
type Element = { props?: Record<string, any> } | null | undefined | boolean;
type Effect = { dependencies?: readonly unknown[]; cleanup?: () => void };

// This harness exercises the component's real effect and event closures without a DOM/OS IME.
// Input/undo/composition below are simulated events, not native undo or OS IME verification.
const hooks = vi.hoisted(() => ({
  cells: [] as any[], effects: [] as Effect[], pending: [] as (() => void)[], cursor: 0,
  load: Promise.resolve(), mount: vi.fn(),
}));

vi.mock('react', async importOriginal => {
  const react = await importOriginal<typeof import('react')>();
  return {
    ...react,
    useId: () => 'editor-hint',
    useRef(value: unknown) {
      const index = hooks.cursor++;
      return hooks.cells[index] ??= { current: value };
    },
    useState(value: unknown) {
      const index = hooks.cursor++;
      if (!(index in hooks.cells)) hooks.cells[index] = value;
      return [hooks.cells[index], (next: unknown) => { hooks.cells[index] = next; }];
    },
    useEffect(effect: () => void | (() => void), dependencies?: readonly unknown[]) {
      const index = hooks.cursor++;
      const previous = hooks.effects[index];
      if (!previous || !dependencies || dependencies.some((value, i) => !Object.is(value, previous.dependencies?.[i]))) {
        hooks.pending.push(() => {
          previous?.cleanup?.();
          const cleanup = effect();
          hooks.effects[index] = { dependencies, cleanup: typeof cleanup === 'function' ? cleanup : undefined };
        });
      }
    },
  };
});

function deferred() {
  let resolve!: () => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<void>((done, fail) => { resolve = done; reject = fail; });
  void promise.catch(() => {});
  return { promise, resolve, reject };
}

function element(tree: Element, className: string): Exclude<Element, null | undefined | boolean> | undefined {
  if (!tree || typeof tree !== 'object') return;
  if (tree.props?.className?.split(' ').includes(className)) return tree;
  for (const child of [tree.props?.children].flat(Infinity)) {
    const found = element(child, className);
    if (found) return found;
  }
}

function textOf(tree: any): string {
  if (typeof tree === 'string' || typeof tree === 'number') return String(tree);
  if (!tree || typeof tree !== 'object') return '';
  return [tree.props?.children].flat(Infinity).map(textOf).join('');
}

let SqlEditor: typeof SqlEditorComponent;
let load: ReturnType<typeof deferred>;
let tree: Element;
const textarea = {
  value: '', selectionStart: 0, selectionEnd: 0, selectionDirection: 'none',
  setSelectionRange(start: number, end: number) { this.selectionStart = start; this.selectionEnd = end; },
};
const runtime = { sync: vi.fn(), setTables: vi.fn(), setDescribedBy: vi.fn(), measure: vi.fn(), focus: vi.fn(), destroy: vi.fn() };

function render(props: Props) {
  hooks.cursor = 0;
  tree = SqlEditor(props);
  const input = element(tree, 'sql-editor-fallback');
  if (input) input.props!.ref.current = textarea;
  element(tree, 'sql-editor-cm')!.props!.ref.current = {};
  for (const effect of hooks.pending.splice(0)) effect();
  return input?.props!;
}

async function finishLoad() {
  load.resolve();
  await vi.dynamicImportSettled();
}

function cleanup() {
  for (const effect of hooks.effects) effect?.cleanup?.();
  hooks.effects = [];
}

beforeEach(async () => {
  vi.useFakeTimers();
  vi.resetModules();
  hooks.cells = []; hooks.effects = []; hooks.pending = []; hooks.cursor = 0;
  load = deferred(); hooks.load = load.promise;
  vi.doMock('../src/lib/sql-editor-runtime', async () => {
    await hooks.load;
    return { mountSqlEditor: hooks.mount };
  });
  hooks.mount.mockReset().mockReturnValue(runtime);
  for (const method of Object.values(runtime)) method.mockClear();
  Object.assign(textarea, { value: '', selectionStart: 0, selectionEnd: 0, selectionDirection: 'none' });
  vi.stubGlobal('document', { activeElement: textarea });
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => setTimeout(() => callback(0), 0));
  vi.stubGlobal('cancelAnimationFrame', (id: ReturnType<typeof setTimeout>) => clearTimeout(id));
  SqlEditor = (await import('../src/components/islands/SqlEditor')).default;
});

afterEach(async () => {
  cleanup();
  load.resolve();
  await vi.dynamicImportSettled();
  vi.clearAllTimers(); vi.useRealTimers(); vi.unstubAllGlobals();
});

describe('deferred SQL editor mount (event/state simulation)', () => {
  it('retains the fallback while the runtime chunk arrives during composition', async () => {
    const props: Props = { value: '-- nháp', onChange: vi.fn(), onRun: vi.fn() };
    const input = render(props);
    input.onCompositionStart();
    await finishLoad();
    await vi.runOnlyPendingTimersAsync();
    expect(hooks.mount).not.toHaveBeenCalled();
    render(props);
    expect(element(tree, 'sql-editor-fallback')).toBeDefined();
    expect(props.onChange).not.toHaveBeenCalled();
    input.onCompositionEnd({ currentTarget: textarea, target: textarea });
    await vi.runOnlyPendingTimersAsync();
    render(props);
    expect(hooks.mount).not.toHaveBeenCalled();
    expect(textOf(element(tree, 'sql-editor-hint'))).toContain('Tải lại');
  });

  it('keeps a typed fallback and the same input reference through a simulated native undo', async () => {
    const oldChange = vi.fn();
    let props: Props = { value: '', onChange: oldChange, onRun: vi.fn() };
    let input = render(props);
    const originalInput = input.ref.current;
    textarea.value = '-- Nhân viên';
    input.onChange({ target: textarea });
    const latestChange = vi.fn();
    props = { ...props, value: textarea.value, onChange: latestChange };
    input = render(props);
    await finishLoad();
    await vi.runOnlyPendingTimersAsync();
    input = render(props);
    expect(hooks.mount).not.toHaveBeenCalled();
    expect(input.ref.current).toBe(originalInput);
    expect(input.value).toBe('-- Nhân viên');
    textarea.value = '';
    input.onChange({ target: textarea, nativeEvent: { inputType: 'historyUndo' } });
    props = { ...props, value: textarea.value };
    input = render(props);
    expect(input.ref.current).toBe(originalInput);
    expect(input.value).toBe('');
    expect(latestChange).toHaveBeenCalledExactlyOnceWith('');
    expect(oldChange).toHaveBeenCalledExactlyOnceWith('-- Nhân viên');
    expect(hooks.mount).not.toHaveBeenCalled();
    expect(textOf(element(tree, 'sql-editor-hint'))).toContain('giữ thao tác');
  });

  it('mounts an unused fallback with the latest draft, selection and callback references', async () => {
    const oldChange = vi.fn(); const oldRun = vi.fn();
    let props: Props = { value: '-- nháp', onChange: oldChange, onRun: oldRun };
    render(props);
    Object.assign(textarea, { value: '-- Nhân viên', selectionStart: 3, selectionEnd: 12, selectionDirection: 'backward' });
    const latestChange = vi.fn(); const latestRun = vi.fn();
    props = { ...props, value: textarea.value, onChange: latestChange, onRun: latestRun };
    render(props);
    await finishLoad();
    await vi.runOnlyPendingTimersAsync();
    expect(hooks.mount).toHaveBeenCalledTimes(1);
    const mounted = hooks.mount.mock.calls[0][0];
    expect(mounted.value).toBe('-- Nhân viên');
    expect(mounted.selection).toEqual({ start: 3, end: 12, backward: true });
    expect(oldChange).not.toHaveBeenCalled();
    expect(latestChange).not.toHaveBeenCalled();
    mounted.onChange('-- Ghi chú mới'); mounted.onRun();
    expect(latestChange).toHaveBeenCalledExactlyOnceWith('-- Ghi chú mới');
    expect(latestRun).toHaveBeenCalledTimes(1);
    expect(oldRun).not.toHaveBeenCalled();
    render(props);
    expect(element(tree, 'sql-editor-fallback')).toBeUndefined();
    expect(runtime.focus).toHaveBeenCalledTimes(1);
  });

  it('also retains fallback after Tab edits it before the runtime arrives', async () => {
    const onChange = vi.fn();
    const props: Props = { value: '', onChange, onRun: vi.fn() };
    const input = render(props);
    input.onKeyDown({
      key: 'Tab', ctrlKey: false, metaKey: false, shiftKey: false, altKey: false,
      nativeEvent: { isComposing: false }, currentTarget: textarea,
      preventDefault: vi.fn(), stopPropagation: vi.fn(),
    });
    expect(onChange).toHaveBeenCalledExactlyOnceWith('    ');
    await finishLoad();
    await vi.runOnlyPendingTimersAsync();
    render({ ...props, value: '    ' });
    expect(hooks.mount).not.toHaveBeenCalled();
    expect(element(tree, 'sql-editor-fallback')).toBeDefined();
  });

  it('keeps fallback for the page session even if composition ends before the chunk arrives', async () => {
    const props: Props = { value: '', onChange: vi.fn(), onRun: vi.fn() };
    const input = render(props);
    input.onCompositionStart();
    input.onCompositionEnd({ currentTarget: textarea, target: textarea });
    await finishLoad();
    await vi.runOnlyPendingTimersAsync();
    expect(hooks.mount).not.toHaveBeenCalled();
    render(props);
    expect(element(tree, 'sql-editor-fallback')).toBeDefined();
  });

  it('cancels a deferred composition mount on unmount', async () => {
    const input = render({ value: '', onChange: vi.fn(), onRun: vi.fn() });
    input.onCompositionStart();
    await finishLoad();
    input.onCompositionEnd({ currentTarget: textarea, target: textarea });
    cleanup();
    await vi.runOnlyPendingTimersAsync();
    expect(hooks.mount).not.toHaveBeenCalled();
  });

  it('ignores a chunk that resolves after unmount', async () => {
    render({ value: '', onChange: vi.fn(), onRun: vi.fn() });
    cleanup();
    await finishLoad();
    await vi.runOnlyPendingTimersAsync();
    expect(hooks.mount).not.toHaveBeenCalled();
  });

  it('distinguishes a genuine chunk failure from preserving a used fallback', async () => {
    const props = { value: '', onChange: vi.fn(), onRun: vi.fn() };
    render(props);
    load.reject(new Error('chunk unavailable'));
    await vi.dynamicImportSettled();
    render(props);
    expect(element(tree, 'sql-editor-fallback')).toBeDefined();
    expect(hooks.mount).not.toHaveBeenCalled();
    expect(textOf(element(tree, 'sql-editor-hint'))).toContain('Không tải được');
    expect(textOf(element(tree, 'sql-editor-hint'))).not.toContain('giữ thao tác');
  });

  it('keeps the input usable if editor initialization throws after the chunk loads', async () => {
    const props = { value: '-- nháp', onChange: vi.fn(), onRun: vi.fn() };
    hooks.mount.mockImplementationOnce(() => { throw new Error('init failed'); });
    render(props);
    await finishLoad();
    const input = render(props);
    expect(input.value).toBe('-- nháp');
    expect(textOf(element(tree, 'sql-editor-hint'))).toContain('Không tải được');
    expect(props.onChange).not.toHaveBeenCalled();
  });
});
