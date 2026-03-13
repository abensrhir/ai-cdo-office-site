---
name: cdaio:compliance
description: "Run a regulatory compliance assessment covering GDPR, CCPA, EU AI Act, HIPAA, DORA, and other applicable regulations. Identifies gaps and produces a compliance checklist with remediation priorities."
argument-hint: "[industry, jurisdictions, or specific regulations to assess]"
---

# Compliance Check

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `config/regulations.yml` for the regulatory landscape
- `config/industries.yml` for industry-specific regulatory requirements

Save all output to `deliverables/compliance-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Industry**: What industry? (determines which regulations apply)
- **Jurisdictions**: Where do you operate? (EU, US, UK, Asia-Pacific, Middle East)
- **Focus**: Specific regulation? Or broad regulatory sweep?
- **Current state**: Any existing compliance programs? Recent audit findings?
- **AI usage**: Any AI/ML models in production? GenAI tools in use?

### 3. Activate the Compliance Officer

Read and activate the **Compliance Officer** (`office/governance/compliance-officer.md`).

Instruct them to:
1. Identify all applicable regulations based on industry and jurisdictions
2. Assess current compliance state across each regulation
3. Identify gaps and assign risk ratings (High/Medium/Low)
4. Produce a prioritized remediation checklist
5. Produce a DOCX compliance checklist (read `shared/docx-blueprint.md` for patterns)

### 4. Completion

Present options:
- **Policy** — Create or update governance policies to close gaps (`/cdaio:policy`)
- **Governance** — Build full governance framework (`/cdaio:governance`)
- **Architecture** — Design compliant data architecture (`/cdaio:architecture`)
- **Review** — Quality check the assessment (`/cdaio:review`)
- **Revise** — Adjust scope or priorities
