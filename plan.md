# MASTER PROMPT — Vela Marine (WordPress / UiChemy edition)

## ▶ HOW TO USE THIS PROMPT

This is the **WordPress build** of Vela Marine, live at
`https://demo.uichemy.com/vela-marine-hyperyacht-v09/` (page id **370**, one Composer widget
**`rfzdiyr`** labelled "Vela Marine", published).

It is the companion to `~/Downloads/VELA-MARINE-MASTER-PROMPT.md`, which stays the authority for
the **standalone three-file page** (`index.html` + `css/style.css` + `js/main.js`). This document
carries every WordPress-specific block verbatim and the seven rules the port actually broke on.

**INSTRUCTION TO CLAUDE:** build through the `uichemy-demo-wordpress-uichemy-mcp` server and put
each block in the location its heading names — **not** all into the section. The section's `js`
field stays EMPTY on purpose; read RULE 1 before doubting that.

---

## OVERVIEW

- **Stack:** vanilla HTML + CSS + JS. No framework, no bundler, no dependencies.
- **Engine:** one `main.js` — a virtual-scroll driver that transforms the page wrapper, a loading
  "sounding" curtain, per-glyph hero masks, a horizontal projects rail, a hover-colourising
  gallery, a quotes spine and a WebGL-free CTA video plate. It is loaded site-wide and returns
  immediately on pages that do not contain `.uichemy-vela-1`.
- **Fonts:** Inter Tight (400/500) from Google Fonts, in **site-wide head code**.
- **Media:** 15 images + 1 mp4, all in the WordPress media library.
- **Root font-size is viewport-tracking** (`vw`-based, set per breakpoint on `html`), so every
  `rem` in the stylesheet scales with the display. That single fact is behind two of the design
  fixes at the end of this document.

## ASSET MANIFEST (WordPress media library)

| Asset | URL |
|---|---|
| `hero.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/hero.webp` |
| `hero-sp.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/hero-sp.webp` |
| `proj-01.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/proj-01.webp` |
| `proj-02.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/proj-02.webp` |
| `proj-03.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/proj-03.webp` |
| `proj-04.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/proj-04.webp` |
| `g1.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g1.webp` |
| `g2.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g2.webp` |
| `g3.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g3.webp` |
| `g4.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g4.webp` |
| `g5.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g5.webp` |
| `g6.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g6.webp` |
| `g7.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g7.webp` |
| `g8.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g8.webp` |
| `g9.webp` | `https://demo.uichemy.com/wp-content/uploads/2026/09/g9.webp` |
| `cta.mp4` | `https://demo.uichemy.com/wp-content/uploads/2026/09/cta.mp4` |

All sixteen were sideloaded from their `landing-assets` originals by the page writer
(`upload_images: true`). B4 and B5 below already carry the media-library URLs, and so do the four
hero URLs inside B3 — those are in **JavaScript**, which `upload_images` does not touch (RULE 7).

## ⚠ RULE 1 — the UiChemy editor is lossy, so the engine lives outside the section

Saving the page from the UiChemy/Elementor editor re-serialises the section and **silently
deletes** what it does not model: `<script>`, `<canvas>`, `<svg>`, and `<link>` in page head code.

| Piece | Lives in | Survives an editor save |
|---|---|---|
| All nine sections of markup + the whole stylesheet | the Composer section (`html` + `css`) | ✅ |
| The whole engine (`main.js`) | code file `vela-app.js`, loaded from **site-wide** body code | ✅ |
| The `js` class + the 8s loader failsafe | inline `<script>` in **site-wide** head code | ✅ |
| Fonts and the `html` / `body` / `:root` document rules | **site-wide** head code | ✅ |
| Anything you put in **page** head/footer code | page custom code | ❌ — wiped repeatedly |

## ⚠ RULE 2 — UiChemy HOISTS every `@media` block to the end AND DOUBLES the prefix

Two separate transformations, and together they resurrect the dead.

1. Every rule is prefixed with `.elementor-element-<id> `.
2. Inside a media query the prefix is written **twice** (`.el.el .x`), which raises specificity.
3. All `@media` blocks are moved **to the end** of the widget stylesheet.

A declaration that the source overrode later in the file — harmlessly dead there — is now both
later in the file *and* more specific, so it wins. Here a stale
`@media (max-width: 767px) { .p-quotes__lead { font-size: 16px } }` came back from the dead and
rendered mobile testimonials 13px short of the source.

**How to find them:** after the prefixing/hoisting emulation, scan for declarations whose
effective cascade position changed, not for "rules that look wrong". Exactly one dead declaration
existed in this stylesheet; it was removed from B5.

## ⚠ RULE 3 — the formatter mangles the FIRST rule of every `@media` block

If the first rule inside a media block has a pseudo-class in its selector, the formatter inserts a
space after the colon — `.c-frame:hover` comes back as `.c-frame: hover`, which is invalid, and
the rule is dropped. On this page it killed the gallery's hover colourisation: images stayed grey
on hover at every width below the largest breakpoint.

**Fix, applied to all 36 media blocks in B5:** open each one with a harmless no-op rule so the
mangling has nothing to damage.

```css
@media (…) {
  .uichemy-vela-1 { --uv-guard: 0; }   /* absorbs the first-rule mangle */
  …the real rules…
}
```

Verify by *rendering*, not by diffing your input: this damage happens inside the plugin. It was
proven on a throwaway probe page before the fix landed.

## ⚠ RULE 4 — `:root` and the `html` / `body` rules cannot live in the section

Prefixing turns `:root` into `.elementor-element-x :root`, which matches nothing — every token
dies. The split used here:

- **Tokens + inherited body type/colour** → a wrapper rule `.uichemy-vela-1 { … }` in the section.
- **Media-query `:root` overrides** → re-hosted on the wrapper inside the same media blocks.
- **True document-level rules** (the viewport-tracking root font-size, page background, scroll
  lock, `overflow-x`) → **site-wide** CSS, gated so they only apply on this page:

```css
html:has(.uichemy-vela-1), html.vela-page { … }
```

`:has()` applies before first paint on a modern browser; the `html.vela-page` twin is the fallback
the script sets, and keeps the rules working in the editor.

## ⚠ RULE 5 — the universal reset must be doubled on the wrapper, not descended

The source's `*, *::before, *::after { box-sizing: border-box }` has to become a wrapper-scoped
rule. Writing `.uichemy-vela-1 .uichemy-vela-1 *` (a *descendant* of a descendant) matches nothing
and the whole page loses `border-box`. The correct form repeats the class on the same element:

```css
.uichemy-vela-1.uichemy-vela-1 *, … { box-sizing: border-box; }
```

Same trick for any rule that must outrank the theme without a media query to double it for you.

## ⚠ RULE 6 — strip comments that sit INSIDE a declaration block

A comment between rules survives. A comment **inside** a rule comes back with its opening `/*`
stripped, leaving prose among the declarations and discarding the rules around it. 18 of them were
removed from this stylesheet; the fully commented version stays in the standalone prompt.

## ⚠ RULE 7 — Cloudflare caches the code files for 30 days, and JS URLs are never rewritten

`/wp-content/uichemy-composer/*.js` is served with `cache-control: max-age=2592000`, so every
change to `vela-app.js` needs the `<script src>` version bumped (`?v=1` → `?v=2`) — and if that
file ever `import()`s another, the import URL must be versioned too.

Separately, `upload_images` rewrites `src` / `srcset` / `poster` / `url()` but **not** `data-*`
attributes and **not** URLs inside JavaScript. The four hero image URLs in B3 were repointed to
the media library by hand.

---

## ⚠ RULE 8 — responsive here means HEIGHT, not width

Width was never the problem on this build: measured at 320 / 375 / 390 / 768 / 820 / 1024 /
1280 / 1440 / 1920 / 2560, horizontal overflow is **0 at every one**, because the root
font-size tracks the viewport and `body` carries `overflow-x: clip`.

What broke was **short viewports** — a landscape phone (~390px tall) and a 600px laptop.
The gallery section asks for a stage `min-height: 460px` plus `72px` of padding, so the
section measured **604px in a 390px window**: taller than the screen it was supposed to fill,
with the two display words landing on the ring.

The fix is one height-and-orientation block, which drops the stage floor to `0` (the ring's
own JS then fits it: `byHeight = (stage.clientHeight - cardH) / (radiusY * 2)`), shrinks the
card to 150px, brings the display words down to 64px, and tightens the hero, statement, CTA
and loader for the same space.

| Viewport | Gallery section before | after |
|---|---|---|
| 844x390 landscape | 604px (taller than the screen) | **390px** |
| 740x360 landscape | 604px | **360px** |
| 1024x600 | 604px | **600px** |
| 390x844 portrait | 844px | 844px (untouched) |
| 1440x900 desktop | 900px | 900px (untouched) |

**Where it lives is the point.** RULE 1 says page head/footer code gets wiped on this build,
and there was no safe append anchor at the tail of the stored section CSS, so it went into
**site-wide head code** (B6). That puts it outside the section, which means RULE 2's doubled
prefix now works *against* you: the plugin's own media rules carry four classes, so an
override from outside needs **five** — the element id doubled AND the wrapper doubled. Four
would parse, match, and silently lose.

Two non-bugs worth recording, because both look like faults and are not:
- `.p-home-mv__background` measures wider than the viewport. That is the hero's resting
  `transform: scale(1.3)`, which settles to 1 after the curtain; its parent clips it.
- `.p-cta__title span` measures up to 995px on a phone. That is the CTA heading at its
  resting `scale(2)`, which the scroll handler settles to 1; `.p-cta` clips it. The scale is
  written inline by JS every frame, so CSS cannot override it — only the code file can.

## WHAT DIFFERS FROM THE STANDALONE SOURCE

Verified live against the source at **2560 / 1920 / 1440 / 1280 / 1024 / 768 / 390**: section
order and heights, the loading sounding, hero glyph masks, projects rail travel, gallery hover
colourisation, quotes spine, FAQ and CTA plate all match, at several absolute scroll positions.

1. **One wrapper**: `<div class="uichemy-vela-1">` replaces the source `<body>`.
2. **`:root` → the wrapper**, document rules → site-wide (RULE 4).
3. **Media-query `:root` overrides re-hosted** on the wrapper inside the same media blocks.
4. **36 media blocks guarded** with `--uv-guard` (RULE 3).
5. **One dead declaration removed** (RULE 2).
6. **18 in-block comments removed** (RULE 6).
7. **`main.js` → `vela-app.js`**: byte-identical apart from the `.uichemy-vela-1` guard + IIFE
   wrapper at the top (so a site-wide classic script cannot collide on `root` / `ease`) and the
   four hero image URLs.
8. **Section `js` empty** (RULE 1).
9. **Three requested design changes** on top of the source — next section.

## REQUESTED DESIGN CHANGES (on top of the source)

These are deliberate departures from the standalone page, all in B5, all desktop-only.

**a) The projects count badge is gone.** `<p class="p-projects__count">4</p>` is removed from the
markup (it was a teal "4" chip beside the heading).

**b) The hero headline may no longer be cut on large displays.** The hero grid pads to the 1380px
content box while the headline is sized in `rem` off a viewport-tracking root, so past ~1440px the
type outgrew its box — and because each glyph is its own flex mask, the overflow was absorbed by
*squeezing* the letters rather than wrapping them. Above 1440px the hero grid now uses the page
gutter instead of the 1380px cap, so **the box grows with the display and the font keeps growing
with it**; the ceiling is derived from the width actually available, so the letters can never be
squeezed again:

```css
@media (min-width: 1441px) {
  .uichemy-vela-1 { --uv-guard: 0; }
  .uichemy-vela-1 .p-home-mv__grid { padding-inline: var(--box-pad); }
  .uichemy-vela-1 .p-home-mv__scroll { left: var(--box-pad); }
  .uichemy-vela-1 .p-home-mv__title {
    font-size: min(12.7rem, calc((100vw - 2 * var(--box-pad)) / 9.9));
  }
}
```

**c) The projects heading uses the full width, centred.** With the badge gone the heading sat
against the right edge of a `space-between` row. It now stacks the PROJECTS pill above and gives
the title the whole head width as **one line**, sized so the text spans the box edge to edge:

```css
@media (min-width: 1101px) {
  .uichemy-vela-1 { --uv-guard: 0; }
  .uichemy-vela-1 .p-projects__head {
    display: flex; flex-direction: column;
    align-items: flex-start; justify-content: flex-start; gap: 20px;
  }
  .uichemy-vela-1 .p-projects__title {
    width: 100%; max-width: none; text-align: center;
    white-space: nowrap; line-height: 1.02;
    font-size: calc(min(var(--box-max), 100vw - 2 * var(--box-pad)) / 11);
  }
  .uichemy-vela-1 .p-projects__title br { display: none; }
  .uichemy-vela-1 .p-projects__title span::before { content: "\00a0"; }
}
```

The divisor 11 comes from measurement: the string renders 10.862em wide at this face and
letter-spacing, so `width / 11` fills 98.7% of the box at every width and can never overflow.
Measured live: 1280 → 105px font / 98.7% fill, 1440 → 119px, 1920 and 2560 → 125px, horizontal
overflow 0 everywhere. Below 1101px the source layout is untouched.

---

# APPENDIX B · THE WORDPRESS BUILD

## Build steps (uichemy-demo-wordpress-uichemy-mcp)

1. `uichemy-composer/read-skill` `{ "name": "code-to-wordpress" }`, then
   `uichemy-composer/describe-site` — `platform.checks.elementor_active` must be true.
2. **B3 → a code file.** `code-file` `request-upload`, then PUT the file from disk with curl.
   Never read it through the conversation.
3. **B1 + B2 + B6 → site-wide code.** `platform` `update-site-code` (append, deduped).
   Note `update-site-code` can only APPEND; changing an existing tag needs `set-site-code`
   with the whole merged scope.
4. **B4 + B5 → the page.** `page` `create` with `title: "Vela Marine — Hyperyacht V09"`,
   `status: "draft"`, `label: "Vela Marine"`, `upload_images: true`, `html` = B4, `css` = B5,
   `js` = `""`.
5. **Read back and verify**: `page` `get-section-code`, diff the *rendered* widget CSS for RULE 3
   damage, then load the page and check the loader clears, the hero glyphs are unsquashed at
   2560, the gallery colourises on hover, and the mobile testimonial lead is at its source size.

The html+css payload is ≈82KB, so send it through the JSON-RPC endpoint from a script with basic
auth: the bytes travel disk → server without passing through the conversation.

## B1 · site-wide `site_before_head`

```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap" rel="stylesheet" />
<script>
/* VELA MARINE: the source's head script, verbatim. The `js` class gates the
loading curtain and every reveal fallback, so it must be set before first
paint — which a footer-loaded script cannot do. Harmless on other pages. */
document.documentElement.classList.add('js');
setTimeout(function () {
var l = document.getElementById('loading');
if (l) l.classList.add('is-done');
}, 8000);
</script>
<style>
/* VELA MARINE — the document-level half of the source's html/body rules.
A Composer section cannot style <html> or <body>, and this stylesheet must
apply BEFORE first paint (the whole page is sized in rem against the root
font-size below), so it is matched with :has() rather than a JS-added class.
The .vela-page class is a fallback for browsers without :has(). */
html:has(.uichemy-vela-1), html.vela-page {
--system-color: #222222;
--system-white: #eeeeee;
--system-background-color: #dddddd;
/* sampled from the dominant hue of the reef water; 4.99:1 against white */
--accent: #0e7a90;
--ink: #0b141a;
--app-grid-col-gap: 10px;
--app-grid-padding: 40px;
/* shared content box — projects, testimonials and FAQ align to this */
--box-max: 1380px;
--box-pad: 64px;
/* the dark ground the CTA, FAQ and testimonials share */
--cta-ground: #070d12;
/* one small-caps treatment: every eyebrow, badge and legal line uses it */
--eyebrow-size: 15px;   /* the pills: section eyebrows and the count badge */
--caps-size: 12px;      /* the quiet caps: row numbers, attributions, legal */
--track-caps: 0.1em;
--font-book: "Inter Tight", "PP Neue Montreal Book", "Helvetica Neue", Helvetica, Arial, sans-serif;
--font-medium: "Inter Tight", "PP Neue Montreal Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
--ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
}
html:has(.uichemy-vela-1), html.vela-page {
/* 1rem tracks the viewport, capped so ultrawide screens stay sane */
font-size: min(0.7320644217vw, 19.77px);
line-height: 1.15;
-webkit-text-size-adjust: 100%;
-webkit-tap-highlight-color: transparent;
scrollbar-width: none;
-ms-overflow-style: none;
}
html:has(.uichemy-vela-1)::-webkit-scrollbar, html.vela-page::-webkit-scrollbar { display: none; }
body:has(.uichemy-vela-1), body.vela-page {
margin: 0;
width: 100%;
background: var(--system-background-color);
color: var(--system-color);
font-family: var(--font-book);
font-size: 13px;
font-feature-settings: "palt";
overscroll-behavior: none;
overflow-x: clip;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
html:has(.uichemy-vela-1):not(.js) .c-loading, html.vela-page:not(.js) .c-loading { display: none; }
html:has(.uichemy-vela-1).is-native-scroll .l-scroll, html.vela-page.is-native-scroll .l-scroll { position: relative; will-change: auto; }
html:has(.uichemy-vela-1).is-native-scroll .l-scroll__spacer, html.vela-page.is-native-scroll .l-scroll__spacer { display: none; }
html:has(.uichemy-vela-1):not(.js) .p-statement__lead .w, html.vela-page:not(.js) .p-statement__lead .w { color: #111; }
html:has(.uichemy-vela-1):not(.js) [data-reveal], html.vela-page:not(.js) [data-reveal] {
opacity: 1;
transform: none;
}
html:has(.uichemy-vela-1):not(.js) .p-quotes__spine-line, html.vela-page:not(.js) .p-quotes__spine-line,
html:has(.uichemy-vela-1):not(.js) .p-quotes__spine-star, html.vela-page:not(.js) .p-quotes__spine-star { transform: none; }
html:has(.uichemy-vela-1):not(.js) .c-quote [data-print] span, html.vela-page:not(.js) .c-quote [data-print] span,
html:has(.uichemy-vela-1):not(.js) .c-quote__star, html.vela-page:not(.js) .c-quote__star { color: #fff; }
html:has(.uichemy-vela-1):not(.js) .c-quote__who span, html.vela-page:not(.js) .c-quote__who span { color: rgba(255, 255, 255, 0.55); }
html:has(.uichemy-vela-1):not(.js) .c-faq__panel, html.vela-page:not(.js) .c-faq__panel { grid-template-rows: 1fr; }
html:has(.uichemy-vela-1):not(.js) .p-cta__title span, html.vela-page:not(.js) .p-cta__title span { transform: none; }
@media (max-width: 1100px) {
html:has(.uichemy-vela-1), html.vela-page { --box-pad: 44px; }
}
@media (max-width: 767px) {
html:has(.uichemy-vela-1), html.vela-page {
--app-grid-col-gap: 10px;
--app-grid-padding: 20px;
--box-pad: 20px;
--eyebrow-size: 13px;
--caps-size: 11px;
}
html:has(.uichemy-vela-1), html.vela-page { font-size: 2.6666666667vw; }
}
</style>
```

