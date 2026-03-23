---
name: exam-cheat-sheet-v2
description: "Use this skill whenever the user wants to create a cheat sheet, formula sheet, reference sheet, or crib sheet for an exam, test, quiz, or final. Triggers include: any mention of 'cheat sheet', 'formula sheet', 'reference sheet', 'crib sheet', 'allowed notes', 'one page of notes', 'exam prep sheet', or requests to condense course material onto one or two pages. Also trigger when the user says things like 'I can bring a sheet to my exam', 'professor allows one page', 'open note but only one sheet', 'need to fit everything on one page', or 'what should I put on my formula sheet'. Covers both printed (typed, LaTeX, Word) and handwritten sheets. Especially tuned for engineering, physics, math, and STEM courses but works for any subject. Do NOT use for full study guides, flashcards, or general note-taking that is not specifically for a single allowed reference sheet during an exam."
---

# Exam Cheat Sheet Creator

Generate dense, well-organized, exam-ready reference sheets for engineering and STEM courses. The primary output is a **JSON project file** that the user can import into their standalone Cheat Sheet Editor web app. Also supports handwritten mode (outline for copying by hand).

## Step 1: Gather Context

Before generating anything, collect the following from the user. Ask for what you don't have:

1. **Course and exam scope** -- which topics, chapters, or modules does the exam cover?
2. **Sheet rules** -- one side or two sides? Letter (8.5x11) or A4? Any restrictions on font size, color, or format?
3. **Mode: printed or handwritten?**
   - Printed = user will import the JSON into their editor. Output is a JSON object block.
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
2. **"When to use" annotations** -- every formula should have a brief note explaining what type of problem it applies to. Example: "$I = P/4\\pi r^2$ — use for intensity at distance r from point source"
3. **Sign conventions and easy-to-confuse details** -- sign errors are the #1 exam killer
4. **Step-by-step procedures** for problem types that follow a fixed algorithm, formatted as numbered steps
5. **Pre-computed values** -- if a calculation appears in 50%+ of problems (like $\\sin\\theta_c$ for common materials), pre-compute it
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

### Mode A: JSON Project File for Cheat Sheet Editor (Printed Sheets)

**This is the primary output mode.** The user has a standalone Cheat Sheet Editor web application. You must generate a single **JSON file code block** matching the exact schema required by the editor's "Load Project" feature. The user will save this JSON file and import it into their app.

#### JSON Schema
Your JSON output MUST exactly match this structure:

```json
{
  "header": "Title of the Cheat Sheet — Name",
  "globalScale": "1.0",
  "fsTitle": "6.2",
  "fsBody": "5.6",
  "fsFormula": "5.6",
  "fsBold": "5.6",
  "fsAnnot": "4.9",
  "fsWarn": "5.1",
  "fsTip": "5.2",
  "fsTable": "5.3",
  "fsConst": "5.3",
  "lineHeight": "1.06",
  "columns": "3",
  "gap": "4.5",
  "pages": "1",
  "paperSize": "letter",
  "orientation": "portrait",
  "margin": "0.12",
  "ruleChecked": true,
  "ruleColor": "#bbbbbb",
  "sections": [
    {
      "id": 0,
      "title": "Section Title 1",
      "color": "#64748b",
      "content": "<p>HTML content here with $...$ for math.</p>"
    },
    {
      "id": 1,
      "title": "Section Title 2",
      "color": "#2563eb",
      "content": "<p>More HTML content.</p>"
    }
  ]
}
```

#### Content Rules for the JSON:
- **`header`**: A concise title for the exam.
- **`id`**: Must be a unique integer starting from 0, incrementing for each section.
- **`color`**: You MUST use one of these specific hex codes for section colors to match the editor's palette:
  - `#64748b` (Gray)
  - `#2563eb` (Blue)
  - `#059669` (Green)
  - `#d97706` (Orange)
  - `#dc2626` (Red)
  - `#7c3aed` (Purple)
  - `#0e7490` (Teal)
  - `#db2777` (Pink)
  - `#374151` (Dark)
  - `#b45309` (Amber)
- **`content`**: The actual cheat sheet text for that section.
  - MUST be valid HTML inside a JSON string.
  - **CRITICAL JSON Escaping:** You are writing HTML and Math inside a JSON string. You MUST escape all double quotes as `\\"` and all backslashes as `\\\\` (e.g. `$\\\\gamma = 1/\\\\sqrt{1-v^2/c^2}$`).
  - Wrap paragraphs in `<p>`. Use `<br>` for line breaks.
  - Wrap math equations in KaTeX delimiters: `$equation$` for both inline and display math.
  - Use these specific HTML templates for components:
    - **Formula**: `<div class=\\"fb\\"><b>Name:</b> $formula$</div>`
    - **Warning**: `<div class=\\"w\\">⚠ <b>Warning:</b> text</div>`
    - **Tip**: `<div class=\\"tip\\">🎯 <b>Tip:</b> text</div>`
    - **Example**: `<div style=\\"border:1.5pt solid #cbd5e1; padding:2pt; background:#f8fafc; margin:2pt 0; border-radius:1.5pt;\\"><b>Example:</b> text</div>`
    - **Table**: Standard HTML table `<table>...</table>`
    - **SVG Diagrams**: Include simple, clean inline SVG diagrams for geometry/optics if explicitly helpful. Keep them small with simple lines and labels.

### Mode B: Handwritten Sheet

When the sheet must be handwritten:

1. **Output an outline, not a JSON file.** Hierarchical text outline the student copies onto paper.
2. **Be more aggressive about cutting content.** Handwritten holds ~40-60% as much as printed.
3. **Suggest a spatial layout.** Tell the student how to divide their page.
4. **Use shorthand notation.** Replace words with symbols wherever possible.
5. **Recommend pen colors.** Black = formulas, blue = procedures, red = warnings, green = definitions.

## Step 5: Review and Iterate

After generating the first draft JSON, prompt the user:

- "Does this cover all the topics on your exam?"
- "Anything here you know well enough to cut?"
- "Any formulas missing that your professor emphasized?"
- "Try importing this JSON file into the Cheat Sheet Editor. Does it fit on the page when you click Auto-fit?"

Then revise. Cheat sheets almost always need 2-3 rounds of editing. The interactive editor makes iteration fast -- the user can annotate a PDF export and send it back, or just describe changes in chat.

When the user sends back annotated feedback:
- Apply all annotations precisely
- If they say "add more content" or "fill the page," expand explanations, add more pre-computed values, add more diagrams, and increase "when to use" annotations
- If they say "move X into Y section," restructure accordingly
- Generate a new updated JSON code block for them to re-import

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

- **⚠ Warning callouts** for classic sign errors, forgotten factors of 2, or "everyone gets this wrong" situations -- use the `<div class="w">` template.
- **🎯 Exam pattern callouts** for high-probability problem types based on past exam and problem set analysis -- use the `<div class="tip">` template.
- **"When to use"** annotations in italic gray text (or just regular text) after each formula or procedure.
- **Pre-computed values** for calculations that appear repeatedly (trig of common angles, combined constants like $\mu_0 c$, etc.)
- **Variable definitions** next to every formula where variables aren't obvious
- **Units** on constants and in formulas where dimensional analysis helps
