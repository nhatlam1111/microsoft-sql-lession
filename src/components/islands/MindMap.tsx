import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow, ReactFlowProvider, Handle, Position, useReactFlow, useNodesState, useNodesInitialized,
  type Edge, type Node, type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { CatalogEntry } from '../../lib/catalog';
import type { AreaDef, AreaId, LevelDef } from '../../data/curriculum';
import { getSnapshot, initProgressStore } from '../../lib/progress-store';
import { countDone, iconOf, isFlagged, type ProgressState } from '../../lib/progress';
import { resumeTarget } from '../../lib/roadmap';
import { layoutMindmap } from '../../lib/mindmap-layout';
import { lessonUrl } from '../../lib/paths';
import { useProgress } from './use-progress';
import StatusIcon, { ICON_LABEL } from './StatusIcon';

interface Props {
  catalog: CatalogEntry[];
  areas: AreaDef[];
  levels: LevelDef[];
}

type RootData = { label: string };
type AreaData = { name: string; done: number; total: number; flags: number; open: boolean; side: 'left' | 'right'; onToggle: () => void };
type LessonData = { entry: CatalogEntry; state: ProgressState; next: boolean; side: 'left' | 'right' };

function RootNode({ data }: NodeProps<Node<RootData>>) {
  return (
    <div className="mm-root">
      {data.label}
      <Handle type="source" position={Position.Right} id="r" />
      <Handle type="source" position={Position.Left} id="l" />
    </div>
  );
}

function AreaNode({ data }: NodeProps<Node<AreaData>>) {
  const inward = data.side === 'right' ? Position.Left : Position.Right;
  const outward = data.side === 'right' ? Position.Right : Position.Left;
  const pct = data.total ? Math.round((100 * data.done) / data.total) : 0;
  return (
    <button type="button" className={`mm-area nopan${data.open ? ' is-open' : ''} side-${data.side}`} aria-expanded={data.open} onClick={data.onToggle}>
      <Handle type="target" position={inward} />
      <span className="mm-area-name">{data.name}</span>
      <span className="mm-area-meta">
        <span className="mm-bar"><span style={{ width: `${pct}%` }} /></span>
        <span>{data.done}/{data.total}</span>
        {data.flags > 0 && <span className="mm-flags">· {data.flags} cờ</span>}
      </span>
      <span className="mm-toggle" aria-hidden="true">{data.open ? '−' : '+'}</span>
      <Handle type="source" position={outward} />
    </button>
  );
}

function LessonNode({ data }: NodeProps<Node<LessonData>>) {
  const { entry } = data;
  return (
    <a className={`mm-lesson nopan${data.next ? ' is-next' : ''}`} href={lessonUrl(entry.slug)} title={entry.title}>
      <Handle type="target" position={data.side === 'right' ? Position.Left : Position.Right} />
      <StatusIcon icon={iconOf(data.state, entry.num)} />
      <span className="mm-num">{entry.num}</span>
      <span className="mm-title">{entry.shortTitle}</span>
      <span className={`lvb lv${entry.level}`}>L{entry.level}</span>
    </a>
  );
}

const nodeTypes = { root: RootNode, area: AreaNode, lesson: LessonNode };

function MindMapCanvas({ catalog, areas, levels }: Props) {
  const nums = useMemo(() => catalog.map(e => e.num), [catalog]);
  const [expanded, setExpanded] = useState<Set<AreaId>>(() => {
    initProgressStore(nums);
    const target = resumeTarget(getSnapshot().state, catalog);
    return new Set<AreaId>([(target?.area ?? 'A1') as AreaId]);
  });
  const { state } = useProgress(nums);
  const next = resumeTarget(state, catalog);
  const flow = useReactFlow();

  const toggle = useCallback((id: AreaId) => setExpanded(prev => {
    const s = new Set(prev);
    if (s.has(id)) s.delete(id); else s.add(id);
    return s;
  }), []);

  const { nodes, edges } = useMemo(() => {
    const layout = layoutMindmap(areas, catalog, expanded);
    const nodes: Node[] = layout.nodes.map(n => {
      const base = { id: n.id, position: { x: n.x, y: n.y }, width: n.width, height: n.height, style: { width: n.width, height: n.height }, draggable: false, selectable: false };
      if (n.kind === 'root') return { ...base, type: 'root', data: { label: 'SQL Server' } };
      if (n.kind === 'area') {
        const area = areas.find(a => a.id === n.areaId)!;
        const inArea = catalog.filter(e => e.area === area.id);
        return {
          ...base, type: 'area',
          data: {
            name: area.name, side: area.side, open: expanded.has(area.id), onToggle: () => toggle(area.id),
            done: countDone(state, inArea.map(e => e.num)), total: inArea.length,
            flags: inArea.filter(e => isFlagged(state, e.num)).length,
          },
        };
      }
      const entry = catalog.find(e => e.num === n.num)!;
      return { ...base, type: 'lesson', data: { entry, state, next: next?.num === entry.num, side: n.side } };
    });
    const sideOf = (id: string) => areas.find(a => `area:${a.id}` === id)?.side;
    const edges: Edge[] = layout.edges.map(e => ({
      id: e.id, source: e.source, target: e.target,
      sourceHandle: e.source === 'root' ? (sideOf(e.target) === 'right' ? 'r' : 'l') : undefined,
      className: e.source === 'root' ? 'mm-edge-main' : 'mm-edge',
    }));
    return { nodes, edges };
  }, [areas, catalog, expanded, state, next?.num, toggle]);

  // React Flow measures nodes through onNodesChange, so the layout is fed in as controlled state.
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState<Node>([]);
  const fitPending = useRef(true);
  useEffect(() => { setRfNodes(nodes); }, [nodes, setRfNodes]);
  useEffect(() => { fitPending.current = true; }, [expanded]);
  const initialized = useNodesInitialized();
  useEffect(() => {
    if (!initialized || !fitPending.current) return;
    fitPending.current = false;
    void flow.fitView({ padding: 0.12 });
  }, [initialized, rfNodes, flow]);

  return (
    <div className="mm-page">
      <div className="mm-toolbar">
        <button type="button" className="mm-tool" onClick={() => setExpanded(new Set(areas.map(a => a.id)))}>Mở hết</button>
        <button type="button" className="mm-tool" onClick={() => setExpanded(new Set())}>Thu gọn</button>
        <button type="button" className="mm-tool" onClick={() => { void flow.fitView({ padding: 0.12 }); }}>Về giữa</button>
        <span className="mm-spacer" />
        {(['todo', 'seen', 'done', 'flag'] as const).map(icon => (
          <span key={icon} className="mm-legend"><StatusIcon icon={icon} />{ICON_LABEL[icon]}</span>
        ))}
        <span className="mm-legend">Level {levels.map(l => <span key={l.no} className={`lvb lv${l.no}`}>L{l.no}</span>)}</span>
      </div>
      <div className="mm-canvas">
        <ReactFlow
          nodes={rfNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.3}
          maxZoom={1.6}
        />
      </div>
    </div>
  );
}

export default function MindMap(props: Props) {
  return (
    <ReactFlowProvider>
      <MindMapCanvas {...props} />
    </ReactFlowProvider>
  );
}
