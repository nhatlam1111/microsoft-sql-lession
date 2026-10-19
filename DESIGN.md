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
- Restraint: retain all words, routes, section order, actions, progress semantics and tool replicas.
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

## Layout

Retain the three-column lesson grid (272px sidebar, flexible article, 248px rail), the two-column exercise workspace, and the existing popup/drawer placement. Use the established 4/8px rhythm for spacing. Keep the main reading surface white and the rail cool grey. Tables and code own horizontal overflow; the document should not acquire a horizontal scrollbar at supported widths.

Mindmap dimensions remain root 190×58, area 214×52, lesson 236×30. ERD retains its fixed canvas, node positions and row heights. These compact diagram elements are deliberate geometry exceptions to general control sizing. Never apply a global button minimum height to them. SQL editor textarea/highlight share all text metrics and padding. Do not add global scrollbar gutters that separate their content boxes.

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

### Iconography

Reuse the existing SVGs, status glyphs and app-owned marks. Do not replace instructional tool icons or add decorative icon sets.

### Motion

Color/border/shadow feedback uses 140ms; overlay entrances use 200ms and `cubic-bezier(0.2, 0.7, 0.2, 1)`. Existing reduced-motion rules disable CSS transitions and animations. Preserve the map's own reduced-motion handling and all interaction timing.

### Content and data visualization

Copy, links, SQL, data, level order and progress meanings are unchanged. Diagrams communicate existing relationships; their coordinates and teaching highlights are not decoration.

## Do's and Don'ts

- Do derive shared visual decisions from the canonical CSS tokens and verify a sibling screen.
- Do check 1280px and 1440px, long content, overlays, focus and reduced motion.
- Do preserve the original Excel/SSMS replicas and editor layering.
- Don't introduce new workflows, visible wording, dependencies or a theme switch in a style refresh.
- Don't hide scrollbars, use faint ink for readable labels, or resize fixed diagram children independently of their geometry.
