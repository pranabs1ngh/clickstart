import React, { Suspense } from "react";

/** Generated from the Framer section "Header".
 *  Renders to the same DOM as the original - the Suspense boundaries here are
 *  Framer's hydration markers, so removing them would break its runtime.
 *  Everything else is ordinary JSX: edit it like any other component. */
export default function Header() {
  return (
    <div className="framer-nx0ca2" data-border="true" data-framer-name="Header">
      <div className="framer-zp627i" data-border="true">
        <div className="ssr-variant hidden-kz14hy">
          <Suspense fallback={null}>
            <a className="framer-15vdg9n framer-lux5qc" data-framer-name="Logo">
              <div className="framer-1f3m4gi">
                <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                  <img width="205" height="126" src="/assets/img/900fe8fe33c406c5.webp" alt="" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} loading="eager" />
                </div>
              </div>
              <div className="ssr-variant hidden-12ibufm hidden-ajyjij">
                <div className="framer-blwqf7" data-framer-name="ClickStart placeholder logo" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                  <div dir="auto" style={{ "--font-selector": "Q1VTVE9NVjI7SW50ZXIgVGlnaHQgU2VtaUJvbGQ=", "--framer-font-family": "\"Inter Tight SemiBold\", \"Inter Tight SemiBold Placeholder\", sans-serif", "--framer-font-size": "20px", "--framer-font-weight": "600", "--framer-letter-spacing": "-1px", "--framer-line-height": "1em", "--framer-text-color": "var(--token-8f2a02c2-6f36-454d-a523-0607b7f8cc20)" }} className="framer-text">
                    {"clickstart."}
                  </div>
                </div>
              </div>
              <div className="ssr-variant hidden-72rtr7">
                <div className="framer-blwqf7" data-framer-name="ClickStart placeholder logo" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                  <div className="framer-text framer-styles-preset-1k5gyrp" data-styles-preset="qiSFrSK8M" dir="auto">
                    {"clickstart."}
                  </div>
                </div>
              </div>
            </a>
          </Suspense>
        </div>
        <div className="ssr-variant hidden-12ibufm hidden-ajyjij hidden-72rtr7">
          <Suspense fallback={null}>
            <a className="framer-15vdg9n framer-lux5qc" data-framer-name="Logo" href="./" data-framer-page-link-current="true">
              <div className="framer-1f3m4gi">
                <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                  <img decoding="async" width="205" height="126" src="/assets/img/900fe8fe33c406c5.webp" alt="" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} loading="lazy" />
                </div>
              </div>
              <div className="framer-blwqf7" data-framer-name="ClickStart placeholder logo" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <div dir="auto" style={{ "--font-selector": "Q1VTVE9NVjI7SW50ZXIgVGlnaHQgU2VtaUJvbGQ=", "--framer-font-family": "\"Inter Tight SemiBold\", \"Inter Tight SemiBold Placeholder\", sans-serif", "--framer-font-size": "20px", "--framer-font-weight": "600", "--framer-letter-spacing": "-1px", "--framer-line-height": "1em", "--framer-text-color": "var(--token-8f2a02c2-6f36-454d-a523-0607b7f8cc20)" }} className="framer-text">
                  {"clickstart."}
                </div>
              </div>
            </a>
          </Suspense>
        </div>
        <div className="framer-1jarks2" data-framer-name="Header actions">
          <div className="framer-69iruy-container">
            <Suspense fallback={null}>
              <time role="status" aria-live="polite" aria-label="India Standard Time 01:30:07" dateTime="01:30:07" style={{ position: "relative", display: "inline-block", width: "max-content", minWidth: "max-content", background: "transparent", color: "rgb(33, 33, 33)", fontSize: "14px", fontFamily: "inherit", fontWeight: "inherit", lineHeight: "1em", letterSpacing: "inherit", whiteSpace: "nowrap" }}>
                {"IST 01:30:07"}
              </time>
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <a className="framer-13gw3bh framer-lux5qc" data-framer-name="Email studio" data-reset="button" href="mailto:youakanksha@gmail.com" target="_blank">
              <svg className="framer-my9st framer-334l4f" role="presentation" viewBox="0 0 24 24">
                <use href="#130366660" />
              </svg>
            </a>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
