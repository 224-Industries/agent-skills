# 224 Agent Skills

A collection of Agent Skills for marketing, web development, automation workflows, and more.

## What are Agent Skills?

Agent Skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently. They work across any AI agent that supports the [open Agent Skills standard](https://agentskills.io).

## Available Skills

<!-- SKILLS:START -->
| Skill | Description | Download |
|-------|-------------|----------|
| [csv-data-analyst](skills/csv-data-analyst/) | Analyze CSV files, generate summary statistics, and create visualizations using Python and pandas.... | [Download](https://skills.224ai.au/csv-data-analyst.skill) |
| [form-attribution](skills/form-attribution/) | Implement the Form Attribution library on websites to capture UTM parameters, ad click IDs,... | [Download](https://skills.224ai.au/form-attribution.skill) |
| [seo-content-writer](skills/seo-content-writer/) | Generate SEO-optimized content for traditional search engines, AI answer engines, and generative AI... | [Download](https://skills.224ai.au/seo-content-writer.skill) |
<!-- SKILLS:END -->

## Installation

### Option 1: skills (Recommended)

Use the [Vercel Skills CLI](https://skills.sh/) to install skills directly:

```bash
# Install all skills
npx skills add 224-Industries/agent-skills

# Install specific skills
npx skills add 224-Industries/agent-skills --skill form-attribution

# List available skills
npx skills add 224-Industries/agent-skills --list
```

> This will add the skills to the AI agent(s) you choose.

### Option 2: Claude Code Plugin

Install via Claude Code's plugin system:

```bash
# Add the marketplace
/plugin marketplace add 224-Industries/agent-skills

# Install all skills
/plugin install 224-agent-skills
```

### Option 3: Claude.ai

Download the `.skill` zipped folder from the table above and upload it in the [Capabilities](https://claude.ai/settings/capabilities#:~:text=Learn%20more.-,Skills,-Preview) section of your Claude.ai account settings.

## Usage

Once installed, just ask Claude to help with relevant tasks. Below you will find a few examples that use the Form Attribution skill:

```
"Add form attribution tracking to my Webflow site"
→ Uses form-attribution skill

"Set up UTM tracking for my forms"
→ Uses form-attribution skill

"Configure cross-subdomain attribution with cookies"
→ Uses form-attribution skill
```