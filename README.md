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
2. **Partner companies & products** — `products.html` currently contains three **sample** partner
   companies (Nile Harvest Foods, Delta Textile Mills, Pharos Building Materials) with sample
   products. Replace names, descriptions, and products with the real partners.
   Each company section follows the same copy-pasteable structure (`<section class="company-section">`).
3. **Partner logos** — each company currently shows a colored monogram chip (e.g. "NH").
   To use a real logo, put the image in `assets/` and replace the chip contents:
   ```html
   <div class="company-logo"><img src="assets/partner-name.png" alt="Partner Name logo"></div>
   ```
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
