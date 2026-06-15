# A2Z Egypt Company — Website

A 3-page static website: **Home** (`index.html`), **Products** (`products.html`), **Contact** (`contact.html`).
No build tools, no frameworks — just open `index.html` in a browser, or host the folder anywhere
(GitHub Pages, Netlify, Vercel, or any shared hosting).

## Design system

- **Fonts:** [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) for headlines, [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) for body text, plus [Cairo](https://fonts.google.com/specimen/Cairo) for Arabic mode (the Latin fonts have no Arabic glyphs). Loaded from Google Fonts.
- **Colors (from the logo):** deep navy `#16294a`, aqua `#25b6cf`, burnt orange `#d95b23`, warm off-white `#f7f6f2`. All defined as CSS variables at the top of `css/style.css`.

## English / Arabic

The English/العربية button in the header switches the whole site, flips the layout to
right-to-left, and remembers the choice (localStorage). **All text in both languages lives in
one file: `js/i18n.js`** — the HTML only holds the English fallback. To change any wording,
edit the `en:` and `ar:` entries there. The Arabic copy is written for meaning (natural
business Arabic), not literal translation — keep it that way when editing.

## Things to customize (in order of importance)

1. **Contact details** — the placeholders `info@a2zegypt.com` and `+20 100 000 0000` appear in:
   - `js/main.js` (the `COMPANY_EMAIL` constant — this is where the contact form sends inquiries)
   - the footer of all three HTML pages
   - the contact cards in `contact.html`
2. **Partner companies** — `products.html` shows one **card per company** (logo, name, short
   description) that links to that company's own detail page (`company-<slug>.html`). The first
   company, **Kaha Company for Preserved Foods**, is real; **Delta Textile Mills** and **Pharos
   Building Materials** are still **samples** — replace them with real partners.
   To add or edit a company:
   - Card on `products.html` (and the matching teaser card in `index.html`'s partners section).
   - A detail page — copy `company-kaha.html` to `company-<newslug>.html` and update its content.
   - All wording lives in `js/i18n.js`: company names are `co1_name`/`co2_name`/`co3_name`; Kaha's
     profile, facts, and products use the `k_*` keys; the sample companies reuse `c2_*`/`c3_*`.
3. **Partner logos** — Kaha uses its real logo at `assets/kaha.png`; the sample companies show a
   colored monogram chip (e.g. "DT"). To give a company a real logo, drop the image in `assets/`
   and swap the chip for an `<img>` (see how `assets/kaha.png` is used in the Kaha card and on
   `company-kaha.html`).
4. **Stats on the home page** — the numbers (12 partners, 40 product lines, 18 countries) are
   estimates. Edit them in `index.html` (look for `data-count`).
4b. **Import categories** — the "We import for the Egyptian market" card on the home page lists
   sample categories (raw materials, machinery, consumer goods). Edit the `ti_*` keys in
   `js/i18n.js` to match what the company actually imports.
5. **Company logo** — the header uses the real logo at `assets/logo.png` (background removed so it
   sits cleanly on the page). To update it later, just replace that file with another transparent PNG.

## Contact form

The form on `contact.html` needs **no server**: it opens the visitor's email app with the inquiry
pre-filled (a `mailto:` link). If you later want submissions delivered without the email app step,
point the form at a free service like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
