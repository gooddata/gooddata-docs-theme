---
title: "blocks/sections-list"
linkTitle: "sections-list"
weight: 5
description: "Auto-generated grid of every top-level docs section."
---

`blocks/sections-list` renders a grid card for each top-level page under the
docs root. It pulls each card's title, description, and icon from the section's
front matter and adds an optional "In this section" sub-list of the section's
`promotedLinks`.

It is the easiest way to keep the homepage in sync with the documentation
structure: as soon as a new section is added under `/docs/`, it shows up here.

## Parameters

This shortcode has no parameters of its own. The grid contents are sourced
from each section's front matter:

| Front-matter key | Effect |
|------------------|--------|
| `title` / `linkTitle` | Card heading. |
| `description` | Card body copy. |
| `icon` | Path (relative to the section) to an icon image. |
| `toc_hide: true` | Excludes the section from the grid. |
| `homepage_hide: true` | Excludes the section from the grid. |
| `promotedLinks` | List of section paths whose titles are listed under "In this section". |

The body of the shortcode is rendered as an introduction above the grid (see
the example below).

## Usage

### Default usage on the homepage

```markdown
{{</* blocks/section color="gray" */>}}
{{</* blocks/sections-list */>}}
## Browse the docs

Pick a topic to dive into.
{{</* /blocks/sections-list */>}}
{{</* /blocks/section */>}}
```

### A section with promoted links

Add this to a section's `_index.md`:

```yaml
---
title: "Connect data"
description: "Wire up data sources, models, and refreshes."
icon: "plug.svg"
promotedLinks:
  - /docs/data-sources/postgres
  - /docs/data-sources/snowflake
  - /docs/data-sources/mongodb
---
```

The card now renders an extra **In this section** list with links to the three
promoted pages.

## Notes

- The shortcode resolves the docs root from `params.versions[0].url` (when
  versioned) or `/docs/` (unversioned).
- Sections with `toc_hide: true` or `homepage_hide: true` are skipped, as is
  the homepage itself.
- Each card emits its icon as an `<img>`. Provide raster icons for crisp
  rendering on Hi-DPI screens, or convert SVG icons to inline rendering by
  forking the shortcode.
