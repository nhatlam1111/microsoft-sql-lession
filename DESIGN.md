---
version: alpha
name: SQL Server Learning Workspace
description: A light desktop workbench for reading Vietnamese SQL lessons and practicing with HRM_Demo.
colors:
  primary: "#215CE5"
  primary-hover: "#174BC2"
  primary-soft: "#EDF3FF"
  primary-line: "#C5D5FA"
  background: "#F5F7FB"
  surface: "#FFFFFF"
  surface-subtle: "#F8FAFD"
  surface-hover: "#EEF3FA"
  text: "#172B4D"
  text-secondary: "#526078"
  text-muted: "#5E6D83"
  border: "#DCE3ED"
  border-strong: "#B8C6D9"
  control-line: "#7B8DA8"
  success: "#166B43"
  success-soft: "#E9F6EF"
  warning: "#875100"
  warning-soft: "#FFF5DE"
  danger: "#B52F49"
  danger-soft: "#FFF0F3"
typography:
  ui:
    fontFamily: "'Be Vietnam Pro', system-ui, sans-serif"
    fontSize: "15px"
    lineHeight: 1.5
  reading:
    fontFamily: "'Literata', Georgia, serif"
    fontSize: "17px"
    lineHeight: 1.72
  code:
    fontFamily: "'JetBrains Mono', Consolas, monospace"
  tool:
    fontFamily: "'Segoe UI', 'Be Vietnam Pro', system-ui, sans-serif"
rounded:
  DEFAULT: "10px"
  sm: "6px"
  md: "10px"
  lg: "16px"
spacing:
  article-max: "720px"
  topbar: "64px"
  sidebar: "272px"
  rail: "248px"
components:
  button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
  button-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface}"
  selection:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
  selection-boundary:
    backgroundColor: "{colors.primary-line}"
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  panel-header:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-secondary}"
  neutral-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.text}"
  metadata:
    textColor: "{colors.text-muted}"
  divider:
    backgroundColor: "{colors.border}"
  control-boundary:
    backgroundColor: "{colors.border-strong}"
  input-boundary:
    backgroundColor: "{colors.control-line}"
  success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
  warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
  danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.danger}"
---

# SQL Server Learning Workspace

## Overview

### Creative North Star

A SQL study workbench: the knowledge map is the visual signature, white reading and tool surfaces are framed by cool grey navigation, and blue consistently identifies the current lesson and primary action. Keep the lesson itself quiet enough for extended reading.

### Product context and register

- Audience and job: a learner reading, querying and analyzing SQL Server data through familiar Excel examples, based on README.md and the maintained course specifications.
- Language: Vietnamese UI and prose; SQL identifiers and authentic Excel/SSMS labels retain their original language.
- Usage: desktop study at widths from 1280px. Preserve the existing notice below 1024px and existing navigation at every width.
- Register: a learning product with interactive workspaces; the home page remains a knowledge map.
- Restraint: preserve routes, actions, progress semantics and tool replicas. Lesson authoring follows the approved content structure in docs/quy-uoc.md and docs/lesson-template.md; style-only work preserves the current lesson's wording and order.
- Anti-references: marketing heroes, decorative gradients, floating cards around every paragraph, or a new navigation model.
- Runtime ownership: `src/styles/tokens.css` is canonical. This document mirrors the accepted values and explains their use; it does not generate CSS. Update both in the same change when changing the system.

## Colors

The six anchors are background `#F5F7FB`, white surface, text `#172B4D`, secondary text `#526078`, blue `#215CE5`, and border `#DCE3ED`. Use muted text for metadata and reserve faint ink for non-text marks. Check ordinary UI text at 4.5:1 against its actual surface.

Blue is navigation, selection and primary action; green is completed learning; amber is viewed/warning; red is review/error. Level hues retain their cool-to-warm progression with darkened foregrounds for small labels. The `--excel*` and `--ssms*` token families are teaching references and retain their original values, including syntax colors and NULL cells.

| Role | Runtime owner | Consumers |
| --- | --- | --- |
| Background and surfaces | `--paper`, `--surface`, `--surface-subtle`, `--surface-hover` | Page shell, article, panels, hover |
| Text hierarchy | `--ink`, `--ink-2`, `--ink-3` | Titles, body, supporting labels |
| Brand and focus | `--accent`, `--accent-hover`, `--accent-soft`, `--accent-line`, `--focus-ring` | Shared actions, selected navigation, focus |
| Boundaries | `--rule`, `--rule-strong`, `--control-line` | Dividers, panel edges, input/control outlines |
| Learning states | `--done*`, `--seen*`, `--flag*`, `--lv1` through `--lv6` and soft variants | Progress, callouts, level labels |
| Font roles | `--font-ui`, `--font-read`, `--font-code`, `--font-tool` | Interface, prose, SQL, replicas |
| Shape and depth | `--radius-s/m/l`, `--shadow-s/m/l`, `--scrim` | Controls, panels, overlays |
| Timing and scroll | `--motion-fast`, `--motion-normal`, `--ease-ui`, `--scroll-*` | Shared visual feedback and global scrollbars |

## Typography

Keep locally hosted font assets. Be Vietnam Pro carries interface labels and headings; Literata remains the long-reading face at 17px/1.72; JetBrains Mono carries SQL. Tool simulations retain Segoe UI and their established metrics. Headings use restrained negative tracking and adequate line height for Vietnamese diacritics. The article measure stays at a maximum of 720px.

