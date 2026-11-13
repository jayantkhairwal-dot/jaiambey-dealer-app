# Progress – Jai Ambey Dealer App

Last updated: 13 Nov 2026
Preview link (not for dealers yet): https://jayantkhairwal-dot.github.io/jaiambey-dealer-app/
(add `?demo=1` to see a sample order, and the payment screens in preview: My orders → Pay & upload screenshot)

## Done
- Home screen (`index.html`): Jai Ambey logo, red planet-horizon glow, headline
  "Trusted for 20+ years.", stats row, search bar, Repeat order card,
  Shop by category (4 tiles), Dealer favourites (top 10 best-sellers), About strip, bottom menu.
- Colours switched from blue to the logo red; `CLAUDE.md` design notes updated.
- Catalog: removed Bluzon Comet and Bluzon Spray (Bluzon Kode stays);
  added Black Odor BO-1, BO-2, BO-4, BO-40, BO-41, BO-49 and Helicopter Solar. Now 110 products.
- 13 Nov: removed Dyna Fresh Hanging (no longer stocked); merged Money Solar into Bluzon Kode
  (same perfume; now "Bluzon Kode (Money) Solar", Solar, Rs 300). Now 108 products.
- 13 Nov: removed Big Fresh and Involve Eminence (not kept in IMS). Now 106 products.
- 13 Nov: **Sold out** label. Products listed in `data/sold-out.json` show "Sold out", can't be added to the cart,
  move to the end of lists, are dropped from saved carts and skipped on Reorder. 29 marked from the IMS (6 Nov figures).
  To bring one back: delete its line from `data/sold-out.json` (or ask Claude). Later this can come live from the IMS.
- 13 Nov: **On request** label for the 10 products not kept in the IMS (`data/on-request.json`: Poppy, Xiang Meng, 8 Solars).
  They can't go in the cart; a green "Ask for it" button opens WhatsApp with the product, code, price and the dealer's shop.
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

- 13 Nov: **Payments (built, switched off until set up)**: My orders → "Pay & upload screenshot" for each order.
  Pay by UPI (opens the UPI app, copy UPI ID, QR code) + form: amount, UTR (required), screenshot.
  Upload goes to a Google Apps Script in a NEW sheet "Jai Ambey App – Payments" (`apps-script/payments.gs`, `SETUP.md`):
  screenshot saved in Drive, one row per payment, red warning for a reused UTR or less than the app total,
  "Confirmed in bank" tick box for the team. Rule: never dispatch on a screenshot alone.
  Cart = **pay now only** (Jayant, 13 Nov): pay by UPI, upload screenshot, **Place order**. No WhatsApp button and no
  "pay later". The whole order (products, qty, shop, note, amount, UTR, screenshot) goes to the **Orders** tab of the sheet;
  the order is saved on the phone only after it arrived (if the upload fails, the cart is kept).
  Until payments are switched on, the cart keeps "Send order on WhatsApp" so ordering never stops.
  My orders → Pay / Upload screenshot stays for extra payments (Payments tab).
  Switch on by filling `PAY_UPI_ID` and `PAY_UPLOAD_URL` in `index.html`.

## Waiting on Jayant
1. Payments: send the business UPI ID, and do `apps-script/SETUP.md` (or MIS) and send the web app URL.
2. WhatsApp: on hold until WATI. For now WhatsApp opens and the dealer picks the contact.
3. 13 Nov photo round 2 done (Jayant's answers): new photos for P001 BO-15, P004 Poppy, P009 BO-21, P013 Grandy,
   P016 Big Fresh, P018 Designer Perfume, P030 Jello, P034 Lure Hanging, P035 Stop-O, P064 Godrej Dashboard (aer twist),
   P067 Airpro Hanging, P068 Airpro Spray, P072 Concept, P086 Keizo Can Dashboard; added P110 Black Odor BO-49 (Rs 300).
   Kept current: Solar Flag, BO-12, BO-13, BO-41. Done: leather jar added as P111 Black Odor BO-4 (Rs 200);
   X-269 is BO-40 (already in app at Rs 550, kept the clean photo); ice-cube jar not sold, skipped.
4. Other doubtful photos: P005 BO-30, P047 BO-32, P024 Fighter Jet Solar ₹550 (no correct photo).
5. Stock check vs IMS (13 Nov, read-only, figures of 6 Nov): 61 in stock, 29 out, 11 not kept in IMS
   (9 Solars + Xiang Meng, Poppy). Big Fresh and Involve Eminence removed from the app. IMS "Closing Stock"
   column is out of line from row "Can (Vedashri)" down: MIS to fix before live stock is connected.
6. Decide: add a "don't show in Google" tag until launch? Hide prices behind a login or PIN?
7. Google Drive leftovers from the tracker test (Jayant can delete them): sheet "fms jai ambey app"
   and Apps Script project "jai ambey order tracking".

## Next
1. Switch on payments once the UPI ID and web app URL arrive; test one real ₹1 payment end to end.
2. Jayant tests the full app on his phone and sends changes.
3. Before sharing with dealers: merge to `main`, switch GitHub Pages to `main`.
4. Later (from CLAUDE.md): Google Apps Script backend for orders, live In stock / Out of stock, WATI confirmations, New arrivals.
