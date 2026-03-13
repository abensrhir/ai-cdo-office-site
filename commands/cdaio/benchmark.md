---
name: cdaio:benchmark
description: "Benchmark your AI/data maturity against industry peers. Compares investment levels, capability scores, and leader-vs-laggard patterns. Use to build the business case or contextualize a strategy."
argument-hint: "[industry, company size, or specific dimensions to benchmark]"
---

# Industry Benchmarking

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `config/ai-benchmarks.yml` for investment benchmarks and ROI data
- `config/peer-benchmarks.yml` for leader-vs-laggard patterns
- `config/ai-maturity.yml` for maturity framework and industry averages

Save all output to `deliverables/benchmark-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Industry**: What industry? (determines peer group)
- **Company size**: Revenue range? Employee count?
- **Maturity scores**: Current scores across 6 dimensions (or run `/cdaio:assess` first)
- **Focus**: What do you want to benchmark? (overall maturity, AI investment, specific capabilities)
- **Purpose**: Board presentation? Investment justification? Competitive analysis?

### 3. Activate the Analyst

Read and activate the **Data Analyst** (`office/ai-analytics/data-analyst.md`).

Instruct them to:
1. Benchmark maturity scores against industry peers from `config/peer-benchmarks.yml`
2. Compare AI investment levels (% of revenue) from `config/ai-benchmarks.yml`
3. Identify what leaders in the industry are doing differently
4. Quantify the cost of inaction
5. Produce an XLSX scorecard (read `shared/xlsx-blueprint.md` for patterns)

### 4. Completion

Present options:
- **Strategy** — Build strategy to close gaps (`/cdaio:strategy`)
- **Board prep** — Package benchmarks for board presentation (`/cdaio:board-prep`)
- **Assessment** — Run detailed maturity assessment (`/cdaio:assess`)
- **Review** — Quality check the benchmarks (`/cdaio:review`)
- **Revise** — Adjust peer group or focus areas
