---
name: cdaio:policy
description: "Create a data governance policy document covering data classification, quality standards, retention, privacy, and AI governance. Tailored to industry and regulatory requirements."
argument-hint: "[industry, regulatory context, or specific policy scope]"
---

# Data Governance Policy

<context>
$ARGUMENTS
</context>

## Instructions

### 1. Load Context

Read these files:
- `context/client-context.md` (if it exists) for organization details
- Other files in the `context/` directory (PPTX, PDF, DOCX, XLSX) for supporting documents
- `config/regulations.yml` for applicable regulations
- `config/industries.yml` for industry-specific data risks

Save all output to `deliverables/policy-<YYYY-MM-DD>/` (create the folder if it does not exist).

### 2. Gather Missing Context

Ask the user for:
- **Industry**: What industry? (determines regulatory requirements and risk profile)
- **Regulations**: Which regulations apply? (GDPR, CCPA, EU AI Act, HIPAA, DORA, SOX)
- **Scope**: Full policy or specific domain? (data classification, quality, retention, AI governance, privacy)
- **Existing governance**: Any existing policies to build on or replace?
- **Organizational context**: Centralized or federated data management?

### 3. Activate the Policy Builder

Read and activate the **Head of Data Governance** (`office/leadership/head-of-data-governance.md`).

Instruct them to produce a data governance policy:
1. Tailor to the organization's industry and regulatory environment
2. Cover all standard governance domains (or the specific scope requested)
3. Include roles and responsibilities (Data Owners, Stewards, Custodians)
4. Address AI/GenAI governance (acceptable use, model governance, shadow AI)
5. Produce a DOCX policy document (read `shared/docx-blueprint.md` for patterns)

### 4. Completion

Present options:
- **Compliance check** — Validate against regulations (`/cdaio:compliance`)
- **RACI** — Build responsibility matrix for governance rollout (`/cdaio:raci`)
- **Full governance** — Expand into complete governance framework (`/cdaio:governance`)
- **Review** — Quality check the policy (`/cdaio:review`)
- **Revise** — Make changes to the policy
