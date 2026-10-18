# Copy-ready agentic prompt: redesign the YSEF public website

You are a senior product designer, UX researcher, content strategist, accessibility specialist, and frontend implementation agent. **Redesign and implement a complete, runnable, high-fidelity public website prototype for the Youth and Small Entrepreneur Self-Development Fund (YSEF), Nepal.** This is a design exercise, not a production government deployment. Work autonomously from the public reference at **https://ysef.gov.np/**. I have no source repository, design files, CMS access, credentials, or private documentation to give you. Treat the public website and its public sitemaps as your reference. Make reasonable decisions and finish the working prototype; do not stop at a mood board, plan, wireframe, or static homepage.

## Mission and boundaries

- Preserve the **actual Government of Nepal emblem, YSEF logo, official organization/ministry identity, and recognizable blue-led brand theme**. Retrieve the public logo/emblem assets from the existing site where feasible; do not redraw, alter, or replace them with generic marks. If an exact asset cannot be obtained, keep a clearly marked asset slot and record its public source URL instead of inventing a logo.
- Add a slim **official-site identity banner** at the very top of every page, inspired by USA.gov's expandable “Here's how you know” pattern but written and designed for Nepal. Suggested bilingual copy: “नेपाल सरकारको आधिकारिक वेबसाइट” / “Official website of the Government of Nepal,” with an expandable “यसरी पहिचान गर्नुहोस्” / “Here's how you know.” A small Nepal flag or official mark may accompany the text. In the expanded panel, explain that `ysef.gov.np` is under Nepal's `.gov.np` government domain and that HTTPS encrypts the connection; encourage checking the address spelling. Explain the roles accurately: the government domain and official identity indicate the site; HTTPS protects the connection but alone does not prove government ownership. Keep this banner restrained, keyboard accessible, localized, and present across page types. Do not copy the U.S. flag, U.S.-specific `.gov` wording, or USA.gov's exact visual styling. Because this is a local prototype, include a small “Redesign prototype / पुनःडिजाइन नमूना” indicator outside the production-style banner so viewers do not mistake the prototype for the live YSEF website.
- Redesign the visual system, information architecture, wording, navigation, mobile experience, page templates, search, notices, documents, and contact experience. Make clarity, accessibility, and ease of navigation the central goals for people with different ages, abilities, literacy levels, devices, and connectivity.
- Treat the public site as a **reference for identity, subject matter, and content categories**. You may create realistic dummy content to make the prototype feel complete. Clearly mark sample-only names, dates, amounts, deadlines, statistics, quotes, and statuses as illustrative wherever a visitor could mistake them for official current information. Never present invented eligibility rules, loan rates, application statuses, legal terms, or contact details as real YSEF policy.
- Build a local interactive prototype of the public website. Use local/sample data and simulated interactions for search, filters, downloads, language selection, and forms. Do not build live authentication, loan processing, payment, personal-data collection, or an actual connection to YSEF systems. The existing “Online Registration” link appears to point to `register.ysefgov.com`; verify it before treating it as available, and clearly label any external link. If it cannot be verified, show an informative prototype state instead of a dead or misleading action.
- Work only on the local prototype. Do not submit forms or attempt authenticated access on the live government site. Public-site inspection must be passive and rate limited. Run any active security checks only against the local implementation.

## Research the current site first

1. Explore the homepage, navigation, both languages, mobile and desktop layouts, site search, service pages, notices, categories, publications, downloads, About pages, citizen charter, organization/staff directory, gallery, videos, contact, feedback, footer, and external links. Use the sitemap index at `https://ysef.gov.np/sitemap.xml` and its child sitemaps as the route/content inventory. Respect the site's robots directives and crawl delay. Capture the current URLs and map each to a future route or redirect.
2. Identify user groups and likely tasks from the visible content: young people exploring support, existing borrowers, banks/cooperatives, local-government partners, journalists/researchers, and people seeking public information. Include people with disabilities, older adults, first-time web users, and visitors using small screens or slow connections. Treat inferred needs as design assumptions, not policy facts.
3. Create a short evidence-based audit in the repository: current page inventory, patterns, content gaps, duplicate content, accessibility issues, responsive issues, search/navigation issues, document issues, and a prioritized redesign rationale. Keep screenshots/asset references where allowed. Review representative pages within every route family, not merely the homepage.
4. Inspect only public technical signals. The existing site appears to be server-rendered and Django-backed: the feedback form exposes `csrfmiddlewaretoken` and a `csrftoken` cookie; responses show nginx and Varnish; page assets include Bootstrap, jQuery, Swiper, Slick, Font Awesome, and government-hosted media. This is an inference, not confirmed source architecture. Do not claim to have accessed its database, CMS, or source.

