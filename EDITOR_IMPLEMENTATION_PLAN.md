# Cheat Sheet Editor v2 — Implementation Plan

## Overview
Transform the editor from a basic section manager into a full mini word processor purpose-built for exam cheat sheets. Keep the skill in sync so AI-generated sheets drop into the editor with correct formatting.

---

## Chunk 1: Page & Layout Controls
**What:** Expand the page settings panel with all the options needed for different exam rules.

### Features
- [ ] **Orientation toggle:** Portrait (default) / Landscape
- [ ] **Page count:** 1 page / 2 pages (double-sided). When 2-page, editor shows both pages stacked vertically with a visual page break. Print produces 2 pages.
- [ ] **Paper size:** Letter (8.5×11) / A4 — dropdown
- [ ] **Margin control:** Single slider (0–0.5in) or 4 individual sliders (top/bottom/left/right)
- [ ] **Column count:** Expand range to 1–5 (currently 2–4)
- [ ] **Column gap:** Keep current slider, extend range 1–15pt
- [ ] **Column rule:** Toggle on/off, color picker for rule color

### Skill sync
- Skill specifies: orientation, page count, margins, columns in the generated HTML sections array so the editor loads them correctly.

---

## Chunk 2: Text Group Font Controls
**What:** Replace the single font size slider with per-group controls so you can size each text type independently.

### Text Groups (with defaults)
| Group | What it controls | Default | Range |
|-------|-----------------|---------|-------|
| **Section Titles** | `<h2>` headers inside sections | 6.2pt | 4–12pt |
| **Body Text** | `<p>` and general text | 5.6pt | 3.5–10pt |
| **Formula Text** | KaTeX `.katex` elements | 5.6pt | 3.5–10pt |
| **Bold/Key Terms** | `<b>`, `<strong>` elements | inherit (same as body) | 3.5–10pt |
| **Annotations** | `.n` class (gray italic "when to use" notes) | 4.9pt | 3–8pt |
| **Warnings** | `.w` class (red ⚠ text) | 5.1pt | 3–8pt |
| **Tip Boxes** | `.tip` class (🎯 yellow boxes) | 5.2pt | 3.5–8pt |
| **Table Text** | `td`, `th` elements | 5.3pt | 3–8pt |
| **Constants** | Text in the constants section | 5.3pt | 3–8pt |

### UI
- Collapsible "Typography" panel in sidebar
- Each group: label + slider + current value display
- "Reset all to defaults" button
- **Global scale** slider that proportionally scales ALL groups up/down together (keeps ratios)
- Line height slider (global, affects all groups)

### Skill sync
- Skill generates CSS variables for each text group: `--fs-title`, `--fs-body`, `--fs-formula`, etc.
- Editor reads/writes these variables. Auto-fit adjusts the global scale.

---

## Chunk 3: Top Toolbar — Text Formatting (Word-style)
**What:** A toolbar above the page (below the current top bar) with standard text editing controls that operate on selected text within contenteditable sections.

### Controls (left to right)
| Control | Type | Behavior |
|---------|------|----------|
| **Font preset** | Dropdown (2 options) | "Readable" (Verdana/Georgia) / "Dense" (Arial Narrow — current). Applies to entire page. |
| **Font size override** | Small number input + up/down | Changes font-size of selected text via `<span style>` wrap |
| **Bold** | Toggle button (B) | `document.execCommand('bold')` on selection |
| **Italic** | Toggle button (I) | `document.execCommand('italic')` on selection |
| **Underline** | Toggle button (U) | `document.execCommand('underline')` on selection |
| **Divider** | — | — |
| **Text color** | Color picker button | Applies color to selected text |
| **Highlight color** | Color picker button | Applies background-color to selected text (like Word highlighter) |
| **Divider** | — | — |
| **Insert Formula Box** | Button (fx▢) | Inserts a pre-styled `.fb` div at cursor position |
| **Insert Tip Box** | Button (🎯▢) | Inserts a pre-styled `.tip` div at cursor |
| **Insert Warning** | Button (⚠▢) | Inserts a `<span class="w">⚠ </span>` at cursor |
| **Insert Example Box** | Button (📝▢) | Inserts a pre-styled example/worked-problem box at cursor |
| **Insert Table** | Button (⊞) | Prompts for rows×cols, inserts a blank table |
| **Insert Horizontal Rule** | Button (—) | Inserts a thin `<hr>` divider |
| **Divider** | — | — |
| **Re-render Math** | Button (∑) | Re-renders all KaTeX |

### Font Presets
1. **"Readable"** — Verdana (body) + Georgia (math-adjacent). Optimized for legibility at 5-6pt. Good for people who struggle reading tiny condensed text.
2. **"Dense"** — Arial Narrow / Liberation Sans Narrow (current). Maximizes characters per line. Best for cramming maximum content.

### Insert Block Templates
```html
<!-- Formula Box -->
<div class="fb">$formula here$</div>

<!-- Tip Box -->
<div class="tip">🎯 <b>EXAM:</b> tip text here</div>

<!-- Warning -->
<span class="w">⚠ warning text here</span>

<!-- Example/Worked Problem Box -->
<div style="border:0.6pt solid #0891b2;background:#f0fdfa;padding:1pt 2pt;margin:1pt 0;border-radius:1pt;">
  <b style="color:#0891b2;">📝 Example:</b> problem setup and key steps here
</div>
```

### Skill sync
- Skill uses these exact same CSS classes (`.fb`, `.tip`, `.w`, example box inline style) so generated content matches the editor's formatting perfectly.
- Skill specifies which font preset to default to.

