# Rainforest — 2026 site

Static, no dependencies. Eight pages: `index`, `approach`, `capabilities`, `b2c`, `b2b`, `work`, `about`, `contact`.

## Preview
    python3 -m http.server 5173     # then open http://localhost:5173

## Editing
- Page content lives in `_src/pages/*.html` (title + description at the top, then the page body).
- Header, menu and footer are shared and live in `_src/build.py`.
- After editing either, run `python3 _src/build.py` to regenerate the root HTML files.
- Colours, type and spacing are tokens at the top of `styles.css` (`--signal`, `--blood`, `--ink`, `--paper`…).

## Before launch
- **Hero image** is loaded from the current live site (`--hero-img` in `styles.css`). Copy it into `assets/` and point the token at the local file, or swap in new photography.
- **Contact form** is front-end only (shows the thank-you state). Wire `#enquiry` in `script.js` to a real endpoint (Formspree, HubSpot, etc.).
- Privacy / Cookie Policy links are `#` placeholders. Telephone number is still to be confirmed.
