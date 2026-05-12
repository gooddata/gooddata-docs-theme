---
title: "embedded-image"
linkTitle: "embedded-image"
weight: 3
description: "Embed an image or short video with a click-to-zoom modal."
---

`embedded-image` renders an image (or `.mp4` video) inside a styled frame and
adds a lightbox modal that opens when the asset is clicked. It is the preferred
way to embed visuals in documentation pages.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `src` | Yes | — | Path to the image or `.mp4` video. Either a project-relative path or an absolute URL. |
| `alt` | Recommended | — | Alternative text used by screen readers and search engines. |
| `width` | No | — | Width attribute applied to the inline asset. |
| `height` | No | — | Height attribute applied to the inline asset. |
| `caption` | No | — | Caption rendered below the asset. Adds the `hasCaption` modifier. |
| `no_border` | No | `false` | When set, drops the outer border / padding (useful for transparent PNGs). |
| `noalt` | No | `false` | Marks the asset as decorative (`aria-hidden="true"`, no proofing). |

When `src` ends in `.mp4`, the shortcode renders an autoplay/muted/loop
`<video>` tag instead of an `<img>`.

## Usage

### Basic image

```markdown
{{</* embedded-image src="/img/connect-data.png" alt="Click connect data" */>}}
```

### Image with caption and explicit size

```markdown
{{</* embedded-image
    src="/img/select-mongodb.png"
    alt="Select MongoDB"
    caption="Select MongoDB from the data source list."
    width="640" */>}}
```

### Borderless image

Use this when the asset already has its own framing, such as a logo or a
transparent illustration.

```markdown
{{</* embedded-image src="/img/logo.svg" alt="GoodData" no_border="true" */>}}
```

### Decorative image

```markdown
{{</* embedded-image src="/img/divider.svg" noalt="true" */>}}
```

### Inline video

```markdown
{{</* embedded-image
    src="/img/walkthrough.mp4"
    alt="MongoDB connector walkthrough" */>}}
```

## Notes

- The modal is opened by Bootstrap; both `data-toggle` and `data-bs-toggle`
  attributes are emitted so the shortcode works under Bootstrap 4 and 5.
- A unique modal ID is auto-generated from the file name of `src`.
