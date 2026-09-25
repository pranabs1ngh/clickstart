// Structured data for the site, emitted as JSON-LD at the end of <head>.
//
// Framer publishes none, so search engines have to infer what this business is
// from prose alone. The graph below states it outright: who the studio is, how
// to reach it, and what the two packages on the pricing section actually cost.
// The prices come from src/pricing.ts, the same module the pricing section
// renders from, so the two cannot contradict each other.

import { LANDING_PAGE_PRICE, RETAINER_PRICE } from "./pricing";

const EMAIL = "youakanksha@gmail.com";
const TWITTER = "https://x.com/uiakanksha_";

/** The JSON-LD graph for the home page, as a ready-to-inline <script> tag. */
export function structuredData(origin: string): string {
  // Without an origin the @ids would be bare fragments, which is not a valid
  // graph. Relative URLs are the local-only case, so emit nothing there.
  if (!origin) return "";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${origin}/#studio`,
        name: "Curvex Studio",
        alternateName: "Curvex",
        url: `${origin}/`,
        email: EMAIL,
        description:
          "Design studio for startups and SaaS. We design and build websites and " +
          "digital products, with the same team handling design and development " +
          "from kickoff to launch.",
        logo: `${origin}/assets/img/e527f1b4a8e21316.png`,
        image: `${origin}/assets/og.png`,
        priceRange: "$$",
        areaServed: { "@type": "Place", name: "Worldwide" },
        sameAs: [TWITTER],
        knowsAbout: [
          "Web design",
          "Product design",
          "UI/UX design",
          "Landing page design",
          "Conversion rate optimization",
          "Web development",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Design services",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Landing page",
              description:
                "A high-impact landing page for startups and teams, designed to " +
                "convert. Desktop and mobile, Figma source, interactive prototype, " +
                "up to two revision rounds, 15-20 day turnaround.",
              price: String(LANDING_PAGE_PRICE),
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: String(LANDING_PAGE_PRICE),
                priceCurrency: "USD",
                valueAddedTaxIncluded: false,
                // The page says "starts at $<LANDING_PAGE_PRICE>".
                minPrice: String(LANDING_PAGE_PRICE),
              },
              itemOffered: {
                "@type": "Service",
                name: "Landing page design",
                serviceType: "Web design",
              },
            },
            {
              "@type": "Offer",
              name: "Retainer",
              description:
                "A dedicated design partner for ongoing UI/UX work across websites, " +
                "landing pages and product design. One active request at a time, " +
                "unlimited revisions, development included.",
              price: String(RETAINER_PRICE),
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: String(RETAINER_PRICE),
                priceCurrency: "USD",
                unitCode: "MON",
              },
              itemOffered: {
                "@type": "Service",
                name: "Ongoing design retainer",
                serviceType: "Product design",
              },
            },
          ],
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Sales",
          email: EMAIL,
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: "Curvex Studio",
        publisher: { "@id": `${origin}/#studio` },
        inLanguage: "en",
      },
    ],
  };

  // </script> inside a JSON string would close the tag early; < is the only
  // character that can do that, and escaping it keeps the JSON valid.
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}
