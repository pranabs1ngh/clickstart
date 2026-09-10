// Renames public/assets/framer/shared-lib.<hash>.mjs to match its contents,
// and updates every reference to it.
//
// That bundle is patched (see the comments at the top of it), and its filename
// carries a content hash that _headers serves as `immutable` for a year. Edit
// the contents without renaming the file and returning visitors keep running
// the old bundle against the new HTML - the title reverts and the calendar
// breaks - so run this after every edit:
//
//   node scripts/rehash-framer-bundle.mjs
//
// It is a no-op when the contents already match the name.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "public/assets/framer";

// Everything that names the bundle: a modulepreload link in the page head, two
// dynamic imports, one static import, and its own sourceMappingURL comment.
const REFERRERS = [
  "src/manifest.json",
  join(DIR, "SZ0BNF6bR7OTUOnQqRAIn-SKz42egS-87jvniEwntEU.CmiV7yix.mjs"),
  join(DIR, "script_main.D911vS5f.mjs"),
];

const matches = readdirSync(DIR).filter((f) => /^shared-lib\..+\.mjs$/.test(f));
if (matches.length !== 1) throw new Error(`expected one shared-lib bundle, found ${matches.length}`);

const file = matches[0];
const oldStem = file.slice(0, -4);
const text = readFileSync(join(DIR, file), "utf8");

// The bundle names itself, in a sourceMappingURL comment. Hashing it as-is
// would mean every rename changed the contents and so produced yet another
// hash, and the script would never settle. Hash a copy with its own name
// blanked out instead, so the result depends only on the code.
const canonical = text.split(oldStem).join("shared-lib.__SELF__");

// Framer's own names are 8 url-safe base64 characters; match the shape so the
// patched file does not look foreign next to the rest.
const hash = createHash("sha256")
  .update(canonical)
  .digest("base64url")
  .slice(0, 8)
  .replace(/-/g, "x")
  .replace(/_/g, "y");
const newStem = `shared-lib.${hash}`;

if (oldStem === newStem) {
  console.log(`${file} already matches its contents`);
  process.exit(0);
}

let updated = 0;
for (const ref of [...REFERRERS, join(DIR, file)]) {
  const text = readFileSync(ref, "utf8");
  const n = text.split(oldStem).length - 1;
  if (!n) continue;
  writeFileSync(ref, text.split(oldStem).join(newStem));
  console.log(`  ${ref}: ${n} reference(s)`);
  updated += n;
}
renameSync(join(DIR, file), join(DIR, `${newStem}.mjs`));
console.log(`${oldStem} -> ${newStem} (${updated} reference(s) updated)`);
