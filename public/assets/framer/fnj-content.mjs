// The text of this site, lifted out of Framer's compiled components.
//
// Edit a value in `c` and it changes on the site. Keys are derived from the
// original text; changing a value does not change its key, so find the text
// you want with your editor's search.
//
// Run `npm run prerender` (or `npm run build`) after editing. That is what
// puts your text into the HTML the server sends - without it the change only
// appears once JavaScript has run, which means a flash of the old text and
// search engines still reading the old text.
//
// t_1000, t_3499 and t_2000 are the landing page, retainer and
// landing-page-with-development prices. shared-lib.F2AznzMP.mjs reads them
// from here on hydration, but they are plain strings, not computed - they
// must be kept equal to src/pricing.ts's LANDING_PAGE_PRICE, RETAINER_PRICE
// and LANDING_PAGE_PRICE+1000 by hand, or the price on screen will revert to
// whatever is written here the moment JavaScript runs.
//
// youakanksha_gmail_com is only the visible email text. The two mailto:
// hrefs (header icon, footer link) are separate literals hardcoded directly
// in shared-lib.F2AznzMP.mjs - update those too, or the link keeps pointing
// at the old address even though the text reads correctly.
//
// 51 editable string(s).
export const c = {
  to_embed_a_website_or_widget_add_it_to_t: "To embed a website or widget, add it to the properties panel.",
  loading: "Loading…",
  landing_page: "LANDING PAGE",
  retainer: "RETAINER",
  for_startups_and_teams_that_need_a_high_: "For startups and teams that need a high-impact landing page designed to convert.",
  for_teams_looking_for_a_dedicated_design: "For teams looking for a dedicated design partner to keep their digital work moving.",
  t_1000: "$1199",
  t_3499: "$3499",
  custom_landing_page_design: "Custom landing page design",
  ongoing_ui_ux_design_support: "Ongoing UI/UX design support",
  desktop_mobile_responsive: "Desktop + mobile responsive",
  websites_landing_pages_product_design: "Websites, landing pages & product design",
  conversion_focused_ux: "Conversion-focused UX",
  one_active_request_at_a_time: "One active request at a time",
  figma_source_file: "Figma source file",
  flexible_design_requests: "Flexible design requests",
  interactive_prototype: "Interactive prototype",
  unlimited_revisions: "Unlimited revisions",
  design_system_components: "Design system & components",
  responsive_desktop_mobile_design: "Responsive desktop + mobile design",
  up_to_2_revision_rounds: "Up to 2 revision rounds",
  figma_files_reusable_components: "Figma files & reusable components",
  t_15_20_days_turnaround: "15-20 days turnaround",
  t_48_hour_progress_updates: "48-hour progress updates",
  additional_pages_250_each: "Additional pages +$250 each",
  priority_based_workflow: "Priority-based workflow",
  t_text: "</>",
  add_development_1k: "Add development (+$1k)",
  development_included: "Development included",
  starts_at: "starts at",
  t_2000: "$2199",
  clickstart: "curvex.",
  available_for_work: "ACCEPTING PROJECTS",
  design_studio: "Design studio",
  for_startups_saas_and_everything_in_betw: " for startups, SaaS, and everything in between.",
  we_design_and_build_websites_and_digital: "We design and build websites and digital products for teams that need to move. From kickoff to launch, the same team handles design and development every step of the way.",
  services: "SERVICES:",
  web_design_product_design_conversion_foc: "Web design, product design & conversion-focused experiences",
  terms: "TERMS:",
  flexible_project_scopes_transparent_time: "Flexible project scopes, transparent timelines, and close collaboration from start to finish.",
  ready_to_clickstart: "Ready to Curvex?",
  clear_project_scopes_transparent_pricing: "Clear project scopes, transparent pricing, and flexible add-ons when your project needs more.",
  let_s_make_something_great: "Let’s make something great.",
  tell_us_what_you_re_working_on_and_let_s: "Tell us what you’re working on, and let’s see how we can help.",
  t_2026_clickstart_studio: "© 2026. Curvex Studio",
  youakanksha_gmail_com: "hello@curvex.studio",
  x_twitter: "X/Twitter",
  page_not_found: "Page Not Found",
  the_page_you_are_looking_for_does_not_ex: "The page you are looking for does not exist or may have been moved.",
  back_to_home: "Back to Home",
  code_component_disabled: "Code component disabled",
};

export default c;
