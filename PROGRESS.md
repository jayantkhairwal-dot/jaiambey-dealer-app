# Progress – Jai Ambey Dealer App

Last updated: 13 Nov 2026
Preview link (not for dealers yet): https://jayantkhairwal-dot.github.io/jaiambey-dealer-app/
(add `?demo=1` to see the Repeat order card with a sample order)

## Done
- Home screen (`index.html`): Jai Ambey logo, red planet-horizon glow, headline
  "Trusted for 20+ years.", stats row, search bar, Repeat order card,
  Shop by category (4 tiles), Dealer favourites (top 10 best-sellers), About strip, bottom menu.
- Colours switched from blue to the logo red; `CLAUDE.md` design notes updated.
- Catalog: removed Bluzon Comet and Bluzon Spray (Bluzon Kode stays);
  added Black Odor BO-1, BO-2, BO-40, BO-41, BO-49 and Helicopter Solar. Now 109 products.
- 11 Nov: home approved; built the full app in `index.html` (one page, a separate address per screen):
  Catalog (search by name or code, category chips, sort, floating "View cart" bar),
  Product page (big photo, quick qty 6/12/24/48, stepper, "More in category"),
  Cart (edit qty, remove, totals, one-time shop details, note, Send order on WhatsApp, "Order ready" screen),
  My orders (one-tap Reorder at the same quantities), About page.
  Orders go out by WhatsApp for now (same as v1). Cart, details and orders are saved on the dealer's phone.
- 13 Nov: **order tracking removed from the app** (Jayant: tracking will be sent to dealers on WhatsApp via WATI).
  The FMS is not connected to the app in any way. Later Jayant will make a separate FMS for the app,
  for company use only (not for dealers).
- Photos: sharper photos for P002, P007, P008, P038, and on 13 Nov 30 more from the Drive folder
  "Perfume images": P003 P010 P011 P015 P022 P029 P037 P039 P042 P043 P048 P049 P050 P051 P053
  P056 P059 P060 P061 P062 P063 P080 P085 P088 P089 P090 P095 P097 P101 P103.

## Waiting on Jayant
1. Payment gateway: decisions needed (which gateway, when dealers pay, full or advance). See chat of 13 Nov.
2. WhatsApp: on hold until WATI. For now WhatsApp opens and the dealer picks the contact.
3. 13 Nov photo round 2 done (Jayant's answers): new photos for P001 BO-15, P004 Poppy, P009 BO-21, P013 Grandy,
   P016 Big Fresh, P018 Designer Perfume, P030 Jello, P034 Lure Hanging, P035 Stop-O, P064 Godrej Dashboard (aer twist),
   P067 Airpro Hanging, P068 Airpro Spray, P072 Concept, P086 Keizo Can Dashboard; added P110 Black Odor BO-49 (Rs 300).
   Kept current: Solar Flag, BO-12, BO-13, BO-41. Still to add once Jayant gives price/confirmation:
   Black Odor leather jar, Black Odor ice-cube jar (is it BO-11 or "Ice Gel" Rs 270?), Black Odor X-269 (watermarked photo).
4. Other doubtful photos: P005 BO-30, P047 BO-32, P024 Fighter Jet Solar ₹550 (no correct photo).
5. Bluzon Kode: confirm category (Dashboard or Solar) and price (₹300 in app vs ₹325 in sales).
6. Decide: add a "don't show in Google" tag until launch? Hide prices behind a login or PIN?
7. Google Drive leftovers from the tracker test (Jayant can delete them): sheet "fms jai ambey app"
   and Apps Script project "jai ambey order tracking".

## Next
1. Payment gateway (after decisions).
2. Jayant tests the full app on his phone and sends changes.
3. Before sharing with dealers: merge to `main`, switch GitHub Pages to `main`.
4. Later (from CLAUDE.md): Google Apps Script backend for orders, live In stock / Out of stock, WATI confirmations, New arrivals.
