import { SITE_ORIGIN } from "../../src/render";

export const dynamic = "force-static";

// Framer ships no robots.txt, so crawlers get a 404 and no pointer to the
// sitemap. Everything here is crawlable; the only thing worth saying is where
// the sitemap lives.
export async function GET() {
  const lines = ["User-agent: *", "Allow: /", ""];
  if (SITE_ORIGIN) lines.push(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`, "");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
