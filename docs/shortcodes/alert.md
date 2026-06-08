---
title: "alert"
linkTitle: "alert"
weight: 1
description: "Render an info, warning, or label callout."
---

`alert` wraps a chunk of markdown in a styled callout. Use it for tips,
warnings, and tagged statements that should stand out from the surrounding
text. The shortcode accepts a `color` and an optional `title`. Nested markdown
inside the shortcode body is rendered normally.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `color` | No | `primary` | Visual variant. Use `info`, `warning`, `label`, or `primary`. The same value is used to look up the SVG icon at `assets/icons/icon-alert-<color>.svg`. |
| `title` | No | — | Optional heading rendered above the body. Inline HTML is allowed. |

The body of the shortcode supports full markdown.

## Variants

### Info

Use `color="info"` for friendly, non-blocking notes.

```markdown
{{</* alert color="info" title="Note" */>}}
MongoDB is primarily designed for transactional workloads, not analytical
ones. The MongoDB Connector makes it possible to use MongoDB with GoodData,
but its performance depends on how the data is modelled and processed.
{{</* /alert */>}}
```

### Warning

Use `color="warning"` for breaking changes, beta features, or anything that
needs visual urgency.

```markdown
{{</* alert color="warning" title="Beta Feature" */>}}
GoodData's API solution is currently a **beta feature** and is still under
active development. Do not use these features in your production environment.
{{</* /alert */>}}
```

### Label

Use `color="label"` for high-contrast, branded statements.

```markdown
{{</* alert color="label" title="Heads up" */>}}
This article is part of the GoodData onboarding track.
{{</* /alert */>}}
```

## Live preview

{{< alert color="info" title="Note" >}}
MongoDB is primarily designed for transactional workloads, not analytical
ones. The MongoDB Connector makes it possible to use MongoDB with GoodData,
but its performance depends on how the data is modelled and processed.
{{< /alert >}}

{{< alert color="warning" title="Beta Feature" >}}
GoodData's API solution is currently a **beta feature** and is still under
active development. Do not use these features in your production environment.
{{< /alert >}}

## See also

- [`label`](../label) — pulls a predefined label from `articleLabels.yml`.
