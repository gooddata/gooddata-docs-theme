---
title: "blocks/homepage-slack"
linkTitle: "homepage-slack"
weight: 8
description: "Slack-community callout with PactSafe gating."
---

`blocks/homepage-slack` is a homepage banner that invites visitors to join the
GoodData Slack community. It includes a PactSafe (`#pactsafe-container`) mount
point so that the customer must agree to the terms before the **Join us on
Slack** button activates.

## Parameters

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `icon` | No | — | Icon-font class for the glyph next to the title. |
| `title` | Yes | — | Banner heading. |
| `buttonText` | Yes | — | Visible label of the CTA button. |

The shortcode body is rendered as the descriptive copy under the title. Note
that **`buttonLink` is not a parameter** — the button's behaviour is wired up
by JavaScript that listens to PactSafe approval events.

## Usage

```markdown
{{</* blocks/section color="white" */>}}
{{</* blocks/homepage-slack
    icon="fab fa-slack"
    title="Join the GoodData Community"
    buttonText="Join us on Slack" */>}}
Trade tips, get feedback on workspaces, and chat with the GoodData team. The
community is open to everyone — sign in with your Slack account once you have
agreed to the community guidelines.
{{</* /blocks/homepage-slack */>}}
{{</* /blocks/section */>}}
```

## Notes

- The CTA button has the id `cta-tiger-join-us-on-slack-bumper` and a
  Bootstrap tooltip. The site-wide JavaScript wires its click handler to the
  PactSafe SDK; until the visitor agrees to the terms, the tooltip explains
  why the button is inactive.
- The shortcode also emits an `<input hidden value="anonymous" id="fake-uid">`
  used by the PactSafe integration to anonymously associate the click with a
  session.
- Style overrides for the panel live in `assets/scss/homepage/slack.scss`.
