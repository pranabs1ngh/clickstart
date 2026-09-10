// Regenerates public/assets/og.png, the 1200x630 card that Facebook, LinkedIn,
// Slack and X show when someone pastes a link to this site.
//
// Run by hand after changing the wording or the brand colours:
//
//   node scripts/make-og-image.mjs
//
// The PNG it writes is committed, so the build does not depend on this script
// or on sharp — which is a transitive dependency of Next, not one this project
// declares. Text is set in a system sans rather than the site's Inter Tight,
// because the SVG rasteriser only sees fonts installed on the machine.

import sharp from "sharp";

const W = 1200, H = 630;
const INK = "#212121", MUTED = "#545454", ACCENT = "#ec4f00", BG = "#f5f5f5";
const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="${ACCENT}"/>
  <text x="176" y="112" font-family='${SANS}' font-size="38" font-weight="600"
        letter-spacing="-1.6" fill="${INK}">clickstart.</text>
  <text x="80" y="292" font-family='${SANS}' font-size="82" font-weight="700"
        letter-spacing="-3.2" fill="${INK}">Web &amp; product design</text>
  <text x="80" y="386" font-family='${SANS}' font-size="82" font-weight="700"
        letter-spacing="-3.2" fill="${INK}">for startups and SaaS.</text>
  <text x="80" y="452" font-family='${SANS}' font-size="29" font-weight="400"
        fill="${MUTED}">Websites and digital products, designed and built by one team.</text>
  <text x="80" y="558" font-family='${SANS}' font-size="26" font-weight="600"
        letter-spacing="-0.5" fill="${INK}">clickstart.studio</text>
  <circle cx="826" cy="550" r="7" fill="${ACCENT}"/>
  <text x="848" y="558" font-family='${SANS}' font-size="22" font-weight="600"
        letter-spacing="1.8" fill="${MUTED}">ACCEPTING PROJECTS</text>
</svg>`;

const logo = await sharp("public/assets/img/900fe8fe33c406c5.webp")
  .resize({ height: 56 })
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 74, left: 80 }])
  .png({ compressionLevel: 9 })
  .toFile("public/assets/og.png");

const meta = await sharp("public/assets/og.png").metadata();
console.log(`og.png ${meta.width}x${meta.height}`);
