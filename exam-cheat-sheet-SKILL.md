---
name: exam-cheat-sheet
description: "Use this skill whenever the user wants to create a cheat sheet, formula sheet, reference sheet, or crib sheet for an exam, test, quiz, or final. Triggers include: any mention of 'cheat sheet', 'formula sheet', 'reference sheet', 'crib sheet', 'allowed notes', 'one page of notes', 'exam prep sheet', or requests to condense course material onto one or two pages. Also trigger when the user says things like 'I can bring a sheet to my exam', 'professor allows one page', 'open note but only one sheet', 'need to fit everything on one page', or 'what should I put on my formula sheet'. Covers both printed (typed, LaTeX, Word) and handwritten sheets. Especially tuned for engineering, physics, math, and STEM courses but works for any subject. Do NOT use for full study guides, flashcards, or general note-taking that is not specifically for a single allowed reference sheet during an exam."
---

# Exam Cheat Sheet Creator

Generate dense, well-organized, exam-ready reference sheets for engineering and STEM courses. The primary output is an **interactive HTML editor app** that the user can customize in-browser and export to PDF. Also supports handwritten mode (outline for copying by hand).

## Step 1: Gather Context

Before generating anything, collect the following from the user. Ask for what you don't have:

1. **Course and exam scope** -- which topics, chapters, or modules does the exam cover?
2. **Sheet rules** -- one side or two sides? Letter (8.5x11) or A4? Any restrictions on font size, color, or format?
3. **Mode: printed or handwritten?**
   - Printed = user will type and print it. Output is an interactive HTML editor app.
   - Handwritten = user will copy it by hand. Optimize for outline structure and brevity.
4. **What they already know well** -- deprioritize or compress these topics. Space is precious.
5. **What they struggle with** -- these topics get prime real estate and more explanation.
6. **Any specific formulas, constants, or tables the professor requires or has hinted at.**
7. **Whether the user has uploaded course materials** (syllabi, lecture slides, formula lists, past exams, problem set solutions). If so, mine them exhaustively for content.

If the user just says "make me a cheat sheet for [course]" without detail, use your knowledge of standard curricula to generate a strong default, but flag that they should customize it.

## Step 2: Mine Uploaded Materials

If the user uploads course materials, process them ALL before generating the sheet:

### Formula sheets
- Extract every formula, constant, and equation. Cross-reference against what you include -- **nothing from the provided formula sheet should be missing** from the cheat sheet.

### Problem set solutions
- Identify which formulas are actually used in problems (these are high-priority)
- Note problem-solving patterns and procedures that repeat across problem sets
- Extract any "trick" steps or non-obvious manipulations

### Past exams
- Identify which problem types appear most frequently across years
- Flag topics with 2+ appearances as "high probability" exam questions
- If a prior exam from the SAME semester is provided, identify what was already tested -- compress those topics since they're less likely to reappear (but don't omit entirely)

### Lectures / slides
- Identify emphasized topics (things the professor spent multiple lectures on)
- Note any worked examples that match exam problem patterns

## Step 3: Content Strategy

A cheat sheet is NOT a condensed textbook. It is a **lookup tool** for things your brain blanks on under pressure, AND a **procedure guide** for multi-step problem types.

### What belongs on the sheet (highest to lowest priority)

1. **Formulas you can't derive quickly** -- with specific constants, coefficients, or non-obvious structure
2. **"When to use" annotations** -- every formula should have a brief note explaining what type of problem it applies to. Example: "$I = P/4\pi r^2$ — use for intensity at distance r from point source"
3. **Sign conventions and easy-to-confuse details** -- sign errors are the #1 exam killer
4. **Step-by-step procedures** for problem types that follow a fixed algorithm, formatted as numbered steps
5. **Pre-computed values** -- if a calculation appears in 50%+ of problems (like $\sin\theta_c$ for common materials), pre-compute it
6. **Exam-pattern tips** -- based on past exams and problem sets, flag the specific problem types most likely to appear. Integrate these into their respective topic sections (NOT as a separate section)
7. **Simple inline diagrams** -- SVG diagrams for geometrical concepts, sign conventions, ray tracing, etc. Keep diagrams clean with proper labels (θ₁, θ₂, n₁, n₂, etc.)
8. **Unit conversions and physical constants**
9. **Tables over prose** -- anywhere information can be expressed as a table, do it

