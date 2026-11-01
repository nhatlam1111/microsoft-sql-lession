# Appendix infrastructure verification

Scope: collection/catalog/schema, routes/index/layout, sidebar/top navigation, combined search, reference-table overflow, built-link checks and their regression tests. No main lesson, exercise/YAML/API, seed, SQL execution, secret, branch, commit or push work performed by this agent.

## Canonical owners and behavior

| Capability | Owner / source | Applied behavior |
|---|---|---|
| Visual identity | DESIGN.md; src/styles/tokens.css is canonical runtime source | Existing blue/white study workbench, fonts, three-column grid, narrow notice, four-column SQL tabs. No token value or breakpoint change. |
| Reference catalog | src/lib/appendices.ts; load-appendices.ts; appendices collection | Six bounded entries PL.1–PL.6, approved slugs, no level/area/minutes/exercise metadata. Related lesson numbers validated against main catalog. |
| Routes / chapter navigation | paths.ts; AppendixLayout; SidebarNav; TopBar | /phu-luc/ index and six article routes; independent chapter and previous/next confined to reference entries. Main mindmap geometry unchanged. |
| Progress / resume | Existing main catalog and progress owners | Main input remains 50 lesson numbers and six levels; AppendixLayout has no LessonStatus or markSeen call. Sidebar still initializes progress from main entries only. |
| Reference tables | ReferenceTable.astro, selected by appendix MDX table mapping | Native table inside named keyboard-scrollable horizontal region. Natural document height, no shared-shell height constraint. Bounded static reference data needs no pagination, sorting or selection. |
| Search | SearchDialog; createSearchItems/searchItems in search.ts | Local adapter includes main lessons plus references/keywords. Exact normalized number, then title, then metadata ranking retained. PL label instead of level badge. Local transient query remains outside URL. Clear immediately resets/refocuses; IME-safe Enter/shortcut, arrows select and scroll active result, Escape/close restore focus, Tab containment and inert background. Real result hrefs. |
| Scrollbar | Existing global base.css and tokens.css | All new overflow containers inherit visible tokenized scrollbars and forced-colors path. |
| Authored lookup anchors | .appendix-article span[id] in lesson.css | ASCII span targets are block boxes with scroll-margin-top matching the existing sticky top bar plus 24px. Root verifies clicks on the current build. |
| Forms / date picker / mutations / toast | Not applicable to this read-only extension | Existing editor, API and progress import/reset behavior unchanged. |

Register: product learning tool, Vietnamese locale; no Japan-market flow. Existing DESIGN.md plus approved appendix spec are the maintained behavioral/design evidence for this focused read-only flow; no second UX contract introduced. Loaded both frontend-design skills completely plus relevant ownership, lifecycle, token-mapping, interaction, navigation, consistency, decision, anti-pattern and verification references.

## Drift review

| Rule | Evidence | Verdict / action |
|---|---|---|
| Reuse established design and route owners | AppendixLayout uses existing lesson classes; token source unmodified; SidebarNav/path helpers extended | MATCH. Durable reference variant documented in DESIGN.md. |
| Keep course progress semantics | Main catalog unmodified; reference catalog never passed into roadmap, mindmap layout or progress nums | MATCH by source/tests; root will verify browser persistence. |
| Accessible transient search | Previous clickable result li and missing explicit clear/focus containment were inside the touched owner | Corrected within SearchDialog rather than introducing a second palette. Backdrop pointer dismissal is supplemental to explicit Close and Escape. |
| Resize-none audit | Audit reports SqlEditor.tsx:53; existing .ed-input rule at exercise.css:27 declares resize:none | Existing static false positive, also present in root baseline audit. Left unrelated editor unchanged. |

## Actual checks

- `npm test -- tests/appendices.test.ts tests/catalog.test.ts tests/search.test.ts tests/paths.test.ts tests/check-dist.test.ts tests/islands.test.ts tests/roadmap.test.ts tests/progress.test.ts tests/progress-store.test.ts tests/mindmap-layout.test.ts tests/mindmap-view.test.ts`: exit 0; 11 files, 81 tests passed. Covers separate schema/catalog/order/related links, main catalog shape/neighbors, PL keyword and case/accent lookup, unchanged main search rankings, path base, reference sidebar state, relative/encoded fragment validation and existing progress/roadmap/mindmap regression.
- `npm run check`: exit 0; 0 errors, 0 warnings, three existing deprecation hints in ExerciseWorkspace.tsx and SqlEditor.tsx.
- `npx -p @google/design.md designmd lint DESIGN.md`: exit 0; 0 errors, 0 warnings, one informational token summary.
- Strict `audit_project.py`: exit 1; the single unchanged SqlEditor resize-none finding above. Full JSON: `ui-audit-after-infrastructure.json` beside this report.
- `git diff --check` for changed tracked infrastructure: no whitespace errors; Git emitted repository line-ending normalization notices.
- Searched changed search/sidebar/layout/table/routes for browser alert/confirm/prompt calls, clickable table headers, dangerouslySetInnerHTML and innerHTML assignments: no matches. New reference/index links use hrefs; new action controls use buttons.

## Remaining verification delegated to root

No full build or browser run by this agent yet: content authors are still writing the six MDX files. Root owns the coordinated full suite/build/check:dist and browser. In particular verify that the MDX `table` override wraps rendered tables, the chapter/header fit at 1280/1440px and the contracted narrow viewport, no document overflow, search clear/no-results/keyboard/IME/focus and scrolling, details/TOC/cross-links, and opening references preserves saved lastLessonNum/statuses and the denominator 50. New check:dist validates the appendix index plus six pages and fragments in or pointing into the chapter. No source inspection or static audit is claimed as browser/SQL evidence.
