---
name: cdaio:architecture
description: "Design a target-state data and AI architecture blueprint with current-state assessment, technology recommendations, migration roadmap, and cost estimates. Covers all 8 architecture layers."
argument-hint: "[industry, current tech stack, or specific architecture focus]"
---

# Architecture Blueprint

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `config/architecture-patterns.yml` for reference architectures by maturity level (L1-L5)
- `config/ai-maturity.yml` for maturity framework context

Save all output to `deliverables/architecture-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Current stack**: What's in place today? (cloud provider, data warehouse, BI tools, ML platforms)
- **Maturity level**: Where is the organization? (L1-Ad Hoc to L5-Optimized)
- **Target state**: Where do you want to be in 18-24 months?
- **Constraints**: Budget range? Cloud-only or hybrid? Vendor preferences?
- **Priority**: What's the most urgent architecture need? (data platform, ML infrastructure, governance tooling, real-time)

### 3. Activate the Architect

Read and activate the **Data & AI Architect** (`office/ai-analytics/data-ai-architect.md`).

Instruct them to:
1. Assess current architecture maturity across 8 layers using `config/architecture-patterns.yml`
2. Design target-state architecture aligned with strategic priorities
3. Benchmark technology components and recommend platform choices
4. Build phased migration roadmap with cost estimates
5. Produce a PPTX architecture blueprint (read `shared/pptx-blueprint.md` for patterns)

### 4. Completion

Present options:
- **Strategy** — Embed architecture in a full AI strategy (`/cdaio:strategy`)
- **Assessment** — Run maturity assessment to inform architecture (`/cdaio:assess`)
- **Compliance** — Ensure architecture meets regulatory requirements (`/cdaio:compliance`)
- **Review** — Quality check the blueprint (`/cdaio:review`)
- **Revise** — Adjust architecture decisions or scope