### What does NOT belong

- Things the student knows cold
- Derivations (unless the exam tests derivation reproduction)
- Long conceptual explanations -- brief "when to use" notes are fine, paragraphs are not
- Anything redundant -- if one formula is a special case of another already present, omit the special case unless it saves significant exam time
- A standalone "exam tips" or "exam patterns" section -- these tips should be embedded in the relevant topic sections using a visually distinct callout box

## Step 4: Generate the Sheet

### Mode A: Interactive HTML Editor (Printed Sheets)

**This is the primary output mode.** Generate a single self-contained HTML file that functions as a full cheat sheet editor app. The user opens it in any browser, makes changes, and exports to PDF via the browser's print dialog.

#### Required editor features

The HTML file MUST include all of the following:

1. **Live-editable content** -- all text on the sheet is contenteditable. Click any section to type.
2. **Section management**:
   - Add new sections (modal with title, color picker, content textarea supporting $...$ math and HTML)
   - Delete sections (with confirmation)
   - Reorder sections (drag-and-drop in sidebar AND up/down arrow buttons)
   - Each section has a colored header and left border for visual scanning
3. **Image upload** -- user can upload images (diagrams, photos of notes) and insert them into any section with adjustable max-width
4. **Auto-fit to page** -- a button that automatically adjusts font size and line height to make content fill exactly one full page (letter size, minimal margins). The algorithm should MAXIMIZE the font size such that content fills the page without overflow. Use binary search: start large, shrink until it fits, then grow line height to fill remaining space.
5. **Manual sizing controls** -- sliders for font size (4-8pt), line height (0.9-1.4), column count (2/3/4), column gap
6. **Math rendering** -- KaTeX via CDN. A "Re-render Math" button that re-processes all $...$ delimiters after edits.
7. **Page fit indicator** -- green checkmark if content fits on one page, red warning with pixel overflow count if it doesn't
8. **Save/Load project** -- export all state (sections, content, settings, embedded images) as JSON file. Import JSON to restore.
9. **Print/PDF export** -- button that triggers window.print(). All editor UI (sidebar, toolbar) hidden via @media print. The printed output should be ONLY the sheet content with no margins.

#### Auto-fit algorithm (critical)

The auto-fit button should work as follows:
```
1. Set initial font size to maximum (e.g., 8pt)
2. Binary search: reduce font size until page.scrollHeight <= page height
3. Once font fits, binary search line height upward to fill remaining vertical space
4. Result: content fills the ENTIRE page at the LARGEST possible size
```

The goal is ZERO wasted space. The user should see a completely filled page.

#### Sheet layout rules

- **Page dimensions**: 8.5in × 11in (letter), minimal margins (0.12in)
- **Columns**: 3 columns default (adjustable 2-4)
- **Font**: Arial Narrow or Liberation Sans Narrow (condensed sans-serif)
- **Section headers**: Bold, uppercase, colored background, slightly larger than body
- **Color coding**: Assign a distinct color to each major topic (6-10 colors). Use for header background and left border.
- **Formula boxes**: Critical formulas in a thin-bordered box with light background
- **Warning callouts**: Red text with ⚠ prefix for common sign errors and exam traps
- **Exam tip callouts**: Yellow background box with 🎯 prefix, integrated into the relevant topic section
- **Tables**: Use for any if/then information (e.g., converging vs diverging lens properties)
- **Math**: KaTeX rendered, using $...$ delimiters

#### Diagrams

Include inline SVG diagrams where they help understanding. Guidelines:
- Keep diagrams SIMPLE -- clean lines, clear labels, minimal decoration
- Always label angles (θ₁, θ₂), indices (n₁, n₂), distances, and directions
- Use color consistently (e.g., red for incident ray, blue for refracted)
- Include a brief text description below or beside each diagram
- Common diagrams to include: Snell's law geometry, TIR critical angle, ray tracing (converging & diverging lenses), standing wave mode shapes, E×B propagation direction

#### HTML structure

```html
<div class="app">
  <div class="sidebar">
    <!-- Section management, sliders, import/export -->
  </div>
  <div class="main">
    <div class="topbar">
      <!-- Print, Auto-fit, Re-render buttons, fit indicator -->
    </div>
    <div class="preview-wrap">
      <div class="page" id="page">
        <!-- The actual 8.5x11 sheet content -->
        <div class="hdr" contenteditable>Title</div>
        <div class="cols" id="columnsContainer">
          <!-- Sections rendered here -->
        </div>
      </div>
    </div>
  </div>
</div>
```

