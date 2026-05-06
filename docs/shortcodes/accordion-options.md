---
title: "accordion-options"
linkTitle: "accordion-options"
weight: 10
description: "Override the default collapsing behaviour of long code blocks."
---

Long code blocks are collapsed by default to keep documentation pages
scannable. `accordion-options` lets you override that behaviour for a single
block, either by changing the pixel threshold at which collapsing kicks in or
by disabling collapsing altogether.

The shortcode accepts markdown in its body, so you can wrap a single fenced
code block (or a `code-select`) and tweak its behaviour without affecting the
rest of the page.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `collapsible` | No | `true` | Set to `false` to disable collapsing entirely; the block is rendered at its full height. |
| `threshold` | No | — | Pixel height at which collapsing kicks in. Only applied when `collapsible` is left at the default. |

`threshold` is ignored when `collapsible="false"`.

## Usage

### Disable collapsing

```markdown
{{</* accordion-options collapsible="false" */>}}
```yaml
# This long YAML configuration will always render in full.
service:
  name: gooddata
  ports:
    - 80
    - 443
  environment:
    - NAME=production
    - REGION=us-east-1
```
{{</* /accordion-options */>}}
```

### Custom threshold

```markdown
{{</* accordion-options threshold="600" */>}}
```bash
# Block stays expanded up to 600px before collapsing.
curl -X POST https://example.com/api/long-payload \
  -H 'Content-Type: application/json' \
  -d @payload.json
```
{{</* /accordion-options */>}}
```

## Notes

- The shortcode emits a wrapper `<div class="accordion-options">` (with the
  `--not-collapsible` modifier when `collapsible="false"`). Style overrides
  belong in `assets/scss/code-select.scss`.
- Markdown inside the body is rendered with `markdownify`, so fenced code,
  lists, and other inline shortcodes work as expected.
