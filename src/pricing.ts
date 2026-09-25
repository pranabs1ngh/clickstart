// The two prices shown on the pricing section and mirrored into the JSON-LD
// graph in src/seo.ts, computed from one base so the two cannot drift.
//
// Set PRICING_BASE to change the landing page starting price - at build time
// for production, or per-request in dev (see src/render.ts for the same
// pattern with SITE_URL). The retainer starts a fixed $2,300 above that base,
// not as an independent price. Development is a flat +$1,000 add-on shown as
// a label on the landing page card, not a price of its own, so it is not
// computed here.

const DEFAULT_BASE_PRICE = 999;
const RETAINER_ADDON = 2300;

function parseBase(): number {
  const raw = process.env.PRICING_BASE;
  const n = Number(raw);
  return raw && Number.isFinite(n) && n > 0 ? n : DEFAULT_BASE_PRICE;
}

/** Landing page: "starts at $<price>". */
export const LANDING_PAGE_PRICE = parseBase();

/** Retainer: "starts at $<price>", development included. */
export const RETAINER_PRICE = LANDING_PAGE_PRICE + RETAINER_ADDON;
