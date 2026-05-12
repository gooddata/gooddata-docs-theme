---
title: "blocks/section"
linkTitle: "section"
weight: 1
description: "Full-width row used as a building block on the homepage."
---

`blocks/section` is the outermost wrapper for homepage content. It produces a
full-width `<section>` with optional colour, height, and a centered container.
It is meant to nest the other `blocks/*` shortcodes.

The shortcode emits an offset anchor (`#td-block-N`) so adjacent sections can
link to each other.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `color` | No | the section's `Ordinal` index | Colour modifier appended to `td-box--`. The bundled stylesheet ships variants such as `white`, `gray`, `primary`, `secondary`. |
| `height` | No | `auto` | Height modifier appended to `td-box--height-`. Use `auto`, `min`, `med`, `max`, or `full`. |
| `type` | No | empty | Class applied to the inner row. Use `container` to constrain the contents to the centered grid. |
| `classes` | No | empty | Additional class list appended to the section. |

The body of the shortcode is rendered as the section's content. Markdown is
supported in `.md` pages; HTML pages are rendered with `htmlUnescape | safeHTML`.

## Usage

### Centered, white section

```markdown
{{</* blocks/section type="container" color="white" */>}}
## Welcome to the docs

A short intro paragraph that sells the docs.
{{</* /blocks/section */>}}
```

### Tall hero section with custom classes

```markdown
{{</* blocks/section color="primary" height="full" classes="td-cover-block" */>}}
# GoodData Documentation
Find answers, recipes, and references for every product.
{{</* /blocks/section */>}}
```

## Notes

- Each `blocks/section` increments an internal counter that becomes part of the
  generated anchor (`#td-block-0`, `#td-block-1`, …). Use these anchors to
  scroll-link between sections from buttons or copy.
- `blocks/section` does not include any container by itself — pass
  `type="container"` (or wrap the contents in your own `.container`) when you
  want the standard centered max-width.

## See also

- [`cards-container`](../cards-container)
- [`sections-list`](../sections-list)
- [`feature`](../feature)
