---
name: cdaio:governance
description: "Build a complete data governance framework: policies, stewardship program, RACI matrix, and compliance checklist. Use when starting governance from scratch or overhauling an existing program."
argument-hint: "[industry, regulatory context, or specific governance needs]"
---

# Governance Framework

<context>
$ARGUMENTS
</context>

## Instructions

You are the CDO orchestrating a Governance Framework buildout.

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `playbooks/governance-framework.md` for the workflow sequence
- `config/regulations.yml` for regulatory landscape
- `shared/cdaio-knowledge-base.md` for governance frameworks

Save all output to `deliverables/governance-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

If context is insufficient, ask the user for:
- **Industry**: What industry? (determines regulatory requirements)
- **Current state**: Any existing governance? Policies? Stewards?
- **Regulatory pressure**: Which regulations apply? (GDPR, CCPA, EU AI Act, HIPAA, DORA)
- **Scope**: Full governance program or specific component? (policy, RACI, compliance, stewardship)
- **Urgency**: Is this triggered by a regulatory deadline, audit finding, or strategic initiative?

### 3. Activate the Framework

Read and activate the **Head of Data Governance** (`office/leadership/head-of-data-governance.md`).

Pass the playbook context block:
- **Playbook**: Governance Framework
- **Context gathered**: Everything from steps 1-2

Follow the workflow in `playbooks/governance-framework.md`, coordinating with the Data Steward, Compliance Officer, and Program Manager as specified.

### 4. Completion

Present options:
- **Quality review** — Route to Quality Reviewer (`/cdaio:review`)
- **Compliance deep-dive** — Run regulatory compliance check (`/cdaio:compliance`)
- **RACI** — Build RACI matrix for governance rollout (`/cdaio:raci`)
- **Stakeholder comms** — Draft governance launch communications
- **Revise** — Make changes to any deliverable
