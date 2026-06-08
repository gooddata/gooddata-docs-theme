---
title: "redocly"
linkTitle: "redocly"
weight: 11
description: "Render an OpenAPI spec on the page using Redoc."
---

`redocly` embeds the [Redoc](https://github.com/Redocly/redoc) standalone
renderer inside the page. The shortcode emits a `<redoc>` element pointed at
the supplied OpenAPI specification and loads the standalone Redoc bundle from
GoodData's CDN. It also wires up the `scroll-y-offset` so the sticky API
navigation aligns with the docs header.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `src` | Yes | — | URL of the OpenAPI specification (`.json` or `.yaml`). |
| `id` | No | `header` | CSS selector of the element used to compute the sticky scroll offset. The shortcode sums the element height and its direct children's heights. |

## Usage

### Hosted spec

```markdown
{{</* redocly src="https://api.example.com/openapi.json" */>}}
```

### Spec served from `static/`

```markdown
{{</* redocly src="/api/openapi.yaml" */>}}
```

### Custom scroll offset target

If your page has a custom sticky header, pass its CSS selector as `id` so Redoc
keeps deep-linked anchors visible.

```markdown
{{</* redocly src="/api/openapi.yaml" id="#api-header" */>}}
```

## Recommended page layout

API reference pages typically benefit from being full-width. Combine the
shortcode with the `api-reference` body class (set via the page front matter)
to drop the side bar and table of contents:

```yaml
---
title: "API reference"
type: "api-reference"
no_search: true
---

{{</* redocly src="/api/openapi.yaml" */>}}
```

## Notes

- The shortcode loads `https://sdk.gooddata.com/API-doc--production/redoc.standalone.js`
  at the bottom of the page. Make sure the CDN is reachable from the build
  pipeline and from your visitors.
- Only one `<redoc>` instance per page is supported; the script targets the
  element by ID (`redoc-instance`).