## B2 · site-wide `site_before_body`

```html
<script src="/wp-content/uichemy-composer/vela-app.js?v=1"></script>
```

Bump `?v=` on every change to the code file (RULE 7).

## B6 · site-wide `site_before_head` — the short-viewport block (RULE 8)

Appended to site-wide head code, not the section: page code is wiped on this build (RULE 1),
and the stored section CSS had no safe append anchor at its tail. Five classes so it outranks
the plugin's own double-prefixed media rules (RULE 2).

```html
<style>
/* VELA MARINE responsive: short viewports. A landscape phone is ~390px tall and
a 600px laptop is not much better, but the gallery section asks for
stage min-height 460px plus 72px of padding = 604px, so it grew past the
screen and its display words landed on the ring. Five classes because the
plugin double-prefixes its own media rules (4) and this has to outrank them
from outside the section. */
@media (max-height: 620px) and (orientation: landscape) {
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-gallery{--ring-card:150px;padding:36px 44px}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-gallery__stage{min-height:0}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-gallery__word{font-size:64px}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-gallery__word--a{top:24px;left:24px}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-gallery__word--b{bottom:24px;right:24px}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-home-mv__grid{padding-top:92px}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-statement{padding-top:96px;padding-bottom:64px}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-cta{min-height:440px}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .p-cta__title{font-size:72px}
.elementor-element-rfzdiyr.elementor-element-rfzdiyr .uichemy-vela-1.uichemy-vela-1 .c-loading__mark{font-size:5rem}
}
</style>
```

## B3 · code file `vela-app.js` → `/wp-content/uichemy-composer/vela-app.js`

```js
/* VELA MARINE — the page script, verbatim from the single-file source except for
   the wrapper below and the four hero image URLs, which now point at the
   WordPress media library.

   The wrapper does two things the original did not need:
     1. it guards on .uichemy-vela-1, because this file is loaded site-wide and
        must do nothing on every other page of the site;
     2. it closes over the file's top-level const/function declarations, which
        as a classic script would otherwise share global script scope with every
        other script on the page (a second `root` or `ease` would throw).
   Nothing else is touched: no DOM query, no scroll maths, no shader. */
(function () {
  if (!document.querySelector('.uichemy-vela-1')) return;

/* ═══════════════════════════════════════════════════════════════════
   main.js — the whole site in one file.

   Loaded as a CLASSIC script, not an ES module: modules are fetched under
   CORS rules, which file:// cannot satisfy, so a module build cannot be
   opened by double-clicking index.html. Keep the plain <script defer> tag.

   Part 1  fluid hero — GPU fluid simulation + image composite (raw WebGL2)
   Part 2  page       — loader curtain, headline reveal, smooth scroll, parallax

   No build step. No animation library.
   ═══════════════════════════════════════════════════════════════════ */

"use strict";


/* ███████████████████████████████████████████████████████████████████
   PART 1 — FLUID HERO

   Two textures are cross-faded by the fluid's ink density:
     · ink is fresh  -> the full-colour image
     · ink has faded -> the monochrome image with a chromatic shift
   The fluid is stirred by six orbiting emitters and by the pointer.
   ███████████████████████████████████████████████████████████████████ */

const SIM_SIZE = 512;
const PRESSURE_ITERATIONS = 10;
const DT = 10.0;
const VISCOSITY = 0.02;

const DISTORTION_AMOUNT = 0.01;
const RGB_SHIFT_AMOUNT = 0.002;
const FLUID_THRESHOLD = 0.02;

/* ─────────────────────────── shaders ─────────────────────────── */

const VERT = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG_ADVECT_VELOCITY = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2  uTexSize;
uniform float uDt;
uniform float uViscosity;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 velocity = texture(uVelocity, vUv).xy;
  vec2 coord = clamp(vUv - velocity * uDt / uTexSize, 0.0, 1.0);
  vec2 newVel = texture(uSource, coord).xy * (1.0 - uViscosity);
  fragColor = vec4(newVel, 0.0, 1.0);
}`;

const FRAG_DIVERGENCE = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform vec2 uTexSize;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  float left   = texture(uVelocity, vUv + vec2(-1.0 / uTexSize.x, 0.0)).x;
  float right  = texture(uVelocity, vUv + vec2( 1.0 / uTexSize.x, 0.0)).x;
  float bottom = texture(uVelocity, vUv + vec2(0.0, -1.0 / uTexSize.y)).y;
  float top    = texture(uVelocity, vUv + vec2(0.0,  1.0 / uTexSize.y)).y;
  fragColor = vec4((right - left + top - bottom) * 0.5, 0.0, 0.0, 1.0);
}`;

const FRAG_PRESSURE = `#version 300 es
precision highp float;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexSize;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 texel = 1.0 / uTexSize;
  float left   = texture(uPressure, vUv - vec2(texel.x, 0.0)).r;
  float right  = texture(uPressure, vUv + vec2(texel.x, 0.0)).r;
  float bottom = texture(uPressure, vUv - vec2(0.0, texel.y)).r;
  float top    = texture(uPressure, vUv + vec2(0.0, texel.y)).r;
  float div    = texture(uDivergence, vUv).r;
  fragColor = vec4((left + right + bottom + top - div) * 0.25, 0.0, 0.0, 1.0);
}`;

const FRAG_GRADIENT = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uPressure;
uniform vec2 uTexSize;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  float left   = texture(uPressure, vUv - vec2(1.0 / uTexSize.x, 0.0)).r;
  float right  = texture(uPressure, vUv + vec2(1.0 / uTexSize.x, 0.0)).r;
  float bottom = texture(uPressure, vUv - vec2(0.0, 1.0 / uTexSize.y)).r;
  float top    = texture(uPressure, vUv + vec2(0.0, 1.0 / uTexSize.y)).r;
  vec2  vel    = texture(uVelocity, vUv).xy;
  vel -= vec2((right - left) * 0.5, (top - bottom) * 0.5);
  fragColor = vec4(vel, 0.0, 1.0);
}`;

const FRAG_ADVECT_INK = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uInk;
uniform vec2  uTexSize;
uniform float uDt;
uniform float uColorFade;
uniform float uAlphaFade;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 vel   = texture(uVelocity, vUv).xy;
  vec2 coord = clamp(vUv - vel * uDt / uTexSize, 0.0, 1.0);
  vec4 col   = texture(uInk, coord);
  col.rgb *= uColorFade;
  col.a   *= uAlphaFade;
  fragColor = col;
}`;

const FRAG_SPLAT_VELOCITY = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform vec2  uPoint;
uniform vec2  uAdd;
uniform float uRadius;
uniform float uAspect;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 vel = texture(uVelocity, vUv).xy;
  vec2 d = vUv - uPoint;
  d.x *= uAspect;
  float dist = length(d);
  if (dist < uRadius) {
    vel += uAdd * (1.0 - dist / uRadius);
  }
  fragColor = vec4(vel, 0.0, 1.0);
}`;

const FRAG_SPLAT_INK = `#version 300 es
precision highp float;
uniform sampler2D uInk;
uniform vec2  uPoint;
uniform vec3  uColor;
uniform float uRadius;
uniform float uAspect;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec4 oldColor = texture(uInk, vUv);
  vec2 d = vUv - uPoint;
  d.x *= uAspect;
  float dist = length(d);
  if (dist < uRadius) {
    oldColor = mix(oldColor, vec4(uColor, 1.0), 1.0 - dist / uRadius);
  }
  fragColor = oldColor;
}`;

const FRAG_COMPOSITE = `#version 300 es
precision highp float;
uniform sampler2D u_bgTexture;
uniform sampler2D u_bgTexture02;
uniform sampler2D u_fluidTexture;
uniform vec2  u_resolution;
uniform vec2  u_imageResolution;
uniform float u_distortionAmount;
uniform float u_zoom;
uniform float u_rgbShiftAmount;
uniform float u_fluidThreshold;
in  vec2 vUv;
out vec4 fragColor;

void main() {
  /* object-fit: cover, done in UV space — read a sub-rectangle of the plate
     and centre it.  The scale must stay <= 1 on both axes: any UV outside
     [0,1] is CLAMP_TO_EDGE'd, which smears the edge pixels into bands. */
  float screenAspect = u_resolution.x / u_resolution.y;
  float imageAspect  = u_imageResolution.x / u_imageResolution.y;
  vec2 scale = vec2(
    min(screenAspect / imageAspect, 1.0),
    min(imageAspect / screenAspect, 1.0)
  ) / max(u_zoom, 1.0);          /* zoom past the plate's vignetted edges */
  vec2 coverUV = (vUv - 0.5) * scale + 0.5;

  vec4 fluid       = texture(u_fluidTexture, vUv);
  vec2 fluidOffset = (fluid.rg - 0.5) * u_distortionAmount;
  vec2 uv = clamp(coverUV + fluidOffset, 0.0, 1.0);

  vec4 colorNoShift = texture(u_bgTexture, uv);

  /* resting layer: the monochrome plate, nudged by the shift amount */
  vec2 uvShift = clamp(uv + u_rgbShiftAmount, 0.0, 1.0);
  vec4 colorShifted = vec4(texture(u_bgTexture02, uvShift).rgb, 1.0);

  float mask = clamp(fluid.a - u_fluidThreshold, 0.0, 1.0);
  fragColor = mix(colorShifted, colorNoShift, mask);
}`;

/* ─────────────────────────── gl helpers ─────────────────────────── */

function compile(gl, type, source) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(sh) || "shader compile failed");
  }
  return sh;
}

function createProgram(gl, fragSource) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragSource));
  gl.bindAttribLocation(program, 0, "position");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "program link failed");
  }
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(program, i).name;
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return { program, uniforms };
}

function createFBO(gl, w, h, internalFormat, format, type) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  const complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  if (!complete) throw new Error("framebuffer incomplete");

  return { texture, fbo, width: w, height: h };
}

function createDoubleFBO(gl, w, h, internalFormat, format, type) {
  return {
    read: createFBO(gl, w, h, internalFormat, format, type),
    write: createFBO(gl, w, h, internalFormat, format, type),
    swap() { const t = this.read; this.read = this.write; this.write = t; },
  };
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  /* 1px placeholder so the first frames are valid */
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([10, 20, 28, 255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const image = new Image();
  image.decoding = "async";
  /* A CDN-hosted plate must be requested with CORS or the upload below taints
     the canvas and texImage2D throws. A same-origin plate needs no such request,
     and on file:// a CORS request is refused outright — which would leave the
     hero blank whenever the page is opened by double-click. So ask only when
     the plate genuinely is cross-origin. */
  let sameOrigin = true;
  try { sameOrigin = new URL(url, location.href).origin === location.origin; }
  catch (e) { sameOrigin = true; }
  if (!sameOrigin) image.crossOrigin = "anonymous";
  const ready = new Promise((resolve) => {
    image.onload = () => {
      try {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      } catch (err) {
        /* on file:// the image counts as cross-origin, so the upload taints the
           canvas and throws; report failure and let the caller show the still */
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        resolve(null);
        return;
      }
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => resolve(null);
  });
  image.src = url;
  return { texture, ready };
}

/* ─────────────────────────── the hero ─────────────────────────── */

function createFluidHero(container, options = {}) {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: "high-performance",
  });
  if (!gl) return null;
  if (!gl.getExtension("EXT_color_buffer_float")) return null;
  gl.getExtension("OES_texture_float_linear");

  container.appendChild(canvas);

  /* ── programs ── */
  let programs;
  try {
    programs = {
      advectVelocity: createProgram(gl, FRAG_ADVECT_VELOCITY),
      divergence:     createProgram(gl, FRAG_DIVERGENCE),
      pressure:       createProgram(gl, FRAG_PRESSURE),
      gradient:       createProgram(gl, FRAG_GRADIENT),
      advectInk:      createProgram(gl, FRAG_ADVECT_INK),
      splatVelocity:  createProgram(gl, FRAG_SPLAT_VELOCITY),
      splatInk:       createProgram(gl, FRAG_SPLAT_INK),
      composite:      createProgram(gl, FRAG_COMPOSITE),
    };
  } catch (err) {
    canvas.remove();
    return null;
  }

  /* ── fullscreen quad ── */
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  /* ── simulation targets ── */
  const N = SIM_SIZE;
  let velocity, pressure, divergence, ink;
  try {
    velocity   = createDoubleFBO(gl, N, N, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
    pressure   = createDoubleFBO(gl, N, N, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
    ink        = createDoubleFBO(gl, N, N, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
    divergence = createFBO(gl, N, N, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
  } catch (err) {
    canvas.remove();
    return null;
  }

  /* the ink layer starts opaque: the scene opens fully in colour and
     decays toward the monochrome resting state */
  for (const target of [velocity.read, velocity.write, pressure.read, pressure.write, divergence]) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  for (const target of [ink.read, ink.write]) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  /* ── textures ── */
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  /* the desktop plate is a circular fisheye on black, so the fit has to crop
     well inside it or the corners land on screen; the portrait plate is
     already framed edge to edge and needs almost none */
  const zoom = mobile
    ? (options.zoomMobile || 1.06)
    : (options.zoom || 1.5);
  const colorSrc = mobile ? options.colorSrcMobile : options.colorSrc;
  const monoSrc  = mobile ? options.monoSrcMobile  : options.monoSrc;
  const bg   = loadTexture(gl, colorSrc);
  const bg02 = loadTexture(gl, monoSrc);
  const imageResolution = mobile ? [1356, 2048] : [2048, 1365];
  const ready = Promise.all([bg.ready, bg02.ready]).then((plates) => {
    const got = plates.find((r) => r && r.width && r.height);
    if (got) { imageResolution[0] = got.width; imageResolution[1] = got.height; }
    return plates;
  });

  /* ── emitters ── */
  const emitters = [];
  for (let i = 0; i < 6; i++) {
    emitters.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 0.6,
      speed: Math.random() * 0.45 + 0.05,
      size: 0.6,
      prevX: 0,
      prevY: 0,
      seeded: false,
    });
  }

  /* ── drawing ── */
  let simAspect = 1; /* the sim grid is square, so splats stay round */

  function blit(target) {
    if (target) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, target.width, target.height);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function bind(tex, unit) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    return unit;
  }

  function addVelocity(x, y, dx, dy, radius = 0.03) {
    const { program, uniforms } = programs.splatVelocity;
    gl.useProgram(program);
    gl.uniform1i(uniforms.uVelocity, bind(velocity.read.texture, 0));
    gl.uniform2f(uniforms.uPoint, x, y);
    gl.uniform2f(uniforms.uAdd, dx, dy);
    gl.uniform1f(uniforms.uRadius, radius);
    gl.uniform1f(uniforms.uAspect, simAspect);
    blit(velocity.write);
    velocity.swap();
  }

  function addInk(x, y, r, g, b, radius = 0.04) {
    const { program, uniforms } = programs.splatInk;
    gl.useProgram(program);
    gl.uniform1i(uniforms.uInk, bind(ink.read.texture, 0));
    gl.uniform2f(uniforms.uPoint, x, y);
    gl.uniform3f(uniforms.uColor, r, g, b);
    gl.uniform1f(uniforms.uRadius, radius);
    gl.uniform1f(uniforms.uAspect, simAspect);
    blit(ink.write);
    ink.swap();
  }

  function step() {
    /* advect velocity */
    {
      const { program, uniforms } = programs.advectVelocity;
      gl.useProgram(program);
      gl.uniform1i(uniforms.uVelocity, bind(velocity.read.texture, 0));
      gl.uniform1i(uniforms.uSource, bind(velocity.read.texture, 0));
      gl.uniform2f(uniforms.uTexSize, N, N);
      gl.uniform1f(uniforms.uDt, DT);
      gl.uniform1f(uniforms.uViscosity, VISCOSITY);
      blit(velocity.write);
      velocity.swap();
    }
    /* divergence */
    {
      const { program, uniforms } = programs.divergence;
      gl.useProgram(program);
      gl.uniform1i(uniforms.uVelocity, bind(velocity.read.texture, 0));
      gl.uniform2f(uniforms.uTexSize, N, N);
      blit(divergence);
    }
    /* pressure (Jacobi) */
    {
      const { program, uniforms } = programs.pressure;
      gl.useProgram(program);
      gl.uniform2f(uniforms.uTexSize, N, N);
      gl.uniform1i(uniforms.uDivergence, bind(divergence.texture, 1));
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(uniforms.uPressure, bind(pressure.read.texture, 0));
        blit(pressure.write);
        pressure.swap();
      }
    }
    /* subtract gradient */
    {
      const { program, uniforms } = programs.gradient;
      gl.useProgram(program);
      gl.uniform1i(uniforms.uVelocity, bind(velocity.read.texture, 0));
      gl.uniform1i(uniforms.uPressure, bind(pressure.read.texture, 1));
      gl.uniform2f(uniforms.uTexSize, N, N);
      blit(velocity.write);
      velocity.swap();
    }
    /* advect ink */
    {
      const { program, uniforms } = programs.advectInk;
      gl.useProgram(program);
      gl.uniform1i(uniforms.uVelocity, bind(velocity.read.texture, 0));
      gl.uniform1i(uniforms.uInk, bind(ink.read.texture, 1));
      gl.uniform2f(uniforms.uTexSize, N, N);
      gl.uniform1f(uniforms.uDt, DT);
      gl.uniform1f(uniforms.uColorFade, 0.98);
      gl.uniform1f(uniforms.uAlphaFade, 0.99);
      blit(ink.write);
      ink.swap();
    }
  }

  function composite() {
    const { program, uniforms } = programs.composite;
    gl.useProgram(program);
    gl.uniform1i(uniforms.u_bgTexture, bind(bg.texture, 0));
    gl.uniform1i(uniforms.u_bgTexture02, bind(bg02.texture, 1));
    gl.uniform1i(uniforms.u_fluidTexture, bind(ink.read.texture, 2));
    gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.u_imageResolution, imageResolution[0], imageResolution[1]);
    gl.uniform1f(uniforms.u_distortionAmount, DISTORTION_AMOUNT);
    gl.uniform1f(uniforms.u_zoom, zoom);
    gl.uniform1f(uniforms.u_rgbShiftAmount, RGB_SHIFT_AMOUNT);
    gl.uniform1f(uniforms.u_fluidThreshold, FLUID_THRESHOLD);
    blit(null);
  }

  /* ── pointer ── */
  const pointer = { active: false, x: 0, y: 0, dx: 0, dy: 0 };
  const isTouch = window.matchMedia("(hover: none)").matches;

  function onPointerMove(event) {
    const rect = container.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientY > rect.bottom ||
        event.clientX < rect.left || event.clientX > rect.right) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    const dx = (event.movementX || 0) / rect.width * 10;
    const dy = -(event.movementY || 0) / rect.height * 10;
    pointer.active = true;
    pointer.x = x; pointer.y = y;
    pointer.dx = dx; pointer.dy = dy;
  }
  if (!isTouch) window.addEventListener("pointermove", onPointerMove, { passive: true });

  /* ── loop ── */
  let dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(container.clientWidth * dpr));
    const h = Math.max(1, Math.round(container.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }
  resize();

  let last = performance.now();
  let running = false;
  let rafId = 0;

  function frame(now) {
    rafId = requestAnimationFrame(frame);
    const delta = Math.min((now - last) / 1000, 1 / 20);
    last = now;

    /* orbiting emitters keep the fluid alive without input */
    for (const e of emitters) {
      e.angle += e.speed * delta;
      const x = 0.5 + e.radius * Math.cos(e.angle);
      const y = 0.5 + e.radius * Math.sin(e.angle);
      if (e.seeded) {
        addVelocity(x, y, (x - e.prevX) * 1, (y - e.prevY) * 120);
        addInk(x, y, e.size, 0.8, 0.8);
      }
      e.prevX = x; e.prevY = y; e.seeded = true;
    }

    if (pointer.active) {
      addVelocity(pointer.x, pointer.y, pointer.dx, pointer.dy);
      addInk(pointer.x, pointer.y, 10, 1, 1);
      pointer.active = false;
    }

    step();
    composite();
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  /* pause when off-screen or backgrounded */
  let onScreen = true;
  const sync = () => (onScreen && !document.hidden ? start() : stop());

  const io = new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    sync();
  }, { threshold: 0 });
  io.observe(container);

  document.addEventListener("visibilitychange", sync);

  window.addEventListener("resize", resize, { passive: true });

  return { canvas, resize, start, stop, ready };
}


