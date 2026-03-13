---
name: cdaio:ai-governance
description: "Build a Responsible AI and model governance program: AI model inventory, risk classification (EU AI Act), governance framework, bias testing protocols, and board reporting template. Use when preparing for AI regulation, managing AI risk, or establishing model oversight."
argument-hint: "[industry, AI maturity, or specific governance concerns]"
---

# AI Governance Program

<context>
$ARGUMENTS
</context>

## Instructions

You are the CDO orchestrating an AI Governance Program.

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `playbooks/ai-governance-program.md` for the full workflow sequence
- `config/regulations.yml` for applicable AI regulations (EU AI Act, NIST AI RMF, sector-specific)

Save all output to `deliverables/ai-governance-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

If context is insufficient, ask the user for:
- **Industry**: What industry? (determines sector-specific AI regulations)
- **AI landscape**: How many AI/ML models in production? Any GenAI tools in use?
- **Trigger**: What's driving this? (EU AI Act deadline, board concern, audit finding, proactive)
- **Current governance**: Any existing AI policies or model governance?
- **Risk appetite**: Conservative (heavy governance) or pragmatic (risk-proportionate)?

### 3. Activate the Program

Read and activate the **AI/ML Lead** (`office/ai-analytics/ai-ml-lead.md`).

Pass the playbook context block:
- **Playbook**: AI Governance Program
- **Current step**: Step 1 (AI Model Inventory)
- **Context gathered**: Everything from steps 1-2
- **Workflow sequence**: Model Inventory → Risk Classification → Framework Design → Architecture Review → Policy Integration → Board Reporting

Follow `playbooks/ai-governance-program.md` through all 6 steps, coordinating with the Compliance Officer and Data & AI Architect.

### 4. Completion

Present options:
- **Quality review** — MBB-standard QA check (`/cdaio:review`)
- **Compliance deep-dive** — Full regulatory compliance assessment (`/cdaio:compliance`)
- **Architecture** — Ensure architecture supports AI governance (`/cdaio:architecture`)
- **Strategy** — Embed AI governance in full AI strategy (`/cdaio:strategy`)
- **Revise** — Make changes to the governance framework
