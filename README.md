# YSEF public website redesign prototype

This is a bilingual, responsive front-end concept for a clearer public-facing YSEF website. It uses the reference site for its identity, subject matter, and navigation needs while clearly labeling all prototype content.

On small screens, the site uses a compact sticky header, thumb-friendly bottom navigation, and a “More” menu. Desktop navigation and layout remain unchanged.

## Run locally

```sh
npm install
npm run dev
```

Open the URL printed by Next.js (usually `http://localhost:3000`). The default language is Nepali; use the language control in the header to switch to English.

## Included pages

- Home page with direct paths into services, notices, resources, and contact
- Service directory and individual service information pages
- Searchable notices and notice details
- Searchable sample forms and public document library
- About, organizational information, and citizen charter concept
- Contact details and a local-only demo feedback form
- Bilingual not-found page with routes back to useful information

## Prototype boundaries

There is no backend, account system, live registration, or document download service. Notices, dates, forms, and program requirements are illustrative. The contact form validates locally and does not send or store entered information. The registration action explains that it is not connected. Replace sample content and verify every contact detail, requirement, identity statement, and external link before any public deployment.

The page includes a visible “Redesign prototype” label. Its government-site banner demonstrates the requested official-site identity pattern and is not a claim that this local prototype is an official government service.

## Visual assets

The Nepal emblem and partnership photo are public images referenced from the original YSEF site’s public media host. The partnership photo is used as an editorial image; replace it with an approved, correctly attributed image before publication if required.

## Structure

- `app/` contains the Next.js app routes, reusable components, sample data, and styles.
- `public/` contains the local image assets used by the interface.
- `prompt.md` contains the complete agentic redesign brief.
