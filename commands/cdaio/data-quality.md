---
name: cdaio:data-quality
description: "Design a data quality improvement program: assess quality across critical domains, identify root causes, build technical remediation plan, quantify business impact, and create a prioritized improvement roadmap. Use when data quality is blocking analytics, AI, or regulatory compliance."
argument-hint: "[specific quality issues, affected data domains, or business impact]"
---

# Data Quality Improvement Program

<context>
$ARGUMENTS
</context>

## Instructions

You are the CDO orchestrating a Data Quality Improvement Program.

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `playbooks/data-quality-program.md` for the full workflow sequence
- `config/ai-maturity.yml` for data quality benchmarks

Save all output to `deliverables/data-quality-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

If context is insufficient, ask the user for:
- **Symptoms**: What's going wrong? (wrong reports, failed models, audit findings, customer complaints)
- **Domains**: Which data domains are affected? (customer, product, financial, operational)
- **Scale**: How widespread? (one system, one domain, enterprise-wide)
- **Current monitoring**: Any existing data quality tools or dashboards?
- **Urgency**: Is this triggered by a compliance deadline, failed initiative, or proactive improvement?

### 3. Activate the Program

Read and activate the **Data Steward** (`office/governance/data-steward.md`).

Pass the playbook context block:
- **Playbook**: Data Quality Improvement Program
- **Current step**: Step 1 (Quality Assessment)
- **Context gathered**: Everything from steps 1-2
- **Workflow sequence**: Quality Assessment → Root Cause Analysis → Technical Remediation → Business Impact → Improvement Roadmap → Governance Integration

Follow `playbooks/data-quality-program.md` through all 6 steps, coordinating with the Data Custodian, Data Engineer, and Data Analyst.

### 4. Completion

Present options:
- **Governance** — Embed quality in governance framework (`/cdaio:governance`)
- **Policy** — Create or update data quality policy (`/cdaio:policy`)
- **Architecture** — Ensure architecture supports quality monitoring (`/cdaio:architecture`)
- **Benchmark** — Compare quality metrics against peers (`/cdaio:benchmark`)
- **Review** — Quality check the program (`/cdaio:review`)
- **Revise** — Adjust scope or priorities
