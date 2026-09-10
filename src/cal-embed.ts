// The cal.com booking embed, and the CSS that lets it size itself.
//
// Framer shipped this as a raw <iframe> in a fixed-height box, scaled down with
// CSS `zoom` - 0.7 on desktop, 0.8 on tablet, 0.5 on mobile. Its own embed
// component explains why, in shared-lib.*.mjs: "URL embeds do not support auto
// height." A plain iframe cannot tell its parent how tall its content is, so
// the height was guessed once per breakpoint and the page shrunk to fit. On a
// phone that meant the booker rendered at half size and laid itself out for a
// viewport twice the device width, and anything past the guessed height
// scrolled inside the box.
//
// cal.com's own embed script has the missing half of the conversation: the
// booking iframe posts a __dimensionChanged message with its content height and
// the script assigns it to iframe.style.height. So the box follows the content
// through loading, picking a date and opening the booking form, and there is
// nothing to clip and nothing to scroll.

/** The cal.com event this page books. */
const CAL_LINK = "clickstart.studio/15mins";
const CAL_ORIGIN = "https://cal.com";
const EMBED_JS = "https://app.cal.com/embed/embed.js";

// Framer sizes the embed's container and its section to fixed pixel heights and
// clips the overflow, which is what produced the inner scrollbar on desktop.
// These rules are emitted after Framer's stylesheet with the same specificity,
// so they win on source order, including over its media-query variants, which
// media queries do not make more specific.
const CSS = `
.framer-VYgbL .framer-395ilt-container {
  flex: none;
  height: auto;
  min-height: 620px;
}
.framer-VYgbL .framer-10sopgg {
  height: auto;
  overflow: visible;
}
#cal-booking {
  width: 100%;
}
`;

// cal.com's loader. embed.js throws "Cal is not defined" unless window.Cal and
// its queue already exist, so the stub has to be inline and has to run first;
// calls made before the script arrives are queued and replayed.
const LOADER = `(function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["initNamespace",namespace])}else p(cal,ar);return}p(cal,ar)}})(window,"${EMBED_JS}","init");`;

// Mounting has to survive Framer's hydration.
//
// Framer's runtime hydrates this section with React, and React deletes DOM
// children it did not create from a node it is hydrating. cal.com's iframe is
// exactly such a child, so when it mounts before hydration reaches this node it
// gets wiped and the calendar never appears. That is why refreshing with the
// booking section already on screen broke it, and why it showed up mostly on
// mobile: hydration lands later there, after the embed has mounted.
//
// So mount, then keep checking, and mount again whenever the <cal-inline>
// element is not there. A second inline() is allowed precisely in this case:
// cal.com refuses one only while its previous element is still in the document
// (`this.cal.inlineEl && document.body.contains(this.cal.inlineEl)`), and a
// wiped element is not.
//
// The condition is deliberately "not mounted" rather than "was mounted and
// then vanished". Tracking the disappearance looks tighter but is a race: if
// React wipes the embed between two polls, the poll never witnesses it mounted
// and never recovers. That is exactly what left desktop Safari with an empty
// box while Chromium happened to catch it in time. Duplicate work is instead
// held off by the queue check and a short settle window.
const INIT = `
Cal("init", { origin: "${CAL_ORIGIN}" });
(function () {
  var tries = 0, settleUntil = 0;
  function container() { return document.getElementById("cal-booking"); }
  function mounted() { var el = container(); return !!(el && el.querySelector("cal-inline")); }
  // A call we made has not been processed yet: embed.js drains this queue on
  // load and empties it, so a non-empty queue means "already asked, still
  // waiting" and we must not ask again.
  function pending() { return !!(window.Cal && window.Cal.q && window.Cal.q.length); }
  function mount() {
    if (!container() || pending() || Date.now() < settleUntil || tries >= 6) return;
    tries++;
    settleUntil = Date.now() + 1500;
    Cal("inline", {
      elementOrSelector: "#cal-booking",
      calLink: "${CAL_LINK}",
      config: { layout: "month_view" }
    });
    Cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  }
  function check() { if (!mounted()) mount(); }
  function start() {
    mount();
    var timer = setInterval(check, 200);
    setTimeout(function () { clearInterval(timer); }, 30000);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
`;

// INIT keeps its newlines on purpose. It contains // line comments, and
// collapsing the script onto one line would turn the first of them into a
// comment that swallows everything after it.
/** The <style> and <script> the booking page needs, for the end of <head>. */
export function calEmbed(): string {
  return (
    `<link rel="preconnect" href="https://app.cal.com">` +
    `<style data-cal-embed="">${CSS.replace(/\s+/g, " ").trim()}</style>` +
    `<script>${LOADER}\n${INIT.trim()}</script>`
  );
}
