# magenta-style-920096-framer-app

A Next.js project generated from [https://magenta-style-920096.framer.app/](https://magenta-style-920096.framer.app/) by [FNJ](https://framertonextjs.com).

## What this is

2 page(s) built from 2 React section component(s). Unlike a
look-alike export, these are real components you can read and edit - and they
still render **the same DOM** as the original Framer site: every element,
attribute, text node and hydration marker, in the same order. Framer's runtime
adopts the page exactly as it would its own, so nothing about the published
behaviour changes.

(The bytes are not character-for-character identical, and don't need to be:
React writes `fetchPriority` where Framer wrote `fetchpriority`, and
re-serialises `style="a: 1;"` as `style="a:1"`. Both parse to the same DOM
and compute the same CSS.)

```
src/views/         one component per route, composed from its sections
src/sections/      the Framer sections, one file each, named as you named them
src/manifest.json  the <head> and the verbatim fragments for each page
scripts/           the prerender step
app/               route handlers that serve the prerendered HTML
public/assets/     self-hosted images, fonts and media
```

## Running it

```bash
npm install
npm run dev
```

## The site origin

Framer hard-codes `<link rel="canonical">` and `og:url` to its own domain, so
they were rewritten to root-relative paths at conversion - at which point
nobody yet knew the domain. `src/render.ts` now resolves them back to
`https://clickstart.studio` at build time, along with `og:image` and
`twitter:image`, which are worse than weak when relative: link previews fetch
the image with no page to resolve it against, so a relative one unfurls as no
image at all.

Override with `SITE_URL` when building for somewhere else:

```bash
SITE_URL=https://staging.example.com npm run build
```

Preview deployments must not advertise themselves as canonical, so on Vercel
the order is `SITE_URL`, then the Vercel production domain, then the default
above.

## Patches to Framer's runtime bundle

`public/assets/framer/shared-lib.*.mjs` is Framer's compiled runtime, and it is
**not** vendor-original any more. It re-renders parts of the page on hydration,
so anything it owns cannot be fixed in the JSX alone - an edit to the
server-rendered HTML is simply overwritten once JavaScript runs. Two things had
to be corrected there, and both are commented in the file:

- **The page title.** `framer.Dx8GZHVb.mjs` runs `document.title = e.title` on
  hydration, and Framer's placeholder metadata said `My Framer Site`. The tab
  reverted to the placeholder a moment after load regardless of what `<title>`
  the server sent. The title and description in that metadata must stay in step
  with `src/manifest.json`.
- **The cal.com embed.** See below.

Two consequences worth knowing:

- **Re-exporting from Framer overwrites these patches.** After any re-export,
  re-apply both, or the title reverts and the calendar goes back to being a
  fixed-height zoomed iframe.
- **Editing the bundle means renaming it.** The filename carries a content hash
  and `_headers` serves `/assets/*` as `immutable` for a year, so patching the
  contents behind an unchanged name would leave returning visitors running the
  old bundle against the new HTML. Recompute the hash, rename the file, and
  update every reference - `src/manifest.json` (a modulepreload link),
  `script_main.*.mjs` (two dynamic imports), and
  `SZ0BNF...CmiV7yix.mjs` (a static import).

## The cal.com booking embed

Framer rendered the booker as a raw `<iframe>` in a fixed-height box, scaled
down with CSS `zoom` - 0.7 desktop, 0.8 tablet, 0.5 mobile. Its own embed
component says why, in the runtime bundle: `URL embeds do not support auto
height.` A plain iframe cannot report its content height, so the height was
guessed once per breakpoint and the page shrunk to fit. On a phone that meant
the booker drew at half size and laid itself out for a viewport twice the
device width; on desktop anything past the guessed height scrolled inside the
box.

`src/cal-embed.ts` replaces it with cal.com's official embed, which supplies
the missing half of the conversation: the booking iframe posts a
`__dimensionChanged` message with its content height and the script assigns it
to `iframe.style.height`. The box then follows the content, so there is nothing
to clip and nothing to scroll. The runtime node and the JSX both render an
empty `<div id="cal-booking">` for it to fill, and they have to agree.

Mounting has to survive hydration. React deletes DOM children it did not
create from a node it is hydrating, and the cal.com iframe is exactly such a
child, so mounting before hydration reaches this node gets the calendar wiped -
which is why refreshing with the booking section already on screen showed an
empty box. The script therefore polls and re-mounts whenever the `<cal-inline>`
element is missing, bounded to six attempts. The condition is deliberately "not
mounted" rather than "was mounted and then vanished": the tighter-looking
version is a race that misses a wipe landing between two polls, and it left
desktop Safari empty while Chromium happened to catch it.

Verified in Chromium and WebKit, desktop and iPhone, including a throttled
mobile run - see "Checking it in a browser" below.

## SEO

Beyond the origin, the pieces worth knowing about:

- **`src/manifest.json`** holds each page's `<head>` verbatim - title,
  description, Open Graph and X card tags all live there, not in JSX.
- **`src/seo.ts`** builds the JSON-LD graph (the studio, its two packages and
  their prices, the website node). The prices mirror the pricing section; if
  one changes, change both.
- **`public/assets/og.png`** is the 1200x630 link-preview card, regenerated by
  `node scripts/make-og-image.mjs`. The PNG is committed, so the build does not
  depend on that script.
- **`app/robots.txt/`** and **`app/sitemap.xml/`** are generated from the same
  manifest and origin, so a page added to the manifest appears in the sitemap
  automatically. `/404` is excluded and serves `noindex`.

## Editing

Edit any file under `src/sections/` and refresh - the dev server renders the
components on every request, so the change is there. (`npm run build` renders
them once to static HTML, which is what production serves.)

Two things in the generated JSX are load-bearing rather than stylistic:

- **`<Suspense>` boundaries** are Framer's hydration markers. Its runtime reads
  them to adopt this DOM instead of re-rendering the page, so removing one
  changes how that part of the page boots.
- **`data-fnj-slot` spans** are placeholders for fragments React cannot emit in
  place (scripts, comments). The prerender step swaps them for the original
  bytes.

Everything else - classes, styles, text, structure - is ordinary JSX.

## Checking it in a browser

Most of what broke here - hydration wiping the embed, the runtime resetting the
title, headings reverting - is invisible in the built HTML and only shows up
once Framer's runtime executes. Static checks miss all of it.

```bash
npm run build && npm run start
npx playwright install chromium webkit      # once
```

Then load the page and watch the console. Two errors are pre-existing, present
in the untouched Framer export, and not worth chasing: React #405, and a
hydration mismatch on the header's live clock (server time never matches client
time). Anything else is worth a look, particularly a mismatch naming an element
that was retagged.
