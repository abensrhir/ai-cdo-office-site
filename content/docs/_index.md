---
title: "Getting Started"
description: "Install the AI CDAIO Office and produce your first deliverable in under 5 minutes."
---

## Step 1: Install the Plugin

### Claude Code (CLI)

```bash
claude plugin marketplace add abensrhir/ai-cdo-office
claude plugin install ai-cdo-office
```

### Team installation (shared config)

Install with project scope so teammates get the plugin automatically:

```bash
claude plugin install ai-cdo-office@abensrhir-ai-cdo-office --scope project
```

### Claude Cowork

In the Claude Cowork tab, search for **ai-cdo-office** in the plugin directory and enable it for your workspace.

### Verify

```bash
claude plugin list    # Should show ai-cdo-office
```

Type `/cdaio:` to see all available workflows in the autocomplete.

## Step 2: Initialize Your Project

Navigate to your project folder (or create a new one) and run:

```
/cdaio:init
```

This creates the working structure:

```
your-project/
├── context/
│   ├── client-context.md       ← your organization profile
│   └── (supporting docs)       ← PPTX, PDF, DOCX, XLSX
├── deliverables/
│   └── (auto-created per run)  ← strategy-2026-03-09/, board-prep-2026-03-10/, ...
└── .gitignore
```

**What each folder does:**

| Folder | Purpose |
|--------|---------|
| `context/` | Your organization details + supporting documents. Every agent reads this automatically. |
| `deliverables/` | Where agents save output. Each command creates a dated subfolder. |

## Step 3: Fill In Your Context

Edit `context/client-context.md` with your organization details. Here's what to include:

```markdown
# Client Context

## Organization
- **Company name:** Acme Financial Services
- **Industry:** Financial Services
- **Revenue / size:** $4.2B revenue, 12,000 employees
- **Geographic scope:** North America + EMEA

## Data & AI Maturity
- **Current maturity level:** 2-Emerging
- **Data team size:** 45 people
- **Key platforms:** Snowflake, Databricks, Azure
- **AI models in production:** 3 (fraud detection, credit scoring, churn)

## Current Priorities
- **Top 3 initiatives:**
  1. Enterprise AI strategy for the board
  2. Data governance framework (regulatory pressure)
  3. GenAI use case evaluation
- **Key challenges:** Siloed data, no governance council, shadow AI
- **Upcoming deadlines:** Board meeting in 3 weeks, regulatory audit in Q2

## Stakeholders
- **CEO/Board expectations:** AI ROI proof, risk mitigation plan
- **Key executive sponsors:** CFO (data monetization), COO (operational AI)
- **Business units engaged:** Retail banking, risk management

## Regulatory Environment
- **Applicable regulations:** GDPR, DORA, EU AI Act
- **Compliance status:** GDPR compliant, DORA gap assessment in progress
```

**Tip:** The more context you provide, the more tailored every deliverable becomes. Agents will ask for missing information if needed.

### Supporting Documents

Place any existing materials alongside your context file:

```
context/
├── client-context.md
├── current-board-deck.pptx      ← agents will reference your existing deck style
├── last-audit-report.pdf        ← compliance officer uses this for gap analysis
├── data-governance-policy.docx  ← governance team builds on existing policies
└── ai-budget-2025.xlsx          ← analyst uses this for investment case
```

Agents extract relevant information from these documents when building your deliverables.

## Step 4: Run Your First Command

Try a maturity assessment to see the team in action:

```
/cdaio:assess
```

The Head of AI & Analytics will:
1. Read your `context/client-context.md`
2. Ask clarifying questions if any details are missing
3. Score your organization across 6 dimensions and 24 subdimensions
4. Produce a detailed report with gap analysis and recommendations
5. Save everything to `deliverables/assess-2026-03-09/`

### All 20 Commands

