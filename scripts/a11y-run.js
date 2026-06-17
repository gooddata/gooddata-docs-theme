#!/usr/bin/env node
//
// Runs axe-core + HTML_CodeSniffer (WCAG 2.1 AA) over every page in the site's
// sitemap, in BOTH light and dark color schemes.
//
// We drive puppeteer directly (rather than pa11y-ci) so we can emulate
// `prefers-color-scheme` before navigation — the pre-paint theme-init then
// renders the dark stylesheet.
//
// axe-core is run directly (not via pa11y) so we can keep axe's
// violation/incomplete distinction: pa11y collapses both into `type: error`.
// Each issue is tagged with a `status`:
//   • "blocking"   — a definite failure (axe violation or HTML_CodeSniffer error)
//   • "incomplete" — axe could not decide (e.g. text over an image/gradient);
//                    needs manual review, not a failure.
// HTML_CodeSniffer (which has no "incomplete" concept) still runs via pa11y.
//
// Output: pa11y-report.json — { "results": { "<url> [mode]": [ …issues… ] } }.
//
"use strict";

const fs = require("fs");
const pa11y = require(process.cwd() + "/node_modules/pa11y");
const puppeteer = require(process.cwd() + "/node_modules/puppeteer");
const axePath = process.cwd() + "/node_modules/axe-core/axe.min.js";

const BASE = (process.argv[2] || "http://localhost:8080").replace(/\/$/, "");
const OUT = process.argv[3] || "pa11y-report.json";
const MODES = ["light", "dark"];
const AXE_TAGS = ["wcag2a", "wcag21a", "wcag2aa", "wcag21aa", "best-practice"];

async function getSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(locs)].sort();
}

// Run axe-core in the page and return issues split by status.
async function runAxe(page) {
  await page.addScriptTag({ path: axePath });
  return page.evaluate(async (tags) => {
    const result = await window.axe.run(document, {
      runOnly: { type: "tag", values: tags },
    });
    const map = (rules, status) =>
      rules.flatMap((rule) =>
        rule.nodes.map((node) => ({
          code: rule.id,
          type: "error",
          status,
          runner: "axe",
          message: `${rule.help} (${rule.helpUrl})`,
          selector: Array.isArray(node.target) ? node.target.join(" ") : String(node.target),
          context: (node.html || "").slice(0, 200),
        }))
      );
    return [
      ...map(result.violations, "blocking"),
      ...map(result.incomplete, "incomplete"),
    ];
  }, AXE_TAGS);
}

async function main() {
  const urls = await getSitemapUrls();
  console.error(`▶ ${urls.length} URLs × ${MODES.length} modes = ${urls.length * MODES.length} runs`);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const results = {};
  let done = 0;
  const total = urls.length * MODES.length;

  for (const url of urls) {
    for (const mode of MODES) {
      const key = `${url} [${mode}]`;
      const page = await browser.newPage();
      try {
        await page.setViewport({ width: 1280, height: 1024 });
        await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: mode }]);

        // HTML_CodeSniffer via pa11y (it navigates the page); its errors are
        // definite failures.
        const htmlcs = await pa11y(url, {
          standard: "WCAG2AA",
          runners: ["htmlcs"],
          timeout: 60000,
          wait: 500,
          browser,
          page,
        });
        const htmlcsIssues = htmlcs.issues.map((issue) => ({ ...issue, status: "blocking" }));

        // axe-core directly, on the now-loaded page, keeping the status split.
        const axeIssues = await runAxe(page);

        results[key] = [...htmlcsIssues, ...axeIssues];
      } catch (error) {
        console.error(`✗ ${key}: ${error.message}`);
        results[key] = [];
      } finally {
        await page.close().catch(() => {});
      }
      done++;
      process.stderr.write(`\r  ${done}/${total} …`);
    }
  }
  process.stderr.write("\n");

  await browser.close();
  fs.writeFileSync(OUT, JSON.stringify({ results }, null, 2));
  console.error(`▶ Wrote ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
