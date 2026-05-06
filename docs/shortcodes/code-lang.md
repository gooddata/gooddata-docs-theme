---
title: "code-lang"
linkTitle: "code-lang"
weight: 9
description: "Define a single language tab inside a `code-select`."
---

`code-lang` represents one language (or platform) panel inside a
[`code-select`](../code-select). Outside of `code-select` it simply renders
its body as a plain code block.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `lang` | Yes | — | Tab label. Used as the visible tab text and as a CSS-friendly anchor (`anchorize`). |
| `userAgent` | No | value of `lang` | Substring matched against the visitor's user agent when the parent has `enableOSDetection="true"`. |

## Usage

### Inside a `code-select`

The shortcode is meant to be nested inside `code-select`. Each `code-lang`
renders a tab and a panel for one fenced code block.

```markdown
{{</* code-select */>}}
{{</* code-lang lang="cURL" */>}}
```bash
curl https://example.com
```
{{</* /code-lang */>}}

{{</* code-lang lang="Python" */>}}
```python
import requests
requests.get("https://example.com")
```
{{</* /code-lang */>}}
{{</* /code-select */>}}
```

### With OS detection

When the parent `code-select` enables OS detection, `code-lang` accepts a
`userAgent` attribute. The front-end runtime selects the tab whose
`userAgent` is found inside `navigator.userAgent`.

```markdown
{{</* code-select enableOSDetection="true" */>}}
{{</* code-lang lang="macOS" userAgent="Mac" */>}}
```bash
brew install gooddata-cli
```
{{</* /code-lang */>}}

{{</* code-lang lang="Windows" userAgent="Win" */>}}
```powershell
choco install gooddata-cli
```
{{</* /code-lang */>}}
{{</* /code-select */>}}
```

## Notes

- `code-lang` reads the parent's scratch storage, so always use it as a direct
  child of `code-select`. Wrapping it in another shortcode breaks the tab
  registration.
- The body of `code-lang` is rendered as-is. To use markdown syntax inside it
  (lists, headings), use [`content-block`](../content-block) instead.

## See also

- [`code-select`](../code-select) — the parent shortcode.
