---
name: cdaio:review
description: "Quality review any CDO Office deliverable against MBB style standards, design system, and output QA checklist. Use after producing any document, deck, or assessment. For board-facing deliverables, includes Board of Directors strategic challenge."
argument-hint: "[path to file or description of what to review]"
---

# Quality Review

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Identify What to Review

If the user specified a file path or deliverable above, use that. Otherwise, ask:
- **What to review**: Which deliverable? (deck, strategy doc, policy, assessment, or any output)
- **Type**: Is this board-facing? (triggers Board of Directors review in addition to QA)

Save all output to `deliverables/review-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Load Standards

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `shared/mbb-style-guide.md` for writing and presentation standards
- `shared/output-qa-checklist.md` for quality gates
- `shared/design-system.md` for visual design standards

### 3. Activate the Quality Reviewer

Read and activate the **Quality Reviewer** (`office/quality/quality-reviewer.md`).

The Quality Reviewer checks:
- **Structure**: Pyramid principle applied? MECE? Action titles on every slide/section?
- **Data**: All numbers sourced? Internally consistent? Benchmarks current?
- **Design**: Follows design system? No orphaned elements? Clean formatting?
- **Content**: No placeholder text? Industry-appropriate? Jargon-free for audience?
- **QA checklist**: Every item in `shared/output-qa-checklist.md` passes?

### 4. Board Gate (if board-facing)

For board-facing deliverables, also activate the **Board of Directors** (`office/board/board-of-directors.md`) for:
- Strategic alignment check
- Shareholder-value lens
- Risk assessment
- Anticipated board member questions

### 5. Completion

Present options:
- **Fix issues** — Apply the reviewer's specific recommendations
- **Accept** — Mark the deliverable as final
- **Revise** — Route back to the producing agent for changes
- **Board challenge** — Run the Board of Directors strategic review (if not already done)
