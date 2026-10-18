# YSEF public homepage asset capture

Source: <https://ysef.gov.np/>  
Captured: 17 October 2026 from the publicly visible homepage in a browser session.

This is a reference archive for a redesign prototype. It is not an official YSEF distribution and it does not include private/admin assets. `manifest.json` inventories the 128 homepage assets exported by the browser (images, linked stylesheets, and inline SVGs). The original site appears to use Bootstrap, Slick, Swiper, jQuery, Font Awesome, and other vendor scripts; their source code was not exportable through the browser asset-capture interface. See `script-assets.json` for the public script URLs observed and the capture limits. The redesign recreates the interactions with its own React/CSS and does not load the archived vendor styles or scripts.

The public homepage carousel images are reused by the prototype in `../../public/reference-carousel/`. Those are copies of the files in this archive, with human-readable filenames. Captions are transcribed/translated for clarity. The first carousel slide is a magazine cover and uses `object-fit: contain` so the cover remains readable. Slides advance only when the user activates a control; there is no autoplay.

## Limits of this capture

- Three Font Awesome webfont files failed to export: `fa-solid-900.woff2`, `fa-brands-400.woff2`, and `fa-regular-400.woff2`.
- The browser capture tool did not export the page's JavaScript resources. `script-assets.json` preserves their observed URLs for reference. Analytics and telemetry URLs are listed but intentionally not fetched or reused.
- Several linked PDF files on the government CDN timed out when opened. Their original URLs and titles are recorded in `scraped-content.md`; the redesign uses sample document records, not copied or invented official PDF links.
- This archive is a point-in-time capture. Current notices, dates, leadership, eligibility, service terms, and office details must be confirmed against the live official site before any production use.
