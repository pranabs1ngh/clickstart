import React, { Suspense } from "react";
import Header from "@/src/sections/home/Header";
import StudioSplitLayout from "@/src/sections/home/StudioSplitLayout";

/** The "/" page, composed from its Framer sections.
 *
 *  Rendered to static HTML by scripts/prerender.mts at build time - never
 *  shipped as a page.tsx, which would duplicate every byte of this markup into
 *  the RSC flight payload on top of the HTML itself. */
export default function HomePage() {
  return (
    <body>
      {"\n\t\n\t"}
      <span data-fnj-slot={"0"} />
      {"\n    \n    "}
      <span data-fnj-slot={"1"} />
      {"\n\t\n\t"}
      <div id="main" data-framer-hydrate-v2={"{\"routeId\":\"augiA20Il\",\"localeId\":\"default\",\"breakpoints\":[{\"hash\":\"kz14hy\",\"mediaQuery\":\"(min-width: 1400px)\"},{\"hash\":\"72rtr7\",\"mediaQuery\":\"(min-width: 1200px) and (max-width: 1399.98px)\"},{\"hash\":\"12ibufm\",\"mediaQuery\":\"(min-width: 810px) and (max-width: 1199.98px)\"},{\"hash\":\"ajyjij\",\"mediaQuery\":\"(max-width: 809.98px)\"}]}"} data-framer-ssr-released-at="2026-08-28T13:39:01.898Z" data-framer-page-optimized-at="2026-08-29T20:00:07.854Z" data-framer-generated-page="">
        <Suspense fallback={null}>
          <style data-framer-html-style="" dangerouslySetInnerHTML={{ __html: "html body { background: rgb(255, 255, 255); }" }} />
          <div data-framer-root="" className="framer-VYgbL framer-yjBC2 framer-ZRBG4 framer-LbKwc framer-frlD7 framer-72rtr7" style={{ minHeight: "100vh", width: "auto" }}>
            <Header />
            <div className="framer-u5kiwi">
              <div className="framer-imje8n" data-border="true">
                <StudioSplitLayout />
              </div>
            </div>
          </div>
          <div id="overlay" />
        </Suspense>
      </div>
      <span data-fnj-slot={"2"} />
      {"\n\t"}
      <span data-fnj-slot={"3"} />
      {"\n\t\n\t\n\t"}
      <span data-fnj-slot={"4"} />
      <span data-fnj-slot={"5"} />
      {"\n\t"}
      <span data-fnj-slot={"6"} />
      {"\n\t"}
      <span data-fnj-slot={"7"} />
      <span data-fnj-slot={"8"} />
      <span data-fnj-slot={"9"} />
      <span data-fnj-slot={"10"} />
      <span data-fnj-slot={"11"} />
      <span data-fnj-slot={"12"} />
      <span data-fnj-slot={"13"} />
      <div id="svg-templates" style={{ position: "absolute", overflow: "hidden", bottom: "0", left: "0", width: "0", height: "0", zIndex: "0", contain: "strict" }} aria-hidden="true">
        {"\n"}
        <svg id="130366660" display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M 18 0 L 9 8.25 L 0 0 Z" fillOpacity="var(--1m6trwb, 0)" fill="var(--21h8s6, rgb(0, 0, 0))" height="8.25px" id="fBvsUDrT1" transform="translate(3 5.25)" width="18px" />
          <path d="M 18 0 L 9 8.25 L 0 0" fill="transparent" height="8.25px" id="zL0RJwE35" strokeDasharray="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(3 5.25)" width="18px" />
          <path d="M 0 0 L 18 0 L 18 0 L 18 12.75 C 18 13.164 17.664 13.5 17.25 13.5 L 0.75 13.5 C 0.336 13.5 0 13.164 0 12.75 L 0 0 Z" fill="transparent" height="13.5px" id="s2R3TlhwE" strokeDasharray="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(3 5.25)" width="18px" />
          <path d="M 7.133 0 L 0 6.538" fill="transparent" height="6.538125000000008px" id="q527l9e1Z" strokeDasharray="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(3.232 12)" width="7.1325px" />
          <path d="M 7.133 6.538 L 0 0" fill="transparent" height="6.538125000000008px" id="DBenWAD9E" strokeDasharray="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(13.636 12)" width="7.132500000000007px" />
        </svg>
        {"\n"}
        <svg id="3813546745" display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 4.5 L 16.5 4.5 L 16.5 0.75 C 16.5 0.336 16.164 0 15.75 0 L 0.75 0 C 0.336 0 0 0.336 0 0.75 Z" fillOpacity="var(--1m6trwb, 0)" fill="var(--21h8s6, rgb(0, 0, 0))" height="4.5px" id="JiZmT3ndS" transform="translate(3.75 3.75)" width="16.5px" />
          <path d="M 0.75 16.5 C 0.336 16.5 0 16.164 0 15.75 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 15.75 0 C 16.164 0 16.5 0.336 16.5 0.75 L 16.5 15.75 C 16.5 16.164 16.164 16.5 15.75 16.5 Z" fill="transparent" height="16.5px" id="aNTzcRNMo" strokeDasharray="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(3.75 3.75)" width="16.5px" />
          <path d="M 0 0 L 0 3" fill="transparent" height="3px" id="IgdNyxBYx" strokeDasharray="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(16.5 2.25)" width="1px" />
          <path d="M 0 0 L 0 3" fill="transparent" height="3px" id="gCbtbIwHM" strokeDasharray="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(7.5 2.25)" width="1px" />
          <path d="M 0 0 L 16.5 0" fill="transparent" height="1px" id="AtUUTbK3W" strokeDasharray="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(3.75 8.25)" width="16.5px" />
          <path d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 C 1.746 0 2.25 0.504 2.25 1.125 C 2.25 1.746 1.746 2.25 1.125 2.25 C 0.504 2.25 0 1.746 0 1.125 Z" fill="var(--21h8s6, rgb(0, 0, 0))" height="2.25px" id="jlKgepkKQ" transform="translate(10.875 11.25)" width="2.25px" />
          <path d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 C 1.746 0 2.25 0.504 2.25 1.125 C 2.25 1.746 1.746 2.25 1.125 2.25 C 0.504 2.25 0 1.746 0 1.125 Z" fill="var(--21h8s6, rgb(0, 0, 0))" height="2.25px" id="exsXG7Mk2" transform="translate(15 11.25)" width="2.25px" />
          <path d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 C 1.746 0 2.25 0.504 2.25 1.125 C 2.25 1.746 1.746 2.25 1.125 2.25 C 0.504 2.25 0 1.746 0 1.125 Z" fill="var(--21h8s6, rgb(0, 0, 0))" height="2.25px" id="CjmBOO2R_" transform="translate(6.75 15)" width="2.25px" />
          <path d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 C 1.746 0 2.25 0.504 2.25 1.125 C 2.25 1.746 1.746 2.25 1.125 2.25 C 0.504 2.25 0 1.746 0 1.125 Z" fill="var(--21h8s6, rgb(0, 0, 0))" height="2.25px" id="kxeQIuyfA" transform="translate(10.875 15)" width="2.25px" />
          <path d="M 0 1.125 C 0 0.504 0.504 0 1.125 0 C 1.746 0 2.25 0.504 2.25 1.125 C 2.25 1.746 1.746 2.25 1.125 2.25 C 0.504 2.25 0 1.746 0 1.125 Z" fill="var(--21h8s6, rgb(0, 0, 0))" height="2.25px" id="emETPOb2C" transform="translate(15 15)" width="2.25px" />
        </svg>
        {"\n"}
      </div>
      {"\n\t"}
      <span data-fnj-slot={"14"} />
      {"\n    \n    "}
      <span data-fnj-slot={"15"} />
      {"\n\n\n"}
    </body>
  );
}