| Command | Agent(s) | Output |
|---------|----------|--------|
| `/cdaio:strategy` | 7 agents | Strategy PPTX + DOCX, investment case XLSX, maturity XLSX |
| `/cdaio:governance` | 5 agents | Governance policy DOCX, RACI XLSX, compliance checklist DOCX |
| `/cdaio:board-prep` | 5 agents | Board deck PPTX (17 slides), KPI scorecard XLSX, talking points |
| `/cdaio:first-90-days` | 17 agents | Full 90-day plan with all deliverables |
| `/cdaio:quarterly` | 4 agents | Status report PPTX, KPI dashboard, meeting agendas |
| `/cdaio:assess` | Head of AI & Analytics | Maturity assessment XLSX (6 dimensions, 24 subdimensions) |
| `/cdaio:policy` | Head of Data Governance | Governance policy DOCX (15-17 pages) |
| `/cdaio:compliance` | Compliance Officer | Compliance checklist DOCX with gap analysis |
| `/cdaio:architecture` | Data & AI Architect | Architecture blueprint PPTX (13 slides) |
| `/cdaio:use-cases` | Use Case Lead | AI use case portfolio with 2x2 scoring |
| `/cdaio:benchmark` | Data Analyst | Industry benchmarking with leader vs. laggard patterns |
| `/cdaio:deck` | Exec Comms Lead | Board or executive presentation PPTX |
| `/cdaio:review` | Quality Reviewer | MBB standards diagnostic with Board gate |
| `/cdaio:raci` | Program Manager | RACI matrix XLSX (3 tabs) |
| `/cdaio:ai-governance` | 4 agents | Responsible AI framework, model inventory, risk classification |
| `/cdaio:org-design` | Program Manager | Target operating model, org chart, transition plan |
| `/cdaio:data-quality` | Data Steward | Quality assessment, root cause analysis, remediation plan |
| `/cdaio:cost-optimization` | 3 agents | Spend audit, waste identification, savings roadmap |
| `/cdaio:vendor-eval` | 3 agents | Vendor scoring framework, TCO analysis XLSX |
| `/cdaio:init` | — | Project folder setup (context/ + deliverables/) |

All commands accept inline context to skip the Q&A phase:

```
/cdaio:strategy Allianz SE, €150B insurer, 150k employees, GDPR + EU AI Act scope
```

Agents also read everything in your `context/` folder automatically — existing board decks, audit reports, governance policies, org charts, and budget spreadsheets.

## How to Talk to the Agents

The agents are conversational. Point them at real companies, real documents, and real deadlines:

### Reference Your Company and Documents

Agents read your `context/` folder and use it as the foundation for every deliverable:

```
"I'm the new CDAIO at Société Générale. I've put our current data strategy
deck in context/sg-data-strategy-2025.pptx and last quarter's board minutes
in context/board-minutes-q4.pdf. Run the maturity assessment using these
as your baseline."
```

The Head of AI & Analytics will parse your existing documents, extract the current state, and score your maturity against what's in them — not generic assumptions.

### Use Real Company Context

Give the agents a real company and they'll research public information to ground their work:

```
"Build an AI strategy for Roche. They're a $65B pharma company with
strong R&D data capabilities but fragmented commercial analytics.
Look up their latest annual report for data investment numbers.
They need to present to the board in 4 weeks."
```

```
"Run a vendor evaluation for BBVA. They're comparing Databricks vs
Snowflake for their new data lakehouse. They currently run on-prem
Teradata with 500TB. Budget is €8M over 3 years."
```

### Ask Follow-Up Questions

After any deliverable, iterate with specifics:

```
"The CFO at Unilever will push back on the €12M ask — prepare a phased
investment option starting at €3M with clear stage gates."
"Add a slide benchmarking our AI maturity against JPMorgan and Goldman Sachs."
"Rewrite the executive summary for a non-technical board — our chair
is a former CFO who thinks in ROI and payback periods."
```

### Activate Specific Team Members

Talk directly to any of the 17 agents with real-world tasks:

```
"Talk to the Compliance Officer — we're a German bank subject to
BaFin, DORA, GDPR, and EU AI Act. Assess our gaps using the policy
documents I've put in context/compliance/."
```

