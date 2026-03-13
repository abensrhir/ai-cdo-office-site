---
name: cdaio:deck
description: "Create a board deck or executive presentation with consulting-grade formatting. Covers AI/data strategy updates, investment asks, progress reports, or any executive briefing."
argument-hint: "[topic, audience, and key messages]"
---

# Board Deck

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `shared/mbb-style-guide.md` for presentation standards
- `shared/design-system.md` for visual design standards

Save all output to `deliverables/deck-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Topic**: What's the deck about? (strategy update, investment ask, progress report, risk review, governance launch)
- **Audience**: Who will see this? (full board, technology committee, executive team, BU leaders)
- **Key messages**: What are the 2-3 things you need the audience to take away?
- **Tone**: Confident progress? Cautious optimism? Urgent call to action?
- **Length**: How many slides? (10-15 for board, 5-7 for committee, 20-25 for comprehensive)
- **Data**: Any specific metrics, KPIs, or results to include?

### 3. Activate the Exec Comms Lead

Read and activate the **Exec Comms Lead** (`office/operations/exec-comms-lead.md`).

Instruct them to:
1. Structure the narrative using the pyramid principle (conclusion first)
2. Design the slide flow following MBB conventions
3. Include data visualizations where appropriate
4. Produce a PPTX board deck (read `shared/pptx-blueprint.md` for patterns)

### 4. Completion

Present options:
- **Quality review** — MBB-standard QA check (`/cdaio:review`)
- **Board gate** — Strategic challenge from Board of Directors perspective
- **Dry run** — Anticipated tough questions and suggested responses
- **Benchmark** — Add fresh industry benchmarks (`/cdaio:benchmark`)
- **Revise** — Make changes to specific slides
