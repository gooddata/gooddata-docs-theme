---
title: "blocks/card"
linkTitle: "card"
weight: 3
description: "Card with optional icon and either a section link or custom body."
---

`blocks/card` renders a card on the docs homepage. A card has two flavours:

1. **Section link** (`sectionLink`) — pulls the title, description, and icon
   from the linked section's front matter; the whole card becomes a clickable
   link.
2. **Custom card** — uses a `title`, optional `icon`, and the shortcode body
   for the description. The body supports markdown.

Cards are usually placed inside a [`cards-container`](../cards-container).

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `title` | Conditional | — | Visible card title. Required for custom cards; ignored when `sectionLink` resolves to a page (the page's `Title` is used instead). |
| `description` | No | — | Override for the section description when using `sectionLink`. |
| `sectionLink` | No | — | Path under the docs root (without the version prefix) of the section to link to. The card becomes a hyperlink. |
| `icon` | No | — | Path to an icon. SVGs are inlined, other formats are rendered with `<img>`. With `sectionLink`, the icon is resolved relative to the linked page's permalink. |
| `iconPosition` | No | `left` | `left` or `top`. Drives the `homepage-card__iconLeft`/`__iconTop` modifier. |
| `span` | No | — | Bootstrap `col-md-N` value (1–12) used inside a `cards-container` with `maxRow`. |

## Usage

### Section-link cards

The card title and copy come from the front matter of the linked page. Useful
to keep the homepage in sync with the docs structure.

```markdown
{{</* blocks/cards-container maxRow="3" */>}}
{{</* blocks/card sectionLink="/getting-started" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* blocks/card sectionLink="/connect-data" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* blocks/card sectionLink="/api" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* /blocks/cards-container */>}}
```

The shortcode loads `icon`, `Title`, and `Description` from the linked page's
front matter:

```yaml
---
title: "Connect data"
description: "Wire up data sources, models, and refreshes."
icon: "plug.svg"
---
```

### Custom cards

```markdown
{{</* blocks/card title="Need help?" icon="/img/icon-support.svg" iconPosition="top" */>}}
Open a ticket with the GoodData support team to get a hand from a human.
[Contact support](https://support.gooddata.com).
{{</* /blocks/card */>}}
```

### Cards with explicit column widths

When the parent `cards-container` declares `maxRow`, you can use `span` to
size individual cards.

```markdown
{{</* blocks/cards-container maxRow="3" */>}}
{{</* blocks/card title="Featured" span="6" */>}}A double-width card.{{</* /blocks/card */>}}
{{</* blocks/card title="Companion" span="3" */>}}A regular card.{{</* /blocks/card */>}}
{{</* blocks/card title="Companion" span="3" */>}}A regular card.{{</* /blocks/card */>}}
{{</* /blocks/cards-container */>}}
```

## Notes

- For `sectionLink`, the shortcode resolves the path against the current
  page's first section (the active version), or falls back to the first entry
  of `params.versions` (or `/docs/` for unversioned sites).
- SVG icons referenced via `sectionLink` are read from disk and have
  `aria-hidden="true"` injected into the root `<svg>` element automatically.
- A missing `sectionLink` target silently produces an empty card; double-check
  the path when a card disappears.

## See also

- [`cards-container`](../cards-container)
- [`feature`](../feature)
