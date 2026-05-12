---
title: "content-block"
linkTitle: "content-block"
weight: 7
description: "Define a single tab inside a `content-select`."
---

`content-block` represents one tab inside a [`content-select`](../content-select)
group. It must always be nested inside a `content-select`; on its own it simply
renders its body without any tab UI.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `title` | Yes | — | Label of the tab. Plain text. |

The body of the shortcode is rendered as the tab's content. Markdown, code
blocks, images, and other shortcodes are all supported.

## Usage

```markdown
{{</* content-select */>}}
{{</* content-block title="Cloud" */>}}
1. Sign in to the GoodData console.
2. Create a workspace.
3. Connect a data source.
{{</* /content-block */>}}

{{</* content-block title="Self-managed" */>}}
1. Install the chart with `helm install gooddata gooddata/gooddata`.
2. Wait for the pods to become `Ready`.
3. Open the console at `https://<your-domain>/`.
{{</* /content-block */>}}
{{</* /content-select */>}}
```

## Live preview

{{< content-select >}}
{{< content-block title="Cloud" >}}
1. Sign in to the GoodData console.
2. Create a workspace.
3. Connect a data source.
{{< /content-block >}}

{{< content-block title="Self-managed" >}}
1. Install the chart with `helm install gooddata gooddata/gooddata`.
2. Wait for the pods to become `Ready`.
3. Open the console at `https://<your-domain>/`.
{{< /content-block >}}
{{< /content-select >}}

## Notes

- The first `content-block` inside a `content-select` is rendered as the active
  tab.
- The shortcode falls back to rendering the body as plain content when used
  outside of `content-select`. Use this gracefully so that the page still reads
  if you ever remove the parent.

## See also

- [`content-select`](../content-select) — the parent shortcode.
