---
name: cdaio:use-cases
description: "Identify and score AI use cases for your industry. Produces a prioritized portfolio with feasibility-value scoring, 2x2 matrix, and first-wave recommendations."
argument-hint: "[industry, business priorities, or specific domains to explore]"
---

# AI Use Case Identification & Scoring

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `config/ai-impact.yml` for 90+ AI use cases with industry impact data
- `config/industries.yml` for industry-specific context

Save all output to `deliverables/use-cases-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Industry**: What industry? (determines use case catalog)
- **Business priorities**: Revenue growth? Cost reduction? Risk management? Customer experience?
- **Current AI state**: Any AI/ML in production? POCs underway?
- **Data readiness**: Key data assets available? Quality concerns?
- **Constraints**: Budget, timeline, talent availability?

### 3. Activate the Use Case Lead

Read and activate the **Use Case Lead** (`office/ai-analytics/use-case-lead.md`).

Instruct them to:
1. Identify 15-25 potential AI use cases from `config/ai-impact.yml` and the user's context
2. Score each on feasibility (data readiness, technical complexity, talent) and value (revenue, cost savings, risk reduction)
3. Plot on a 2x2 matrix: Quick Wins, Strategic Bets, Low Priority, Moonshots
4. Recommend top 5-7 for the first wave with rationale
5. Produce a structured portfolio as markdown (this agent is advisory-only)

### 4. Completion

Present options:
- **Strategy** — Embed use cases in a full AI strategy (`/cdaio:strategy`)
- **Architecture** — Design architecture to support first-wave use cases (`/cdaio:architecture`)
- **Assessment** — Validate maturity to support selected use cases (`/cdaio:assess`)
- **RACI** — Build RACI for first-wave implementation (`/cdaio:raci`)
- **Revise** — Adjust scoring criteria or priorities