## UX and information architecture

Make the first screen answer: **What does YSEF offer? Who is it for? What should I do next?** Keep urgent official notices visible without allowing long scrolling announcements to dominate the page. Avoid showing the same notice in the ticker, notice panel, highlights, and news without a clear editorial reason.

Use this initial structure, refining labels from the real content:

- Home
- Programmes and services: six existing service areas (insurance premium, low-interest/concessional business lending, interest subsidy, product marketing, orientation/training, and any other verified service)
- For cooperatives and partners: partnership information, eligibility, proposals, recovery facilitators, and partner notices
- Notices and updates: active/urgent notices, archive, news, bulletins, publications
- Forms and resources: forms, rules/procedures, policies, reports, budgets, proactive disclosure, media
- About YSEF: mandate, background, goals, leadership/board, organization, staff, citizen charter
- Contact and feedback
- Online registration: a clearly labelled external handoff only when verified

Provide direct shortcuts for “Explore services,” “Find a form,” “Read current notices,” “Partner/cooperative information,” and “Contact YSEF.” Support breadcrumbs, related content, persistent search, and a concise mobile menu. Keep official institutional material discoverable without forcing applicants through the organization's internal structure.

## Page and content requirements

Implement real responsive templates and content models for:

1. **Homepage:** government/YSEF identity, task-oriented introduction, a compact sample urgent-notice area with visibly illustrative dates/status, service cards, a simple “how to explore this site” or sample process, popular forms/resources, latest sample updates, accountability links, contact, and footer. Any sample statistics must be visibly labeled illustrative.
2. **Service landing and detail:** who the sample service is for, sample benefits, eligibility/document checklist, steps, sample status/deadline, related forms, policy-reference placeholder, related notices, responsible-office placeholder, and next action. Keep sample content useful for evaluating layout and comprehension without implying official eligibility.
3. **Notice listing and detail:** search, filter by audience/type/status/date, pagination, clear sample date/deadline, “active/closed/archived” status, summary, attachments, related notices, and shareable URLs. Store canonical machine-readable dates and display Nepali dates where appropriate. Make the sample-data status clear.
4. **Document library:** search/filter by category, audience, date/version, language and file type; title, short description, last updated, file type/size, sample download action, and current/superseded state. Include representative sample entries for rules, procedures, forms, reports, budgets, and policies. Existing public documents may be linked for reference; identify external files clearly.
5. **About/accountability:** introduction, goals, background, board/leadership, organization chart, staff directory, citizen charter, proactive disclosures, reports and budgets. Use actual public facts when confidently visible; use clearly identified sample names/roles otherwise.
6. **Search:** server-side or indexed search across pages, services, notices, documents, and staff where appropriate; Nepali and English queries; clear no-results suggestions; usable keyboard controls; crawlable result links.
7. **Contact and feedback:** show public contact details only when verified; otherwise use clearly marked sample contact details. Provide a local simulated complaint/suggestion form with validation, privacy explanation, and success/error states. Do not transmit, store, or email submitted data; show a demo confirmation only.
8. **Gallery/video:** dated, captioned media with descriptive alternative text, keyboard controls, no surprise autoplay, and transcript/caption fields for videos.
9. **404/500/maintenance states:** on-brand, accessible, and useful paths back to core tasks.

Create a simple local content schema/data layer with fields such as source URL, sample/verified flag, language, audience, date, attachments, and version where useful. Seed every template with realistic sample content, not lorem ipsum. Mix real public facts that are clearly verified with labeled dummy content. Do not duplicate content records merely to populate multiple homepage sections.

## Visual direction

Create a distinctive, polished public-service interface rather than a generic admin dashboard or template. Preserve the current identity colors and logos, then define accessible color tokens and spacing/type scales. Use a Devanagari-capable font with excellent legibility, generous line height, strong title hierarchy, concise labels, and resilient wrapping for long Nepali notice titles. Use government blue for primary actions and official framing, neutral surfaces for dense reading, and restrained accent colors for urgency and status. Use consistent cards, tables, chips, document rows, icons, and form controls. Show real programme imagery where public assets are usable and properly attributed; otherwise favor clean graphic composition over stock-photo clichés. Design at mobile, tablet, and desktop widths, including zoom and text enlargement.

