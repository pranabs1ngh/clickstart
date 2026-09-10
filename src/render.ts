// Renders one page to the exact HTML Framer published.
//
// Shared by two callers:
//   scripts/prerender.mts  — at build time, writing .rendered/*.html
//   app/**/route.ts        — per request in development, so an edit to a
//                            section shows up on refresh
//
// Production always serves the prerendered file; this module is what produced
// it, so the two cannot drift.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ComponentType } from "react";
import { structuredData } from "./seo";

export interface Page {
  route: string;
  component: string;
  file: string;
  prologue: string;
  htmlAttrs: string;
  head: string;
  afterHead: string;
  verbatim: string[];
}

const root = process.cwd();

export const manifest: { pages: Page[] } = JSON.parse(
  readFileSync(join(root, "src/manifest.json"), "utf8")
);

export function pageFor(file: string): Page {
  const page = manifest.pages.find((p) => p.file === file);
  if (!page) throw new Error(`No manifest entry for ${file}`);
  return page;
}

/** Where this site is published. Overridable, but no longer a guess. */
const DEFAULT_ORIGIN = "https://clickstart.studio";

/**
 * The origin this site will be served from, used to make canonical, og:url and
 * og:image absolute. Set SITE_URL to override — that is the one answer that
 * survives preview deployments, which each get a different generated hostname
 * and must not advertise themselves as canonical.
 *
 * Falls back to Vercel's production domain, then to the production domain
 * above. Empty means "leave them relative", which now only happens if someone
 * sets SITE_URL to something unparseable.
 */
export const SITE_ORIGIN = (() => {
  const raw = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const value = raw || (vercel ? `https://${vercel}` : DEFAULT_ORIGIN);
  if (!value) return "";
  try {
    // Normalise away a trailing slash so `origin + "/about"` cannot double up.
    return new URL(value.startsWith("http") ? value : `https://${value}`).origin;
  } catch {
    return "";
  }
})();

/**
 * JSON-LD for the home page only. The 404 is noindex, and describing the
 * business on a page you have asked Google not to index is noise.
 */
function structuredDataFor(page: Page): string {
  return page.route === "/" ? structuredData(SITE_ORIGIN) : "";
}

/** One page component -> the complete HTML document Framer would have served. */
export async function renderPage(page: Page, Component: ComponentType): Promise<string> {
  // Both imports are dynamic on purpose: NODE_ENV decides which build of react
  // AND react-dom is loaded, and a static import would be hoisted above the
  // NODE_ENV assignment the prerender script makes before calling this.
  // Loading one build of react against the other build of react-dom fails
  // outright ("dispatcher.getOwner is not a function").
  const { createElement } = await import("react");
  const { renderToString } = await import("react-dom/server");

  let body = renderToString(createElement(Component));

  // Anything React emitted BEFORE <body> is its own hoisted output, not ours:
  // every <link>/<meta>/<script> of Framer's was parked verbatim, and React 19
  // additionally invents <link rel="preload" as="image"> for images it sees
  // with fetchPriority="high". Useful in a React app, but here it is a tag
  // Framer never wrote, sitting outside the document's <head>.
  const bodyStart = body.indexOf("<body");
  if (bodyStart > 0) body = body.slice(bodyStart);

  // Splice back the fragments React cannot reproduce in place.
  page.verbatim.forEach((frag, i) => {
    body = body.replace(`<span data-fnj-slot="${i}"></span>`, () => frag);
  });

  // React inserts <!-- --> between adjacent text nodes so IT can hydrate them
  // later. Nothing here hydrates through React — Framer's own runtime adopts
  // this DOM — so the separators are dead weight, and the last remaining
  // difference from the original bytes.
  body = body.replace(/<!-- -->/g, "");

  // Canonical / og:url are stored ROOT-RELATIVE, because conversion happens
  // long before anyone knows which domain will serve this. Render time is when
  // that stops being true, so resolve them here: Google treats a relative
  // canonical as a weak signal and Lighthouse's canonical audit fails outright
  // on one. Without an origin they stay relative — still correct, just weaker
  // — so an export that is only ever run locally is unaffected.
  //
  // og:image and twitter:image get the same treatment for a harder reason:
  // a relative one is not a weaker signal, it is ignored outright. Facebook,
  // Slack and X all fetch the card image out of band, with no page to resolve
  // it against, so a link to a site whose og:image is "/assets/og.png" unfurls
  // with no image at all.
  const absolutise = (html: string) =>
    html
      .replace(
        /(<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=)["'](\/[^"']*)["']/gi,
        (_m, pre, path) => `${pre}"${SITE_ORIGIN}${path}"`
      )
      .replace(
        /(<meta\b[^>]*\b(?:property|name)=["'](?:og:url|og:image|twitter:image)["'][^>]*\bcontent=)["'](\/[^"']*)["']/gi,
        (_m, pre, path) => `${pre}"${SITE_ORIGIN}${path}"`
      );

  const head = (SITE_ORIGIN ? absolutise(page.head) : page.head) + structuredDataFor(page);

  return `${page.prologue}<html${page.htmlAttrs}><head>${head}</head>${page.afterHead}${body}</html>`;
}
