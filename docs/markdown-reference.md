---
title: "Markdown Formatting Reference"
linkTitle: "Markdown Reference"
weight: 20
type: docs
description: "A complete reference of Markdown formatting options supported by Hugo (Goldmark renderer) with live rendered output."
---

This page is a living reference for all Markdown formatting you can use in documentation pages. Every section shows the raw Markdown source alongside the rendered result so you can quickly copy-paste what you need.

Hugo uses the [Goldmark](https://github.com/yuin/goldmark) Markdown renderer, which is fully [CommonMark](https://commonmark.org/) compliant with a number of useful extensions enabled.

---

## Headings

Use `#` characters at the start of a line. The number of `#` signs maps to the HTML heading level. An automatic anchor is generated for every heading.

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

> **Tip:** Use only one H1 per page — Hugo generates it from the `title` front matter key.

---

## Paragraphs and line breaks

Separate paragraphs with a blank line. A single newline inside a paragraph does **not** produce a `<br>`.

```markdown
This is the first paragraph. It continues on the next
line without a break.

This is the second paragraph, separated by a blank line.

For a hard line break, end a line with two or more spaces  
and then start the next line.
```

This is the first paragraph. It continues on the next
line without a break.

This is the second paragraph, separated by a blank line.

For a hard line break, end a line with two or more spaces  
and then start the next line.

---

## Emphasis

```markdown
**Bold** — double asterisks or double underscores: **bold** or __bold__
*Italic* — single asterisks or underscores: *italic* or _italic_
***Bold and italic*** — triple asterisks: ***bold italic***
~~Strikethrough~~ — double tildes (Goldmark extension)
`Inline code` — backticks
```

**Bold** — double asterisks or double underscores: **bold** or __bold__

*Italic* — single asterisks or underscores: *italic* or _italic_

***Bold and italic*** — triple asterisks: ***bold italic***

~~Strikethrough~~ — double tildes (Goldmark extension)

`Inline code` — backticks

---

## Blockquotes

Prefix lines with `>`. Blockquotes can be nested and can contain other Markdown elements.

```markdown
> This is a simple blockquote.

> **Nested and formatted.**
> Use a `>` on blank lines to keep the blockquote open.
>
> Second paragraph inside the same blockquote.
>
> > This is a nested blockquote.
```

> This is a simple blockquote.

> **Nested and formatted.**
> Use a `>` on blank lines to keep the blockquote open.
>
> Second paragraph inside the same blockquote.
>
> > This is a nested blockquote.

---

## Lists

### Unordered lists

Use `-`, `*`, or `+` as list markers (mixing is allowed but not recommended).

```markdown
- Alpha
- Beta
  - Beta 1
  - Beta 2
    - Beta 2a
- Gamma
```

- Alpha
- Beta
  - Beta 1
  - Beta 2
    - Beta 2a
- Gamma

### Ordered lists

```markdown
1. First item
2. Second item
   1. Sub-item A
   2. Sub-item B
3. Third item
```

1. First item
2. Second item
   1. Sub-item A
   2. Sub-item B
3. Third item

The actual numbers don't matter — Goldmark always increments correctly:

```markdown
1. Item one
1. Item two
1. Item three
```

1. Item one
1. Item two
1. Item three

---

## Code

### Inline code

Wrap text in backticks for inline monospace formatting.

```markdown
Run `hugo server --disableFastRender` to start a local preview.
```

Run `hugo server --disableFastRender` to start a local preview.

### Fenced code blocks

Use triple backticks (` ``` `) or triple tildes (`~~~`). Add a language identifier immediately after the opening fence to enable syntax highlighting (powered by [Prism.js](https://prismjs.com/)).

````markdown
```bash
hugo mod get -u github.com/gooddata/gooddata-docs-theme
```
````

```bash
hugo mod get -u github.com/gooddata/gooddata-docs-theme
```

````markdown
```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("GoodData"))
```
````

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("GoodData"))
```

````markdown
```json
{
  "name": "gooddata-docs-theme",
  "version": "1.0.0",
  "description": "GoodData Hugo documentation theme"
}
```
````

```json
{
  "name": "gooddata-docs-theme",
  "version": "1.0.0",
  "description": "GoodData Hugo documentation theme"
}
```

````markdown
```sql
SELECT
    workspace_id,
    COUNT(*) AS metric_count
FROM metrics
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY workspace_id
ORDER BY metric_count DESC;
```
````

```sql
SELECT
    workspace_id,
    COUNT(*) AS metric_count
FROM metrics
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY workspace_id
ORDER BY metric_count DESC;
```

### Indented code block

Four-space (or one-tab) indentation also creates a code block, but without language highlighting:

```markdown
    $ hugo version
    hugo v0.128.0+extended
```

    $ hugo version
    hugo v0.128.0+extended

---

## Tables

Tables use `|` as column separators. Alignment is controlled by the position of `:` in the separator row.

```markdown
| Name        | Type    | Required | Default | Description                  |
|-------------|---------|:--------:|---------|------------------------------|
| `color`     | string  | No       | `info`  | Alert variant color.         |
| `title`     | string  | No       | —       | Optional heading text.       |
| `buttonUrl` | string  | Yes      | —       | Destination URL for the CTA. |
```

| Name        | Type    | Required | Default | Description                  |
|-------------|---------|:--------:|---------|------------------------------|
| `color`     | string  | No       | `info`  | Alert variant color.         |
| `title`     | string  | No       | —       | Optional heading text.       |
| `buttonUrl` | string  | Yes      | —       | Destination URL for the CTA. |

Alignment:

```markdown
| Left-aligned | Centered | Right-aligned |
|:-------------|:--------:|--------------:|
| cell         | cell     | cell          |
| longer cell  | center   | 1,234.56      |
```

| Left-aligned | Centered | Right-aligned |
|:-------------|:--------:|--------------:|
| cell         | cell     | cell          |
| longer cell  | center   | 1,234.56      |

---

## Links

### Inline links

```markdown
[GoodData website](https://www.gooddata.com)
[Relative page link](../shortcodes/alert)
```

[GoodData website](https://www.gooddata.com)

[Relative page link](../shortcodes/alert)

### Reference links

Useful when the same URL is referenced multiple times — keeps prose readable.

```markdown
The [GoodData API][api] and [GoodData Cloud][cloud] are both documented online.

[api]: https://www.gooddata.com/developers/cloud-native/doc/cloud/api-and-sdk/
[cloud]: https://www.gooddata.com/cloud/
```

The [GoodData API][api] and [GoodData Cloud][cloud] are both documented online.

[api]: https://www.gooddata.com/developers/cloud-native/doc/cloud/api-and-sdk/
[cloud]: https://www.gooddata.com/cloud/

### Autolinks

Bare URLs enclosed in angle brackets are turned into clickable links:

```markdown
<https://www.gooddata.com>
<support@gooddata.com>
```

<https://www.gooddata.com>

<support@gooddata.com>

---

## Images

The syntax is identical to links but prefixed with `!`. The alt text is mandatory for accessibility.

```markdown
![GoodData logo](/img/GoodDataLearn.svg)
```

### Linked image

Wrap an image in a link by nesting the image syntax inside link syntax:

```markdown
[![GoodData logo](/img/GoodDataLearn.svg)](https://www.gooddata.com)
```

### With width / height (HTML attribute passthrough)

Hugo's Goldmark renderer supports attribute blocks `{ }` after certain elements:

```markdown
![GoodData logo](/img/GoodDataLearn.svg){ width=200 }
```

---

## Horizontal rules

Three or more `-`, `*`, or `_` on their own line produce a `<hr>`. A blank line before the rule is required to avoid ambiguity with the alternate heading syntax.

```markdown
---

***

___
```

---

***

---

## HTML

Inline HTML is passed through by the renderer. Use sparingly — Markdown should cover most formatting needs.

```markdown
<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

Text with a <mark>highlighted</mark> word.

Superscript: E = mc<sup>2</sup>

Subscript: H<sub>2</sub>O
```

<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

Text with a <mark>highlighted</mark> word.

Superscript: E = mc<sup>2</sup>

Subscript: H<sub>2</sub>O

---

## Escaping special characters

Prefix any Markdown punctuation character with a backslash to render it literally.

```markdown
\*Not italic\*
\# Not a heading
\[Not a link\](http://example.com)
\`Not code\`
```

\*Not italic\*

\# Not a heading

\[Not a link\](http://example.com)

\`Not code\`

The full set of escapable characters: `\ ` ` * _ { } [ ] ( ) # + - . !`

---

## Definition lists

Goldmark supports definition lists through an extension:

```markdown
API key
: A secret token used to authenticate requests to the GoodData REST API.

Workspace
: An isolated analytics environment containing data sources, metrics, and dashboards.

LDM
: Logical Data Model — the semantic layer that maps raw database tables to business concepts.
```

API key
: A secret token used to authenticate requests to the GoodData REST API.

Workspace
: An isolated analytics environment containing data sources, metrics, and dashboards.

LDM
: Logical Data Model — the semantic layer that maps raw database tables to business concepts.

---

## Footnotes

Goldmark supports Pandoc-style footnotes:

```markdown
GoodData supports multi-tenancy[^1] and row-level security[^2] out of the box.

[^1]: Each customer workspace is fully isolated from others.
[^2]: Access to individual data rows can be restricted per user or user group.
```

GoodData supports multi-tenancy[^1] and row-level security[^2] out of the box.

[^1]: Each customer workspace is fully isolated from others.
[^2]: Access to individual data rows can be restricted per user or user group.

---

## Emojis

Hugo supports GitHub-style emoji shortcodes when `enableEmoji: true` is set in the site config:

```markdown
:rocket: Deployed!  :white_check_mark: Tests passing  :warning: Check logs
```

:rocket: Deployed! &nbsp; :white_check_mark: Tests passing &nbsp; :warning: Check logs

---

## See also

- [Shortcodes reference](shortcodes) — GoodData-specific components that extend Markdown.
- [Alert shortcode](shortcodes/alert) — styled callout boxes for tips and warnings.
- [Code-select shortcode](shortcodes/code-select) — tabbed code blocks with OS detection.
- [CommonMark spec](https://commonmark.org/help/) — the underlying standard.
- [Goldmark extensions](https://github.com/yuin/goldmark#extensions) — full list of enabled Goldmark extensions.
