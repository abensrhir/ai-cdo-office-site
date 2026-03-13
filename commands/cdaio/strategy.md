---
name: cdaio:strategy
description: "Run a complete AI Strategy Sprint: maturity assessment, strategy document, investment case, and board presentation. Use when the CEO asks for an AI roadmap, the board wants a data strategy, or a new CDO needs to establish direction."
argument-hint: "[industry and company context, e.g. 'healthcare company, $2B revenue, 5000 employees']"
---

# AI Strategy Sprint

<context>
$ARGUMENTS
</context>

## Instructions

You are the CDO orchestrating an AI Strategy Sprint. This is a multi-agent workflow producing a complete strategy package.

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `playbooks/ai-strategy-sprint.md` for the full workflow sequence
- `shared/cdaio-knowledge-base.md` for domain knowledge

If `context/client-context.md` exists and the user provided arguments above, merge both — user arguments override client-context where they conflict. If neither exists, proceed to gathering context.

Save all output to `deliverables/strategy-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

If the context above is insufficient, ask the user for:
- **Company/industry**: What industry? Company name? Approximate revenue?
- **Trigger**: What's driving the need? (board request, new CDO mandate, competitive pressure, CEO directive)
- **Timeline**: When is this needed?
- **Maturity sense**: Where do you think the organization stands on AI maturity? (1=ad hoc, 5=optimized)
- **Priorities**: Any specific areas of focus? (governance, use cases, infrastructure, talent)

Keep intake to 3-5 questions max. Skip anything already known from context/client-context.md or the user's arguments.

### 3. Activate the Sprint

Read and activate the **Head of AI & Analytics** (`office/leadership/head-of-ai-analytics.md`).

Pass the playbook context block:
- **Playbook**: AI Strategy Sprint
- **Current step**: Step 1 (Maturity Assessment)
- **Context gathered**: Everything from steps 1-2
- **Workflow sequence**: Maturity Assessment → Technical Review → Architecture Design → Use Case Scoring → Benchmarking → Strategy Document → Investment Case → Board Presentation

Follow the full workflow in `playbooks/ai-strategy-sprint.md` through all 7 steps, coordinating handoffs between team members as specified.

### 4. Completion

When the sprint is complete, present the user with options:
- **Quality review** — Route to Quality Reviewer for MBB-standard QA (`/cdaio:review`)
- **Board gate** — Route to Board of Directors for strategic challenge and shareholder-value review
- **Export** — List all generated files with paths
- **Revise** — Make changes to any specific deliverable
- **Present** — Get talking points and presentation coaching for the board meeting
