#!/usr/bin/env node
//
// Post-processes the a11y-run.js JSON report. Each issue carries a `status`:
//   • "blocking"   — a definite failure
//   • "incomplete" — axe needs-review (e.g. text over an image); not a failure
//
// Classification precedence per issue:
//   1. footer / search / cookies  → non-blocking warning (third-party chrome)
//   2. status "incomplete"        → non-blocking, "needs review"
//   3. otherwise                  → BLOCKING (fails the audit, exit 1)
//
"use strict";

const fs = require("fs");

const reportPath = process.argv[2] || "pa11y-report.json";
const data = JSON.parse(fs.readFileSync(reportPath, "utf8"));

// Non-blocking third-party categories. The first matching category wins.
const NON_BLOCKING = [
  {
    name: "footer",
    label: "Footer",
    match: (selector, context) =>
      /footer/i.test(selector) ||
      /gd-footer/i.test(context) ||
      /(^|#)(paint\d+_linear|clip\d+)/i.test(selector),
  },
  {
    name: "search",
    label: "Search widget",
    match: (selector, context) =>
      /addsearch|search-?dialog|searchfield|searchresults|adds-(container|filter)/i.test(selector) ||
      /addsearch|search-?dialog|searchfield/i.test(context),
  },
  {
    name: "cookies",
    label: "Cookie banner",
    match: (selector, context) =>
      /cookie/i.test(selector) || /cookie/i.test(context),
  },
];

function categorize(issue) {
  const selector = issue.selector || "";
  const context = issue.context || "";
  for (const category of NON_BLOCKING) {
    if (category.match(selector, context)) return category.name;
  }
  return null;
}

const shortMessage = (msg) => msg.split(/[.(]/)[0].trim().slice(0, 80);

function parseKey(key) {
  const match = key.match(/^(.*?)\s+\[(light|dark)\]$/);
  if (match) return { url: match[1], mode: match[2] };
  return { url: key, mode: "default" };
}

let blockingCount = 0;
let incompleteCount = 0;
const warningsByCategory = {};
const blockingByPage = {};
const blockingByMode = {};
const incompleteByMode = {};
const incompleteByMessage = {};
const warningsByMode = {};
const urls = new Set();
const modes = new Set();

for (const category of NON_BLOCKING) {
  warningsByCategory[category.name] = { count: 0, byMessage: {} };
}

for (const [key, issues] of Object.entries(data.results)) {
  const { url, mode } = parseKey(key);
  urls.add(url);
  modes.add(mode);
  for (const issue of issues) {
    if (issue.type !== "error") continue;
    const category = categorize(issue);
    if (category) {
      const bucket = warningsByCategory[category];
      bucket.count++;
      bucket.byMessage[shortMessage(issue.message)] =
        (bucket.byMessage[shortMessage(issue.message)] || 0) + 1;
      warningsByMode[mode] = (warningsByMode[mode] || 0) + 1;
    } else if (issue.status === "incomplete") {
      incompleteCount++;
      incompleteByMode[mode] = (incompleteByMode[mode] || 0) + 1;
      incompleteByMessage[shortMessage(issue.message)] =
        (incompleteByMessage[shortMessage(issue.message)] || 0) + 1;
    } else {
      blockingCount++;
      blockingByMode[mode] = (blockingByMode[mode] || 0) + 1;
      (blockingByPage[key] = blockingByPage[key] || []).push(issue);
    }
  }
}

const warningCount = Object.values(warningsByCategory).reduce((n, b) => n + b.count, 0);
const modeList = [...modes].sort();
const perMode = (byMode) =>
  modeList.length > 1 ? `  (${modeList.map((m) => `${m}: ${byMode[m] || 0}`).join(", ")})` : "";

console.log(`\nAccessibility audit (WCAG 2.1 AA) — ${urls.size} pages × ${modeList.join(", ")}`);
console.log(`  Blocking errors:  ${blockingCount}${perMode(blockingByMode)}`);
console.log(`  Needs review:     ${incompleteCount} (incomplete, non-blocking)${perMode(incompleteByMode)}`);
console.log(`  Warnings:         ${warningCount} (non-blocking)${perMode(warningsByMode)}`);
console.log("");

for (const category of NON_BLOCKING) {
  const bucket = warningsByCategory[category.name];
  if (bucket.count === 0) continue;
  console.log(`⚠ ${category.label} warnings (non-blocking) — ${bucket.count}:`);
  Object.entries(bucket.byMessage)
    .sort((a, b) => b[1] - a[1])
    .forEach(([msg, count]) => console.log(`   ${String(count).padStart(4)}  ${msg}`));
  console.log("");
}

if (incompleteCount > 0) {
  console.log(`◐ Needs review (incomplete, non-blocking) — ${incompleteCount}:`);
  Object.entries(incompleteByMessage)
    .sort((a, b) => b[1] - a[1])
    .forEach(([msg, count]) => console.log(`   ${String(count).padStart(4)}  ${msg}`));
  console.log("");
}

if (blockingCount > 0) {
  console.log("✘ Blocking errors by page:");
  for (const [pageKey, list] of Object.entries(blockingByPage)) {
    const byMessage = {};
    for (const issue of list) {
      byMessage[shortMessage(issue.message)] = (byMessage[shortMessage(issue.message)] || 0) + 1;
    }
    console.log(`\n  ${pageKey}  (${list.length})`);
    Object.entries(byMessage)
      .sort((a, b) => b[1] - a[1])
      .forEach(([msg, count]) => console.log(`     ${String(count).padStart(3)}  ${msg}`));
  }
  console.log("");
  if (process.env.A11Y_LOG_ONLY) {
    console.log(`ℹ A11Y_LOG_ONLY set — not failing (${blockingCount} blocking errors logged above).`);
  } else {
    process.exit(1);
  }
} else {
  console.log("✔ No blocking accessibility errors.");
}
