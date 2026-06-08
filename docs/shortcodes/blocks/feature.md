---
title: "blocks/feature"
linkTitle: "feature"
weight: 4
description: "Centered feature blurb with icon, heading, copy, and a 'Learn more' link."
---

`blocks/feature` renders a Font-Awesome-iconed feature blurb with a title, a
short description (taken from the shortcode body), and an optional "Learn more"
link. It is meant for marketing-style homepage rows.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `title` | Yes | — | Heading text. Markdown is supported (rendered with `markdownify`). |
| `icon` | No | `fa-lightbulb` | Font Awesome icon class. The shortcode prefixes `fas` automatically when `icon` does not start with `fas ` or `fab `. |
| `width` | No | full width | One of `full`, `half`, `quarter`. Drives the responsive Bootstrap column classes. |
| `align` | No | `center` | Text alignment. Becomes a `text-<align>` class. |
| `color` | No | empty | Modifier appended to `gd-docs-homepage-box__inner` (for example, `white`). |
| `url` | No | — | URL for the "Learn more" link. The link is omitted when no URL is provided. |
| `url_text` | No | `Learn more` | Override for the link text. |

The body of the shortcode is the descriptive copy under the title.

## Usage

### Three features in a row

```markdown
{{</* blocks/section type="container" color="white" */>}}
{{</* blocks/feature
    title="Self-service analytics"
    icon="fa-chart-line"
    width="quarter"
    url="/docs/self-service" */>}}
Build dashboards without writing SQL.
{{</* /blocks/feature */>}}

{{</* blocks/feature
    title="Embedded BI"
    icon="fa-code"
    width="quarter"
    url="/docs/embedded"
    url_text="See SDK" */>}}
Embed analytics into your product with the GoodData SDK.
{{</* /blocks/feature */>}}

{{</* blocks/feature
    title="Composable APIs"
    icon="fa-puzzle-piece"
    width="quarter"
    url="/docs/api" */>}}
Glue analytics into your data stack with REST and GraphQL APIs.
{{</* /blocks/feature */>}}
{{</* /blocks/section */>}}
```

### Single full-width feature with a custom icon

```markdown
{{</* blocks/feature
    title="**Now in beta:** semantic search"
    icon="fab fa-searchengin"
    width="full"
    color="white"
    url="/docs/semantic-search"
    url_text="Read the announcement" */>}}
Try semantic search to find data points across your workspaces.
{{</* /blocks/feature */>}}
```

## Notes

- The shortcode relies on Font Awesome being loaded. The bundled
  `head-css.html` partial pulls FA in by default; remove that line if you ship
  a custom head and provide your own icon set.
- `title` is rendered with `markdownify`, so inline emphasis (`**bold**`,
  `_italic_`) works inside the heading.