---

## Chunk 4: Section Manager Upgrades
**What:** Improve the section creation and management experience.

### Changes
- [ ] **Color picker:** Replace the dropdown with a native `<input type="color">` plus 10 preset swatches (the current colors) for quick selection. Click swatch = instant apply, or use picker for custom.
- [ ] **Section templates:** When adding a new section, offer templates:
  - "Blank" — empty section
  - "Formula section" — pre-populated with a formula box + body text placeholder
  - "Procedure section" — numbered steps template
  - "Table section" — pre-populated with a 3×3 table
  - "Diagram + Notes" — side-by-side layout placeholder
- [ ] **Duplicate section** button (in hover controls and sidebar)
- [ ] **Collapse/expand** sections in the sidebar list for easier navigation
- [ ] **Section width hint:** Optional "break-after" toggle that forces a column break after a section (for layout control)

### Skill sync
- Skill generates sections using the same template structures so they're immediately editable in the editor.

---

## Chunk 5: Diagram & Image Controls
**What:** Make embedded diagrams and images resizable and manageable.

### Features
- [ ] **Resize handles on images/SVGs:** When you click an image or SVG diagram, show drag handles on corners/edges to resize. Store the width as an inline style.
- [ ] **Image toolbar on selection:** When an image is selected, show a small floating toolbar with:
  - Width slider (10%–100%)
  - Alignment (left / center / right)
  - Delete button
- [ ] **SVG diagram scaling:** SVGs respect a `width` attribute. Add a resize handle or right-click → "Resize diagram" option.
- [ ] **Drag to reposition:** Allow dragging images/diagrams within a section to reorder them relative to text.
- [ ] **Image upload enhancement:** Support paste from clipboard (Ctrl+V / Cmd+V an image directly into a section)

### Skill sync
- Skill generates SVG diagrams with explicit `width` and `viewBox` attributes so the editor can resize them via the width attribute alone.

---

## Chunk 6: Auto-fit v2 & Print
**What:** Make auto-fit smarter and print more reliable.

### Auto-fit improvements
- [ ] **Fill mode (current):** Maximize font to fill entire page — keep this as default
- [ ] **Fit mode:** Shrink only if overflowing, don't enlarge — for when user has manually set sizes and just wants to fix overflow
- [ ] **Per-group scaling:** Auto-fit adjusts the global scale variable, which proportionally affects all text groups while preserving their ratios
- [ ] **2-page auto-fit:** When in 2-page mode, auto-fit distributes content across both pages and maximizes font for the pair

### Print improvements
- [ ] **Print preview indicator:** Dotted line on the page showing where the print boundary is
- [ ] **Bleed warning:** If any content extends past the page boundary, highlight it in red
- [ ] **"Print-safe" check button:** Scans for common print issues (images too wide, sections that break badly across columns)

### Skill sync
- Skill calls auto-fit after generating content to ensure the initial output fills the page.

---

## Chunk 7: Save/Load & Quality of Life
**What:** Improve project persistence and general UX.

### Features
- [ ] **Auto-save to localStorage:** Save state every 30 seconds. Warn before closing tab if unsaved changes exist.
- [ ] **Undo/Redo:** Track edit history (at least 20 steps). Ctrl+Z / Ctrl+Y.
- [ ] **Keyboard shortcuts:**
  - Ctrl+B: Bold
  - Ctrl+I: Italic
  - Ctrl+U: Underline
  - Ctrl+S: Save project JSON
  - Ctrl+P: Print/PDF
  - Ctrl+Z/Y: Undo/Redo
- [ ] **Dark/Light editor theme:** Toggle for the editor chrome (sidebar/toolbar). Page itself always white.
- [ ] **Zoom control:** Zoom the page preview in/out (50%–200%) without affecting actual print size. Useful on iPads.

### Skill sync
- Skill outputs a JSON-compatible state object so "Load Project" can import AI-generated sheets directly.

---

## Priority Order (Recommended)

| Order | Chunk | Why |
|-------|-------|-----|
| **1** | Chunk 3: Top Toolbar | Biggest immediate impact — lets you actually edit like a word processor |
| **2** | Chunk 2: Text Group Controls | Fine-grained sizing is critical for fitting content |
| **3** | Chunk 4: Section Manager | Better section creation workflow |
| **4** | Chunk 1: Page & Layout | 2-page mode and orientation needed for different exams |
| **5** | Chunk 5: Diagram Controls | Resizable diagrams improve layout |
| **6** | Chunk 6: Auto-fit v2 | Polish the auto-fit and print experience |
| **7** | Chunk 7: QoL | Nice-to-haves that make it feel professional |

---

## Notes for Skill ↔ Editor Sync

The skill MUST generate content using:
1. The same CSS class names: `.fb`, `.tip`, `.w`, `.n`, `<b>`, `<table>`, `<svg>`
2. The same CSS variables for text group sizes: `--fs-title`, `--fs-body`, `--fs-formula`, `--fs-annotation`, `--fs-warning`, `--fs-tip`, `--fs-table`
3. Section data as a JSON array: `[{title, color, content}, ...]`
4. Page settings as a JSON object: `{orientation, pages, paperSize, margins, columns, gap, fontPreset, textGroupSizes}`
5. SVG diagrams with explicit `width` + `viewBox` for resizability

When the skill generates a cheat sheet, it outputs a single `.json` file that the editor's "Load Project" can import directly. This is the bridge between AI generation and manual editing.
