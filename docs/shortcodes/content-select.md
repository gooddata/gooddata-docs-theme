---
title: "content-select"
linkTitle: "content-select"
weight: 6
description: "Group several `content-block` panels into a tabbed UI."
---

`content-select` is the parent shortcode for tabbed content. Wrap one or more
[`content-block`](../content-block) shortcodes inside it; each child becomes a
tab and a panel.

This shortcode does not take any parameters. The tab labels come from the
`title` attribute of every nested `content-block`.

## Parameters

This shortcode has no parameters.

## Usage

```markdown
{{</* content-select */>}}
{{</* content-block title="UI" */>}}
1. On the home page, click **Connect data**.
2. Pick **MongoDB**.
3. Click **Copy Token** and save it for later use.
{{</* /content-block */>}}

{{</* content-block title="CLI" */>}}
Use the GoodData CLI to register the data source:

```bash
gdc datasources add mongo --type mongodb --connection-string "..."
```
{{</* /content-block */>}}
{{</* /content-select */>}}
```

## Live preview

{{< content-select >}}
{{< content-block title="UI" >}}
1. On the home page, click **Connect data**.
2. Pick **MongoDB**.
3. Click **Copy Token** and save it for later use.
{{< /content-block >}}

{{< content-block title="CLI" >}}
Use the GoodData CLI to register the data source:

```bash
gdc datasources add mongo --type mongodb --connection-string "..."
```
{{< /content-block >}}
{{< /content-select >}}

## Notes

- The first child block is rendered as the active tab. Visitors can click any
  other tab to switch panels.
- Nest as many `content-block` children as you like; the tab strip wraps to
  multiple lines on narrow viewports.

## See also

- [`content-block`](../content-block) — the child shortcode that defines a tab
  and its body.
- [`code-select`](../code-select) — a code-focused variant with optional OS
  detection.