/* ███████████████████████████████████████████████████████████████████
   PART 2 — PAGE
   ███████████████████████████████████████████████████████████████████ */

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none)").matches;

/* ───────────────────────── tiny tween engine ─────────────────────────
   Enough to express the reference's GSAP timeline: absolute start times,
   per-item stagger, power4 easings.                                     */

const ease = {
  outQuart: (t) => 1 - Math.pow(1 - t, 4),
  inOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
  inOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
};

const tweens = [];
let ticking = false;

function tick(now) {
  let alive = false;
  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i];
    const t = (now - tw.start) / tw.duration;
    if (t < 0) { alive = true; continue; }
    if (t >= 1) {
      tw.onUpdate(1);
      tweens.splice(i, 1);
      tw.onComplete && tw.onComplete();
      continue;
    }
    tw.onUpdate(tw.ease(t));
    alive = true;
  }
  ticking = alive;
  if (alive) requestAnimationFrame(tick);
}

function tween({ delay = 0, duration, ease: easing = ease.outQuart, onUpdate, onComplete }) {
  tweens.push({ start: performance.now() + delay, duration, ease: easing, onUpdate, onComplete });
  if (!ticking) { ticking = true; requestAnimationFrame(tick); }
}

/* GSAP's `from: "center"` stagger: delay grows with distance from the middle */
function centerStagger(index, total, each) {
  return Math.abs(index - (total - 1) / 2) * each;
}

/* ═══════════════════════ 1. loader — "sounding" ═══════════════════════
   The screen is the sea surface, split at a waterline.
     0     instrumentation labels settle into the four corners
     120   the waterline draws itself out from the centre
     320   VELA surfaces from under the line, glyph by glyph
     420   the gauge runs the line while the depth counts to 090 m
     2200  the wordmark sinks back under
     2700  the surface parts, bottom half first
*/

const T_META = 0;
const T_RULE = 120;
const T_MARK = 320;
const T_GAUGE = 420;
const T_SINK = 2200;
const T_META_OUT = 2250;
const T_SPLIT = 2700;
const DEPTH_TARGET = 90;

function buildLoader() {
  const loading = document.getElementById("loading");
  if (!loading) return { done: Promise.resolve(), curtainLift: 0 };

  if (reduceMotion) {
    loading.remove();
    return { done: Promise.resolve(), curtainLift: 0 };
  }

  const mark = loading.querySelector("[data-loading-mark]");
  const glyphs = [...mark.textContent.trim()].map((ch) => {
    const span = document.createElement("span");
    span.textContent = ch;
    span.style.transform = "translateY(100%)";
    return span;
  });
  mark.textContent = "";
  glyphs.forEach((g) => mark.appendChild(g));

  const rules = [...loading.querySelectorAll("[data-loading-rule]")];
  const metas = [...loading.querySelectorAll("[data-loading-meta]")];
  const gauge = loading.querySelector("[data-loading-gauge]");
  const depth = loading.querySelector("[data-loading-depth]");
  const rise = loading.querySelector("[data-loading-rise]");
  const top = loading.querySelector("[data-loading-top]");
  const bottom = loading.querySelector("[data-loading-bottom]");

  /* 1 — the corner instrumentation settles in */
  metas.forEach((el, i) => tween({
    delay: T_META + i * 60,
    duration: 700,
    ease: ease.outQuart,
    onUpdate: (p) => {
      el.style.opacity = p;
      el.style.transform = `translateY(${(8 * (1 - p)).toFixed(2)}px)`;
    },
  }));

  /* 2 — the waterline draws out from the centre in both halves */
  rules.forEach((el) => tween({
    delay: T_RULE,
    duration: 1000,
    ease: ease.inOutQuart,
    onUpdate: (p) => { el.style.transform = `scaleX(${p})`; },
  }));

  /* 3 — the wordmark surfaces, the read-out with it */
  const surfacing = [...glyphs, rise];
  surfacing.forEach((g, i) => tween({
    delay: T_MARK + i * 40,
    duration: 1300,
    ease: ease.outQuart,
    onUpdate: (p) => { g.style.transform = `translateY(${100 * (1 - p)}%)`; },
  }));

  /* 4 — the sounding: gauge and depth read-out run together */
  tween({
    delay: T_GAUGE,
    duration: 1700,
    ease: ease.inOutQuad,
    onUpdate: (p) => {
      gauge.style.transform = `scaleX(${p})`;
      depth.textContent = String(Math.round(p * DEPTH_TARGET)).padStart(3, "0");
    },
  });

  /* 5 — the wordmark goes back under, the instrumentation fades */
  surfacing.forEach((g, i) => tween({
    delay: T_SINK + i * 30,
    duration: 850,
    ease: ease.inOutQuart,
    onUpdate: (p) => { g.style.transform = `translateY(${100 * p}%)`; },
  }));
  metas.forEach((el) => tween({
    delay: T_META_OUT,
    duration: 450,
    ease: ease.inOutQuart,
    onUpdate: (p) => { el.style.opacity = 1 - p; },
  }));

  /* 6 — the surface parts; the water falls a beat before the sky lifts */
  let lastEnd = 0;
  [[bottom, 100, 0], [top, -100, 80]].forEach(([panel, to, offset]) => {
    const delay = T_SPLIT + offset;
    lastEnd = Math.max(lastEnd, delay + 1300);
    tween({
      delay,
      duration: 1300,
      ease: ease.inOutQuart,
      onUpdate: (p) => { panel.style.transform = `translate3d(0, ${(to * p).toFixed(2)}%, 0)`; },
    });
  });

  const done = new Promise((resolve) => {
    setTimeout(() => { loading.classList.add("is-done"); resolve(); }, lastEnd + 40);
  });

  return { done, curtainLift: T_SPLIT };
}

/* ═══════════════════════ 2. headline reveal ═══════════════════════
   Every glyph gets its own overflow mask; alternating glyphs enter
   from opposite directions, 20ms apart, power4.out over 1.6s.       */

function splitTitle(el) {
  const text = el.dataset.pageTitle || el.textContent;
  el.textContent = "";
  const shows = [];
  [...text].forEach((ch) => {
    const hide = document.createElement("span");
    hide.className = ch === " " ? "hide u-space" : "hide";
    const show = document.createElement("span");
    show.className = "show";
    show.textContent = ch === " " ? "" : ch;
    hide.appendChild(show);
    el.appendChild(hide);
    shows.push(show);
  });
  return shows;
}

function buildTitle() {
  const targets = [...document.querySelectorAll("[data-page-title]")];
  const groups = targets.map(splitTitle);

  /* mirror the CSS rule: every second mask enters from below */
  groups.forEach((shows) => {
    shows.forEach((show, i) => {
      show.dataset.from = (shows.length - i) % 2 === 0 ? "100" : "-100";
      show.style.transform = `translateY(${show.dataset.from}%)`;
    });
  });

  return (startDelay) => {
    if (reduceMotion) {
      groups.flat().forEach((s) => { s.style.transform = "translateY(0%)"; });
      return;
    }
    groups.forEach((shows) => {
      shows.forEach((show, i) => {
        const from = Number(show.dataset.from);
        tween({
          delay: startDelay + i * 20,
          duration: 1600,
          ease: ease.outQuart,
          onUpdate: (p) => { show.style.transform = `translateY(${from * (1 - p)}%)`; },
          onComplete: () => { show.style.willChange = "auto"; },
        });
      });
    });
  };
}

/* ═══════════════════════ 3. navbar ═══════════════════════
   The bar settles in after the curtain parts, and owns the mobile panel.   */

function buildNavbar() {
  const bar = document.querySelector("[data-nav-reveal]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  const close = document.querySelector("[data-nav-close]");

  /* — mobile panel — */
  if (toggle && panel) {
    let open = false;
    let lastFocus = null;

    /* the page scrolls through a transformed wrapper, so locking `overflow`
       would fight the virtual scroll; swallow the scroll gestures instead */
    const swallow = (event) => event.preventDefault();

    const setOpen = (next) => {
      if (next === open) return;
      open = next;
      toggle.setAttribute("aria-expanded", String(open));

      if (open) {
        lastFocus = document.activeElement;
        panel.hidden = false;
        requestAnimationFrame(() => panel.classList.add("is-open"));
        window.addEventListener("wheel", swallow, { passive: false });
        window.addEventListener("touchmove", swallow, { passive: false });
        (close || panel).focus({ preventScroll: true });
      } else {
        panel.classList.remove("is-open");
        window.removeEventListener("wheel", swallow);
        window.removeEventListener("touchmove", swallow);
        const hide = () => { panel.hidden = true; };
        panel.addEventListener("transitionend", hide, { once: true });
        setTimeout(hide, 500); /* in case the transition never fires */
        lastFocus && lastFocus.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener("click", () => setOpen(true));
    close && close.addEventListener("click", () => setOpen(false));
    panel.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
    /* the panel only exists below the breakpoint */
    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* — reveal — */
  if (!bar) return () => {};
  bar.style.opacity = "0";
  bar.style.transform = "translateY(-10px)";

  return (startDelay) => {
    if (reduceMotion) {
      bar.style.opacity = "";
      bar.style.transform = "";
      return;
    }
    tween({
      delay: startDelay,
      duration: 1100,
      ease: ease.outQuart,
      onUpdate: (p) => {
        bar.style.opacity = p;
        bar.style.transform = `translateY(${(-10 * (1 - p)).toFixed(2)}px)`;
      },
      onComplete: () => { bar.style.opacity = ""; bar.style.transform = ""; },
    });
  };
}

/* ═══════════════════════ 4. scroll reveals ═══════════════════════
   Fade up 20px as each element crosses into view, once. Siblings that come
   into view together are staggered so a row of cards reads left-to-right.  */

function initReveals() {
  const targets = [...document.querySelectorAll("[data-reveal]")];
  if (!targets.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  let batch = [];
  let flush = 0;

  const play = (el, delay) => tween({
    delay,
    duration: 900,
    ease: ease.outQuart,
    onUpdate: (p) => {
      el.style.opacity = p;
      el.style.transform = `translateY(${(20 * (1 - p)).toFixed(2)}px)`;
    },
    /* the resting CSS state for [data-reveal] is *hidden*, so hand off to a
       revealed class before clearing the inline styles */
    onComplete: () => {
      el.classList.add("is-revealed");
      el.style.opacity = "";
      el.style.transform = "";
    },
  });

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      io.unobserve(entry.target);
      batch.push(entry.target);
    }
    if (!batch.length) return;
    clearTimeout(flush);
    flush = setTimeout(() => {
      batch.forEach((el, i) => play(el, i * 110));
      batch = [];
    }, 40);
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

  targets.forEach((el) => io.observe(el));
}

/* — the statement's words are subdued until the scroll passes them, then
     turn to ink one at a time — */

function initWordHighlight() {
  const leads = [...document.querySelectorAll("[data-word-highlight]")];
  if (!leads.length) return;

  for (const lead of leads) {
    const source = lead.textContent.replace(/\s+/g, " ").trim();
    lead.textContent = "";
    const words = source.split(" ").map((word, i, arr) => {
      const w = document.createElement("span");
      w.className = "w";
      w.textContent = i < arr.length - 1 ? word + " " : word;
      lead.appendChild(w);
      return w;
    });

    if (reduceMotion) {
      words.forEach((w) => w.classList.add("is-lit"));
      continue;
    }

    let lit = -1;
    const update = () => {
      const r = lead.getBoundingClientRect();
      /* 0 while the paragraph still sits low in the viewport, 1 once it has
         risen past the upper third — so the words light as you scroll it up */
      const from = window.innerHeight * 0.85;
      const to = window.innerHeight * 0.3;
      const p = (from - r.top) / Math.max(1, from - to + r.height);
      const n = Math.round(Math.min(Math.max(p, 0), 1) * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach((w, i) => w.classList.toggle("is-lit", i < n));
    };

    let running = false;
    let rafId = 0;
    const loop = () => { rafId = requestAnimationFrame(loop); update(); };
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!running) { running = true; rafId = requestAnimationFrame(loop); }
      } else {
        running = false;
        cancelAnimationFrame(rafId);
      }
    }, { rootMargin: "20% 0px" }).observe(lead);
    update();
  }
}

/* — the CTA heading arrives oversized and settles to its real size —
     Taken from the reference, where the wrapper runs scale(2) down to 1 as
     the section comes up the screen. */

function initCtaTitle() {
  const el = document.querySelector("[data-cta-scale]");
  if (!el) return;
  const sec = el.closest(".p-cta");
  if (!sec) return;

  if (reduceMotion) { el.style.transform = "none"; return; }

  let painted = null;
  const update = () => {
    const top = sec.getBoundingClientRect().top;
    /* 0 with the section's top at the bottom of the viewport,
       1 once it has risen a fifth of a screen past the top */
    const from = window.innerHeight;
    const to = -window.innerHeight * 0.2;
    const p = Math.min(Math.max((from - top) / (from - to), 0), 1);
    const scale = 2 - p;
    if (painted !== null && Math.abs(scale - painted) < 0.002) return;
    painted = scale;
    el.style.transform = `scale(${scale.toFixed(4)})`;
  };
  update();

  let running = false, rafId = 0;
  const loop = () => { rafId = requestAnimationFrame(loop); update(); };
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (!running) { running = true; rafId = requestAnimationFrame(loop); }
    } else {
      running = false;
      cancelAnimationFrame(rafId);
    }
  }, { rootMargin: "30% 0px" }).observe(sec);
}

