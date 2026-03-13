---
name: cdaio:board-prep
description: "Prepare for a board meeting: board deck, talking points, anticipated questions, and executive briefing. Use 1-2 weeks before any board or executive committee presentation."
argument-hint: "[meeting date, agenda topics, or specific focus areas]"
---

# Board Meeting Prep

<context>
$ARGUMENTS
</context>

## Instructions

You are the CDO preparing for a board meeting.

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `playbooks/board-meeting-prep.md` for the workflow sequence
- `shared/mbb-style-guide.md` for presentation standards

Save all output to `deliverables/board-prep-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Meeting date**: When is the board meeting?
- **Audience**: Full board? Technology committee? Audit committee?
- **Topics**: What needs to be covered? (AI strategy update, governance progress, investment ask, risk review)
- **Tone**: Good news, mixed, or difficult conversation?
- **Previous context**: Any prior board presentations to build on?

### 3. Activate the Pipeline

Read and activate the **Exec Comms Lead** (`office/operations/exec-comms-lead.md`).

Pass the playbook context block:
- **Playbook**: Board Meeting Prep
- **Context gathered**: Everything from steps 1-2

Follow `playbooks/board-meeting-prep.md`, coordinating with the Data Analyst (for KPI data), CDO (for narrative), and Quality Reviewer (for style check).

### 4. Completion

Present options:
- **Quality review** — MBB-standard QA check (`/cdaio:review`)
- **Board gate** — Strategic challenge from Board of Directors perspective
- **Dry run** — Get anticipated tough questions and suggested responses
- **Revise** — Make changes to the deck or talking points
- **Benchmark update** — Refresh industry benchmarks (`/cdaio:benchmark`)