```
"Have the Data Architect design a target-state architecture for
L'Oréal's consumer data platform. They have 35 brands, 3 CDPs,
and want to consolidate onto one cloud-native stack."
```

```
"Get the Use Case Lead to score 20 GenAI use cases for a $4B
hospital system. Read context/ai-use-case-longlist.xlsx for the
current list. Prioritize by clinical impact and regulatory risk."
```

### Provide Additional Context Mid-Conversation

Drop new information anytime — documents, links, or facts:

```
"We just acquired a fintech with 80 data engineers and a Databricks
stack. I've added their architecture doc to context/acquisition-arch.pdf.
Factor this into the target-state architecture."
```

```
"Look up the latest Gartner Magic Quadrant for Data Integration Tools.
Our vendor evaluation needs to reflect the 2025 positioning."
```

The agents will incorporate new context into their ongoing work — whether it's from files you drop into `context/`, facts you share in conversation, or public information they research.

## The 17 Agents

### Leadership

| Agent | Background | Specialty |
|-------|-----------|-----------|
| **CDO / CDAIO** | 15 years McKinsey Data & Analytics, 2 CDO tenures | Orchestration, strategy, routing requests |
| **Chief of Staff** | 8 years Bain, 3 CDO tenures | Meeting prep, status reports, stakeholder comms |
| **Head of Data Governance** | 15 years (5 PwC/Deloitte) | Governance policies, standards, stewardship |
| **Head of AI & Analytics** | 9 years BCG, 25+ AI transformations | AI strategy, maturity, investment cases |

### Governance

| Agent | Background | Specialty |
|-------|-----------|-----------|
| **Data Steward** | 12 years top-four bank + Fortune 100 insurer | Data definitions, dictionaries, quality standards |
| **Data Custodian** | 14 years (8 payments, 6 healthcare) | Security, access controls, encryption, retention |
| **Compliance Officer** | 11 years (7 Deloitte), CIPP/E certified | GDPR, CCPA, EU AI Act, regulatory compliance |

### AI & Analytics

| Agent | Background | Specialty |
|-------|-----------|-----------|
| **Data & AI Architect** | 3 Fortune 500 transformations, 8 years Gartner | Architecture blueprints, platform comparisons |
| **Data Engineer** | Scaled startup from 10TB to 10PB | Pipelines, infrastructure, platform evaluation |
| **AI/ML Lead** | 11 years Google (4 on Brain team) | MLOps, responsible AI, model governance |
| **Data Analyst** | 7 years Deloitte, 3 years Tableau | KPI frameworks, dashboards, benchmarking |
| **Use Case Lead** | 500+ use cases evaluated, $180M portfolio | AI use case scoring, portfolio prioritization |

### Operations

| Agent | Background | Specialty |
|-------|-----------|-----------|
| **Exec Comms Lead** | 12 years McKinsey (6 Communications Practice) | Board decks, executive briefings, 100+ decks built |
| **Program Manager** | 14 years PwC, $40M data platform migration | RACI, org design, change management |
| **Stakeholder Relations** | 10 years Accenture, 2,400-person data org | Audience-tailored comms, town halls |

### Quality & Oversight

| Agent | Background | Specialty |
|-------|-----------|-----------|
| **Quality Reviewer** | 10 years McKinsey (4 Visual Comms), 3,000+ decks reviewed | MBB style enforcement, deck diagnostics |
| **Board of Directors** | Simulated Finance, Risk, and Strategy committees | Shareholder-value review, strategic challenge |

## Playbook Walkthroughs

Playbooks are multi-agent workflows where the CDO coordinates handoffs between team members. Each produces a coordinated set of deliverables.

### AI Strategy Sprint

**Trigger:** `/cdaio:strategy` or describe the need in natural language

```
/cdaio:strategy Nestlé, CHF 94B food & beverage, 270k employees, need AI strategy for supply chain and consumer analytics. Read context/ for existing data landscape docs.
```

