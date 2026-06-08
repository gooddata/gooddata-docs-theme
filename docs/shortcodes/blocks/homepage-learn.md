---
title: "blocks/homepage-learn"
linkTitle: "homepage-learn"
weight: 7
description: "Learning hub callout with icon, title, copy, body, and a CTA."
---

`blocks/homepage-learn` is a half-width homepage banner that promotes the
GoodData learning hub. It mirrors [`homepage-hosted`](../homepage-hosted) but
uses a two-column layout: blurb on the left, a list of links / supplementary
markdown on the right, and a CTA button anchored at the bottom.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `icon` | No | — | Icon-font class for the glyph next to the title. |
| `title` | Yes | — | Banner heading. |
| `text` | Yes | — | Single-paragraph blurb shown under the title in the left column. |
| `buttonText` | Yes | — | Visible label of the CTA button. |
| `buttonLink` | Yes | — | URL the CTA button points to. |

The shortcode body is rendered as the right-column content. Use markdown to
list courses, certifications, or other learning resources.

## Usage

```markdown
{{</* blocks/section color="white" */>}}
{{</* blocks/homepage-learn
    icon="fa-graduation-cap"
    title="Learn GoodData"
    text="Self-paced courses, certifications, and walkthroughs to get your team productive."
    buttonText="Browse courses"
    buttonLink="https://learn.gooddata.com/" */>}}

- [Quickstart](https://learn.gooddata.com/quickstart) — get your first
  workspace running in under an hour.
- [Modeling 101](https://learn.gooddata.com/modeling-101) — understand the
  semantic layer.
- [Embedding deep dive](https://learn.gooddata.com/embedded-bi) — ship
  in-product analytics with the SDK.
{{</* /blocks/homepage-learn */>}}
{{</* /blocks/section */>}}
```

## Notes

- The shortcode renders inside `col-12 col-xl-6`, so it sits side by side with
  another half-width block on extra-large screens. Pair it with
  [`homepage-slack`](../homepage-slack) or with another `homepage-learn` for a
  two-column row.
- The CTA button is placed at the bottom of the inner panel and works well
  with short blurbs. For long content, consider using
  [`feature`](../feature) instead.
