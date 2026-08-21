#!/usr/bin/env node
/**
 * Static site builder for the ML group Master's thesis site.
 *
 * Reads markdown files (with YAML frontmatter) from content/topics and
 * content/completed, renders them to HTML, and writes:
 *   dist/index.html         (available topics page)
 *   dist/completed.html     (completed theses page)
 *   dist/assets/*           (css/js, copied as-is)
 *   dist/data/topics.json
 *   dist/data/completed.json
 *
 * Run with: npm run build
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const TEMPLATES_DIR = path.join(ROOT, "templates");
const DIST_DIR = path.join(ROOT, "dist");

const md = new MarkdownIt({ html: false, linkify: true, breaks: false });

let hadErrors = false;

function warn(msg) {
  console.warn(`\x1b[33m[warn]\x1b[0m ${msg}`);
}

function fail(msg) {
  console.error(`\x1b[31m[error]\x1b[0m ${msg}`);
  hadErrors = true;
}

function slugFromFilename(filename) {
  return filename.replace(/\.md$/i, "");
}

function readMarkdownDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((filename) => {
      const full = path.join(dir, filename);
      const raw = fs.readFileSync(full, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: slugFromFilename(filename),
        filename,
        data,
        html: md.render(content),
      };
    });
}

function asStringArray(value, fieldName, filename) {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  warn(`${filename}: expected '${fieldName}' to be a list, got ${JSON.stringify(value)}. Treating as empty.`);
  return [];
}

/**
 * `supervisor` / `supervisor_url` may each be a single string or a list.
 * Returns [{ name, url }] with URLs matched positionally to names.
 */
function parseSupervisors(data, filename) {
  const rawNames = data.supervisor;
  const names = Array.isArray(rawNames)
    ? rawNames.map((v) => String(v).trim()).filter(Boolean)
    : String(rawNames ?? "").trim()
      ? [String(rawNames).trim()]
      : [];

  const rawUrls = data.supervisor_url ?? data.supervisorUrl;
  const urls = Array.isArray(rawUrls)
    ? rawUrls.map((v) => String(v ?? "").trim())
    : String(rawUrls ?? "").trim()
      ? [String(rawUrls).trim()]
      : [];

  if (urls.length > names.length) {
    warn(`${filename}: more 'supervisor_url' entries (${urls.length}) than supervisors (${names.length}). Extra URLs ignored.`);
  }
  return names.map((name, i) => ({ name, url: urls[i] || "" }));
}

function normalizeEcts(value, filename) {
  if (value === undefined || value === null || value === "") return "";
  const v = String(value).trim();
  if (v === "30" || v === "60") return v;
  if (v === "30/60" || v.toLowerCase() === "either" || v.toLowerCase() === "30 or 60") return "30/60";
  warn(`${filename}: unrecognized ects value "${value}" (expected 30, 60, or 30/60). Keeping as-is.`);
  return v;
}

function buildTopics() {
  const entries = readMarkdownDir(path.join(CONTENT_DIR, "topics"));
  const topics = [];
  for (const entry of entries) {
    const { data, html, slug, filename } = entry;
    if (!data.title) {
      fail(`content/topics/${filename}: missing required field 'title'`);
    }
    const supervisors = parseSupervisors(data, filename);
    if (supervisors.length === 0) {
      fail(`content/topics/${filename}: missing required field 'supervisor'`);
    }
    if (!data.ects) {
      warn(`content/topics/${filename}: no 'ects' field set (expected 30, 60, or 30/60).`);
    }
    topics.push({
      slug,
      title: data.title || slug,
      supervisors,
      ects: normalizeEcts(data.ects, filename),
      tags: asStringArray(data.tags, "tags", filename),
      status: data.status || "available",
      descriptionHtml: html,
    });
  }
  topics.sort((a, b) => a.title.localeCompare(b.title));
  return topics;
}

function buildCompleted() {
  const entries = readMarkdownDir(path.join(CONTENT_DIR, "completed"));
  const completed = [];
  for (const entry of entries) {
    const { data, html, slug, filename } = entry;
    const required = ["student", "title", "year"];
    for (const field of required) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        fail(`content/completed/${filename}: missing required field '${field}'`);
      }
    }
    completed.push({
      slug,
      student: data.student || "Unknown",
      title: data.title || slug,
      year: Number(data.year) || null,
      link: data.link || "",
      tags: asStringArray(data.tags, "tags", filename),
      descriptionHtml: html,
    });
  }
  completed.sort((a, b) => (b.year || 0) - (a.year || 0) || a.student.localeCompare(b.student));
  return completed;
}

function copyAssets() {
  const srcAssets = path.join(TEMPLATES_DIR, "assets");
  const destAssets = path.join(DIST_DIR, "assets");
  fs.mkdirSync(destAssets, { recursive: true });
  for (const f of fs.readdirSync(srcAssets)) {
    fs.copyFileSync(path.join(srcAssets, f), path.join(destAssets, f));
  }
  for (const page of ["index.html", "completed.html"]) {
    fs.copyFileSync(path.join(TEMPLATES_DIR, page), path.join(DIST_DIR, page));
  }
  // .nojekyll so GitHub Pages serves the assets/ dir and files starting with _ as-is
  fs.writeFileSync(path.join(DIST_DIR, ".nojekyll"), "");
}

function main() {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(path.join(DIST_DIR, "data"), { recursive: true });

  const topics = buildTopics();
  const completed = buildCompleted();

  fs.writeFileSync(path.join(DIST_DIR, "data", "topics.json"), JSON.stringify(topics, null, 2));
  fs.writeFileSync(path.join(DIST_DIR, "data", "completed.json"), JSON.stringify(completed, null, 2));

  copyAssets();

  console.log(`Built ${topics.length} topic(s) and ${completed.length} completed thesis/theses into dist/`);

  if (hadErrors) {
    console.error("\nBuild finished with errors (see above). Fix the markdown frontmatter and rebuild.");
    process.exitCode = 1;
  }
}

main();