**What happens:**
1. **Head of AI & Analytics** runs a maturity assessment → XLSX
2. **Use Case Lead** identifies and scores AI opportunities
3. **Data & AI Architect** designs the target-state platform → PPTX (13 slides)
4. **AI/ML Lead** evaluates build-vs-buy for model capabilities
5. **Data Analyst** builds the investment case → XLSX (6 tabs: NPV, IRR, payback)
6. **CDO** synthesizes everything into a strategy deck → PPTX (17 slides)
7. **Quality Reviewer** validates MBB standards compliance

**Output:** `deliverables/strategy-<date>/` containing strategy PPTX, strategy DOCX, maturity XLSX, investment case XLSX, architecture PPTX

### Board Meeting Prep

**Trigger:** `/cdaio:board-prep` or describe the need in natural language

```
/cdaio:board-prep AXA Group, €100B insurer, board in 3 weeks. CEO wants ROI proof on our data mesh investment. I've put last quarter's KPI dashboard in context/kpi-q4.xlsx and the previous board deck in context/board-deck-q3.pptx.
```

**What happens:**
1. **Data Analyst** compiles KPI scorecard with RAG status → XLSX
2. **CDO** sets the narrative arc (Situation-Complication-Resolution)
3. **Exec Comms Lead** builds the board deck → PPTX (17 slides with action titles)
4. **Chief of Staff** prepares talking points and anticipated questions → DOCX
5. **Quality Reviewer** runs the MBB standards diagnostic
6. **Board of Directors** performs the final strategic gate review

**Output:** `deliverables/board-prep-<date>/` containing board deck PPTX, scorecard XLSX, talking points DOCX, meeting prep DOCX

### Governance Framework

**Trigger:** `/cdaio:governance` or describe the need in natural language

```
/cdaio:governance Deutsche Bank, BaFin + ECB regulated, GDPR + DORA + EU AI Act. Current policies in context/data-governance-v2.docx. Need full framework before regulatory audit in Q2.
```

**What happens:**
1. **Head of Data Governance** defines the governance charter
2. **Data Steward** builds the data dictionary → XLSX (4 tabs)
3. **Compliance Officer** maps regulatory requirements → DOCX
4. **Program Manager** creates the RACI → XLSX (3 tabs)
5. **Data Custodian** defines technical controls and access policies

**Output:** `deliverables/governance-<date>/` containing policy DOCX, data dictionary XLSX, RACI XLSX, compliance checklist DOCX

### First 90 Days

**Trigger:** `/cdaio:first-90-days` or describe the need in natural language

```
/cdaio:first-90-days I'm starting as CDAIO at Siemens Energy in 3 weeks. €30B revenue, 92k employees, industrial IoT + energy trading data. Previous CDO left after 18 months. Read context/ for the org chart and existing strategy docs.
```

**What happens:**
1. **CDO** builds the 90-day phased plan (Listen → Quick Wins → Strategic Foundation)
2. **Chief of Staff** maps all stakeholders and designs the operating rhythm
3. **Head of AI & Analytics** runs an initial maturity assessment → XLSX
4. **Head of Data Governance** audits current governance state
5. **Program Manager** designs the target operating model and RACI → XLSX
6. **Data Analyst** sets KPI baselines and benchmarks → XLSX
7. **All 17 agents** contribute their domain-specific priorities and quick wins

**Output:** `deliverables/first-90-days-<date>/` containing phased plan, stakeholder map, maturity baseline XLSX, operating model, KPI scorecard XLSX

### Quarterly Operating Rhythm

**Trigger:** `/cdaio:quarterly` or describe the need in natural language

```
/cdaio:quarterly Philips, Q1 review for the data office. Read context/kpi-tracker.xlsx for current metrics. We launched 3 new ML models this quarter and need to report to the ExCo.
```

**What happens:**
1. **Chief of Staff** compiles the status report → PPTX
2. **Data Analyst** updates the KPI dashboard → XLSX
3. **CDO** sets priorities for the next quarter
4. **Stakeholder Relations** drafts communications for each audience

