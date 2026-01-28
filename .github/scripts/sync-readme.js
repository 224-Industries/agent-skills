#!/usr/bin/env node
/**
 * Sync README.md skills table with skills directory.
 *
 * Scans the skills/ directory for valid skills (directories containing SKILL.md)
 * and updates the README skills table to match.
 */

const fs = require("fs");
const path = require("path");

const SKILLS_DIR = "skills";
const README_FILE = "README.md";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "https://skills.224ai.au";

/**
 * Parse YAML frontmatter from a SKILL.md file
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

/**
 * Get all skills with their metadata
 */
function getSkillsWithMetadata() {
  if (!fs.existsSync(SKILLS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory()) return false;
      const skillFile = path.join(SKILLS_DIR, entry.name, "SKILL.md");
      return fs.existsSync(skillFile);
    })
    .map((entry) => {
      const skillFile = path.join(SKILLS_DIR, entry.name, "SKILL.md");
      const content = fs.readFileSync(skillFile, "utf8");
      const frontmatter = parseFrontmatter(content);

      return {
        dir: entry.name,
        name: frontmatter.name || entry.name,
        description: frontmatter.description || "",
        downloadUrl: `${R2_PUBLIC_URL}/${entry.name}.skill`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Truncate description to a maximum length
 */
function truncateDescription(description, maxLength = 100) {
  if (description.length <= maxLength) return description;

  const truncated = description.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return truncated.slice(0, lastSpace) + "...";
}

/**
 * Generate the skills table for README
 */
function generateSkillsTable(skills) {
  if (skills.length === 0) {
    return "_No skills available yet._";
  }

  const header =
    "| Skill | Description | Download |\n|-------|-------------|----------|";
  const rows = skills.map((skill) => {
    const skillLink = `[${skill.name}](skills/${skill.dir}/)`;
    const description = truncateDescription(skill.description);
    const downloadLink = `[Download](${skill.downloadUrl})`;
    return `| ${skillLink} | ${description} | ${downloadLink} |`;
  });

  return [header, ...rows].join("\n");
}

/**
 * Update README.md with new skills table
 */
function updateReadme(skills) {
  if (!fs.existsSync(README_FILE)) {
    console.error("ERROR: README.md not found");
    process.exit(1);
  }

  const content = fs.readFileSync(README_FILE, "utf8");

  // Match content between skill list markers
  const tableRegex =
    /(<!-- SKILLS:START -->\n)[\s\S]*?(\n<!-- SKILLS:END -->)/;
  const newTable = generateSkillsTable(skills);

  if (!tableRegex.test(content)) {
    console.error(
      "ERROR: Could not find <!-- SKILLS:START --> and <!-- SKILLS:END --> markers in README.md"
    );
    process.exit(1);
  }

  const newContent = content.replace(tableRegex, `$1${newTable}$2`);

  if (newContent === content) {
    console.log("README.md is already up to date");
    return false;
  }

  fs.writeFileSync(README_FILE, newContent);
  console.log(`Updated README.md with ${skills.length} skill(s)`);
  return true;
}

function main() {
  const skills = getSkillsWithMetadata();
  console.log(`Found ${skills.length} skill(s) in ${SKILLS_DIR}/`);
  updateReadme(skills);
}

main();