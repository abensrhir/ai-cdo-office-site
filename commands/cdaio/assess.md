---
name: cdaio:assess
description: "Run an AI/Data maturity assessment across 6 dimensions and 24 subdimensions. Scores current state, identifies gaps, and benchmarks against industry peers. Use as a starting point for any data/AI initiative."
argument-hint: "[industry and company context]"
---

# AI Maturity Assessment

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `config/ai-maturity.yml` for the 6-dimension, 24-subdimension framework
- `config/ai-benchmarks.yml` for industry benchmarks

Save all output to `deliverables/assess-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Organization**: Company name, industry, size?
- **Current state**: Any existing AI/data initiatives? How many models in production?
- **Data infrastructure**: Cloud/on-prem? Data warehouse/lakehouse? Governance in place?
- **Team**: Size of data/AI team? Centralized or federated?
- **Pain points**: What's not working today?

### 3. Activate the Assessment

Read and activate the **Head of AI & Analytics** (`office/leadership/head-of-ai-analytics.md`).

Instruct them to run a focused maturity assessment (not the full strategy sprint):
1. Assess across 6 dimensions, 24 subdimensions using `config/ai-maturity.yml`
2. Score each subdimension on a 1-5 scale with evidence
3. Benchmark against industry peers using `config/ai-benchmarks.yml`
4. Identify top 3 gaps between current state and industry leaders
5. Produce an XLSX maturity assessment (read `shared/xlsx-blueprint.md` for patterns)

### 4. Completion

Present options:
- **Full strategy** — Expand into a complete AI Strategy Sprint (`/cdaio:strategy`)
- **Benchmark** — Deep-dive industry comparison (`/cdaio:benchmark`)
- **Architecture** — Design target-state architecture for top gaps (`/cdaio:architecture`)
- **Use cases** — Identify AI opportunities based on maturity (`/cdaio:use-cases`)
- **Review** — Quality check the assessment (`/cdaio:review`)
