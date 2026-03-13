---
name: cdaio:raci
description: "Build a RACI matrix for any data/AI initiative. Clarifies Responsible, Accountable, Consulted, and Informed roles across stakeholders. Use for governance rollouts, AI projects, or organizational design."
argument-hint: "[initiative name, scope, or stakeholder context]"
---

# RACI Matrix

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `shared/cdaio-knowledge-base.md` for standard CDAIO organizational patterns

Save all output to `deliverables/raci-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Initiative**: What is the RACI for? (governance rollout, AI project, data platform migration, org restructure)
- **Stakeholders**: Who are the key stakeholders? (CDO, CTO, CIO, BU leaders, data stewards, legal, compliance)
- **Activities**: What are the key activities or decisions to map? (or let the agent suggest based on initiative type)
- **Organizational context**: Centralized or federated? Matrix organization?

### 3. Activate the Program Manager

Read and activate the **Program Manager** (`office/operations/program-manager.md`).

Instruct them to:
1. Define the key activities/decisions for the initiative
2. Identify all relevant stakeholder roles
3. Assign R/A/C/I for each activity-stakeholder intersection
4. Flag any activities with missing Accountable or multiple Accountables
5. If `generators/raci/generate.py` exists, produce XLSX output
6. Otherwise, produce a structured markdown RACI table

### 4. Completion

Present options:
- **Stakeholder comms** — Draft communications for each stakeholder group
- **Governance** — Build full governance framework (`/cdaio:governance`)
- **Policy** — Create supporting policies (`/cdaio:policy`)
- **Review** — Quality check the RACI (`/cdaio:review`)
- **Revise** — Adjust activities or stakeholder assignments
