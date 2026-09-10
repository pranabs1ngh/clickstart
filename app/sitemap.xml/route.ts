import { manifest, SITE_ORIGIN } from "../../src/render";

export const dynamic = "force-static";

// Built from the same manifest the pages are rendered from, so a page added
// there cannot be missing here. /404 is excluded: it is noindex, and listing a
// noindex URL in a sitemap is a Search Console warning.
export async function GET() {
  const urls = manifest.pages
    .filter((page) => page.route !== "/404")
    .map((page) => `  <url>\n    <loc>${SITE_ORIGIN}${page.route}</loc>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
