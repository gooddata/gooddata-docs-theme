---
title: "latest-doc-dirpath"
linkTitle: "latest-doc-dirpath"
weight: 14
description: "Output the URL prefix of the most recent documentation version."
---

`latest-doc-dirpath` returns the directory path of the latest version listed in
`params.versions`. It is meant for building cross-version links from
unversioned pages (for example, the homepage) to the most recent docs.

When `params.versions` is not defined, the shortcode falls back to the literal
string `docs`.

The shortcode emits a plain string, so it composes well with other markdown
constructs.

## Parameters

This shortcode has no parameters.

## Usage

### Building a link to the latest docs

```markdown
Read the [getting-started guide](/{{</* latest-doc-dirpath */>}}/getting-started/).
```

With this `config.toml`:

```toml
[params]
[[params.versions]]
url = "/cloud-native/3.0/"
dirpath = "cloud-native/3.0"
latestTag = "v3.0.4"

[[params.versions]]
url = "/cloud-native/2.x/"
dirpath = "cloud-native/2.x"
latestTag = "v2.7.10"
```

…the shortcode renders `cloud-native/3.0`, so the example above becomes:

> Read the [getting-started guide](/cloud-native/3.0/getting-started/).

### Inside front matter alternatives

The output is just text, so you can also use it inside structured strings:

```markdown
{{</* embedded-image src="/{{</* latest-doc-dirpath */>}}/img/screenshot.png" alt="Screenshot" */>}}
```

## Notes

- Only the **first** entry in `params.versions` is read. Order the list with
  the latest version on top.
- Use `latest-doc-dirpath` with `latesttag` whenever you want to display both
  the URL prefix and the release tag of the same version.
