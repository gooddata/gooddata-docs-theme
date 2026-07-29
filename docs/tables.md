---
title: "Table Examples"
linkTitle: "Table Examples"
weight: 30
type: docs
description: "Live examples of every table variant supported by the theme — basic Markdown tables, alignment, and responsive wide tables."
---

This page demonstrates how tables render in the GoodData Docs Theme. Every table on a docs page is automatically wrapped in a responsive container by `static/js/tables.js`. A table that does not fit its container is restacked into a two-column label/value layout by the [resTables](https://github.com/codefog/restables) plugin, with horizontal scrolling and a fade hint as the fallback for tables that cannot be restacked. All variants are styled for both the light and dark theme.

---

## Basic table

A standard Markdown pipe table. The header row gets a shaded background, and cells are separated by borders on all sides.

```markdown
| Name        | Type    | Required | Description                        |
|-------------|---------|----------|------------------------------------|
| `workspace` | string  | Yes      | Workspace identifier.              |
| `title`     | string  | No       | Human-readable dashboard title.    |
| `tags`      | array   | No       | Tags used for filtering and search.|
```

| Name        | Type    | Required | Description                        |
|-------------|---------|----------|------------------------------------|
| `workspace` | string  | Yes      | Workspace identifier.              |
| `title`     | string  | No       | Human-readable dashboard title.    |
| `tags`      | array   | No       | Tags used for filtering and search.|

---

## Column alignment

Control alignment with the position of `:` in the separator row.

```markdown
| Left-aligned | Centered | Right-aligned |
|:-------------|:--------:|--------------:|
| Metric       | Active   | 1,234.56      |
| Insight      | Draft    | 42.00         |
```

| Left-aligned | Centered | Right-aligned |
|:-------------|:--------:|--------------:|
| Metric       | Active   | 1,234.56      |
| Insight      | Draft    | 42.00         |

---

## Formatting inside cells

Cells support inline Markdown — code, emphasis, links, and even line breaks with `<br>`.

```markdown
| Element         | Example                                          |
|-----------------|--------------------------------------------------|
| Inline code     | `SELECT * FROM metrics`                          |
| Bold / italic   | **required**, *optional*                         |
| Link            | [GoodData website](https://www.gooddata.com)     |
| Multiple lines  | First line<br>Second line                        |
```

| Element         | Example                                          |
|-----------------|--------------------------------------------------|
| Inline code     | `SELECT * FROM metrics`                          |
| Bold / italic   | **required**, *optional*                         |
| Link            | [GoodData website](https://www.gooddata.com)     |
| Multiple lines  | First line<br>Second line                        |

---

## Responsive behavior

The theme makes every table responsive automatically — no shortcode or extra markup is needed. Instead of a fixed breakpoint, the theme checks whether each table actually fits its container (re-checked on every window resize):

- **Table fits:** it renders as a normal table, regardless of screen size.
- **Table is wider than its container:** the [resTables](https://github.com/codefog/restables) plugin swaps in a stacked two-column clone of the table, where each original row becomes a group of label/value pairs — no horizontal scrolling needed. Narrow the browser window until a table on this page stops fitting to see it restack.

Tables with merged cells (`rowspan`/`colspan`) or without a header row cannot be mapped to label/value pairs, so they keep their original layout. When such a table overflows, it falls back to scrolling horizontally with a fade overlay on the right edge as a visual hint that more content is available.

The wide table below is the easiest place to see the swap — as the window narrows, it is the first to stop fitting and restack:

| Endpoint | Method | Authentication | Rate limit | Request body | Response | Since version | Notes |
| -------- | ------ | -------------- | ---------- | ------------ | -------- | ------------- | ----- |
| `/api/v1/entities/workspaces` | GET | Bearer token | 100 req/min | — | JSON:API collection of workspaces | 1.0 | Supports `include`, `filter`, and pagination query parameters. |
| `/api/v1/entities/workspaces/{id}` | PUT | Bearer token | 60 req/min | JSON:API workspace document | Updated workspace entity | 1.0 | Requires the `MANAGE` permission on the workspace. |
| `/api/v1/actions/workspaces/{id}/execution` | POST | Bearer token | 30 req/min | Execution definition (AFM) | Execution result handle | 1.2 | Long-running executions return `202 Accepted` with a polling URL. |
| `/api/v1/layout/workspaces/{id}/logicalModel` | GET | Bearer token | 100 req/min | — | Declarative logical data model | 1.1 | Use `?includeParents=true` to include inherited datasets. |

---

## See also

- [Markdown Reference](markdown-reference) — all Markdown formatting options, including table syntax basics.
- [Shortcodes reference](shortcodes) — GoodData-specific components that extend Markdown.
