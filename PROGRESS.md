# Progress – Jai Ambey Dealer App

Last updated: 13 Nov 2026
Preview link (not for dealers yet): https://jayantkhairwal-dot.github.io/jaiambey-dealer-app/
(add `?demo=1` to see a sample order and the payment screens in preview: Cart → pay + screenshot → order placed; nothing is sent)

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
  Cart = **pay now only** (Jayant, 13 Nov): pay by UPI, type UTR, choose the screenshot → the order is **placed automatically**
  (if something is missing it shows what, and a Place order button is there as backup). No WhatsApp button and no
  "pay later". The whole order (products, qty, shop, note, amount, UTR, screenshot) goes to the **Orders** tab of the sheet;
  the order is saved on the phone only after it arrived (if the upload fails, the cart is kept).
  Until payments are switched on, the cart keeps "Send order on WhatsApp" so ordering never stops.
  My orders → Pay / Upload screenshot stays for extra payments (Payments tab).
  Switch on by filling `PAY_UPI_ID` and `PAY_UPLOAD_URL` in `index.html`.

- 14 Nov: **80 car accessories added** (78 photos from Drive "MDO Image"; Clean Cham and Bluzon ambient light in 2 sizes).
  Ids A001–A080, photos img/aNNN.jpg (NNN = Drive photo number). Prices: usual sales price or Jayant's answers.
  New categories (two groups on home: Car perfumes / Car accessories): Horns & Sirens, Lights, Fog Lamps & Projectors,
  LED Headlights, Car Care, Holders & Chargers, Android & Cameras, Audio & Wiring, Tyre Inflators & Vacuum, Interior & Accessories.
  **Bluzon section**: home rail + "Bluzon" catalog chip (products with brand "Bluzon", incl. Bluzon Kode perfume).
  Stock from IMS (6 Nov): 3 sold out (Fusion RCA cable, MA260 tweeter, Bluzon 324W); 5 not in IMS = On request
  (Fusion Android, Cardi tail light, Sports mat, Windek 5405, IPH M6T). Now 186 products.
  Remaining items for later: Drive folder "MDO Image - Remaining (for later)".

## REMIND JAYANT (parked 14 Nov, car accessories from Drive "MDO Image")
1. #20 IPH Polar moment lens: ₹3,300 (WhatsApp) or ₹3,500 (sheet)?
2. #11/#12/#17 ATM lamps: one product at ₹225 (app)? or plain ₹160 + app ₹225?
3. #22 SIPL Combo Kit: "50% pis" unclear (₹50 per piece? which car?)
4. #81 Dosoon steering cover: price?
Also open: Bluzon catalogue matches (LED 155W model, Tire Inflator ₹1000 = TI-71/72?, 2/4-ch amp models,
DVR 517 3-way vs 4G, MP3 player model). Nothing added to the app yet: waiting for Jayant's final command.

## Waiting on Jayant (start here next session)
1. **Payments switch-on:** send the business UPI ID (bank current account / PhonePe / Paytm / GPay for Business),
   and do `apps-script/SETUP.md` (Jayant or MIS, ~15 min) and send the web app URL ending in `/exec`.
   Then: fill `PAY_UPI_ID` + `PAY_UPLOAD_URL`, test one real ₹1 order end to end, check the Orders tab and screenshot.
2. **IMS clean-up (MIS):** "Closing Stock" column is out of line from row "Can (Vedashri)" down; many best-sellers show
   negative stock (missing "In" entries). Until fixed, re-check the 29 sold-out products, especially favourites
   Godrej Aer Hanging, Veda Shree Bori, Involve Spray, BO-13, BO-23. 7 products can't be read (BO-40, Areon Sport Lux,
   Areon Pearls, Involve Dashboard, Veda Shree Spray, Air Gloss, Addix Black Ice).
3. **Photos:** real photo for P024 Fighter Jet Solar ₹550 (shows BO-13 now); doubtful P005 BO-30, P047 BO-32.
4. **Product names:** renaming to IMS names was cancelled (13 Nov); names stay as they are.
5. WhatsApp number: on hold until WATI (on-request "Ask for it" and the pre-payment WhatsApp order use it).
6. Decide: add a "don't show in Google" tag until launch? Hide prices behind a login or PIN?
7. Google Drive leftovers from the tracker test (Jayant can delete them): sheet "fms jai ambey app"
   and Apps Script project "jai ambey order tracking".

## Next
1. Switch on payments (item 1 above) and test with a real ₹1 order.
2. Jayant tests the full app on his phone (`?demo=1` for the payment preview) and sends changes.
3. Before sharing with dealers: merge to `main`, switch GitHub Pages to `main`.
4. Later (from CLAUDE.md): live In stock / Out of stock from the IMS (after clean-up), WATI confirmations,
   New arrivals, connect the app's orders to the new company FMS.