Sections are stored in a JavaScript array and rendered dynamically. Edits are synced back to state on blur. The sidebar shows a draggable section list for reordering.

### Mode B: Handwritten Sheet

When the sheet must be handwritten:

1. **Output an outline, not a finished sheet.** Hierarchical text outline the student copies onto paper.
2. **Be more aggressive about cutting content.** Handwritten holds ~40-60% as much as printed.
3. **Suggest a spatial layout.** Tell the student how to divide their page.
4. **Use shorthand notation.** Replace words with symbols wherever possible.
5. **Recommend pen colors.** Black = formulas, blue = procedures, red = warnings, green = definitions.

## Step 5: Review and Iterate

After generating the first draft, prompt the user:

- "Does this cover all the topics on your exam?"
- "Anything here you know well enough to cut?"
- "Any formulas missing that your professor emphasized?"
- "Print a test page -- can you read everything at this size?"
- "Open the HTML editor and try the auto-fit button. Does it fill the page?"

Then revise. Cheat sheets almost always need 2-3 rounds of editing. The interactive editor makes iteration fast -- the user can annotate a PDF export and send it back, or just describe changes in chat.

When the user sends back annotated feedback:
- Apply all annotations precisely
- If they say "add more content" or "fill the page," expand explanations, add more pre-computed values, add more diagrams, and increase "when to use" annotations
- If they say "move X into Y section," restructure accordingly
- Re-run auto-fit after changes

## Engineering-Specific Content Libraries

When generating sheets for common engineering courses, draw on these typical content areas. Do NOT just dump all of these -- select based on what the user says is on their exam.

### Physics / Mechanics
Kinematics (1D/2D/3D), Newton's laws, work-energy theorem, conservation laws, rotational analogs, moment of inertia table, friction models, oscillations (SHM, damped, driven), wave equations, Doppler effect, fluid statics/dynamics

### Circuits / Electrical Engineering
Ohm's law, Kirchhoff's laws, voltage/current dividers, Thevenin/Norton, RC/RL/RLC transients, phasor analysis, impedance formulas, op-amp ideal rules, transfer functions, Bode plot rules, power formulas (real/reactive/apparent)

### Optics
Snell's law, thin lens equation, mirror equation, lensmaker's equation, magnification, ray tracing rules, interference/diffraction formulas (single slit, double slit, grating), Rayleigh criterion, Fresnel equations, polarization (Malus' law, Brewster's angle), Gaussian beam parameters, matrix optics (ABCD matrices), coherence

### Thermodynamics
Laws of thermodynamics, ideal gas law, work expressions for different processes, Carnot efficiency, entropy change formulas, phase diagrams, heat transfer modes, Stefan-Boltzmann, Fourier's law, Newton's law of cooling

### Signals & Systems
Fourier series/transform pairs, Laplace transform pairs and properties, convolution, transfer function to impulse/step response, sampling theorem, z-transform basics, common filter types

### Math (Calculus, Linear Algebra, ODEs, PDEs)
Integration techniques table, common series expansions, vector calculus identities (div, grad, curl), matrix operations, eigenvalue procedure, ODE solution forms by type, separation of variables procedure, Fourier method for PDEs, Laplace equation solutions, coordinate system conversions

### Materials / Solid Mechanics
Stress-strain relations, Hooke's law (1D and tensor), Mohr's circle procedure, beam bending formulas, moment-area theorems, column buckling (Euler), fatigue life basics

## Tips Embedded in Output

When generating any cheat sheet, weave in these contextually (NOT as a standalone section):

- **⚠ Warning callouts** for classic sign errors, forgotten factors of 2, or "everyone gets this wrong" situations -- red text, placed directly next to the relevant formula
- **🎯 Exam pattern callouts** for high-probability problem types based on past exam and problem set analysis -- yellow background box, placed inside the relevant topic section
- **"When to use"** annotations in italic gray text after each formula or procedure
- **Pre-computed values** for calculations that appear repeatedly (trig of common angles, combined constants like $\mu_0 c$, etc.)
- **Variable definitions** next to every formula where variables aren't obvious
- **Units** on constants and in formulas where dimensional analysis helps
