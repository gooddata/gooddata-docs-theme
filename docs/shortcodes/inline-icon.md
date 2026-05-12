---
title: "inline-icon"
linkTitle: "inline-icon"
weight: 5
description: "Render an SVG from the static folder inline next to text."
---

`inline-icon` reads an SVG file from the site's `static/` folder and inlines it
into the page. It is mostly used to inject the small chevron and external-link
glyphs that appear inside running text.

The shortcode uses positional arguments rather than named parameters.

## Parameters

| Position | Required | Description |
|----------|----------|-------------|
| `0` | Yes | Path to the SVG file, relative to `static/`. |
| `1` | Yes | CSS class applied to the wrapping `<span>`. |

The first positional argument is read with `readFile`, so the path must point
to an existing file under `static/`. Hugo will fail the build if the file is
missing.

## Usage

```markdown
Click the play button {{</* inline-icon "img/video-play.svg" "inline-icon inline-icon--small" */>}}
to start the walkthrough.

Open the article in a new tab {{</* inline-icon "icons/external-link.svg" "external-link" */>}}.
```

## Tips

- Keep the SVG small. The full file contents are embedded into the rendered
  HTML, so heavy SVGs bloat the page weight.
- Use the second argument to attach a class so the icon can be sized and
  coloured via CSS (`fill: currentColor;` works well).
- The shortcode does not sanitise the SVG. Only inline files you control.
