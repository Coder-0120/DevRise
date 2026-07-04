# MERIDIAN — Watches Landing Page

A responsive, animated landing page for a fictional luxury watch e-commerce
brand, **MERIDIAN**. Built with plain HTML5, CSS3, and vanilla JavaScript —
no frameworks, no build step.

Built for **DevRise Internship Program — Batch 1 (2026) — Task 1: Responsive
Landing Page**.

## Live Preview

Open `index.html` directly in any modern browser, or serve the folder with
any static server (see **Setup** below). To publish a live demo URL, drag
the folder into Netlify, or push it to a repo and enable GitHub Pages /
deploy on Vercel.

## Project Overview

The page sells a single idea: precision. The signature visual in the hero
is a **live analog watch face built in SVG** — its hands are driven by JS
and rotate to the visitor's real system time, updating every second. This
ties the "time" theme directly into the page rather than using a generic
banner image.

### Sections

| Section | Purpose |
|---|---|
| Sticky header + nav | Logo, section links, "Shop Now" CTA, animated hamburger menu on mobile |
| Hero | Live ticking watch face, headline, CTA buttons, key brand stats |
| Craftsmanship | Four feature cards (movement, crystal, water resistance, warranty) |
| Collection | Three product cards with hover animation and an "Add to Cart" micro-interaction |
| Reviews | Auto-playing testimonial slider with dot navigation, arrows, and swipe support |
| Contact | Floating-label form with client-side validation and a simulated submit state |
| Footer | Site map, socials, copyright |

## Technical Highlights (mapped to task requirements)

- **Fully responsive layout** using CSS Grid and Flexbox, with breakpoints
  at `980px`, `720px`, and `480px`. The mobile nav becomes a slide-in panel
  triggered by a hamburger button.
- **Semantic HTML5**: `header`, `nav`, `main` sections expressed via
  `<section>`, `<article>`, `<figure>`, `<footer>`, `<form>` with proper
  `label`/`input` pairing.
- **CSS custom properties** for the entire color/spacing/motion system
  (see `:root` in `styles.css`), so the theme can be re-skinned by editing
  a handful of variables.
- **Vanilla JavaScript** powers: the live clock hands, mobile menu toggle,
  scroll-reveal animations (`IntersectionObserver`), the testimonial
  carousel (autoplay, dots, arrows, touch swipe), "Add to Cart" button
  state, and contact form validation/submission feedback.
- **Accessibility**: visible focus states, `aria-label`/`aria-expanded` on
  interactive controls, `aria-live` region for form feedback, and a
  `prefers-reduced-motion` fallback that disables animation for users who
  request it.
- **Performance**: no external JS libraries or frameworks; only two Google
  Fonts are loaded; all icons/illustrations are inline SVG (no image
  requests).

## Project Structure

```
meridian-watches/
├── index.html      # Markup and content
├── styles.css      # Design tokens, layout, responsive rules, animation
├── script.js       # All interactivity (no dependencies)
└── README.md       # This file
```

## Notes

The contact form is front-end only (no backend) — it validates input and
shows a simulated "sent" state, ready to be wired to a real endpoint
(e.g. Formspree, EmailJS, or a custom API) later.