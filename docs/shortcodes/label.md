---
title: "label"
linkTitle: "label"
weight: 4
description: "Inject a labelled callout from the site's article labels data file."
---

`label` is a shortcut for rendering one of the site-wide article labels defined
in `data/articleLabels.yml`. It looks the entry up by `id` and renders it using
the same styling as `{{</* alert color="label" */>}}` (a high-contrast,
icon-prefixed banner).

The same labels are also rendered automatically when a page front-matter
declares `articleLabel: "<id>"`. Use this shortcode when you need to drop a
label inline.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `id` | Yes | — | The `labelId` of the entry in `data/articleLabels.yml`. |

If the supplied `id` is missing from `articleLabels.yml`, Hugo emits a build
warning and the label is silently skipped.

## Usage

```markdown
{{</* label id="beta" */>}}
```

## Defining labels

Create `data/articleLabels.yml` (next to `data/en.yaml`) with one entry per
label. The `text` field supports markdown.

```yaml
- labelId: beta
  text: |
    **Beta feature.** This article describes a beta feature. The behaviour
    may change before general availability.

- labelId: deprecated
  text: |
    **Deprecated.** Avoid using this feature in new projects.
```

Once the data file is in place, the shortcode `{{</* label id="beta" */>}}`
renders the corresponding banner anywhere on the page.

## Front-matter alternative

To attach a label to an entire page without using the shortcode, set
`articleLabel` in the front matter:

```yaml
---
title: "My beta page"
articleLabel: "beta"
---
```
