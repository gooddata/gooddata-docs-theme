---
title: "blocks/homepage-hosted"
linkTitle: "homepage-hosted"
weight: 6
description: "Hosted plan callout (icon, title, copy, CTA)."
---

`blocks/homepage-hosted` is a one-shot homepage banner that promotes the
hosted/cloud version of GoodData. It renders a single full-width row with an
icon, a title, a paragraph, an optional rich body, and a CTA button.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `icon` | No | — | Font Awesome (or other icon-font) class for the icon next to the title. |
| `title` | Yes | — | Banner heading. |
| `text` | Yes | — | Single-paragraph blurb shown under the title. |
| `buttonText` | Yes | — | Visible label of the CTA button. |
| `buttonLink` | Yes | — | URL the CTA button points to. |

The shortcode body is rendered after `text`, so use it for any extra rich
markup (a list of bullet points, a small table, etc.).

## Usage

```markdown
{{</* blocks/section color="white" */>}}
{{</* blocks/homepage-hosted
    icon="fa-cloud"
    title="GoodData Cloud"
    text="Get a fully managed analytics platform without the operational overhead."
    buttonText="Try free for 30 days"
    buttonLink="https://www.gooddata.com/cloud-trial/" */>}}

- 30-day free trial — no credit card required.
- Production-grade SLA from day one.
- Bring your own data warehouse.
{{</* /blocks/homepage-hosted */>}}
{{</* /blocks/section */>}}
```

## Notes

- The wrapper produces a `.gd-docs-homepage-hosted` row with a `.gray-box`
  inner panel. Override the colours in `assets/scss/homepage/hosted.scss`.
- `text` is rendered as plain text. For richer content, drop it into the body
  instead.
