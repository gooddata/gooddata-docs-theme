---
title: "Shortcodes"
linkTitle: "Shortcodes"
weight: 10
description: "Reference for every Hugo shortcode bundled with the GoodData Docs Theme."
---

This section is a living reference for all shortcodes shipped with the
GoodData Docs Theme. Every page below covers a single shortcode: what it is for,
the parameters it accepts, and a copy-paste-ready example. Where a shortcode
relies on partner shortcodes (for example, `code-select` together with
`code-lang`) the page links to the related reference.

## Content

| Shortcode | Purpose |
|-----------|---------|
| [`alert`](alert) | Render an info, warning, or label callout. |
| [`expand-content`](expand-content) | Hide long content behind a "Click here to expand" toggle. |
| [`embedded-image`](embedded-image) | Embed an image or `.mp4` video with a click-to-zoom modal. |
| [`label`](label) | Inject a labelled callout from `data/articleLabels.yml`. |
| [`inline-icon`](inline-icon) | Render an SVG from `static/` inline next to text. |

## Tabs

| Shortcode | Purpose |
|-----------|---------|
| [`content-select`](content-select) / [`content-block`](content-block) | Generic tabbed content. |
| [`code-select`](code-select) / [`code-lang`](code-lang) | Tabbed code samples (with optional OS detection). |
| [`accordion-options`](accordion-options) | Tweak the collapsing behaviour of a code block. |

## API references

| Shortcode | Purpose |
|-----------|---------|
| [`redocly`](redocly) | Render an OpenAPI spec with Redoc. |
| [`swaggerui`](swaggerui) | Render an OpenAPI spec with Swagger UI. |

## Version utilities

| Shortcode | Purpose |
|-----------|---------|
| [`latesttag`](latesttag) | Output the latest release tag for the current version. |
| [`latest-doc-dirpath`](latest-doc-dirpath) | Output the URL prefix of the latest documented version. |
| [`product`](product) | Output the product name configured for the current version. |

## Homepage building blocks

See [blocks](blocks) for the homepage-only shortcodes:
[`section`](blocks/section), [`card`](blocks/card),
[`cards-container`](blocks/cards-container), [`feature`](blocks/feature),
[`homepage-hosted`](blocks/homepage-hosted),
[`homepage-learn`](blocks/homepage-learn),
[`homepage-slack`](blocks/homepage-slack), and
[`sections-list`](blocks/sections-list).
