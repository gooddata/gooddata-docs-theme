---
title: "expand-content"
linkTitle: "expand-content"
weight: 2
description: "Hide long content behind a click-to-expand toggle."
---

`expand-content` collapses a block of markdown behind a single
**Click here to expand** link. The label is sourced from
`data/<lang>.yaml > expandContent.other`, so it is automatically translated
in localised sites.

The shortcode does not take any parameters. Wrap the content you want to hide
inside the opening and closing tags.

## Parameters

This shortcode has no parameters. The toggle text comes from the site's
language data file.

## Usage

```markdown
{{</* expand-content */>}}
### Optional details

This whole block is hidden by default. Visitors will only see it after they
click the toggle. You can use any markdown here:

- bullet lists,
- inline `code`,
- and even [links](https://www.gooddata.com).
{{</* /expand-content */>}}
```

## Live preview

{{< expand-content >}}
### Optional details

This whole block is hidden by default. Visitors will only see it after they
click the toggle. You can use any markdown here:

- bullet lists,
- inline `code`,
- and even [links](https://www.gooddata.com).
{{< /expand-content >}}

## Customising the toggle text

Edit `data/en.yaml` (and any localised counterparts) to change the call to
action:

```yaml
expandContent:
  other: Show advanced options
```