/* — testimonials: the heading is held at the middle of the viewport while the
     column of voices scrolls past it, each line printing in character by
     character between the moment its top crosses the centre and the moment
     its bottom does — the range the reference uses verbatim.  A hairline runs
     down the split with a star pinned to the centre. — */

function initQuotes() {
  const sec = document.querySelector("[data-quotes]");
  if (!sec) return;
  const aside = sec.querySelector("[data-quotes-aside]");
  const line = sec.querySelector("[data-spine-line]");
  const star = sec.querySelector("[data-spine-star]");
  const prints = [...sec.querySelectorAll("[data-print], [data-print-icons]")];
  if (!aside || !prints.length) return;

  /* a run is whatever prints one unit at a time: the stars of a rating, or
     one span per character of a line — the latter kept inside a per-word
     wrapper so a half-printed word never breaks across a line */
  const runs = prints.map((el) => {
    if (el.hasAttribute("data-print-icons")) {
      return { el, chars: [...el.children], lit: 0 };
    }
    const chars = [];
    const parts = el.textContent.split(/(\s+)/);
    el.textContent = "";
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(part)); continue; }
      const word = document.createElement("span");
      word.setAttribute("data-print-word", "");
      for (const ch of part) {
        const c = document.createElement("span");
        c.textContent = ch;
        word.appendChild(c);
        chars.push(c);
      }
      el.appendChild(word);
    }
    return { el, chars, lit: 0 };
  });

  if (reduceMotion) {
    for (const run of runs) {
      for (const c of run.chars) c.classList.add("is-lit");
      run.lit = run.chars.length;
    }
  }

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

  /* the heading is only held at the centre while it has a column of its own;
     stacked on one column it would ride down over the voices */
  const split = window.matchMedia("(min-width: 768px)");

  let asideTy = 0, starTy = 0, spine = -1;

  function update() {
    const r = sec.getBoundingClientRect();
    const mid = window.innerHeight / 2;

    /* the hairline and its star grow in once the section owns the centre of
       the screen and retract as it hands it back */
    const s = Math.min(
      clamp01((mid - r.top) / mid),
      clamp01((r.bottom - mid) / mid)
    );
    const eased = easeOut(s);
    if (Math.abs(eased - spine) > 0.002) {
      spine = eased;
      if (line) line.style.transform = `scaleY(${eased.toFixed(3)})`;
      if (star) {
        star.style.transform =
          `translateY(${starTy.toFixed(1)}px) scale(${eased.toFixed(3)})`;
      }
    }

    /* hold the heading — and the star — at the middle of the viewport for as
       long as the section still has room for them */
    const pin = (el, ty, height) => {
      const base = el.getBoundingClientRect().top - ty;         // untransformed
      const room = r.height - (base - r.top) - height;
      return Math.min(Math.max(mid - height / 2 - base, 0), Math.max(room, 0));
    };

    const nextAside = split.matches ? pin(aside, asideTy, aside.offsetHeight) : 0;
    if (Math.abs(nextAside - asideTy) > 0.5) {
      asideTy = nextAside;
      aside.style.transform = asideTy
        ? `translateY(${asideTy.toFixed(1)}px)`
        : "";
    }
    if (star) {
      const sh = star.offsetHeight;
      const nextStar = pin(star, starTy, sh);
      if (Math.abs(nextStar - starTy) > 0.5) {
        starTy = nextStar;
        star.style.transform =
          `translateY(${starTy.toFixed(1)}px) scale(${spine.toFixed(3)})`;
      }
    }

    /* the print head: a line is dim above the centre, lit below it */
    for (const run of runs) {
      const b = run.el.getBoundingClientRect();
      if (b.height === 0) continue;
      /* a one-line row is too short to print over its own height alone —
         a floor keeps the star rating and the attribution legible */
      const p = clamp01((mid - b.top) / Math.max(b.height, 44));
      const want = Math.round(p * run.chars.length);
      if (want === run.lit) continue;
      if (want > run.lit) {
        for (let i = run.lit; i < want; i++) run.chars[i].classList.add("is-lit");
      } else {
        for (let i = run.lit - 1; i >= want; i--) run.chars[i].classList.remove("is-lit");
      }
      run.lit = want;
    }
  }

  update();
  if (reduceMotion) return;

  let running = false, rafId = 0;
  const loop = () => { rafId = requestAnimationFrame(loop); update(); };
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (!running) { running = true; rafId = requestAnimationFrame(loop); }
    } else {
      running = false;
      cancelAnimationFrame(rafId);
    }
  }, { rootMargin: "20% 0px" }).observe(sec);

  window.addEventListener("resize", update, { passive: true });
  split.addEventListener("change", update);
}

/* — FAQ accordion: one open at a time, height animated by the panel's own
     content rather than a hard-coded max-height — */

function initFaq() {
  const items = [...document.querySelectorAll(".c-faq__item")];
  if (!items.length) return;

  const rows = items.map((item) => ({
    trigger: item.querySelector(".c-faq__trigger"),
    panel: item.querySelector(".c-faq__panel"),
  })).filter((r) => r.trigger && r.panel);

  const setOpen = (row, open) => {
    row.trigger.setAttribute("aria-expanded", String(open));
    row.panel.classList.toggle("is-open", open);
  };

  rows.forEach((row) => {
    setOpen(row, false);
    row.trigger.addEventListener("click", () => {
      const willOpen = row.trigger.getAttribute("aria-expanded") !== "true";
      rows.forEach((other) => setOpen(other, other === row && willOpen));
    });
  });
}

/* — the CTA's background loop: never plays for reduced motion, and only
     while it is actually on screen — */

function initCtaVideo() {
  const video = document.querySelector("[data-cta-video]");
  if (!video) return;

  if (reduceMotion) {
    video.removeAttribute("autoplay");
    video.pause();
    return;   /* the poster frame stands in */
  }

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      /* a rejected play() is not an error worth surfacing — some browsers
         refuse until the page has been interacted with */
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      video.pause();
    }
  }, { rootMargin: "200px 0px" });
  io.observe(video);
}

/* — the metric staircase collapses as the row scrolls past —

   Each pair starts lifted to its rung and falls until it is caught on a line
   across the middle of the viewport, so they land on a shared baseline one at
   a time, tallest first. Fitted from the reference:

     offset_i = min(70 + i·151.25,  rowBottom − viewportMiddle)   floored at 60

   which reproduces every frame sampled off it.                              */

const METRIC = { floor: 60, start: 70, step: 151.25, catch: 0.5 };

function initMetrics() {
  const row = document.querySelector("[data-metrics]");
  if (!row) return;
  const pairs = [...row.querySelectorAll("[data-metric]")];
  if (!pairs.length) return;

  const starts = pairs.map((_, i) => METRIC.start + i * METRIC.step);
  const topRung = starts[starts.length - 1];
  const stacked = () => window.matchMedia("(max-width: 767px)").matches;
  let painted = null;

  function update() {
    if (reduceMotion || stacked()) {
      if (painted !== "flat") {
        pairs.forEach((el) => { el.style.transform = ""; });
        painted = "flat";
      }
      return;
    }
    const r = row.getBoundingClientRect();
    const line = window.innerHeight * METRIC.catch;
    const ceiling = Math.min(Math.max(r.bottom - line, METRIC.floor), topRung);
    if (painted !== null && painted !== "flat" && Math.abs(ceiling - painted) < 0.5) return;
    painted = ceiling;

    for (let i = 0; i < pairs.length; i++) {
      const lift = Math.min(starts[i], ceiling) - METRIC.floor;
      pairs[i].style.transform = `translate3d(0, ${-lift.toFixed(1)}px, 0)`;
    }
  }

  update();
  if (reduceMotion) return;

  let running = false;
  let rafId = 0;
  const loop = () => { rafId = requestAnimationFrame(loop); update(); };
  const start = () => { if (!running) { running = true; rafId = requestAnimationFrame(loop); } };
  const stop = () => { running = false; cancelAnimationFrame(rafId); };

  let onScreen = false;
  const sync = () => (onScreen && !document.hidden ? start() : stop());
  new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    sync();
  }, { rootMargin: "100px 0px" }).observe(row);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("resize", () => { painted = null; update(); }, { passive: true });
}

/* ═══════════════════════ 5. gallery ring ═══════════════════════
   Nine frames on a tilted ellipse, turned by the scroll position: the ring
   makes one full revolution over the section's travel through the viewport,
   so every frame comes to the front exactly once on the way past.

   Geometry is the reference's, recovered by fitting its live transforms:
     x = Rx·sinθ,  y = Ry·cosθ,  d = (cosθ+1)/2
     scale = 0.8 + 0.2·d,  z-index = round(100·d)
*/

const RING = {
  radiusX: 508,
  radiusY: 237,
  scaleMin: 0.8,
  scaleRange: 0.2,
  turns: 1,          /* revolutions across the section's full travel */
  dragPerPx: 0.0032, /* radians of ring per pixel dragged */
  friction: 0.94,    /* inertia decay, per 60fps frame */
};

