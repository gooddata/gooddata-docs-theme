---
title: "Homepage blocks"
linkTitle: "blocks"
weight: 20
description: "Shortcodes used on the documentation homepage."
---

The shortcodes under `layouts/shortcodes/blocks/` build the visual sections of
the documentation homepage. They share the `.gd-docs-homepage-*` styling and
generally play well together — most pages start with a [`section`](section)
that wraps the rest of the components.

| Shortcode | Purpose |
|-----------|---------|
| [`section`](section) | Full-width row used as a building block on the homepage. |
| [`cards-container`](cards-container) | Responsive grid wrapper for `card` shortcodes. |
| [`card`](card) | Card with optional icon and either a section link or custom body. |
| [`feature`](feature) | Centered feature blurb with icon, heading, copy, and a "Learn more" link. |
| [`sections-list`](sections-list) | Auto-generated grid that lists every top-level docs section. |
| [`homepage-hosted`](homepage-hosted) | Hosted plan callout (icon, title, copy, CTA). |
| [`homepage-learn`](homepage-learn) | Learning hub callout (icon, title, copy, body, CTA). |
| [`homepage-slack`](homepage-slack) | Slack-community callout with PactSafe gating. |

## Typical homepage layout

```markdown
{{</* blocks/section type="container" color="white" */>}}
{{</* blocks/cards-container maxRow="3" */>}}
{{</* blocks/card title="Get started" sectionLink="/getting-started" icon="rocket.svg" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* blocks/card title="Connect data" sectionLink="/connect-data" icon="plug.svg" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* blocks/card title="API reference" sectionLink="/api" icon="code.svg" iconPosition="left" */>}}{{</* /blocks/card */>}}
{{</* /blocks/cards-container */>}}
{{</* /blocks/section */>}}

{{</* blocks/section color="gray" */>}}
{{</* blocks/sections-list */>}}
## Browse the docs
{{</* /blocks/sections-list */>}}
{{</* /blocks/section */>}}
```
