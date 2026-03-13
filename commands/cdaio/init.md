---
name: cdaio:init
description: "Set up your project folder for the AI CDAIO Office. Creates context/ and deliverables/ directories, copies the client context template, and adds a .gitignore."
argument-hint: ""
---

# Initialize CDAIO Project

<context>
$ARGUMENTS
</context>

## Instructions

Set up the project structure for the AI CDAIO Office. Run the following steps:

### 1. Create Directories

```bash
mkdir -p context deliverables
```

### 2. Copy Client Context Template

```bash
# Find the plugin install path and copy the template
PLUGIN_PATH=$(find ~/.claude/plugins -name "client-context.template.md" -path "*/context/*" 2>/dev/null | head -1)
if [ -n "$PLUGIN_PATH" ]; then
  cp "$PLUGIN_PATH" context/client-context.md
else
  # Fallback: check if template exists locally
  if [ -f "context/client-context.template.md" ]; then
    cp context/client-context.template.md context/client-context.md
  fi
fi
```

### 3. Create .gitignore

If no `.gitignore` exists, create one. If one exists, append the CDAIO entries:

```
# AI CDAIO Office — user-specific files
context/client-context.md
deliverables/
```

### 4. Confirm Setup

Show the user the created structure:

```
Your project is ready:

  context/
  ├── client-context.md       ← fill in your organization details
  └── (place supporting docs here: PPTX, PDF, DOCX, XLSX)

  deliverables/
  └── (agents will create subfolders here per deliverable)

Next steps:
  1. Edit context/client-context.md with your organization details
  2. Run any /cdaio: command — e.g., /cdaio:strategy or /cdaio:assess
  3. Find your deliverables organized in deliverables/
```
