---
title: "product"
linkTitle: "product"
weight: 15
description: "Output the product name configured for the current version."
---

`product` outputs the product name that matches the current page's section.
The shortcode walks `params.versions` and looks for the entry whose `dirpath`
matches the current page's section name; if it finds a match with a
`productName`, it outputs it. Otherwise it falls back to `GoodData.CN`.

The shortcode emits a plain string, so it can be used inline anywhere.

## Parameters

This shortcode has no parameters.

## Usage

### Inline text

```markdown
Welcome to {{</* product */>}}!
```

### Inside headings

```markdown
## Configuring {{</* product */>}}

Follow these steps to wire up your environment.
```

## Configuration

```toml
[params]
[[params.versions]]
dirpath = "cloud-native"
url = "/cloud-native/3.0/"
productName = "GoodData.CN"
latestTag = "v3.0.4"

[[params.versions]]
dirpath = "panther"
url = "/panther/1.0/"
productName = "GoodData Panther"
latestTag = "v1.0.0"
```

When the rendered page sits under `/cloud-native/...`, the shortcode outputs
`GoodData.CN`. When it sits under `/panther/...`, it outputs `GoodData Panther`.

## Notes

- The lookup is by **section** (`.Page.Section`), which corresponds to the
  top-level folder of the page inside `content/` or `docs/`.
- The default value is `GoodData.CN`, so unconfigured sites still render
  meaningful copy.
