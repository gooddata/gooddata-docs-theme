---
title: "cta-banner"
linkTitle: "cta-banner"
weight: 20
description: "A lime-green call-to-action banner with an optional product screenshot."
---

`cta-banner` renders a visually prominent, lime-green banner with a title,
subtitle, and an outlined call-to-action button. An optional product screenshot
can be placed on the right side, slightly overflowing the top of the card for a
"pop-out" effect.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `title` | No | `"Experience GoodData in Action"` | Heading text rendered in bold. |
| `subtitle` | No | Marketing copy | Supporting sentence(s) below the title. |
| `buttonText` | No | `"Explore product tours"` | Label for the CTA button. |
| `buttonUrl` | No | GoodData registration URL | `href` for the CTA button. |
| `image` | No | — | Path to an image file relative to `/static`, e.g. `"/img/dashboard.png"`. When omitted the banner spans full width with text only. |
| `imageAlt` | No | `""` | Alt text for the image (required for accessibility when `image` is set). |

## Usage

### Minimal (text only)

```markdown
{{</* cta-banner */>}}
```

### Custom text and link

```markdown
{{</* cta-banner
  title="Ready to build your first dashboard?"
  subtitle="Sign up for free and start exploring GoodData in minutes."
  buttonText="Start for free"
  buttonUrl="https://registration.cloud.gooddata.com/register"
*/>}}
```

### With a product screenshot

```markdown
{{</* cta-banner
  title="Experience GoodData in Action"
  subtitle="Discover how our platform brings data, analytics, and AI together — through interactive product walkthroughs."
  buttonText="Explore product tours"
  buttonUrl="https://registration.cloud.gooddata.com/register"
  image="/img/product-tour.png"
  imageAlt="GoodData analytics dashboard"
*/>}}
```

## Preview

{{< cta-banner >}}

## Design notes

- **Background**: `$color-lime-green` (`#DAFE85`) — the primary GoodData brand colour.
- **Button**: outlined pill button (white fill, black border). On hover it inverts to a solid black button with white text.
- **Image**: rendered flush with the bottom of the banner and slightly overflowing the top, giving a floating screenshot effect. Omitting `image` produces a clean full-width text layout.
- **Dark mode**: the banner switches to `$color-key-lime-green` (`#C6E57B`) so it remains readable on dark backgrounds. Button styles are unchanged.
- **Responsive**: on viewports narrower than 768 px the image stacks below the text.
- The shortcode is self-closing (no inner body content); all customisation is done through parameters.
