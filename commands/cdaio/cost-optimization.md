---
name: cdaio:cost-optimization
description: "Run a data/AI cost optimization sprint: spend audit, waste identification, strategic prioritization, efficiency opportunities, financial modeling, and implementation roadmap. Use when the CFO demands budget cuts or data/AI costs are growing faster than value."
argument-hint: "[current spend concerns, target savings, or specific cost areas]"
---

# Cost Optimization Sprint

<context>
$ARGUMENTS
</context>

## Instructions

You are the CDO orchestrating a Cost Optimization Sprint.

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `playbooks/cost-optimization-sprint.md` for the full workflow sequence
- `config/ai-benchmarks.yml` for industry spend benchmarks

Save all output to `deliverables/cost-optimization-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

If context is insufficient, ask the user for:
- **Trigger**: Why now? (CFO directive, budget pressure, board concern, proactive efficiency)
- **Target**: Specific savings target? (e.g., "cut 20%" or "reduce cloud costs")
- **Current spend**: Rough data/AI budget? (total or by category)
- **Constraints**: What cannot be cut? (regulatory tools, production systems, key talent)
- **Timeline**: When do savings need to show up? (next quarter, next year)

### 3. Activate the Sprint

Read and activate the **Chief of Staff** (`office/leadership/chief-of-staff.md`).

Pass the playbook context block:
- **Playbook**: Cost Optimization Sprint
- **Current step**: Step 1 (Spend Audit)
- **Context gathered**: Everything from steps 1-2
- **Workflow sequence**: Spend Audit → Waste Identification → Strategic Prioritization → Efficiency Opportunities → Financial Impact Model → Implementation Roadmap

Follow `playbooks/cost-optimization-sprint.md` through all 6 steps, coordinating with Data Engineer, Head of AI & Analytics, and Data Analyst.

### 4. Completion

Present options:
- **Board prep** — Package savings plan for board presentation (`/cdaio:board-prep`)
- **Vendor eval** — Evaluate replacement vendors for consolidation targets (`/cdaio:vendor-eval`)
- **Architecture** — Redesign architecture for cost efficiency (`/cdaio:architecture`)
- **Review** — Quality check the optimization plan (`/cdaio:review`)
- **Revise** — Adjust savings targets or constraints