Deliver a small design system with tokens/components and at least these component states: default, hover, focus, active, disabled, loading, empty, error, success, archived, and urgent. Include visual examples for long Nepali titles, mixed Nepali/English text, and multi-file notices.

## Language and accessibility

Nepali is the primary language; English is fully supported. Keep language switching visible and preserve the current page when an equivalent translation exists. Provide a clear state when translation is unavailable. Use appropriate HTML `lang` attributes, meaningful headings and landmarks, descriptive links/alt text, visible keyboard focus, accessible menu/filter/dialog behavior, form labels and errors, and skip links. Meet WCAG 2.2 AA as a target. Test with keyboard, screen reader, 200–400% zoom, reduced motion, and touch. Explain key actions in plain language and do not rely on color, icons, or technical knowledge alone. Do not treat an accessibility overlay as a substitute for correct page markup and behavior.

## Engineering and content management

If there is an existing repository in the working directory, inspect it and adapt the redesign to its supported stack. **If starting from an empty repository, use the current stable Next.js App Router with TypeScript and a lightweight styling system such as CSS modules or Tailwind.** Use semantic server-rendered pages, a simple local data layer, and mock interactions; do not spend time creating production authentication, a real CMS, a database, or deployment infrastructure. Use current stable package versions verified from official sources. Keep the site fast and usable without JavaScript where practical. Provide clear local run instructions and keep secrets out of the repo.

Represent the current route families and provide stable, readable prototype URLs. Include page titles/descriptions, sitemap/robots examples where appropriate, and accessible document rows. Build for low-bandwidth mobile with responsive images, optimized fonts/assets, and minimal third-party scripts. Production redirects and official document retention can be documented as recommendations rather than implemented against the live site.

## Security and privacy requirements

The public reference served over TLS 1.3 and exposed `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: same-origin`, and `Cross-Origin-Opener-Policy: same-origin`. In a public check on 17 October 2026, HSTS, Content Security Policy, and Permissions Policy headers were not present on the pages checked. The feedback page exposed a Django-style CSRF token/cookie. External scripts were loaded from government media hosts, cdnjs, unpkg, Facebook, Google, and reCAPTCHA; one dependency URL used `@latest`. Treat these as **review prompts**, not proof of exploitable vulnerabilities. The registration host did not resolve from one environment and a separate fetch returned an error; verify its availability independently before relying on it.

For the prototype: avoid unnecessary third-party scripts and trackers; pin dependencies; escape rendered content; do not transmit or persist form submissions; and clearly distinguish demo interactions from real services. Include deployment security recommendations such as HTTPS, HSTS, CSP, Permissions Policy, secure cookies, CSRF, least privilege, and upload/feedback protections in the handoff, but do not build infrastructure that the prototype does not need. Review the local implementation for basic security issues and state what requires a production environment to verify.

## Delivery workflow and acceptance criteria

Work in this order: inspect the reference; map user journeys; define information architecture and design system; implement the shared shell and page templates; seed realistic sample content; make search, filters, navigation, language selection, document actions, and demo forms interactive; review accessibility, security, responsiveness, and performance; then provide a concise handoff. Keep moving autonomously when details are unavailable and note assumptions. Ask for input only if a genuine blocker prevents a usable prototype.

Deliver:

- A complete, runnable local prototype, not only mockups.
- A redesigned homepage and all route/template families above, populated with realistic and clearly labeled sample content.
- Exact retained logos/emblems or documented source/asset slots if retrieval fails.
- A lightweight local data model and reusable components.
- A route inventory with suggested old-to-new mapping.
- A design system and responsive pages in Nepali and English.
- A short audit, architecture/security notes, source/sample-content notes, local setup instructions, and a list of facts an actual YSEF team would need to confirm.
- Screenshots of key mobile and desktop pages and a short walkthrough of the main user journeys.

The work is complete when I can run the project locally, browse polished core pages in both languages, search/filter sample content, navigate every main task on desktop and mobile, use the simulated feedback flow without transmitting data, and complete key journeys with a keyboard and screen reader. Make the site feel credible within a government website boundary while being markedly clearer, calmer, and easier to use. Do not claim that the separate registration portal, production hosting, or YSEF's internal systems are integrated.
