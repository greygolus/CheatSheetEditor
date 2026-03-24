---
name: cheat-sheet
description: "Use this skill whenever the user wants to create a general cheat sheet, study guide, review sheet, summary notes, or concept map for an upcoming test, midterm, or final across most subjects (history, biology, literature, business, social sciences, etc.). Triggers include: 'make a cheat sheet', 'make a study guide', 'summarize these chapters for my test', 'create a review sheet', 'help me study this material', or 'organize my notes into a study guide'. This skill is optimized for structured, general-knowledge summaries (definitions, timelines, themes, comparisons) and strongly emphasizes the generation of beautiful, intuitive SVG diagrams to visualize relationships and concepts."
---

# General Cheat Sheet Creator

Generate clear, well-organized, comprehensive cheat sheets and study guides for any general subject. The primary output is a **JSON project file** that the user can import into their standalone Cheat Sheet Editor web app, which serves as an excellent reference builder and viewer.

## Step 1: Gather Context

Before generating anything, collect the following from the user. Ask for what you don't have:

1. **Subject and Scope** -- which chapters, themes, or historical periods does the test cover?
2. **Format preferences** -- do they want a focus on vocabulary, chronological timelines, comparative tables, broad conceptual summaries, or visual concept maps?
3. **Course Materials** -- Prompt the user to upload lecture slides, textbook chapter summaries, syllabi, or their personal class notes.

## Step 2: Mine Uploaded Materials

If the user uploads course materials, process them systematically:

- **Extract Key Vocabulary:** Identify all bolded terms, jargon, and definitions.
- **Identify Core Themes:** Look for recurring motifs, major arguments, or overarching theories.
- **Find Crucial Relationships:** Note causes and effects (History), structures and functions (Biology), or pros and cons (Business).
- **Consolidate:** Remove fluff and filler text. Distill paragraphs down to their most crucial points.

## Step 3: Content Strategy & Visual Emphasis

A cheat sheet should be structured for quick reading and mental mapping. Visual aids are **critical**. You must actively try to turn confusing text into clear diagrams.

### What belongs on the sheet
1. **SVG Diagrams:** Always emphasize incorporating inline custom SVG drawings and diagrams. Draw concept maps, flowcharts, timelines, organizational charts, Venn diagrams, or any other visual representation using precise `<svg>` tags.
2. **Vocabulary & Definitions:** Clear, concise definitions of key terms.
3. **Categorized Lists:** Group items logically (e.g., "Key Figures in the French Revolution", "Types of Cell Division").
4. **Comparison Tables:** Use tables for concepts that need contrasting (e.g., Mitosis vs. Meiosis, Capitalism vs. Socialism).
5. **Chronological Timelines:** For history or process-oriented subjects, visualize the timeline using SVGs and HTML.
6. **"Why it matters" callouts:** Brief notes on the significance of a concept.
7. **Memory hooks (Mnemonics):** Provide acronyms or tricks for remembering lists if applicable.

### Formatting Guidelines
- Use bullet points aggressively.
- Use bold text for terms and important figures.
- Provide strong emphasis on **custom SVG diagrams** for any complex concepts that are easily visualized. Ensure the SVGs are beautifully styled, properly scaling, and clearly labeled.
- Use `<div class="tip">` for memory tricks or "highly likely to be grouped together" concepts.
- Use `<div class="w">` for common misconceptions or easily confused terms (e.g., "Don't confuse *affect* with *effect*").

## Step 4: Generate the JSON

You must generate a single **JSON file code block** matching the exact schema required by the editor's "Load Project" feature. 

#### JSON Schema
Your JSON output MUST exactly match this structure:

```json
{
  "header": "Title of the Cheat Sheet — Name",
  "globalScale": "1.0",
  "fsTitle": "7.0",
  "fsBody": "6.0",
  "fsFormula": "6.0",
  "fsBold": "6.0",
  "fsAnnot": "5.5",
  "fsWarn": "5.5",
  "fsTip": "5.5",
  "fsTable": "5.5",
  "fsConst": "5.5",
  "lineHeight": "1.2",
  "columns": "2",
  "gap": "6.0",
  "pages": "1",
  "paperSize": "letter",
  "orientation": "portrait",
  "margin": "0.15",
  "ruleChecked": false,
  "ruleColor": "#e2e8f0",
  "sections": [
    {
      "id": 0,
      "title": "Section Title 1",
      "color": "#2563eb",
      "content": "<p>HTML content and <svg>...</svg> here...</p>"
    }
  ]
}
```

#### Content Rules for the JSON:
- **`columns`**: Default to `"2"` or `"3"` depending on content density.
- **`color`**: You MUST use one of these specific hex codes: `#64748b`, `#2563eb`, `#059669`, `#d97706`, `#dc2626`, `#7c3aed`, `#0e7490`, `#db2777`, `#374151`, `#b45309`.
- **`content`**: 
  - MUST be valid HTML inside a JSON string with proper escaping (`\\"` for quotes).
  - Wrap paragraphs in `<p>`. Use `<br>` for line breaks. Use `<ul><li>...</li></ul>` for lists.
  - Make extensive use of `<svg>` tags for visual concepts. For example, use basic `<rect>`, `<circle>`, `<path>`, `<line>`, and `<text>` elements. The SVGs should be clean and properly escaped. (e.g., `<svg width=\\"100%\\" viewBox=\\"0 0 200 100\\"><rect x=\\"10\\" y=\\"10\\" width=\\"80\\" height=\\"40\\" fill=\\"#bfdbfe\\" stroke=\\"#2563eb\\"/><text x=\\"50\\" y=\\"35\\" font-size=\\"12\\" text-anchor=\\"middle\\">Concept A</text></svg>`). Let the `<svg>` fill widths properly.
  - Use these specific HTML templates for components:
    - **Warning/Clarification**: `<div class=\\"w\\">⚠ <b>Don't Confuse:</b> text</div>`
    - **Memory Tip**: `<div class=\\"tip\\">🎯 <b>Mnemonic:</b> text</div>`
    - **Definition Box**: `<div class=\\"fb\\"><b>Term:</b> Definition goes here.</div>`
    - **Table**: Standard HTML table `<table><tr><td>...</td></tr></table>`

## Step 5: Review and Iterate

After generating the first draft JSON, ask the user:
- "Does this capture the right level of detail for your test?"
- "Are there any concepts you'd like me to turn into a diagram or expand on?"
- "Try importing this JSON file. Let me know if you need to condense the text to fit into fewer pages."