**Output:** `deliverables/quarterly-<date>/` containing status PPTX, scorecard XLSX, meeting agendas DOCX, stakeholder comms DOCX

### AI Governance Program

**Trigger:** `/cdaio:ai-governance` or describe the need in natural language

```
/cdaio:ai-governance BNP Paribas, 48 ML models in production (credit scoring, fraud, AML, pricing). EU AI Act compliance deadline approaching. Model inventory in context/model-registry.xlsx.
```

**What happens:**
1. **AI/ML Lead** builds the model inventory and risk classification framework
2. **Compliance Officer** maps AI regulatory requirements (EU AI Act, NIST AI RMF)
3. **Head of Data Governance** defines AI-specific data policies
4. **Program Manager** creates the AI governance RACI → XLSX

**Output:** `deliverables/ai-governance-<date>/` containing AI governance framework, model inventory, risk classification matrix, AI policy DOCX

### Data Organization Redesign

**Trigger:** `/cdaio:org-design` or describe the need in natural language

```
/cdaio:org-design Vodafone, 100k employees, 15 OpCos across Europe. Currently fully decentralized — each OpCo has its own data team. CEO wants a federated model. Current org chart in context/data-org-current.pdf.
```

**What happens:**
1. **Program Manager** assesses current-state org and identifies gaps
2. **CDO** defines the target operating model (centralized, federated, or hybrid)
3. **Head of AI & Analytics** maps required capabilities to roles
4. **Stakeholder Relations** plans the change communication strategy

**Output:** `deliverables/org-design-<date>/` containing target org chart, role descriptions, transition plan, RACI XLSX, change comms DOCX

### Data Quality Program

**Trigger:** `/cdaio:data-quality` or describe the need in natural language

```
/cdaio:data-quality Novartis, pharma, clinical trial data and commercial analytics have 23% duplicate rate. Data quality audit results in context/dq-audit-2025.xlsx. Need remediation plan before FDA inspection in Q3.
```

**What happens:**
1. **Data Steward** runs a data quality assessment across key domains
2. **Data Engineer** identifies root causes in pipelines and infrastructure
3. **Data Custodian** audits access controls and data lineage
4. **Program Manager** builds the remediation roadmap and RACI → XLSX

**Output:** `deliverables/data-quality-<date>/` containing quality assessment, root cause analysis, remediation roadmap, data dictionary XLSX

### Cost Optimization Sprint

**Trigger:** `/cdaio:cost-optimization` or describe the need in natural language

```
/cdaio:cost-optimization Shell, $18M annual Snowflake + Databricks spend. Cloud bills in context/cloud-costs-2025.xlsx. CFO wants 30% reduction without impacting production ML models. Look up their latest earnings call for context on cost pressure.
```

**What happens:**
1. **Data Analyst** audits current spend and benchmarks against industry → XLSX
2. **Data Engineer** identifies infrastructure waste and rightsizing opportunities
3. **Data & AI Architect** recommends architecture consolidation
4. **CDO** builds the business case with phased savings → XLSX

**Output:** `deliverables/cost-optimization-<date>/` containing spend audit XLSX, waste analysis, savings roadmap, investment case XLSX

### Vendor & Technology Evaluation

**Trigger:** `/cdaio:vendor-eval` or describe the need in natural language

```
/cdaio:vendor-eval BBVA, comparing Databricks vs Snowflake vs Google BigQuery for new lakehouse. Currently on-prem Teradata, 500TB. Requirements in context/platform-requirements.docx. Budget €8M over 3 years. Look up latest Gartner and Forrester positioning for each vendor.
```

**What happens:**
1. **Data & AI Architect** defines requirements and builds the scoring framework
2. **Data Engineer** evaluates technical capabilities and integration complexity
3. **Data Analyst** builds the TCO model → XLSX
4. **Compliance Officer** checks vendor compliance and data residency

**Output:** `deliverables/vendor-eval-<date>/` containing requirements matrix, vendor scorecard, TCO analysis XLSX, recommendation DOCX

