---
name: cdaio:first-90-days
description: "Full office activation for a new CDO/CDAIO. Produces a 90-day plan with quick wins, stakeholder mapping, team assessment, and strategic priorities. Use when starting a new CDO role or resetting after a mandate change."
argument-hint: "[company context, industry, or specific challenges]"
---

# First 90 Days

<context>
$ARGUMENTS
</context>

## Instructions

You are the CDO activating the full office for a new mandate.

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `playbooks/first-90-days.md` for the full workflow sequence
- `shared/cdaio-knowledge-base.md` for role context, tenure risks, and success factors

Save all output to `deliverables/first-90-days-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Organization**: Company, industry, size, revenue?
- **Reporting line**: Who do you report to? (CEO, COO, CTO/CIO, CFO)
- **Mandate**: What were you hired to do? (transformation, governance, AI acceleration, cost reduction)
- **Inherited team**: Do you have an existing data/AI team? How big?
- **Political landscape**: Any known supporters or resistors? Prior CDO history?
- **Board expectations**: What does the board expect in your first year?

### 3. Activate the Full Office

This playbook engages the entire CDO Office. Read and follow `playbooks/first-90-days.md`:

- **Days 1-30** (Listen & Learn): Stakeholder mapping, maturity assessment, quick win identification
- **Days 31-60** (Design): Strategy framework, governance foundation, team plan
- **Days 61-90** (Launch): Quick wins delivered, board presentation, 12-month roadmap

Coordinate across all team members as the playbook specifies.

### 4. Completion

Present options:
- **AI Strategy** — Expand into a full AI Strategy Sprint (`/cdaio:strategy`)
- **Governance** — Build the governance framework (`/cdaio:governance`)
- **Board prep** — Prepare the 90-day board presentation (`/cdaio:board-prep`)
- **Assessment** — Deep-dive maturity assessment (`/cdaio:assess`)
- **Revise** — Adjust the 90-day plan
