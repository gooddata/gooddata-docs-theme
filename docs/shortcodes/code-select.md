---
title: "code-select"
linkTitle: "code-select"
weight: 8
description: "Group code samples for multiple languages or platforms into one tabbed widget."
---

`code-select` is the code-focused counterpart of
[`content-select`](../content-select). Wrap one or more
[`code-lang`](../code-lang) shortcodes inside it; each child becomes a tab on
top of the shared dark code surface.

It also supports optional OS detection — when enabled, the front-end script
shows the tab that matches the visitor's user agent (for example: macOS,
Windows, Linux).

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `enableOSDetection` | No | `false` | Enable OS-based default tab selection. Each `code-lang` then needs a `userAgent` attribute. |

## Usage

### Per-language samples

```markdown
{{</* code-select */>}}
{{</* code-lang lang="cURL" */>}}
```bash
curl -X POST "https://example.com/api/datasources" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"mongo","type":"MONGODB"}'
```
{{</* /code-lang */>}}

{{</* code-lang lang="Python" */>}}
```python
client.datasources.create(
    name="mongo",
    type="MONGODB",
)
```
{{</* /code-lang */>}}

{{</* code-lang lang="JavaScript" */>}}
```javascript
await client.datasources.create({
  name: "mongo",
  type: "MONGODB",
});
```
{{</* /code-lang */>}}
{{</* /code-select */>}}
```

### OS-detected samples

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

{{</* code-lang lang="Linux" userAgent="Linux" */>}}
```bash
curl -L https://example.com/install.sh | sh
```
{{</* /code-lang */>}}
{{</* /code-select */>}}
```

## Notes

- The first `code-lang` is rendered as the active tab. With OS detection
  enabled, the tab matching the visitor's user agent overrides this default.
- The wrapping container shares the same dark surface as standalone code
  blocks, so the children can use any Hugo-supported fenced syntax.

## See also

- [`code-lang`](../code-lang) — the child shortcode.
- [`accordion-options`](../accordion-options) — change collapsing behaviour for
  long code blocks.
