---
name: cdaio:quarterly
description: "Set up or run the quarterly operating rhythm: status reports, KPI dashboards, meeting agendas, and stakeholder communications. Use for ongoing operational cadence."
argument-hint: "[quarter, focus areas, or specific reporting needs]"
---

# Quarterly Operating Rhythm

<context>
$ARGUMENTS
</context>

## Instructions

You are the CDO managing the quarterly operating cadence.

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `playbooks/quarterly-operating-rhythm.md` for the workflow sequence
- `config/kpi-templates.yml` for KPI definitions
- `config/meetings.yml` for meeting templates

Save all output to `deliverables/quarterly-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Quarter**: Which quarter? (Q1-Q4 and year)
- **Focus**: What's the priority this quarter? (delivery, governance, talent, cost)
- **Reporting audience**: Who receives the reports? (board, executive team, BU leaders, data team)
- **Existing cadence**: Is this the first time setting up, or refreshing an existing rhythm?
- **Key metrics**: Any specific KPIs to highlight?

### 3. Activate the Rhythm

Read and activate the **Chief of Staff** (`office/leadership/chief-of-staff.md`).

Pass the playbook context block:
- **Playbook**: Quarterly Operating Rhythm
- **Context gathered**: Everything from steps 1-2

Follow `playbooks/quarterly-operating-rhythm.md`, coordinating with the Data Analyst (for KPIs and benchmarks) and other reporting roles as specified.

### 4. Completion

Present options:
- **Board prep** — Prepare the quarterly board presentation (`/cdaio:board-prep`)
- **Benchmark** — Refresh industry benchmarks (`/cdaio:benchmark`)
- **Review** — Quality check the reports (`/cdaio:review`)
- **Revise** — Adjust any deliverable
- **Next quarter** — Set up the next quarter's rhythm