function initGallery() {
  const stage = document.querySelector("[data-gallery]");
  const ring = document.querySelector("[data-gallery-ring]");
  if (!stage || !ring) return;

  const frames = [...ring.querySelectorAll("[data-frame]")];
  if (!frames.length) return;

  const step = (Math.PI * 2) / frames.length;
  let scrollAngle = 0;
  let dragAngle = 0;
  let velocity = 0;
  let dragging = false;
  let pointerId = null;
  let lastX = 0;
  let painted = null;

  /* the ring is laid out in px, so shrink it to fit the stage — by width, and
     now also by height, since the section is a viewport tall and the space
     left over after the padding varies with the screen */
  let scaleFactor = 1;
  const measure = () => {
    const byWidth = stage.clientWidth / 1320;
    /* offsetHeight, not the rect: the frames carry a scale transform */
    const cardH = frames[0].offsetHeight || 312;
    const byHeight = (stage.clientHeight - cardH) / (RING.radiusY * 2);
    scaleFactor = Math.max(0.25, Math.min(1, byWidth, byHeight));
  };
  measure();

  /* The ring turns across the section's whole journey through the viewport:
     0 as its top edge reaches the bottom of the screen, 1 once its bottom edge
     has cleared the top. It therefore keeps moving the entire time the gallery
     is visible, rather than finishing while it is still on screen. */
  function readScroll() {
    const r = stage.getBoundingClientRect();
    const travel = window.innerHeight + r.height;
    const p = travel > 0 ? (window.innerHeight - r.top) / travel : 0;
    scrollAngle = -Math.min(Math.max(p, 0), 1) * Math.PI * 2 * RING.turns;
  }

  function render() {
    const angle = scrollAngle + dragAngle;
    if (painted !== null && Math.abs(angle - painted) < 0.0004) return;
    painted = angle;

    for (let i = 0; i < frames.length; i++) {
      const theta = angle + i * step;
      const cos = Math.cos(theta);
      const depth = (cos + 1) / 2;
      const x = RING.radiusX * scaleFactor * Math.sin(theta);
      const y = RING.radiusY * scaleFactor * cos;
      const scale = RING.scaleMin + RING.scaleRange * depth;
      const el = frames[i];
      el.style.transform =
        `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      el.style.zIndex = String(Math.round(100 * depth));
    }
  }

  /* — drag adds an offset on top of the scroll position — */
  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    pointerId = event.pointerId;
    lastX = event.clientX;
    velocity = 0;
    stage.classList.add("is-dragging");
    stage.setPointerCapture(pointerId);
  });

  stage.addEventListener("pointermove", (event) => {
    if (!dragging || event.pointerId !== pointerId) return;
    const delta = (event.clientX - lastX) * RING.dragPerPx;
    lastX = event.clientX;
    dragAngle += delta;
    velocity = delta;
    render();
  });

  const endDrag = (event) => {
    if (!dragging || (event && event.pointerId !== pointerId)) return;
    dragging = false;
    stage.classList.remove("is-dragging");
    if (pointerId !== null && stage.hasPointerCapture(pointerId)) {
      stage.releasePointerCapture(pointerId);
    }
    pointerId = null;
  };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  /* — loop — */
  let running = false;
  let rafId = 0;
  let last = performance.now();

  function frame(now) {
    rafId = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;

    readScroll();
    if (!dragging && velocity !== 0) {
      if (Math.abs(velocity) > 0.00002) {
        dragAngle += velocity;
        velocity *= Math.pow(RING.friction, dt * 60);
      } else {
        velocity = 0;
      }
    }
    render();
  }

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    rafId = requestAnimationFrame(frame);
  };
  const stop = () => { running = false; cancelAnimationFrame(rafId); };

  readScroll();
  render();

  if (reduceMotion) return;   /* laid out, but never turns on its own */

  let onScreen = false;
  const sync = () => (onScreen && !document.hidden ? start() : stop());
  const io = new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    sync();
  }, { threshold: 0 });
  io.observe(stage);
  document.addEventListener("visibilitychange", sync);

  const remeasure = () => { measure(); readScroll(); painted = null; render(); };
  window.addEventListener("resize", remeasure, { passive: true });
  /* the stage is a flex child of a viewport-tall section, so its height is not
     final at boot — re-fit whenever it actually resolves */
  new ResizeObserver(remeasure).observe(stage);
}

/* ═══════════════════════ 6. background settle ═══════════════════════
   scale 1.3 -> 1 and brightness 1.2 -> 1 as the curtain clears.       */

function settleBackground(delay) {
  const bg = document.querySelector("[data-mv-bg]");
  if (!bg) return;
  if (reduceMotion) {
    bg.style.transform = "none";
    bg.style.filter = "none";
    return;
  }
  tween({
    delay,
    duration: 1200,
    ease: ease.outQuart,
    onUpdate: (p) => {
      bg.style.transform = `scale(${1.3 + (1 - 1.3) * p})`;
      bg.style.filter = `brightness(${1.2 + (1 - 1.2) * p})`;
    },
    onComplete: () => { bg.style.willChange = "auto"; },
  });
}

/* ═══════════════════════ 7. smooth scroll + parallax ═══════════════════════
   A Lenis-style virtual scroll: the page keeps its native scrollbar via a
   spacer, and the content is translated toward the scroll position with a
   frame-rate-independent lerp.                                             */

const PARALLAX_START = 10;   /* px of scroll before the shift begins */
const PARALLAX_END = 1410;   /* px over which it completes           */
const PARALLAX_AMOUNT = 0.3; /* fraction of the layer's own height   */

function initScroll() {
  const scroller = document.getElementById("scroll");
  const spacer = document.getElementById("scroll-spacer");
  const webgl = document.getElementById("webgl");
  if (!scroller || !spacer) return;

  const native = isTouch || reduceMotion;
  if (native) root.classList.add("is-native-scroll");

  let current = 0;
  let target = 0;
  let lastParallax = null;

  function measure() {
    if (!native) spacer.style.height = `${scroller.scrollHeight}px`;
  }

  function applyParallax(y) {
    if (!webgl) return;
    const p = Math.min(Math.max((y - PARALLAX_START) / (PARALLAX_END - PARALLAX_START), 0), 1);
    const shift = Math.round(p * PARALLAX_AMOUNT * 1000) / 10; /* % with 1 decimal */
    if (shift === lastParallax) return;
    lastParallax = shift;
    webgl.style.transform = `translate3d(0, ${shift}%, 0)`;
  }

  if (native) {
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; applyParallax(window.scrollY); });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    applyParallax(window.scrollY);
    return { measure };
  }

  let lastTime = performance.now();
  let rendered = null;
  function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    target = window.scrollY;
    /* frame-rate-independent easing, equivalent to lerp 0.1 at 60fps */
    const factor = 1 - Math.pow(1 - 0.1, dt * 60);
    current += (target - current) * factor;
    if (Math.abs(target - current) < 0.05) current = target;

    /* at rest the lerp keeps producing the same value; writing it every frame
       costs a style recalc and a composite for nothing */
    if (rendered === null || Math.abs(current - rendered) > 0.01) {
      rendered = current;
      scroller.style.transform = `translate3d(0, ${(-current).toFixed(2)}px, 0)`;
      applyParallax(current);
    }
  }
  requestAnimationFrame(loop);

  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(scroller);

  return { measure };
}

/* ═══════════════════════ boot ═══════════════════════ */

function boot() {
  const playTitle = buildTitle();
  const playNav = buildNavbar();
  const { curtainLift } = buildLoader();

  /* the headline rises as the surface parts, and the background finishes
     settling just after the halves clear the frame */
  playTitle(reduceMotion ? 0 : curtainLift + 100);
  playNav(reduceMotion ? 0 : curtainLift + 400);
  settleBackground(reduceMotion ? 0 : curtainLift + 300);

  initScroll();
  initReveals();
  initWordHighlight();
  initMetrics();
  initGallery();
  initQuotes();
  initFaq();
  initCtaVideo();
  initCtaTitle();

  const container = document.getElementById("webgl");
  const background = document.querySelector("[data-mv-bg]");
  const hero = container && createFluidHero(container, {
    colorSrc: "https://demo.uichemy.com/wp-content/uploads/2026/09/hero.webp",
    monoSrc: "https://demo.uichemy.com/wp-content/uploads/2026/09/hero-mono.webp",
    colorSrcMobile: "https://demo.uichemy.com/wp-content/uploads/2026/09/hero-sp.webp",
    monoSrcMobile: "https://demo.uichemy.com/wp-content/uploads/2026/09/hero-sp-mono.webp",
  });

  if (!hero) {
    background && background.classList.add("is-fallback");
    return;
  }

  /* WebGL can be present and still end up with nothing to composite — a plate
     blocked by CORS, or an upload refused because the canvas is tainted. An
     empty canvas would just paint flat colour over the section, so drop it and
     let the CSS still image stand in. */
  hero.ready && hero.ready.then((plates) => {
    const usable = plates && plates.some((p) => p && p.width && p.height);
    if (usable) return;
    background && background.classList.add("is-fallback");
    hero.stop && hero.stop();
    if (hero.canvas) hero.canvas.style.display = "none";
  });

  /* the module keeps itself sized to #webgl; orientation changes need a nudge
     because the resize event can fire before the new layout is committed */
  window.addEventListener("orientationchange", () => {
    requestAnimationFrame(() => hero.resize());
  }, { passive: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

})();
```

## B4 · section `html`

```html
<div class="uichemy-vela-1">

  <!-- ══════════════════════ LOADING — SOUNDING ══════════════════════
       The screen is the sea surface. A waterline draws itself across the
       middle, the wordmark surfaces above it while a sounding runs to
       ninety metres, then the surface parts and the hull goes under.
  -->
  <div class="c-loading" id="loading" aria-hidden="true">
    <div class="c-loading__panel c-loading__panel--top" data-loading-top>
      <span class="c-loading__rule" data-loading-rule></span>
      <span class="c-loading__gauge" data-loading-gauge></span>
    </div>
    <div class="c-loading__panel c-loading__panel--bottom" data-loading-bottom>
      <span class="c-loading__rule" data-loading-rule></span>
    </div>

    <div class="c-loading__stage">
      <p class="c-loading__mark u-medium" data-loading-mark>Vela</p>
      <p class="c-loading__sound">
        <span data-loading-rise><span class="c-loading__depth" data-loading-depth>000</span> m</span>
      </p>
      <span class="c-loading__meta c-loading__meta--tl" data-loading-meta>Vela Marine Systems</span>
      <span class="c-loading__meta c-loading__meta--tr" data-loading-meta>Hull V09 · Autonomous</span>
      <span class="c-loading__meta c-loading__meta--bl" data-loading-meta>Sounding</span>
      <span class="c-loading__meta c-loading__meta--br" data-loading-meta>Est. 2015</span>
    </div>
  </div>


  <!-- ══════════════════════ SCROLL WRAPPER (virtual scroll) ══════════════════════ -->
  <div class="l-scroll" id="scroll">
  <!-- ══════════════════════ NAVBAR ══════════════════════ -->
    <header class="l-header">
      <div class="l-header__inner" data-nav-reveal>
        <a class="l-nav__brand" href="#" aria-label="Vela Marine, home">
          <span class="l-nav__mark"><svg viewbox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 2.6V19.4"></path><path d="M12.7 5.6 18.6 19.4h-5.9z"></path><path d="M9.3 8.6v10.8H3.4z"></path><path d="M2 19.4h18"></path></svg></span>
          <span class="l-nav__wordmark">Vela Marine</span>
        </a>

        <nav class="l-nav__menu" aria-label="Primary">
          <ul class="l-nav__list">
            <li><a class="l-nav__pill is-current" href="#" aria-current="page">Fleet</a></li>
            <li><a class="l-nav__pill" href="#">Engineering</a></li>
            <li><a class="l-nav__pill" href="#">Atelier</a></li>
            <li><a class="l-nav__pill" href="#">Journal</a></li>
            <li><a class="l-nav__pill" href="#">Contact</a></li>
          </ul>
        </nav>

        <div class="l-nav__actions">
          <a class="c-button" href="#">
            <span class="c-button__text">
              <span class="c-button__label is-1">Enquire</span>
              <span class="c-button__label is-2" aria-hidden="true">Enquire</span>
            </span>
            <span class="c-button__icon" aria-hidden="true">
              <span class="c-button__arrow is-1"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.2 10.8 10.8 5.2M6.1 5.2h4.7v4.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="c-button__arrow is-2"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.2 10.8 10.8 5.2M6.1 5.2h4.7v4.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            </span>
          </a>
          <button class="l-nav__toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="nav-panel" aria-label="Open menu">
            <span class="l-nav__bars" aria-hidden="true"><i></i><i></i></span>
          </button>
        </div>
      </div>
    </header>

    <main class="main">

      <!-- ─────────── HERO / MAIN VISUAL ─────────── -->
      <section class="p-home-mv">

        <div class="p-home-mv__box">
          <div class="p-home-mv__scroll"><p>Scroll to descend</p></div>
        </div>

        <div class="p-home-mv__grid">
          <h1 class="p-home-mv__title">
            <span class="p-home-mv__title-text01 u-medium" data-page-title="Hyperyacht V09" aria-hidden="true"></span>
            <span class="p-home-mv__title-text02 u-medium" data-page-title="Autonomous" aria-hidden="true"></span>
            <span class="u-sr">Hyperyacht V09 — Autonomous</span>
          </h1>

        </div>

        <div class="p-home-mv__background" data-mv-bg>
          <div id="webgl"></div>
        </div>
      </section>

      <!-- ─────────── STATEMENT ─────────── -->
      <section class="p-statement" id="about">
        <div class="p-statement__inner">
          <h2 class="p-statement__lead" data-word-highlight>Vela Marine shapes hyperyacht hulls and the autonomous systems that run them, from La Spezia since 2015.</h2>

          <div class="p-statement__metrics" data-metrics>
            <div class="c-metric is-1">
              <span class="c-metric__inner" data-metric>
                <span class="c-metric__label">Hulls delivered</span>
                <span class="c-metric__value">24</span>
              </span>
            </div>
            <span class="p-statement__divider" aria-hidden="true"></span>
            <div class="c-metric is-2">
              <span class="c-metric__inner" data-metric>
                <span class="c-metric__label">Sea trials logged</span>
                <span class="c-metric__value">96</span>
              </span>
            </div>
            <span class="p-statement__divider" aria-hidden="true"></span>
            <div class="c-metric is-3">
              <span class="c-metric__inner" data-metric>
                <span class="c-metric__label">Systems patents</span>
                <span class="c-metric__value">11</span>
              </span>
            </div>
            <span class="p-statement__divider" aria-hidden="true"></span>
            <div class="c-metric is-4">
              <span class="c-metric__inner" data-metric>
                <span class="c-metric__label">Design rating</span>
                <span class="c-metric__value">4.9</span>
              </span>
            </div>
            <span class="p-statement__divider" aria-hidden="true"></span>
            <div class="c-metric is-5">
              <span class="c-metric__inner" data-metric>
                <span class="c-metric__label">Years in the yard</span>
                <span class="c-metric__value">+10</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ─────────── PROJECTS ─────────── -->
      <section class="p-projects" id="projects">
        <div class="p-projects__head">
          <p class="c-eyebrow c-eyebrow--ink p-projects__label">Projects</p>
          <h2 class="p-projects__title" data-reveal>
            Engineered for<br><span>open water</span>
          </h2>
        </div>

        <div class="p-projects__rail" data-projects-rail>
          <article class="c-panel" data-panel data-reveal>
            <a class="c-panel__link" href="#" aria-label="Hull V09 — Autonomous platform, 2026">
              <span class="c-panel__media">
                <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/proj-01.webp" width="1350" height="1240" alt="" loading="lazy" decoding="async">
              </span>
              <span class="c-panel__scan" aria-hidden="true"></span>
              <span class="c-panel__spine" aria-hidden="true">
                <span class="c-panel__num">01</span>
                <span class="c-panel__name">Hull V09</span>
              </span>
              <span class="c-panel__body">
                <span class="c-panel__num is-body" aria-hidden="true">01</span>
                <span class="c-panel__title">Hull V09</span>
                <span class="c-panel__meta">
                  <span class="c-panel__cat">Autonomous platform</span>
                  <span class="c-panel__dot" aria-hidden="true"></span>
                  <span class="c-panel__year">2026</span>
                </span>
                <span class="c-panel__cta">View project <span class="c-panel__arrow"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></span>
              </span>
            </a>
          </article>
          <article class="c-panel" data-panel data-reveal>
            <a class="c-panel__link" href="#" aria-label="Abyssal — Deep survey ROV, 2025">
              <span class="c-panel__media">
                <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/proj-02.webp" width="1350" height="1240" alt="" loading="lazy" decoding="async">
              </span>
              <span class="c-panel__scan" aria-hidden="true"></span>
              <span class="c-panel__spine" aria-hidden="true">
                <span class="c-panel__num">02</span>
                <span class="c-panel__name">Abyssal</span>
              </span>
              <span class="c-panel__body">
                <span class="c-panel__num is-body" aria-hidden="true">02</span>
                <span class="c-panel__title">Abyssal</span>
                <span class="c-panel__meta">
                  <span class="c-panel__cat">Deep survey ROV</span>
                  <span class="c-panel__dot" aria-hidden="true"></span>
                  <span class="c-panel__year">2025</span>
                </span>
                <span class="c-panel__cta">View project <span class="c-panel__arrow"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></span>
              </span>
            </a>
          </article>
          <article class="c-panel" data-panel data-reveal>
            <a class="c-panel__link" href="#" aria-label="Tidewatch — Marine telemetry, 2025">
              <span class="c-panel__media">
                <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/proj-03.webp" width="1350" height="1240" alt="" loading="lazy" decoding="async">
              </span>
              <span class="c-panel__scan" aria-hidden="true"></span>
              <span class="c-panel__spine" aria-hidden="true">
                <span class="c-panel__num">03</span>
                <span class="c-panel__name">Tidewatch</span>
              </span>
              <span class="c-panel__body">
                <span class="c-panel__num is-body" aria-hidden="true">03</span>
                <span class="c-panel__title">Tidewatch</span>
                <span class="c-panel__meta">
                  <span class="c-panel__cat">Marine telemetry</span>
                  <span class="c-panel__dot" aria-hidden="true"></span>
                  <span class="c-panel__year">2025</span>
                </span>
                <span class="c-panel__cta">View project <span class="c-panel__arrow"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></span>
              </span>
            </a>
          </article>
          <article class="c-panel" data-panel data-reveal>
            <a class="c-panel__link" href="#" aria-label="Corallum — Research vessel, 2024">
              <span class="c-panel__media">
                <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/proj-04.webp" width="1350" height="1240" alt="" loading="lazy" decoding="async">
              </span>
              <span class="c-panel__scan" aria-hidden="true"></span>
              <span class="c-panel__spine" aria-hidden="true">
                <span class="c-panel__num">04</span>
                <span class="c-panel__name">Corallum</span>
              </span>
              <span class="c-panel__body">
                <span class="c-panel__num is-body" aria-hidden="true">04</span>
                <span class="c-panel__title">Corallum</span>
                <span class="c-panel__meta">
                  <span class="c-panel__cat">Research vessel</span>
                  <span class="c-panel__dot" aria-hidden="true"></span>
                  <span class="c-panel__year">2024</span>
                </span>
                <span class="c-panel__cta">View project <span class="c-panel__arrow"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></span>
              </span>
            </a>
          </article>
        </div>
      </section>


      <!-- ─────────── GALLERY ─────────── -->
      <section class="p-gallery" id="gallery" aria-labelledby="gallery-heading">
        <h2 class="u-sr" id="gallery-heading">Gallery</h2>
        <span class="p-gallery__word p-gallery__word--a" aria-hidden="true">Gallery</span>
        <span class="p-gallery__word p-gallery__word--b" aria-hidden="true">Vela</span>

        <div class="p-gallery__stage" data-gallery>
          <div class="p-gallery__ring" data-gallery-ring>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g1.webp" width="624" height="624" alt="Hull Inspection — Sea trial 04" loading="lazy" decoding="async">
            </div>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g2.webp" width="624" height="624" alt="Reef Transit — Ligurian coast" loading="lazy" decoding="async">
            </div>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g3.webp" width="624" height="624" alt="Ballast Bay — Depth 038 m" loading="lazy" decoding="async">
            </div>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g4.webp" width="624" height="624" alt="Coral Survey — Station 12" loading="lazy" decoding="async">
            </div>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g5.webp" width="624" height="624" alt="Thermocline — Depth 062 m" loading="lazy" decoding="async">
            </div>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g6.webp" width="624" height="624" alt="Keel Wash — Sea trial 07" loading="lazy" decoding="async">
            </div>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g7.webp" width="624" height="624" alt="Drift Sampling — Station 04" loading="lazy" decoding="async">
            </div>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g8.webp" width="624" height="624" alt="Night Descent — Depth 090 m" loading="lazy" decoding="async">
            </div>
            <div class="c-frame" data-frame>
              <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/g9.webp" width="624" height="624" alt="Surface Break — Sea trial 11" loading="lazy" decoding="async">
            </div>
          </div>
        </div>
      </section>



      <!-- ─────────── TESTIMONIALS ─────────── -->
      <section class="p-quotes" id="testimonials" aria-labelledby="quotes-heading" data-quotes>
        <span class="p-quotes__spine" aria-hidden="true">
          <span class="p-quotes__spine-line" data-spine-line></span>
          <span class="p-quotes__spine-star" data-spine-star><svg viewbox="0 0 57 57" fill="none" aria-hidden="true"><path d="M28.284 0c.003.041.906 15.046 7.072 21.212C41.518 27.374 56.508 28.28 56.568 28.283c-.06.004-15.05.91-21.212 7.072-6.166 6.166-7.069 21.171-7.072 21.212-.002-.044-.905-15.047-7.071-21.212C15.038 29.18 0 28.283 0 28.283s15.038-.897 21.213-7.071C27.379 15.046 28.282 .043 28.284 0Z" fill="currentColor"></path></svg></span>
        </span>

        <div class="p-quotes__grid">
          <div class="p-quotes__aside" data-quotes-aside>
            <p class="c-eyebrow p-quotes__pill">Testimonials</p>
            <h2 class="p-quotes__title" id="quotes-heading">Judged by the people<br>who run her.</h2>
            <p class="p-quotes__lead">
              Owners, captains, yards and surveyors, after a full season at sea.
            </p>
          </div>

          <ol class="p-quotes__list">
              <li class="c-quote">
                <p class="c-quote__rating" data-print-icons role="img" aria-label="Rated five out of five">
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                </p>
                <blockquote class="c-quote__body" data-print>“She holds a line through a beam sea that my last boat could not, and she does it without anyone touching the helm.”</blockquote>
                <p class="c-quote__who" data-print>Marco Ferretti — Owner, Hull 04</p>
              </li>
              <li class="c-quote">
                <p class="c-quote__rating" data-print-icons role="img" aria-label="Rated five out of five">
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                </p>
                <blockquote class="c-quote__body" data-print>“Three seasons, no autonomy faults. Vela shipped the telemetry we asked for and kept answering the phone long after handover.”</blockquote>
                <p class="c-quote__who" data-print>Elena Rossi — Adriatic Charter</p>
              </li>
              <li class="c-quote">
                <p class="c-quote__rating" data-print-icons role="img" aria-label="Rated five out of five">
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                </p>
                <blockquote class="c-quote__body" data-print>“The hull reads the water half a second before I do. After a week at sea you stop second-guessing it.”</blockquote>
                <p class="c-quote__who" data-print>Tomas Lindqvist — Master, M/Y Corallum</p>
              </li>
              <li class="c-quote">
                <p class="c-quote__rating" data-print-icons role="img" aria-label="Rated five out of five">
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                </p>
                <blockquote class="c-quote__body" data-print>“They engineer to be built, not just to be drawn. Tolerances arrive right and refit slots land on the promised day.”</blockquote>
                <p class="c-quote__who" data-print>Sofia Marchetti — Yard Director, La Spezia</p>
              </li>
              <li class="c-quote">
                <p class="c-quote__rating" data-print-icons role="img" aria-label="Rated five out of five">
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                  <span class="c-quote__star"><svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2.6l2.88 5.84 6.44.94-4.66 4.54 1.1 6.42L12 17.31l-5.76 3.03 1.1-6.42L2.68 9.38l6.44-.94L12 2.6Z"></path></svg></span>
                </p>
                <blockquote class="c-quote__body" data-print>“I have surveyed a lot of claims about autonomy. This is the first package where the log matches the brochure.”</blockquote>
                <p class="c-quote__who" data-print>Henrik Dahl — Naval Surveyor</p>
              </li>
          </ol>
        </div>
      </section>

      <!-- ─────────── FAQ ─────────── -->
      <section class="p-faq" id="faq" aria-labelledby="faq-heading">
        <div class="p-faq__inner">
          <div class="p-faq__head">
            <div class="p-faq__intro">
              <p class="c-eyebrow p-faq__pill">FAQ</p>
              <p class="p-faq__lead" id="faq-heading">
                Answers to what owners and yards ask us most,<br>before a hull is ever cut.
              </p>
            </div>
          </div>

          <div class="p-faq__stack">
            <div class="c-faq__item">
              <h3 class="c-faq__q">
                <button class="c-faq__trigger" type="button" aria-expanded="false" aria-controls="faq-a1" id="faq-q1">
                  <span class="c-faq__num">01</span>
                  <span class="c-faq__text">How long does a V09 hull take to build?</span>
                  <span class="c-faq__icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="c-faq__panel" id="faq-a1" role="region" aria-labelledby="faq-q1">
                <div class="c-faq__panel-inner"><p>From contract to sea trials, eighteen to twenty-four months, depending on specification and the yard slot you take.</p></div>
              </div>
            </div>
            <div class="c-faq__item">
              <h3 class="c-faq__q">
                <button class="c-faq__trigger" type="button" aria-expanded="false" aria-controls="faq-a2" id="faq-q2">
                  <span class="c-faq__num">02</span>
                  <span class="c-faq__text">Can the autonomy stack be retrofitted?</span>
                  <span class="c-faq__icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="c-faq__panel" id="faq-a2" role="region" aria-labelledby="faq-q2">
                <div class="c-faq__panel-inner"><p>Yes. Most of it is hull-agnostic — we have refitted platforms built by other yards at La Spezia.</p></div>
              </div>
            </div>
            <div class="c-faq__item">
              <h3 class="c-faq__q">
                <button class="c-faq__trigger" type="button" aria-expanded="false" aria-controls="faq-a3" id="faq-q3">
                  <span class="c-faq__num">03</span>
                  <span class="c-faq__text">How deep is the survey package rated?</span>
                  <span class="c-faq__icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="c-faq__panel" id="faq-a3" role="region" aria-labelledby="faq-q3">
                <div class="c-faq__panel-inner"><p>The V09 sensor package is rated to 090 metres. The ROV package goes considerably further.</p></div>
              </div>
            </div>
            <div class="c-faq__item">
              <h3 class="c-faq__q">
                <button class="c-faq__trigger" type="button" aria-expanded="false" aria-controls="faq-a4" id="faq-q4">
                  <span class="c-faq__num">04</span>
                  <span class="c-faq__text">Do you handle class and flag?</span>
                  <span class="c-faq__icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="c-faq__panel" id="faq-a4" role="region" aria-labelledby="faq-q4">
                <div class="c-faq__panel-inner"><p>We carry the design through class approval and coordinate flag with your management company.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─────────── CTA ─────────── -->
      <section class="p-cta" id="contact">
        <div class="p-cta__media" aria-hidden="true">
          <video class="p-cta__video" data-cta-video src="https://demo.uichemy.com/wp-content/uploads/2026/09/cta.mp4" poster="https://demo.uichemy.com/wp-content/uploads/2026/09/hero.webp" autoplay muted loop playsinline preload="none"></video>
          <span class="p-cta__shade"></span>
          <span class="p-cta__fade"></span>
        </div>
        <div class="p-cta__body">
          <h2 class="p-cta__title"><span data-cta-scale>Come aboard</span></h2>
          <a class="c-button" href="#">
            <span class="c-button__text">
              <span class="c-button__label is-1">Book a sea trial</span>
              <span class="c-button__label is-2" aria-hidden="true">Book a sea trial</span>
            </span>
            <span class="c-button__icon" aria-hidden="true">
              <span class="c-button__arrow is-1"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.2 10.8 10.8 5.2M6.1 5.2h4.7v4.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="c-button__arrow is-2"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.2 10.8 10.8 5.2M6.1 5.2h4.7v4.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            </span>
          </a>
        </div>
      </section>

    </main>
    <!-- ─────────── FOOTER ─────────── -->
    <footer class="l-footer">
      <div class="l-footer__top">
        <p class="l-footer__phone"><a href="tel:+390000000000">+39 000 000 0000</a></p>

        <div class="l-footer__talk">
          <p class="l-footer__talk-label">Let’s talk</p>
          <p class="l-footer__talk-mail">
            <a href="mailto:hello@velamarine.example">hello@velamarine.example</a>
          </p>
        </div>

        <div class="l-footer__cols">
          <nav class="c-fcol" aria-labelledby="fcol-nav">
            <p class="c-fcol__title" id="fcol-nav">Navigation</p>
              <a class="c-fcol__link" href="#">Fleet</a>
              <a class="c-fcol__link" href="#">Engineering</a>
              <a class="c-fcol__link" href="#">Atelier</a>
              <a class="c-fcol__link" href="#">Journal</a>
              <a class="c-fcol__link" href="#">Contact</a>
          </nav>
          <div class="c-fcol is-social">
            <p class="c-fcol__title">Social</p>
              <a class="c-fcol__link" href="#">Instagram</a>
              <a class="c-fcol__link" href="#">LinkedIn</a>
              <a class="c-fcol__link" href="#">YouTube</a>
          </div>
        </div>
      </div>

      <div class="l-footer__legal">
        <p class="l-footer__wordmark" aria-hidden="true">Vela Marine</p>
        <div class="l-footer__links">
          <a href="#">Privacy policy</a>
          <a href="#">Terms of service</a>
          <span>© 2026 Vela Marine — All rights reserved</span>
        </div>
      </div>
    </footer>

  </div>

  <div class="l-scroll__spacer" id="scroll-spacer" aria-hidden="true"></div>

  <!-- ══════════════════════ MOBILE MENU ══════════════════════ -->
  <div class="l-nav__panel" id="nav-panel" data-nav-panel hidden>
    <div class="l-nav__panel-head">
      <span class="l-nav__brand is-static">
        <span class="l-nav__mark"><svg viewbox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 2.6V19.4"></path><path d="M12.7 5.6 18.6 19.4h-5.9z"></path><path d="M9.3 8.6v10.8H3.4z"></path><path d="M2 19.4h18"></path></svg></span>
        <span class="l-nav__wordmark">Vela Marine</span>
      </span>
      <button class="l-nav__toggle is-close" type="button" data-nav-close aria-label="Close menu">
        <span class="l-nav__cross" aria-hidden="true"><i></i><i></i></span>
      </button>
    </div>
    <nav class="l-nav__panel-nav" aria-label="Primary, mobile">
      <ul class="l-nav__panel-list">
        <li><a class="l-nav__pill is-block is-current" href="#" aria-current="page">Fleet</a></li>
        <li><a class="l-nav__pill is-block" href="#">Engineering</a></li>
        <li><a class="l-nav__pill is-block" href="#">Atelier</a></li>
        <li><a class="l-nav__pill is-block" href="#">Journal</a></li>
        <li><a class="l-nav__pill is-block" href="#">Contact</a></li>
      </ul>
      <a class="c-button is-block" href="#">
            <span class="c-button__text">
              <span class="c-button__label is-1">Enquire</span>
              <span class="c-button__label is-2" aria-hidden="true">Enquire</span>
            </span>
            <span class="c-button__icon" aria-hidden="true">
              <span class="c-button__arrow is-1"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.2 10.8 10.8 5.2M6.1 5.2h4.7v4.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="c-button__arrow is-2"><svg viewbox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.2 10.8 10.8 5.2M6.1 5.2h4.7v4.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            </span>
          </a>
    </nav>
  </div>


  <!-- Classic script, not an ES module: modules are fetched under CORS rules and
       are refused on file://, so the page must work when opened by double-click. -->
</div>
```

## B5 · section `css`

```css

.uichemy-vela-1.uichemy-vela-1 {
  --system-color: #222222;
  --system-white: #eeeeee;
  --system-background-color: #dddddd;
    --accent: #0e7a90;
  --ink: #0b141a;

  --app-grid-col-gap: 10px;
  --app-grid-padding: 40px;

    --box-max: 1380px;
  --box-pad: 64px;

    --cta-ground: #070d12;

    --eyebrow-size: 15px;     --caps-size: 12px;        --track-caps: 0.1em;

  --font-book: "Inter Tight", "PP Neue Montreal Book", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-medium: "Inter Tight", "PP Neue Montreal Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;

  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
    box-sizing: border-box;
  margin: 0;
  width: 100%;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  background: var(--system-background-color);
  color: var(--system-color);
  font-family: var(--font-book);
  font-size: 13px;
  font-feature-settings: "palt";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.uichemy-vela-1.uichemy-vela-1,
.uichemy-vela-1.uichemy-vela-1 *,
.uichemy-vela-1.uichemy-vela-1 *::before,
.uichemy-vela-1.uichemy-vela-1 *::after { box-sizing: border-box; }
/* ───────────────────────── reset ───────────────────────── */
.uichemy-vela-1 h1,
.uichemy-vela-1 p,
.uichemy-vela-1 figure { margin: 0; }
.uichemy-vela-1 ul { margin: 0; padding: 0; list-style: none; }
.uichemy-vela-1 img,
.uichemy-vela-1 video { display: block; max-width: 100%; }
.uichemy-vela-1 a { color: inherit; text-decoration: none; cursor: pointer; }
.uichemy-vela-1 ::selection { background: #1d1d1d; color: #ccc; }
/* screen-reader only */
.uichemy-vela-1 .u-sr {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; border: 0; overflow: hidden;
  clip-path: inset(0 0 99.9% 99.9%);
}
.uichemy-vela-1 .u-medium { font-family: var(--font-medium); font-weight: 500; }
/* ═══════════════════════ loading — "sounding" ═══════════════════════
   Two halves of a dark sea meeting at a waterline. The wordmark surfaces
   from under the line, a gauge runs the line while the depth counts to
   ninety metres, then the surface parts and the hero is underneath.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .c-loading {
  --loading-ground: #070d12;
  position: fixed;
  inset: 0;
  height: 100svh;
  z-index: 99999;
  pointer-events: none;
  color: var(--system-white);
}
.uichemy-vela-1 .c-loading.is-done { display: none; }
/* — the two halves — */
.uichemy-vela-1 .c-loading__panel {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  background: var(--loading-ground);
  will-change: transform;
}
.uichemy-vela-1 .c-loading__panel--top { top: 0; }
.uichemy-vela-1 .c-loading__panel--bottom { bottom: 0; }
/* — the waterline, drawn from the centre out — */
.uichemy-vela-1 .c-loading__rule {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  opacity: 0.26;
  transform: scaleX(0);
  will-change: transform;
}
.uichemy-vela-1 .c-loading__panel--top .c-loading__rule { bottom: 0; }
.uichemy-vela-1 .c-loading__panel--bottom .c-loading__rule { top: 0; }
/* — progress rides the waterline itself — */
.uichemy-vela-1 .c-loading__gauge {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
}
/* — instrumentation layer, above both halves — */
.uichemy-vela-1 .c-loading__stage {
  position: absolute;
  inset: 0;
  z-index: 2;
}
/* the wordmark's box ends exactly on the waterline, so the glyphs
   rise out of the water and later sink back under it */
.uichemy-vela-1 .c-loading__mark,
.uichemy-vela-1 .c-loading__sound {
  position: absolute;
  bottom: 50%;
  display: flex;
  overflow: hidden;
  margin: 0;
  line-height: 0.86;
}
.uichemy-vela-1 .c-loading__mark {
  left: var(--app-grid-padding);
  font-size: 8rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.uichemy-vela-1 .c-loading__sound {
  right: var(--app-grid-padding);
  font-size: 2.6rem;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
}
.uichemy-vela-1 .c-loading__mark span,
.uichemy-vela-1 .c-loading__sound > span {
  display: block;
  transform: translateY(100%);
  will-change: transform;
}
.uichemy-vela-1 .c-loading__meta {
  position: absolute;
  font-size: 13px;
  line-height: 1.15;
  opacity: 0;
  will-change: transform, opacity;
}
.uichemy-vela-1 .c-loading__meta--tl { top: 16px; left: var(--app-grid-padding); }
.uichemy-vela-1 .c-loading__meta--tr { top: 16px; right: var(--app-grid-padding); }
.uichemy-vela-1 .c-loading__meta--bl { bottom: 20px; left: var(--app-grid-padding); }
.uichemy-vela-1 .c-loading__meta--br { bottom: 20px; right: var(--app-grid-padding); }
.uichemy-vela-1 .c-loading__depth { font-variant-numeric: tabular-nums; }
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.c-loading__mark { font-size: 5rem; }
.c-loading__meta { font-size: 10px; }
.c-loading__meta--tl,
.c-loading__meta--tr { top: 18px; }
.c-loading__meta--bl,
.c-loading__meta--br { bottom: 18px; }}
/* ═══════════════════════ navbar ═══════════════════════
   Glass pills on a transparent bar: logo left, pill group centred, one filled
   CTA right. The bar scrolls away with the hero rather than sticking.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .l-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 24px max(var(--box-pad), calc((100% - var(--box-max)) / 2));
  z-index: 999;
}
.uichemy-vela-1 .l-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
/* — brand — */
.uichemy-vela-1 .l-nav__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--system-white);
  text-shadow: 0 1px 24px rgba(0, 0, 0, 0.55);
}
.uichemy-vela-1 .l-nav__mark {
  display: block;
  width: 22px;
  height: 22px;
  flex: none;
}
.uichemy-vela-1 .l-nav__mark svg { display: block; width: 100%; height: 100%; }
.uichemy-vela-1 .l-nav__wordmark {
  font-size: 20px;
  line-height: 1.15;
  white-space: nowrap;
}
/* — pill group — */
.uichemy-vela-1 .l-nav__list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.uichemy-vela-1 .l-nav__pill {
  display: block;
  padding: 8px 20px;
  border: 1px solid rgba(238, 238, 238, 0.16);
  border-radius: 1600px;
  background: rgba(238, 238, 238, 0.14);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  color: var(--system-white);
  font-size: 14px;
  line-height: 21px;
  white-space: nowrap;
  transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease;
}
.uichemy-vela-1 .l-nav__pill.is-current {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
@media (hover: hover) {
.uichemy-vela-1 { --uv-guard: 0; }
.l-nav__pill:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
  }}
/* — actions — */
.uichemy-vela-1 .l-nav__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
/* — the CTA: label and arrow both swap on hover — */
.uichemy-vela-1 .c-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px 8px 24px;
  border-radius: 1600px;
  background: var(--system-white);
  color: var(--ink);
  font-size: 16px;
  line-height: 24px;
  white-space: nowrap;
  transition: background-color 0.45s ease, color 0.45s ease;
}
.uichemy-vela-1 .c-button__text {
  position: relative;
  display: block;
  overflow: hidden;
  height: 24px;
}
.uichemy-vela-1 .c-button__label {
  display: block;
  transition: transform 0.45s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.uichemy-vela-1 .c-button__label.is-2 {
  position: absolute;
  inset: 0;
  transform: translateY(102%);
}
.uichemy-vela-1 .c-button__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: none;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(11, 20, 26, 0.09);
  color: var(--ink);
  transition: background-color 0.45s ease, color 0.45s ease;
}
.uichemy-vela-1 .c-button__arrow {
  grid-area: 1 / 1;
  display: block;
  width: 16px;
  height: 16px;
  transition: transform 0.45s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.uichemy-vela-1 .c-button__arrow svg { display: block; width: 100%; height: 100%; }
.uichemy-vela-1 .c-button__arrow.is-2 { transform: translate(-101%, 101%); }
@media (hover: hover) {
.uichemy-vela-1 { --uv-guard: 0; }
.c-button:hover { background: var(--accent); color: #fff; }
.c-button:hover .c-button__label.is-1 { transform: translateY(-101%); }
.c-button:hover .c-button__label.is-2 { transform: translateY(0); }
.c-button:hover .c-button__icon { background: #fff; color: var(--accent); }
.c-button:hover .c-button__arrow.is-1 { transform: translate(101%, -101%); }
.c-button:hover .c-button__arrow.is-2 { transform: translate(0, 0); }}
/* — hamburger — */
.uichemy-vela-1 .l-nav__toggle {
  display: none;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
}
.uichemy-vela-1 .l-nav__bars,
.uichemy-vela-1 .l-nav__cross {
  display: grid;
  gap: 5px;
  width: 18px;
}
.uichemy-vela-1 .l-nav__bars i,
.uichemy-vela-1 .l-nav__cross i {
  display: block;
  height: 1.5px;
  border-radius: 2px;
  background: currentColor;
}
.uichemy-vela-1 .l-nav__cross { position: relative; height: 18px; gap: 0; }
.uichemy-vela-1 .l-nav__cross i { position: absolute; top: 50%; left: 0; width: 100%; }
.uichemy-vela-1 .l-nav__cross i:first-child { transform: rotate(45deg); }
.uichemy-vela-1 .l-nav__cross i:last-child { transform: rotate(-45deg); }
/* — mobile panel — */
.uichemy-vela-1 .l-nav__panel {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 24px var(--app-grid-padding) 32px;
  background: var(--loading-ground, #070d12);
  overscroll-behavior: contain;
  opacity: 0;
  transition: opacity 0.35s ease;
}
/* `display: flex` above outranks the UA rule for [hidden], and a full-screen
   panel at opacity 0 would silently swallow every click on the page */
.uichemy-vela-1 .l-nav__panel[hidden] { display: none; }
.uichemy-vela-1 .l-nav__panel.is-open { opacity: 1; }
.uichemy-vela-1 .l-nav__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.uichemy-vela-1 .l-nav__panel-nav { margin-top: 40px; }
.uichemy-vela-1 .l-nav__panel-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}
.uichemy-vela-1 .l-nav__pill.is-block,
.uichemy-vela-1 .c-button.is-block {
  display: flex;
  justify-content: center;
  text-align: center;
  padding-block: 14px;
}
.uichemy-vela-1 .c-button.is-block { padding-inline: 24px; }
@media (max-width: 900px) {
.uichemy-vela-1 { --uv-guard: 0; }
.l-nav__menu { display: none; }
.l-nav__actions .c-button { display: none; }
.l-nav__toggle { display: grid; }
.l-header__inner { justify-content: space-between; }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.l-nav__wordmark { font-size: 1.6rem; }
.l-header { padding: 18px var(--box-pad); }}
/* ═══════════════════════ virtual scroll shell ═══════════════════════ */
.uichemy-vela-1 .l-scroll {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  will-change: transform;
}
.uichemy-vela-1 .l-scroll__spacer { width: 100%; }
/* ═══════════════════════ hero / main visual ═══════════════════════ */
.uichemy-vela-1 .p-home-mv {
  position: relative;
  height: 100svh;
}
.uichemy-vela-1 .p-home-mv__box {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100svh;
  z-index: 2;
  pointer-events: none;
}
.uichemy-vela-1 .p-home-mv__scroll {
  position: absolute;
  bottom: 20px;
  left: max(var(--box-pad), calc((100% - var(--box-max)) / 2));
  z-index: 1;
  font-size: 13px;
  color: var(--system-white);
  text-shadow: 0 1px 24px rgba(0, 0, 0, 0.55);
}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-home-mv__scroll { display: none; }}
/* — headline — */
.uichemy-vela-1 .p-home-mv__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: var(--app-grid-col-gap);
  width: 100%;
  padding-top: 148px;
  padding-inline: max(var(--box-pad), calc((100% - var(--box-max)) / 2));
  z-index: 1;
  pointer-events: none;
}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-home-mv__grid { grid-template-columns: repeat(4, 1fr); padding-top: 112px; }}
.uichemy-vela-1 .p-home-mv__title {
  grid-column: 1 / -1;
  font-size: 12.7rem;
  font-weight: 500;
    letter-spacing: 0.02em;
  color: var(--system-white);
}
.uichemy-vela-1 .p-home-mv__title > span {
  display: block;
  line-height: 1;
  text-transform: uppercase;
}
.uichemy-vela-1 /* the doubled class outranks `.p-home-mv__title > span { display:block }
.uichemy-vela-1 ` above,
.uichemy-vela-1 which the lines need so each glyph mask becomes a flex item */
.p-home-mv__title .p-home-mv__title-text01,
.uichemy-vela-1 .p-home-mv__title .p-home-mv__title-text02 { display: flex; }
@media (min-width: 768px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-home-mv__title > span { line-height: 0.8; }
.p-home-mv__title .p-home-mv__title-text02 {
    position: relative;
    width: fit-content;
    margin-left: auto;
  }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-home-mv__title { grid-column: 1 / span 4; font-size: 3.8rem; }}
/* per-character mask used by the reveal */
.uichemy-vela-1 .p-home-mv__title .hide {
  height: fit-content;
  overflow: hidden;
}
.uichemy-vela-1 .p-home-mv__title .show {
  display: inline-block;
  transform: translateY(-100%);
  will-change: transform;
}
.uichemy-vela-1 .p-home-mv__title .hide:nth-last-of-type(2n) .show { transform: translateY(100%); }
.uichemy-vela-1 .p-home-mv__title .u-space { min-width: 2rem; }
/* — WebGL background — */
.uichemy-vela-1 .p-home-mv__background {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #050b10;
  transform: scale(1.3);
  filter: brightness(1.2);
  will-change: transform, filter;
}
.uichemy-vela-1 .p-home-mv__background #webgl {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}
.uichemy-vela-1 .p-home-mv__background #webgl canvas {
  display: block;
  width: 100%;
  height: 100%;
}
/* static fallback when WebGL2 is unavailable */
.uichemy-vela-1 .p-home-mv__background.is-fallback #webgl {
  background: url("https://demo.uichemy.com/wp-content/uploads/2026/09/hero.webp") center / cover no-repeat;
}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-home-mv__background.is-fallback #webgl {
    background-image: url("https://demo.uichemy.com/wp-content/uploads/2026/09/hero-sp.webp");
  }}
/* ═══════════════════════ statement ═══════════════════════
   A centred practice statement that assembles character by character, over a
   row of metrics whose columns staircase upward — the numbers sit on a shared
   baseline while the rules above them grow in fifths.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .p-statement {
  position: relative;
  z-index: 3;
    padding: 190px var(--box-pad) 100px;
  background: #fff;
}
.uichemy-vela-1 .p-statement__inner {
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: var(--box-max);
  margin-inline: auto;
}
.uichemy-vela-1 .p-statement__lead {
    max-width: 1040px;
  margin: 0 auto;
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: 72px;
  line-height: 1.1;
  letter-spacing: -0.0096em;
  text-align: center;
  text-wrap: balance;
  color: #cfcfcf;
}
/* each word sits subdued until the scroll passes it, then turns to ink */
.uichemy-vela-1 .p-statement__lead .w {
  color: #cfcfcf;
  transition: color 0.35s ease;
}
.uichemy-vela-1 .p-statement__lead .w.is-lit { color: #111; }
/* — metrics — */
.uichemy-vela-1 .p-statement__metrics {
  display: flex;
  align-items: flex-end;
  gap: 24px;
    height: 883px;
  padding: 60px 0;
}
.uichemy-vela-1 .p-statement__divider {
  flex: 0 0 auto;
  width: 2px;
  height: 100%;
  background: rgba(34, 34, 34, 0.28);
}
/* every column is full height; the staircase is produced by lifting each
   pair with a transform, which is also what the scroll then collapses */
.uichemy-vela-1 .c-metric {
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  min-width: 0;
}
.uichemy-vela-1 .c-metric__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  will-change: transform;
}
.uichemy-vela-1 .c-metric__label {
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: -0.02em;
  text-align: center;
  color: #5c5c5c;
}
.uichemy-vela-1 .c-metric__value {
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: 56px;
  line-height: 1.2;
  letter-spacing: -0.015em;
  font-variant-numeric: tabular-nums;
  color: var(--system-color);
}
@media (max-width: 1100px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-statement { padding: 140px 44px 80px; }
.p-statement__lead { font-size: 52px; }
.p-statement__metrics { height: 600px; gap: 16px; }
.c-metric__value { font-size: 40px; }
.c-metric__label { font-size: 14px; }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-statement { padding: 104px var(--box-pad) 64px; }
.p-statement__inner { gap: 40px; }
.p-statement__lead { font-size: 3.4rem; }
.p-statement__metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 20px;
    height: auto;
    padding: 0;
  }
.p-statement__divider { display: none; }
.c-metric__inner { transform: none !important; align-items: flex-start; }
.c-metric {
    height: auto;
    align-items: flex-start;
    gap: 4px;
    padding: 16px 0;
    border-top: 1px solid rgba(34, 34, 34, 0.28);
  }
.c-metric__label { font-size: 12px; text-align: left; }
.c-metric__inner { gap: 4px; }
.c-metric__value { font-size: 2.8rem; }}
/* ═══════════════════════ projects ═══════════════════════
   Header row of three — label / centred two-tone title / count badge — over a
   two-column card grid. Each card is an image with its name set straight
   across it in `mix-blend-mode: exclusion`, so the type inverts against
   whatever it lands on, then a white meta bar underneath.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .p-projects {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding: 124px var(--box-pad);
  background: var(--system-background-color);
  overflow: hidden;
}
/* ── eyebrow: the one label treatment every section head uses ── */
.uichemy-vela-1 .c-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: var(--eyebrow-size);
  line-height: 1.7;
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}
/* the same chip, inverted for the light-ground sections */
.uichemy-vela-1 .c-eyebrow--ink {
  background: rgba(17, 17, 17, 0.06);
  color: #4a4a4a;
}
/* — header — */
.uichemy-vela-1 .p-projects__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  width: 100%;
  max-width: var(--box-max);
}
.uichemy-vela-1 .p-projects__title {
  max-width: 540px;
  margin: 0;
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: 54px;
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-align: center;
  color: #000;
}
.uichemy-vela-1 .p-projects__title span { color: #5c5c5c; }
.uichemy-vela-1 .p-projects__count {
  display: grid;
  place-items: center;
  min-width: 38px;
  padding: 8px 10px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: var(--eyebrow-size);
  line-height: 1.7;
  letter-spacing: var(--track-caps);
  font-variant-numeric: tabular-nums;
}
/* — the rail: four panels that trade width as you move across them — */
.uichemy-vela-1 .p-projects__rail {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: var(--box-max);
  height: clamp(420px, 68svh, 720px);
}
.uichemy-vela-1 .c-panel {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  background: #0b1014;
  transition: flex-grow 0.9s var(--ease-out-quart);
}
@media (hover: hover) and (min-width: 768px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-projects__rail:hover .c-panel { flex-grow: 0.72; }
.p-projects__rail .c-panel:hover,
.p-projects__rail .c-panel:focus-within { flex-grow: 3.1; }}
.uichemy-vela-1 .c-panel:focus-within { flex-grow: 3.1; }
.uichemy-vela-1 .c-panel__link {
  position: absolute;
  inset: 0;
  display: block;
  color: #fff;
  text-decoration: none;
}
.uichemy-vela-1 .c-panel__link:focus-visible { outline: 2px solid var(--accent); outline-offset: -4px; }
.uichemy-vela-1 .c-panel__media { position: absolute; inset: 0; overflow: hidden; }
.uichemy-vela-1 .c-panel__media::after {
    content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(7, 13, 18, 0) 38%, rgba(7, 13, 18, 0.82) 100%);
}
.uichemy-vela-1 .c-panel__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.12);
  filter: grayscale(1) brightness(0.62);
  transition: transform 1.1s var(--ease-out-quart), filter 0.9s ease;
}
.uichemy-vela-1 .c-panel:hover .c-panel__media img,
.uichemy-vela-1 .c-panel:focus-within .c-panel__media img {
  transform: scale(1);
  filter: grayscale(0) brightness(1);
}
/* a hairline that draws itself across the top of the open panel */
.uichemy-vela-1 .c-panel__scan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.9s var(--ease-out-quart);
}
.uichemy-vela-1 .c-panel:hover .c-panel__scan,
.uichemy-vela-1 .c-panel:focus-within .c-panel__scan { transform: scaleX(1); }
/* — collapsed: the name reads up the spine — */
.uichemy-vela-1 .c-panel__spine {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 24px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  transition: opacity 0.45s ease;
}
.uichemy-vela-1 .c-panel__num {
  font-size: var(--caps-size);
  letter-spacing: var(--track-caps);
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.55);
}
.uichemy-vela-1 .c-panel__name {
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: 22px;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.uichemy-vela-1 .c-panel:hover .c-panel__spine,
.uichemy-vela-1 .c-panel:focus-within .c-panel__spine { opacity: 0; }
/* — open: the full record slides up — */
.uichemy-vela-1 .c-panel__body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 34px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease 0.12s, transform 0.7s var(--ease-out-quart) 0.12s;
}
.uichemy-vela-1 .c-panel:hover .c-panel__body,
.uichemy-vela-1 .c-panel:focus-within .c-panel__body { opacity: 1; transform: none; }
.uichemy-vela-1 .c-panel__num.is-body { color: var(--accent); }
.uichemy-vela-1 .c-panel__title {
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: clamp(28px, 2.6vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  white-space: nowrap;
}
.uichemy-vela-1 .c-panel__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--caps-size);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.72);
}
.uichemy-vela-1 .c-panel__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
}
.uichemy-vela-1 .c-panel__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 9px 16px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 999px;
  font-size: var(--caps-size);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  white-space: nowrap;
  transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
}
.uichemy-vela-1 .c-panel__arrow { display: block; width: 14px; height: 14px; }
.uichemy-vela-1 .c-panel__arrow svg { display: block; width: 100%; height: 100%; }
@media (hover: hover) {
.uichemy-vela-1 { --uv-guard: 0; }
.c-panel__link:hover .c-panel__cta {
    background: #fff;
    border-color: #fff;
    color: var(--ink);
  }}
@media (hover: none), (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.c-panel__spine { display: none; }
.c-panel__body { opacity: 1; transform: none; }
.c-panel__media img { transform: scale(1); filter: none; }
.c-panel__scan { transform: scaleX(1); }}
@media (prefers-reduced-motion: reduce) {
.uichemy-vela-1 { --uv-guard: 0; }
.c-panel,
.c-panel__media img,
.c-panel__scan,
.c-panel__spine,
.c-panel__body { transition: none; }}
/* — scroll reveal — */
.uichemy-vela-1 [data-reveal] {
  opacity: 0;
  transform: translateY(20px);
}
.uichemy-vela-1 [data-reveal].is-revealed {
  opacity: 1;
  transform: none;
}
@media (max-width: 1100px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-projects { padding: 96px var(--box-pad); gap: 56px; }
.p-projects__head { flex-direction: column; align-items: flex-start; gap: 24px; }
.p-projects__title { max-width: none; text-align: left; }
.p-projects__count { align-self: flex-start; }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-projects {
    padding: 72px var(--box-pad);
    gap: 40px;
  }
.p-projects__title { font-size: 3.6rem; }
.p-projects__rail {
    flex-direction: column;
    gap: 14px;
    height: auto;
  }
.c-panel { flex: none; height: 44svh; min-height: 300px; }
.c-panel__body { padding: 24px; gap: 8px; }
.c-panel__title { font-size: 3rem; }}
/* ═══════════════════════ gallery ═══════════════════════
   Nine frames on a tilted ring, drifting slowly and draggable. Depth drives
   scale and stacking, so the front of the ring reads nearest. Two display
   words sit behind the ring, one at each diagonal.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .p-gallery {
  --ring-card: 312px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  min-height: 100svh;
  padding: 96px 60px;
  background: var(--loading-ground, #070d12);
  color: var(--system-white);
  isolation: isolate;
}
/* the display words sit *over* the ring, as they do in the reference, so the
   frames pass behind them */
.uichemy-vela-1 .p-gallery__word {
  position: absolute;
  z-index: 2;
  font-family: var(--font-medium);
  font-weight: 700;
  font-size: 200px;
  line-height: 1.2;
  letter-spacing: -0.008em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--system-white);
  pointer-events: none;
}
.uichemy-vela-1 .p-gallery__word--a { top: 120px; left: 60px; }
.uichemy-vela-1 .p-gallery__word--b { bottom: 120px; right: 60px; }
.uichemy-vela-1 .p-gallery__stage {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 460px;
  perspective: 1650px;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;
}
.uichemy-vela-1 .p-gallery__stage.is-dragging { cursor: grabbing; }
.uichemy-vela-1 .p-gallery__ring {
  position: absolute;
  inset: 0;
}
/* — frame — */
.uichemy-vela-1 .c-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--ring-card);
  height: var(--ring-card);
  margin: calc(var(--ring-card) / -2) 0 0 calc(var(--ring-card) / -2);
  overflow: hidden;
  background: #0b141a;
  will-change: transform;
}
.uichemy-vela-1 .c-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  -webkit-user-drag: none;
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}
@media (hover: hover) {
.uichemy-vela-1 { --uv-guard: 0; }
.c-frame:hover img { filter: grayscale(0%); }}
@media (max-width: 1100px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-gallery { --ring-card: 232px; padding: 72px 44px; }
.p-gallery__word { font-size: 128px; }
.p-gallery__word--a { top: 72px; left: 44px; }
.p-gallery__word--b { bottom: 72px; right: 44px; }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-gallery {
    --ring-card: 168px;
    padding: 56px var(--app-grid-padding);
  }
.p-gallery__word { font-size: 5.8rem; }
.p-gallery__word--a { top: 40px; left: var(--app-grid-padding); }
.p-gallery__word--b { bottom: 40px; right: var(--app-grid-padding); }}
/* ═══════════════════════ testimonials ═══════════════════════
   Built from ricardochance.com: two columns split down a lit hairline —
   a heading held at the viewport's middle on the left, a column of voices
   scrolling past it on the right, each one printing in character by
   character as it crosses the centre line.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .p-quotes {
  --quote-dim: rgba(255, 255, 255, 0.12);     position: relative;
  z-index: 3;
  background: var(--cta-ground);
  color: #fff;
  isolation: isolate;
}
/* — the hairline down the middle, with a star riding the centre — */
.uichemy-vela-1 .p-quotes__spine {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  pointer-events: none;
}
.uichemy-vela-1 .p-quotes__spine-line {
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.12);
  transform: scaleY(0);
  transform-origin: 50% 0;
  will-change: transform;
}
.uichemy-vela-1 .p-quotes__spine-star {
  position: absolute;
  top: 0;
  left: 50%;
  width: 26px;
  height: 26px;
  margin-left: -13px;
  color: #fff;
  filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.75));
  transform: scale(0);
  will-change: transform;
}
.uichemy-vela-1 .p-quotes__spine-star svg { display: block; width: 100%; height: 100%; }
.uichemy-vela-1 .p-quotes__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
    max-width: calc(var(--box-max) + var(--box-pad) * 2);
  margin-inline: auto;
  padding-inline: var(--box-pad);
}
/* — left: held at the middle of the viewport for the length of the run — */
.uichemy-vela-1 .p-quotes__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  height: fit-content;
  padding: 48px;
  text-align: right;
  will-change: transform;
}
.uichemy-vela-1 .p-quotes__pill { align-self: flex-end; }
.uichemy-vela-1 .p-quotes__title {
  margin: 0;
  max-width: 420px;
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: 54px;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #fff;
}
.uichemy-vela-1 .p-quotes__lead { max-width: 360px; }
/* — right: the voices, spaced so one sits on the line at a time — */
.uichemy-vela-1 .p-quotes__list {
  display: flex;
  flex-direction: column;
  gap: 200px;
  margin: 0;
  padding: 50svh 48px;
  list-style: none;
}
.uichemy-vela-1 .c-quote {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 440px;
}
.uichemy-vela-1 .c-quote__rating,
.uichemy-vela-1 .c-quote__body,
.uichemy-vela-1 .c-quote__who { margin: 0; }
/* five outlined stars, filled in by nothing but the stroke */
.uichemy-vela-1 .c-quote__rating { display: flex; gap: 7px; }
.uichemy-vela-1 .c-quote__star {
  display: block;
  width: 17px;
  height: 17px;
}
.uichemy-vela-1 .c-quote__star svg { display: block; width: 100%; height: 100%; }
.uichemy-vela-1 .c-quote__body {
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: 26px;
  line-height: 1.45;
  letter-spacing: -0.02em;
  text-indent: -0.42em;   }
.uichemy-vela-1 .c-quote__who {
  font-size: var(--caps-size);
  line-height: 1.6;
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
}
/* every character rests dim and lights as the print head passes it */
.uichemy-vela-1 .c-quote [data-print] span,
.uichemy-vela-1 .c-quote__star { color: var(--quote-dim); }
.uichemy-vela-1 .c-quote [data-print] span.is-lit,
.uichemy-vela-1 .c-quote__star.is-lit { color: #fff; }
.uichemy-vela-1 .c-quote__who span.is-lit { color: rgba(255, 255, 255, 0.55); }
.uichemy-vela-1 .c-quote [data-print-word] { white-space: nowrap; }
@media (max-width: 1100px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-quotes__aside { padding: 32px 0 32px 32px; }
.p-quotes__title { font-size: 40px; }
.p-quotes__list { gap: 160px; padding: 45svh 0 45svh 32px; }
.c-quote__body { font-size: 22px; }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-quotes__spine { left: var(--box-pad); }
.p-quotes__grid { grid-template-columns: 1fr; }
.p-quotes__aside {
    align-items: flex-start;
    gap: 16px;
    padding: 72px 0 0 24px;
    text-align: left;
  }
.p-quotes__pill { align-self: flex-start; }
.p-quotes__title { font-size: 3.4rem; max-width: none; }
.p-quotes__lead { max-width: none; }
.p-quotes__list { gap: 128px; padding: 24svh 0 40svh 24px; }
.c-quote { gap: 16px; }
.c-quote__body { font-size: 1.9rem; }
.c-quote__star { width: 15px; height: 15px; }}
/* ═══════════════════════ FAQ ═══════════════════════
   Built from nyro.framer.website: a pill and lead over a stack of ruled
   accordion rows, each numbered, opening to reveal its answer.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .p-faq {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding: 60px var(--box-pad) clamp(140px, 13vw, 240px);
  background: var(--cta-ground);
  color: #fff;
}
.uichemy-vela-1 .p-faq__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 120px;
  width: 100%;
  max-width: var(--box-max);
}
.uichemy-vela-1 .p-faq__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.uichemy-vela-1 .p-faq__intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  max-width: 683px;
}
.uichemy-vela-1 .p-faq__lead,
.uichemy-vela-1 .p-quotes__lead {
  margin: 0;
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
}
/* — the stack — */
.uichemy-vela-1 .p-faq__stack {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.uichemy-vela-1 .c-faq__item { border-bottom: 1px solid rgba(255, 255, 255, 0.16); }
.uichemy-vela-1 .c-faq__q { margin: 0; }
.uichemy-vela-1 .c-faq__trigger {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  padding: 32px 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.uichemy-vela-1 .c-faq__num {
  flex: none;
  padding-top: 10px;
  font-size: var(--caps-size);
  line-height: 1.6;
  letter-spacing: var(--track-caps);
  color: rgba(255, 255, 255, 0.45);
  font-variant-numeric: tabular-nums;
}
.uichemy-vela-1 .c-faq__text {
  flex: 1;
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: 32px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: #fff;
}
/* a plus that becomes a minus */
.uichemy-vela-1 .c-faq__icon {
  position: relative;
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 12px;
}
.uichemy-vela-1 .c-faq__icon::before,
.uichemy-vela-1 .c-faq__icon::after {
  content: "";
  position: absolute;
  inset: 50% 0 auto 0;
  height: 1.5px;
  background: currentColor;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.uichemy-vela-1 .c-faq__icon::after { transform: rotate(90deg); }
.uichemy-vela-1 [aria-expanded="true"] .c-faq__icon::after { transform: rotate(0deg); }
/* 0fr -> 1fr animates to the panel's natural height without a magic number */
.uichemy-vela-1 .c-faq__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.uichemy-vela-1 .c-faq__panel.is-open { grid-template-rows: 1fr; }
.uichemy-vela-1 .c-faq__panel-inner { overflow: hidden; }
.uichemy-vela-1 .c-faq__panel-inner p {
  margin: 0;
  max-width: 780px;
  padding: 0 0 32px 74px;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.66);
}
@media (max-width: 1100px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-faq { padding: 56px var(--box-pad) 140px; gap: 48px; }
.p-faq__inner { gap: 72px; }
.c-faq__text { font-size: 26px; }
.c-faq__trigger { gap: 24px; }
.c-faq__panel-inner p { padding-left: 50px; font-size: 16px; }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-faq { padding: 48px var(--box-pad) 104px; gap: 36px; }
.p-faq__inner { gap: 48px; }
.p-faq__intro { gap: 24px; }
.p-faq__lead { font-size: 16px; }
.c-faq__trigger { gap: 14px; padding: 24px 0; }
.c-faq__text { font-size: 2rem; }
.c-faq__num { padding-top: 8px; }
.c-faq__icon { margin-top: 8px; width: 15px; height: 15px; }
.c-faq__panel-inner p { padding: 0 0 24px 28px; font-size: 14px; }}
/* ═══════════════════════ CTA ═══════════════════════
   Full-bleed photograph under a flat shade and a gradient that dissolves into
   the footer's ground, with an oversized invitation centred on top.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .p-cta {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 900px;
  padding: 80px 40px;
  background: var(--cta-ground);
  overflow: hidden;
  isolation: isolate;
}
.uichemy-vela-1 .p-cta__media {
  position: absolute;
  inset: 0;
  z-index: -1;
}
.uichemy-vela-1 .p-cta__media img,
.uichemy-vela-1 .p-cta__media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.uichemy-vela-1 .p-cta__shade {
  position: absolute;
  inset: 0;
  background: #000;
  opacity: 0.35;
}
/* the band has to hand off cleanly to the footer below it */
.uichemy-vela-1 .p-cta__fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(7, 13, 18, 0) 45%, var(--cta-ground) 100%);
}
.uichemy-vela-1 .p-cta__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;
}
.uichemy-vela-1 .p-cta__title span {
  display: block;
  transform: scale(2);
  transform-origin: center;
  will-change: transform;
}
.uichemy-vela-1 .p-cta__title {
  margin: 0;
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: 144px;
  line-height: 1;
  letter-spacing: -0.07em;
  color: #fff;
}
@media (max-width: 1100px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-cta { min-height: 680px; padding: 64px 24px; }
.p-cta__title { font-size: 96px; }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.p-cta { min-height: 520px; padding: 56px var(--app-grid-padding); }
.p-cta__title { font-size: 5.4rem; letter-spacing: -0.05em; }
.p-cta__body { gap: 24px; }}
/* ═══════════════════════ footer ═══════════════════════
   Built from arqos.framer.ai: a three-part top row — phone, a centred
   "let's talk" address, and two right-aligned link columns — over a wordmark
   sized to span the full measure, with centred legal links beneath.
   ═══════════════════════════════════════════════════════════════════ */
.uichemy-vela-1 .l-footer {
    --foot-ground: #070d12;
  --foot-dim:    #b0b0b0;
  --foot-bright: #f1ede9;

  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 96px;
  padding: 124px 64px 80px;
  background: var(--foot-ground);
  color: var(--foot-bright);
}
/* — top row — */
.uichemy-vela-1 .l-footer__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  max-width: 1380px;
}
.uichemy-vela-1 .l-footer__phone {
  margin: 0;
  flex: 1;
  font-size: 18px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--foot-bright);
}
.uichemy-vela-1 .l-footer__talk {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}
.uichemy-vela-1 .l-footer__talk-label,
.uichemy-vela-1 .l-footer__talk-mail {
  margin: 0;
  font-size: 38px;
  line-height: 1;
  letter-spacing: -0.03em;
}
.uichemy-vela-1 .l-footer__talk-label { color: var(--foot-dim); }
.uichemy-vela-1 .l-footer__talk-mail { color: var(--foot-bright); }
.uichemy-vela-1 .l-footer__cols {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex: 1;
}
.uichemy-vela-1 .c-fcol {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  padding-inline: 24px;
  text-align: right;
}
.uichemy-vela-1 .c-fcol.is-social { gap: 10px; padding-inline: 0; }
.uichemy-vela-1 .c-fcol__title {
  margin: 0;
  font-size: var(--caps-size);
  line-height: 1.6;
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  color: #f2f2f2;
}
.uichemy-vela-1 .c-fcol__link {
  font-size: 14px;
  line-height: 1.4;
  color: var(--foot-dim);
  transition: color 0.4s ease;
}
@media (hover: hover) {
.uichemy-vela-1 { --uv-guard: 0; }
.l-footer__phone a:hover,
.l-footer__talk-mail a:hover,
.c-fcol__link:hover { color: var(--accent); }}
/* — legal — */
.uichemy-vela-1 .l-footer__legal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
}
/* the lockup measures ~6.0x its font-size, so this fills the measure left
   after the section's 64px gutters */
.uichemy-vela-1 .l-footer__wordmark {
  margin: 0;
  width: 100%;
  font-family: var(--font-medium);
  font-weight: 500;
  font-size: clamp(40px, calc(16.6vw - 21px), 300px);
  line-height: 1;
  letter-spacing: -0.04em;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--foot-bright);
  user-select: none;
}
.uichemy-vela-1 .l-footer__links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}
.uichemy-vela-1 .l-footer__links a,
.uichemy-vela-1 .l-footer__links span {
  font-size: var(--caps-size);
  line-height: 1.6;
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  color: #fff;
}
.uichemy-vela-1 .l-footer__links span { color: var(--foot-dim); }
@media (hover: hover) {
.uichemy-vela-1 { --uv-guard: 0; }
.l-footer__links a:hover { color: var(--accent); }}
@media (max-width: 1100px) {
.uichemy-vela-1 { --uv-guard: 0; }
.l-footer { padding: 88px 32px 56px; gap: 64px; }
.l-footer__top { flex-direction: column; align-items: flex-start; gap: 40px; }
.l-footer__phone,
.l-footer__cols { flex: none; width: 100%; }
.l-footer__talk { align-items: flex-start; text-align: left; width: 100%; }
.l-footer__cols { justify-content: flex-start; gap: 64px; }
.c-fcol { align-items: flex-start; text-align: left; padding-inline: 0; }}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.l-footer { padding: 64px var(--app-grid-padding) 40px; gap: 48px; }
.l-footer__phone { font-size: 15px; }
.l-footer__talk-label,
.l-footer__talk-mail { font-size: 2.6rem; }
.l-footer__cols { gap: 40px; }
.l-footer__links { gap: 12px; }}
@media (prefers-reduced-motion: reduce) {
.uichemy-vela-1 { --uv-guard: 0; }
.c-loading { display: none; }
.p-home-mv__title .show { transform: none !important; }
.p-home-mv__background { transform: none !important; filter: none !important; }
[data-reveal] { opacity: 1 !important; transform: none !important; }
.p-statement__lead .w { color: #111; transition: none; }
.c-metric__inner { transform: none !important; }
.c-frame img { transition: none; }
.p-cta__title span { transform: none !important; }
.c-faq__panel,
.c-faq__icon::before,
.c-faq__icon::after { transition: none; }
.c-quote { transition: none; }
.c-panel,
.c-panel__media img,
.c-panel__scan,
.c-panel__body { transition: none; }
.l-header__list::after { transition: none; }}
@media (max-width: 1100px) {
.uichemy-vela-1 { --uv-guard: 0; }
.uichemy-vela-1 { --box-pad: 44px; }
}
@media (max-width: 767px) {
.uichemy-vela-1 { --uv-guard: 0; }
.uichemy-vela-1 {
    --app-grid-col-gap: 10px;
    --app-grid-padding: 20px;
    --box-pad: 20px;
    --eyebrow-size: 13px;
    --caps-size: 11px;
  }
}


/* ══════════════════════════════════════════════════════════════════════
   Requested changes on top of the source (2026-09-15)

   The hero grid pads itself to a 1380px content box (--box-max), but the
   headline is sized in rem off a viewport-tracking root, so past ~1440px the
   type outgrows that box. Each glyph is its own flex mask, so the overflow
   was absorbed by squeezing the letters — they came out cut rather than
   wrapped.

   Fix: above 1440px the hero grid uses the page gutter instead of the 1380px
   cap, so the headline's box grows with the display and the type keeps its
   intended size. The font-size carries a ceiling derived from the width that
   is actually available (the line measures ~9.8em, 9.9 gives it margin), so
   the letters can never be squeezed again however wide the screen gets.
   The scroll cue moves to the same gutter to keep the hero's left edge true.
   Nothing changes at 1440 and below, where the source already fits.
   ══════════════════════════════════════════════════════════════════════ */
@media (min-width: 1441px) {
  .uichemy-vela-1 { --uv-guard: 0; }
  .uichemy-vela-1 .p-home-mv__grid { padding-inline: var(--box-pad); }
  .uichemy-vela-1 .p-home-mv__scroll { left: var(--box-pad); }
  .uichemy-vela-1 .p-home-mv__title {
    font-size: min(12.7rem, calc((100vw - 2 * var(--box-pad)) / 9.9));
  }
}

/* The projects head is a space-between row: label left, title right. With the
   count badge gone the title was left sitting against the right edge with dead
   space either side. Desktop now stacks the label above and lets the title use
   the FULL head width: one line, sized so the text spans the box edge to edge.
   Below 1100px the source layout is untouched. */
@media (min-width: 1101px) {
  .uichemy-vela-1 { --uv-guard: 0; }
  .uichemy-vela-1 .p-projects__head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
  }
  .uichemy-vela-1 .p-projects__title {
    width: 100%;
    max-width: none;
    text-align: center;
    white-space: nowrap;
    line-height: 1.02;
    font-size: calc(min(var(--box-max), 100vw - 2 * var(--box-pad)) / 11);
  }
  .uichemy-vela-1 .p-projects__title br { display: none; }
  .uichemy-vela-1 .p-projects__title span::before { content: "\00a0"; }
}

```

## Integrity (sha256 of each block's exact text)

| Block | Bytes | sha256 |
|---|---|---|
| B1 site_before_head (Vela slice) | 4432 | `8f320829234aaa24b1bb5ef5d2722fd26c8d642a4dc90f44007a55cc070402b4` |
| B2 site_before_body (Vela line) | 68 | `46ab74bfc62523b747c9765d6e8678997eb1defdaf11b783827b26ca0b0775dd` |
| B3 vela-app.js | 59072 | `6156927bfcb1e320aeafddc90d3984de50c68e51f6e40e44c355076e4dcd4e2f` |
| B4 section html | 36001 | `6d83e421d15541df278e588fd942e269f1f4bc517bed1de5e09730b01fa91d2b` |
| B5 section css | 49338 | `5fc4f4065d1dff60cf2d2fe3dc71320b6755d1648e9fddf246fc401df84d4470` |
| B6 site_before_head (short-viewport block) | 1688 | `a3b74f9f3c7ee352423866d92bb417028b7865c3466c0cca5d78d3852f265581` |

Section `js` is the empty string (`sha256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).

---

# APPENDIX C · VERIFYING A BUILD LIKE THIS

Drafts 404 publicly and the plugin's transformations only happen server-side, so a local
"prefix the CSS myself" harness is not proof. What was actually used here:

1. **Local harness** — fetch a real published page from the site (so you get the true WP + Nexter
   + Elementor CSS stack), graft the section into it, and emulate the plugin: prefix every
   selector, double the prefix inside `@media`, hoist every `@media` to the end. Compare against
   the standalone source in Playwright.
2. **Absolute scroll positions.** This page is virtual-scrolled (the wrapper is transformed), so
   comparing after a relative scroll gives phantom offsets. Scroll to an absolute target, wait for
   the transform to settle, then measure.
3. **Hover states too.** The gallery bug (RULE 3) is invisible in a static screenshot — assert the
   computed `filter` after a real `hover`.
4. **Live diff after every push**, at 2560 / 1920 / 1440 / 1280 / 1024 / 768 / 390, with a cache
   buster on the URL. Cloudflare will otherwise show you yesterday's JS (RULE 7).
5. **Measure heights as well as widths** (RULE 8): 844x390 and 740x360 landscape, and 1024x600.
   Assert each full-height section is `<= innerHeight`, not merely that nothing overflows
   sideways.

**Two measuring traps that cost time here.** The loader holds the page for up to 8s, so a
measurement taken before `#loading.is-done` reads a half-built layout — an early sweep of mine
reported `document.scrollHeight === innerHeight` at three widths and looked exactly like a dead
virtual scroll; nine clean re-runs showed the spacer set and the page scrolling normally. Wait
on the loader class, then measure. And a cache-buster query string made `page.goto` abort
outright on this host: fetch the bare URL and bust the cache per-asset instead.