## Generating PPTX Presentations

The AI CDAIO Office can produce boardroom-ready PowerPoint files. Every presentation follows MBB (McKinsey, BCG, Bain) standards built into the agents.

### Setup

Install the generator dependencies:

```bash
# PPTX + DOCX generators (Node.js)
npm install pptxgenjs docx js-yaml

# XLSX generators (Python)
pip install openpyxl pyyaml
```

Agents detect installed generators automatically. Without them, you still get the same strategic output — just in markdown instead of formatted files.

### PPTX Generators

Four generators produce PowerPoint presentations:

| Generator | Slides | Used By | Trigger |
|-----------|--------|---------|---------|
| **Board Deck** | 17 slides | CDO, Exec Comms Lead | `/cdaio:board-prep`, `/cdaio:deck` |
| **Strategy Deck** | 15+ slides | CDO | `/cdaio:strategy` |
| **Architecture Blueprint** | 13 slides | Data & AI Architect | `/cdaio:architecture` |
| **Status Report** | 8-12 slides | Chief of Staff | `/cdaio:quarterly` |

### Example: Generate a Board Deck PPTX

```
/cdaio:board-prep Zurich Insurance, CHF 72B, board in 2 weeks. Previous deck in context/board-q3.pptx, KPIs in context/kpi-dashboard.xlsx. Chair wants to see AI ROI and DORA compliance progress.
```

The Exec Comms Lead generates a 17-slide PPTX following this structure:

1. **Title slide** — with your organization name and date
2. **Executive Summary** — Situation-Complication-Resolution format
3. **Agenda** — 3-5 sections max
4. **KPI Dashboard** — 5-7 metrics with RAG status (green/amber/red)
5. **Initiative Portfolio** — status tracker with Harvey Ball progress indicators
6. **Risk Matrix** — probability vs. impact
7. **Budget Summary** — waterfall chart (spent, committed, remaining)
8. **Recommendations** — 3 concrete actions
9. **Next Steps** — with owners, dates, and success criteria
10-17. **Supporting slides** — deep dives on each initiative, appendix data

Output saved to `deliverables/board-prep-<date>/board-deck.pptx`

### Example: Generate an Architecture PPTX

```
/cdaio:architecture Maersk, migrating from on-prem Oracle + Teradata to Azure cloud-native. Current architecture diagram in context/arch-current.pdf. $12M budget over 2 years. Must support real-time container tracking and predictive logistics.
```

The Data & AI Architect produces a 13-slide PPTX covering all 8 architecture layers:

1. Current-state architecture assessment
2. Target-state architecture blueprint
3. Technology stack comparison matrix
4. Data ingestion and pipeline patterns
5. Storage and compute layer design
6. ML/AI platform architecture
7. Governance and security controls
8. Migration roadmap with phased approach
9-13. Cost estimates, vendor comparison, risk assessment

Output saved to `deliverables/architecture-<date>/architecture-blueprint.pptx`

### MBB Presentation Standards

Every generated PPTX follows consulting-grade standards from the built-in MBB style guide:

**Slide anatomy:**
- **Action titles** — every slide title is a complete sentence stating the key takeaway (not topic labels). Passes the "Zelazny Test": an unfamiliar reader understands the point from the title alone.
- **One idea per slide** — if you need "and" in the title, it's two slides.
- **Three bullet points maximum** — never more per slide.
- **Quantify everything** — no "significant growth", always "47% CAGR" or "$12M annual savings".

**Narrative structure:**
- **Pyramid Principle** — conclusion first, then supporting arguments, then evidence. Top-down communication.
- **SCR Framework** — every executive summary uses Situation-Complication-Resolution.
- **MECE** — all categorizations are Mutually Exclusive, Collectively Exhaustive.
- **Ghost Deck process** — titles are written first as a standalone storyline, then bodies are built to prove each title.

