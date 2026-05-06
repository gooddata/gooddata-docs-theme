---
title: "swaggerui"
linkTitle: "swaggerui"
weight: 12
description: "Render an OpenAPI spec on the page using Swagger UI."
---

`swaggerui` is the Swagger UI counterpart of [`redocly`](../redocly). It mounts
a Swagger UI instance into the page and points it at the supplied specification.
Use this when your team prefers Swagger UI's request panel and "Try it out"
ergonomics.

The shortcode resolves project-relative URLs (`/api/spec.yaml`) against the
site's `baseURL`, so the same source markdown works in development and in a
deployed environment.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `src` | Yes | — | URL of the OpenAPI specification. Absolute URLs are passed through; project-relative URLs are prefixed with the site's `baseURL`. |

## Usage

### Hosted spec

```markdown
{{</* swaggerui src="https://api.example.com/openapi.yaml" */>}}
```

### Spec served from `static/`

```markdown
{{</* swaggerui src="/api/openapi.yaml" */>}}
```

## Notes

- The shortcode emits a `<div id="ohpen_swagger_ui"></div>` mount point and an
  inline script that initialises Swagger UI on `window.onload`. Submit methods
  are disabled (`supportedSubmitMethods: []`) so that visitors cannot
  accidentally fire requests against production APIs from the docs site.
- Page-specific styling lives in `assets/scss/swagger.scss` so that the embed
  inherits the GoodData typography.
- The Swagger UI bundle (`SwaggerUIBundle`, `SwaggerUIStandalonePreset`) must
  be available on the page. The bundled `head.html` partial loads it
  automatically when this shortcode is used.
