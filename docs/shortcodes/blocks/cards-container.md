---
title: "blocks/cards-container"
linkTitle: "cards-container"
weight: 2
description: "Responsive grid wrapper for `card` shortcodes."
---

`blocks/cards-container` is a wrapper around one or more
[`card`](../card) shortcodes. It outputs a Bootstrap row with the
`row-cols-md-N` class so that the children form a responsive grid.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `maxRow` | No | — | Number of columns at the `md` breakpoint and above. Must be in the range `1`–`12`. When omitted, every child stretches to its content width. |

## Usage

### Three columns at desktop, one column at mobile

```markdown
{{</* blocks/cards-container maxRow="3" */>}}
{{</* blocks/card title="Get started" sectionLink="/getting-started" icon="rocket.svg" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* blocks/card title="Connect data" sectionLink="/connect-data" icon="plug.svg" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* blocks/card title="API reference" sectionLink="/api" icon="code.svg" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* /blocks/cards-container */>}}
```

### Variable-width cards (no `maxRow`)

```markdown
{{</* blocks/cards-container */>}}
{{</* blocks/card title="Quick tour" */>}}A two-minute walkthrough.{{</* /blocks/card */>}}
{{</* blocks/card title="Reference" */>}}Searchable API docs.{{</* /blocks/card */>}}
{{</* /blocks/cards-container */>}}
```

## Notes

- The `maxRow` value is validated by the shortcode (must be `> 0` and `< 13`).
  Out-of-range values fall back to plain `.row` without column hints.
- For finer control over individual cards, use the `span` parameter on each
  child [`card`](../card) shortcode.

## See also

- [`card`](../card)
- [`section`](../section)