**Visual standards:**
- **RAG status colors** — Green (#2C5F2D, on track), Amber (#D4A843, at risk), Red (#B85042, critical)
- **Harvey Balls** — for maturity indicators: empty (L0), quarter (L1), half (L2), three-quarter (L3), full (L4)
- **Chart selection** — comparison → bar, trend → line, proportion → stacked bar, positioning → 2x2 matrix
- **Waterfall charts** — green bars (positive), red (negative), with connector lines and +/- signs
- **Layout rules** — consistent positions, max 70% fill, 0.5-inch margins, grid-aligned, max 3 visual elements per slide

**Quality gate:**
The Quality Reviewer (10 years McKinsey Visual Communications, 3,000+ decks reviewed) runs a diagnostic on every PPTX before delivery, checking action titles, data sourcing, visual consistency, and narrative coherence.

### Other File Generators

Beyond PPTX, agents produce DOCX and XLSX deliverables:

| Format | Generators | Examples |
|--------|-----------|----------|
| **DOCX** | 6 generators | Governance policy (15-17 pages), compliance checklist, strategy document (12 sections), meeting prep, stakeholder comms, diagnostic report |
| **XLSX** | 5 generators | Maturity assessment (5 tabs), investment case (6 tabs: NPV, IRR, payback), RACI (3 tabs), data dictionary (4 tabs), KPI scorecard (3 tabs) |
| **PPTX** | 4 generators | Board deck (17 slides), strategy deck, architecture blueprint (13 slides), status report |

## Why Claude Code (Not LangGraph, CrewAI, etc.)

Most agent frameworks require Python glue code, state machines, and infrastructure. The AI CDAIO Office chose Claude Code because:

- **Zero infrastructure** — no servers, no Docker, no API keys. Install the plugin, type a command, done.
- **Natural language agents** — each agent is a markdown file with personality, workflow, and expertise. No Python classes or DAGs.
- **Built-in tool use** — Claude Code natively reads files, writes deliverables, and runs generators.
- **Plugin distribution** — users install with one command. No cloning repos or configuring environments.
- **Context window as memory** — project context lives in files that Claude reads naturally. No vector databases.

The trade-off: you need Claude Code (and an Anthropic API key or Claude subscription). But if you're already using Claude, this gives you a full CDAIO office with zero additional setup.

## Frequently Asked Questions

**Do I need to fill in all fields in client-context.md?**
No. Fill in what you know. Agents will ask for missing information during conversations. But more context upfront means better output with fewer questions.

**Can I run commands without /cdaio:init first?**
Yes. Commands work without the folder structure. But `init` ensures deliverables are organized and context is loaded automatically.

**What if I want to change the output after it's generated?**
Just tell the agent. "Make the executive summary shorter" or "Add a section on regulatory risk." Agents iterate on their work.

**How do I get PPTX/DOCX/XLSX output instead of markdown?**
Install the generator dependencies (`npm install pptxgenjs docx js-yaml` and `pip install openpyxl pyyaml`). Agents automatically detect installed generators and produce formatted files.

**Can I customize the PPTX style or branding?**
Yes. The design system is defined in `shared/design-system.md`. Edit colors, fonts, and layout rules there. Generators read these settings when building files.

**What are the MBB standards the agents follow?**
MBB refers to McKinsey, BCG, and Bain — the top-tier management consulting firms. The built-in style guide (`shared/mbb-style-guide.md`) enforces Pyramid Principle, action titles, MECE structuring, SCR narrative framework, and consulting-grade chart standards across all deliverables.

**Can multiple people use the same project folder?**
Yes. The `context/` folder is shared. Each person's Claude Code session reads the same context and writes to `deliverables/`.

**How do I customize an agent's behavior?**
Each agent is a markdown file in `office/`. You can edit their personality, workflow, or expertise directly. Changes take effect in your next session.

**How does the Board of Directors agent work?**
The Board is a simulated oversight layer (Finance, Risk, and Strategy committees). The CDO routes board-facing deliverables through it as the final strategic gate — challenging assumptions, stress-testing ROI, and reviewing from a shareholder-value lens.
