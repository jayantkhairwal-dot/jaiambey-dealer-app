# Progress – Jai Ambey Dealer App

Last updated: 11 Nov 2026
Preview link (not for dealers yet): https://jayantkhairwal-dot.github.io/jaiambey-dealer-app/
(add `?demo=1` to see the Repeat order card with a sample order)

## Done
- Home screen (`index.html`): Jai Ambey logo, red planet-horizon glow, headline
  "Trusted for 20+ years.", stats row, search bar, Repeat order card,
  Shop by category (4 tiles), Dealer favourites (top 10 best-sellers), About strip, bottom menu.
- Colours switched from blue to the logo red; `CLAUDE.md` design notes updated.
- Catalog: removed Bluzon Comet and Bluzon Spray (Bluzon Kode stays);
  added Black Odor BO-1, BO-2, BO-40, BO-41 and Helicopter Solar. Now 108 products.
- Fixed BO-13 photo. Sharper photos for Black Odor Microphone (P002), BO-12 (P008), BO-13 blue 160ml (P007),
  BO-5 automatic diffuser (P053) and Godrej Aer Hanging (P038).
- GitHub Pages turned on from branch `claude/home-screen-design-plan-2bnwgc`.
- 11 Nov: home approved; built the full app in `index.html` (one page, a separate address per screen):
  Catalog (search by name or code, category chips, sort, floating "View cart" bar),
  Product page (big photo, quick qty 6/12/24/48, stepper, "More in category"),
  Cart (edit qty, remove, totals, one-time shop details, note, Send order on WhatsApp, "Order ready" screen),
  My orders (one-tap Reorder at the same quantities), About page.
  Orders go out by WhatsApp for now (same as v1). Cart, details and orders are saved on the dealer's phone.

## Waiting on Jayant
1. WhatsApp: on hold, Jayant will set it up later with WATI. For now WhatsApp opens and the dealer picks the contact.
2. HD product photos: Black Odor has no official website, so photos found online belong
   to other shops. Ask the supplier / the source of the BO-1 and BO-2 photos for the full
   Black Odor image set or catalog PDF. Google share links can't be opened from Claude's
   session: download the images and send them instead.
3. Wrong or doubtful photos: P005 BO-30, P043 BO-33, P047 BO-32 (photo or category),
   P024 Fighter Jet Solar ₹550 (no correct photo: send one or remove).
3b. BO-10 (P097) is the green kiwi "Jelly Bubble" jar: need a photo without the XMOTORS watermark.
4. Bluzon Kode: confirm category (Dashboard or Solar) and price (₹300 in app vs ₹325 in sales).
5. Decide: add a "don't show in Google" tag until launch? Hide prices behind a login or PIN?

## Next
1. Jayant tests the full app on his phone and sends changes.
2. Before sharing with dealers: add the order WhatsApp number, merge to `main`, switch GitHub Pages to `main`.
3. Later (from CLAUDE.md): Google Apps Script backend for orders, live In stock / Out of stock, WATI confirmations, New arrivals.
4. Better photos for other brands (Godrej, Areon, Involve, Airpro) and the doubtful Black Odor ones.
