# Tinkerbench

A static storefront for Tinkerbench: build kits, puzzles, tabletop games and desk toys.
Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Put it online (GitHub, then Vercel)

1. Create a new empty repository on GitHub, for example `tinkerbench`.
2. In this folder, run:

   ```
   git init
   git add .
   git commit -m "Tinkerbench storefront"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/tinkerbench.git
   git push -u origin main
   ```

3. On vercel.com choose Add New > Project, import the repository and press Deploy.
   Leave every setting on its default (framework preset "Other", no build command).
4. Every later `git push` redeploys the site. Add your domain under Project > Settings > Domains.

To look at it locally, open `index.html` in a browser.

## What is a placeholder

Everything below is made up and needs replacing before you take real orders:

- All 12 products, their prices, descriptions and age ratings (`js/store-data.js`)
- Product pictures. They are animated drawings generated in code (`js/app.js`). To use a photo, put it in
  `images/` and add `image: "images/your-file.jpg"` to that product.
- Shipping cost, free-shipping threshold and delivery times (`js/store-data.js` and the
  "How ordering works" section of `index.html`)
- Returns policy and the other answers in "Questions people ask" (`index.html`)
- Privacy policy and Terms links in the footer, which point nowhere yet
- Checkout. The cart works and remembers its contents, but the Check out button only
  shows a "not open yet" message.

## Turning on checkout later

In `js/store-data.js` set `previewMode: false` and paste a checkout link into
`checkoutUrl`. That hides the preview banner and sends the Check out button to that
link. A single link can't carry the cart contents, so for a real launch connect a
payment provider (Stripe Checkout, or Shopify's Storefront API / Buy Button using
your existing Shopify products) in the `checkout` click handler in `js/app.js`.

## Fonts

Bricolage Grotesque and Figtree are self-hosted in `fonts/` under the SIL Open Font License, so the site makes no calls to Google.

## Files

- `index.html` page structure and copy
- `css/styles.css` the theme
- `fonts/` the three web fonts
- `js/store-data.js` store settings, categories and products
- `js/app.js` product grid, filters, product details and cart
- `vercel.json` Vercel settings