SQL indentation uses four columns per level (`--sql-tab-size: 4` in `src/styles/tokens.css`). Lesson SQL, RunFlow queries, LineMap/Memo code and the exercise editor consume this token. Main clauses align left; continued columns/conditions indent one level, CASE branches another. MDX literals encode indentation with `\t` escapes so compilation preserves it; copy actions retain the same whitespace. The editor keeps learner input unchanged and Tab inserts four spaces. Authoring examples and verification live in docs/quy-uoc.md and docs/lesson-template.md.

Fresh exercise editors contain no SQL and show an input placeholder in `--ink-3`; the instruction is never executable text. Restore every saved draft verbatim, including empty and comment-only drafts. Practice guidance stays outside the editor and links to lesson 1.2; web execution still requires a code, while a private SQL Server copy is the alternative. Shared owners are ExerciseWorkspace, SqlEditor and their scoped styles. Draft storage keys stay unchanged. The approved 25/10/2026 workspace change adds an authenticated table-preview API and replaces the textarea overlay with CodeMirror; the plain input remains a recovery fallback.

## Layout

Retain the three-column lesson grid (272px sidebar, flexible article, 248px rail) and existing popup/drawer placement. Exercise pages use a separate full-width workbench approved 25/10/2026: brief left at 280–340px, flexible editor/results in the middle, Object Explorer at 260px on the right, 24px outer padding and 16px gaps. Keep the main reading surface white and the rail cool grey. Tables and code own horizontal overflow; the document should not acquire a horizontal scrollbar at supported widths.

Mindmap dimensions remain root 190×58, area 214×52, lesson 236×30. ERD retains its fixed canvas, node positions and row heights. These compact diagram elements are deliberate geometry exceptions to general control sizing. Never apply a global button minimum height to them. CodeMirror owns editor scrolling and text geometry; do not apply global scrollbar gutters that desynchronize its gutter, text or recovery input.

## Elevation & Depth

Use subtle borders and tonal surfaces for ordinary hierarchy. Small shadows separate panels; medium shadows belong to menus; large shadows belong to modal overlays. The scrim is `rgba(15, 29, 53, 0.46)`. No blur is required. Global scrollbars remain visible and operable with forced-colors support.

## Shapes

Small controls use 6px corners, standard controls 10px, panels/dialogs 16px. Keep circular learning-status marks and level stations; keep authentic tool and fixed diagram exceptions.

## Components

### Foundational visual states

Define hover, visible keyboard focus, pressed, selected, disabled and busy appearances through existing state classes and native attributes. Avoid moving controls during feedback. Preserve the app's existing loading, empty, success and error messages and behavior.

### Buttons and navigation

Primary action uses blue with white text; completion uses green; secondary controls use neutral boundaries; review actions use red. Normal action controls are 38–40px high where space allows. Current sidebar entries use a blue inset marker and soft fill, without changing labels or targets.

### Forms and overlays

Style existing form/input owners; preserve validation, API and storage behavior. Dialogs have a pale header, white body, clear boundary and stable footer. Drawers retain their current scrolling and keyboard model. Search retains its existing result navigation and gains a visible focused-input treatment.

### Exercise workbench

The workbench borrows SSMS's docked query-and-results hierarchy, rather than rendering each tool as a floating card. Use existing white/grey surfaces, blue action/focus tokens and authentic SQL colors. CodeMirror is the canonical exercise input and completion owner; exercise results and table previews share one React grid treatment. No decorative toolbar controls, fake connection indicators, AI completions or answer snippets.

The editor/results split starts at 58/42 and supports pointer and keyboard resizing. Results, Messages, Table Data and Table Structure share a bounded lower frame; only the active panel scrolls. Keep the toolbar, tabs and paging reachable on short screens. Brief and Explorer each have a named scroll region. A 560px minimum workbench may use document scrolling on a short display; do not clip the page with a global overflow lock.

Execution, grading, preview, authentication and recovery follow `UX-CONTRACT.md`. Live table data requires the same access code as queries. Schema and the diagram stay available offline. Submit becomes available only after the current document revision executes without a SQL error; all server transactions still roll back.

### Iconography

Reuse the existing SVGs, status glyphs and app-owned marks. Do not replace instructional tool icons or add decorative icon sets.

### Motion

Color/border/shadow feedback uses 140ms; overlay entrances use 200ms and `cubic-bezier(0.2, 0.7, 0.2, 1)`. Existing reduced-motion rules disable CSS transitions and animations. Preserve the map's own reduced-motion handling and all interaction timing.

### Content and data visualization

Lesson content follows docs/quy-uoc.md and docs/lesson-template.md. The approved reference is lesson 1.1: one teaching section combines Excel and SQL in a narrative, with examples next to their explanation and the situation answered there. Use bold selectively for key concepts and the existing inline-code background for cited data values, identifiers and cell references in MDX prose. Keep authentic Excel/SSMS/Results rendering and their existing teaching marks. Content changes do not imply token or component changes.

For style-only changes, preserve copy, links, SQL, data, level order and progress meanings. Diagrams communicate existing relationships; their coordinates and teaching highlights are not decoration.

HRM_Demo relationship lines show `1` beside the referenced primary key and `∞` beside the foreign key, including the employee/manager loop. These indicate the one and many sides, not whether a value is required. Keep labels outside table boxes, share labels at common endpoints, and color them with the highlighted path. Both lesson diagrams and the database popup use the same component and legend.

## Do's and Don'ts

- Do derive shared visual decisions from the canonical CSS tokens and verify a sibling screen.
- Do check 1280px and 1440px, plus 1920px for the exercise workbench, long content, overlays, focus and reduced motion.
- Do preserve the original lesson Excel/SSMS replicas; use CodeMirror and its fallback for exercise editing.
- Don't introduce new workflows, visible wording, dependencies or a theme switch in a style refresh.
- Don't hide scrollbars, use faint ink for readable labels, or resize fixed diagram children independently of their geometry.
