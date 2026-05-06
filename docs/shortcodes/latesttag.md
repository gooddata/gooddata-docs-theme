---
title: "latesttag"
linkTitle: "latesttag"
weight: 13
description: "Output the latest release tag for the current documentation version."
---

`latesttag` resolves the latest release tag for the current page. When the
site declares multiple versions in `params.versions`, the shortcode walks
that list, finds the entry whose `url` is a prefix of the current page's
permalink, and outputs that entry's `latestTag`.

When the site uses the simpler single-version configuration, the shortcode
falls back to `params.version`.

The shortcode emits a plain string (no markup), so you can drop it inside
fenced code blocks, HTML attributes, or alongside text.

## Parameters

This shortcode has no parameters.

## Usage

### Inline text

```markdown
The latest release of GoodData.CN is **{{</* latesttag */>}}**.
```

### Inside code blocks

```markdown
Pull the latest image:

```bash
docker pull gooddata/gooddata-cn:{{</* latesttag */>}}
```
```

### Inside HTML attributes

```markdown
Download from
<a href="https://github.com/gooddata/gooddata-cn/releases/tag/{{</* latesttag */>}}">GitHub</a>.
```

## Configuration

### Multi-version site (`config.toml`)

```toml
[params]
[[params.versions]]
url = "/cloud-native/3.0/"
dirpath = "cloud-native"
latestTag = "v3.0.4"

[[params.versions]]
url = "/cloud-native/2.x/"
dirpath = "cloud-native-2"
latestTag = "v2.7.10"
```

### Single-version site (`config.toml`)

```toml
[params]
version = "v1.5.2"
```
