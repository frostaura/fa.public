# UI and UX

## Source baseline

The imported `docs/references/FrostAura_Public_Landing_Page.html` file remains the
content and storytelling baseline, but the shipped public experience is a
navigation-led React application rather than a long-scrolling page.

## Experience goals

- Premium FrostAura presentation with colder, darker gradients and stronger visual hierarchy.
- Fewer dense text blocks; more guided visuals, reveal states, and progressive disclosure.
- Distinct primary views for home, architecture, projects, careers, and investors so mobile users do not need to traverse one very long page.
- Clear, high-signal entry points into careers and investor submission flows.

## Navigation model

- The primary shell presents one active view at a time inside the SPA.
- Switching views uses animated transitions instead of scroll-jumping between stacked sections.
- `careers.*` and `investors.*` hostnames still bias the initial landing view toward the matching funnel.
- Mobile navigation must remain single-line and usable without wrapped labels.

## Visual systems

- The architecture experience is an interactive FrostAura energy map / company constellation with compact nodes by default and reveal-on-select detail.
- Projects use a stable spotlight carousel with one active slide, explicit controls, and auto-advance that never exposes empty states.
- Careers and investors use guided highlight rails above their forms instead of dense sidebars.
- Current focus roles are featured within the careers spotlight rather than isolated in a detached card.

## Responsive rules

- Mobile layouts prioritize wider side padding, simplified surfaces, and fewer stacked cards.
- Dense bordered card treatments may collapse into flatter content blocks on smaller screens.
- Motion respects reduced-motion preferences while preserving the default premium animated feel.
- The HTML shell locks viewport zoom per product direction for a tightly controlled mobile presentation.

## Branding

- Use the FrostAura complex logo on light surfaces.
- Use the white logo on darker surfaces.
- Accent treatments should favor icy blue, steel, and deep-night tones over the earlier purple-led gradients.

## Forms

- Both public submission flows remain three-step experiences.
- Step progression, status messaging, and payload drafts are Redux-managed.
- Error states stay visible within the active public view rather than redirecting away from the experience.
