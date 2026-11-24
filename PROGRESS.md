# Progress – Jai Ambey Dealer App

Last updated: 13 Nov 2026
Preview link (not for dealers yet): https://jayantkhairwal-dot.github.io/jaiambey-dealer-app/
(add `?demo=1` to see a sample past order in My orders)

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

- 14 Nov: **68 more Bluzon products** from the Bluzon catalogue, only items in the IMS with a sales price
  (ids A081–A148, photos img/bz-*.jpg cut from the catalogue PDF). LED headlights are one product per bulb size
  (244W Eagle, 340W Bull, 324W Aeroplane, 240W Tri-Colour, 4300K 240W), projectors 2"/3", auxiliary light, cameras,
  DVRs, Androids (Diamond X80, T5), chargers CC-12..15, BT receiver, MH-05 holder, damping sheets, horn 9003,
  central locking, speakers, bass tubes, subwoofers, 2-ch amp, 8GA kits, RCA cable, vacuum. 9 sold out per IMS. Now 254 products.
- 14 Nov (Jayant: "if it is in the IMS, add it"): **55 more** (A149–A203). All remaining Bluzon IMS items
  (closest catalogue photo where the model was unclear; img/photo-soon.jpg where there is no photo: Square projector 2",
  DVR USB B21D, Double woofer, Loud speaker 2.5" x2) + MDO leftovers in IMS: ATM lamp ₹160, ATM lamp with app ₹225,
  IPH Polar moment lens ₹3,300, SIPL combo kits (13 cars), Dosoon steering covers (10/6/5 pcs).
  Products with no sales price have price null -> shown "Price on request" with the Ask button (27 products).
  Sold out per IMS: 20 more. Now 309 products. Not added: MDO #65 (AVIF), #67 BO-LT08 and #86 Hyperdrive (NA, not in IMS).
  To check with Jayant: unclear photo matches (155W = LT-07 photo, DVR 517 3-way/4G, MP3 = 2201, Tyre inflator = TI-71,
  CarPlay Android, 4-ch amp ₹600?), ATM lamp photos, Polar lens price (₹3,300 vs ₹3,500), combo kit prices.

- 14 Nov: **LED headlights grouped by model** (Jayant): one card per model with size buttons on the product page
  (H4 priced higher). 41 size items -> 6 cards. Home count now shows 274 (cards), 309 items incl. sizes.

- 14 Nov: dropdown on the card for all products with options (Car / Pack / Size / Colour / Type / Doors):
  headlights, SIPL combo kit (13 cars), Dosoon steering cover, Clean Cham, ambient light, amp kits, bass tube,
  projectors single/tri, M617, loud speaker, central locking. Price (and photo) follow the choice. 247 cards.

- 15 Nov: removed Aeroplane 324W series (discontinued), Fighter Jet Solar x2 (not sold), Bluzon double woofer,
  4300K 9006 and all H27 headlights. Dosoon steering cover 6 pcs now 2 types: DODO ₹1,600 and black box ₹2,100
  (old cheap box gone). Combo kit prices differ per car and nobody can confirm: left as is.
  IMS clean-up list for MIS sent (IMS-cleanup-for-MIS.xlsx: negative stock, closing vs date mismatch, zero stock, not in IMS).

- 15 Nov: removed Snowy Hanging, Solar Tanks, Black Odor BO-11 (Jayant). 240 cards / 293 items.
- 15 Nov: answers from Abhishek/team applied. Polar Moment lens = the 2" square projector: one product
  "IPH Square Projector 2\" (Polar Moment)" ₹3,300 (old photo-less Bluzon Square projector card removed).
  Atmosphere Light (Remote) ₹160, Atmosphere Light (App) ₹325 (photo #17 is the same App lamp).
  4-ch amp ₹4,000 (still sold out), Tyre inflator ₹1,100, Fish eye camera ₹600, LED rear camera ₹250,
  Fog light ₹1,300, Projector 3" Three Eye single ₹4,500, Steering cover now "14 pcs pack" ₹2,800.
  Guessed photos all confirmed. Removed Android T5 with DVR and 2" Grill projector single colour. 238 cards / 290 items.
- 15 Nov: removed all 13 SIPL combo kits (Jayant). 237 cards / 277 items.
- 18 Nov: **payments removed** (Jayant: no payment method; orders by WhatsApp only, WATI later).
  Cart → "Send order on WhatsApp" → WhatsApp opens with the order typed in. UPI/QR/screenshot screens, the #pay page
  and apps-script/ (payments sheet script) deleted (still in git history). ORDER_WHATSAPP is blank until Jayant sends the number.
- 18 Nov: **Product Catalogue sheet (Drive, made by Jayant's team)** applied, photos img/pc-*.jpg:
  new box photos for Bluzon headlights Bull 340W, Eagle 244W, 4300K 240W, Tri-Colour 240W, 155W and LED camera,
  Fish eye camera; Bluzon AHD + CVBS Camera CC-17 now ₹600. Added (A205–A215): Pluzon LED Headlight 300W
  (H4 ₹3,200, H7/9005/9012 ₹3,000, H8 ₹2,800 sold out; IMS sales prices, H1 not added: 0 stock, no price),
  Conexion car camera ₹250, Pluzon AHD night vision camera PO-CC14 ₹600 (box photo edited: Bluzon logo → Pluzon, per Jayant),
  Pluzon AHD + CVBS camera CC-20 ₹600, Osram twin tone horn ₹450, Hella S90 single horn ₹200, Basuri snail horn ₹550.
  Pluzon/PZ = separate brand. Projectors tab (M6280 App, PJ02X, M513, Bluzon 3" 200W) left for later. 244 cards / 288 items.
- 18 Nov: **one "Car Perfumes" category** (Jayant): home shows one wide Car Perfumes tile (photos of the 4 types)
  + the accessory tiles. Catalog: "Car Perfumes" chip; when chosen, a second row of type chips
  (All types, Dashboard, Hanging, Spray, Solar). Old links like #catalog/hanging still work. PARENTS in index.html.
- 18 Nov: **Projectors tab** of the Product Catalogue sheet applied: M617 single ₹2,800 / tri ₹3,200, IPH Square 2" ₹3,400
  (LED tab still says 3,300; projector tab used), new box photos for these + Bluzon 3" Two Eye single (PJ02X) and 3" Plain tri.
  Added A216 IPH M6280 App tri colour ₹3,500, A217 IPH M513 single colour ₹3,300. 246 cards / 290 items.
- 21 Nov (Jayant): removed Godrej Aer Dashboard ₹220 (Godrej Dashboard ₹230 stays), Areon Golden, Mitoq Hanging + Jar,
  Keizo Dashboard ₹350, Xiang Meng. Prices: Keizo Can ₹250, Veda Shree Jute ₹250, Bluzon Android TS ₹4,800,
  Car Safety Flash Kit ₹300, Bluzon ambient light 6 pc ₹2,100 / 10 pc ₹2,300, IPH Polar Fog M512S ₹3,800,
  Multifunctional Car Holder (Portronics dropped from name) ₹260, Bluzon 10" dual sub ₹9,500, Bluzon 8GA kit blue ₹650 (red ₹500),
  IPH Square 2" ₹3,300, IPH M6T ₹2,700. Then: M617 Tri Colour ₹3,100 (the "Polar Fog tri colour"), P064 renamed Godrej Aer Dashboard.
  240 cards / 284 items.
- 21 Nov: **full Product Catalogue sheet (10 tabs, Excel uploaded by Jayant)** applied. Sheet photos (img/pc-*.jpg) now on 26 more
  products (horns, chargers, flashers, underbody, 3M/Air Gloss, Fusion wires, D-SON kit, Dosoon covers, Fusion Gold camera).
  Bluzon steering cover (A183) = Double Colour single cover ₹375. S16/S24 strobe = one card (Type).
  Added A218–A245: 4 Portronics cables (billing prices 100/250/150/100, sheet had none), Car Doc door guard (3 colours ₹150),
  Checkmate edge door guard (Black ₹190 / Blue ₹230), Dosoon steering cover ₹400, 3D shadow light (Suzuki/Hycross/Toyota ₹250),
  9 polish & wax (Dragon Shield, DCD, Formula 1, Motomax, Cream Wax; F1 headlight restorer has no price),
  Gipsa RCA ₹150, Gipsa Y lead ₹350, Debonair speaker wire ₹450, Bluzon 4GA kit ₹1,050, Yuvix fog lamp wiring ₹410.
  Kept chat prices where the sheet differs: Square 2" ₹3,300 (sheet 3,400), M617 tri ₹3,100 (sheet 3,200),
  DODO 6 pcs ₹1,600 (sheet 1,500), Flash kit ₹300 (sheet "Grill Flasher" 350). 262 cards / 312 items.

- 21 Nov 4:18 pm check: Polish & Wax tab got names (matched the photo guesses). Renamed A237 "Formula 1 Carnauba Car Wax (Big)", A240 "Cream Max Wax 220g" (sheet: "Cream Max (3M)"; box shows no 3M). Headlight Restorer still no price.

- 21 Nov 5:19 pm check: 5 new rows in the sheet, waiting for photos (Excel from Jayant): Bluzon Projector 2" Single ₹3,300 / Tri ₹3,600 (not the 2" Two Eye A107/A108), 3 Lens LED ₹500, 4 Lens LED ₹600, Hindcart 8G Amp Kit ₹550.

- 21 Nov 6:20 pm check: new tabs Sirens (Duratone VIP ₹400, Iota Electronic ₹875, Duratone Dual ₹850: need photos) and Dash Cams (515 ₹1,500, 513 = 2-Way 512-13 ₹2,100, 3-Way ₹2,700: already match).

- 24 Nov: **Sold out refreshed from the IMS (22 Nov column)**. Rule (Jayant): stock 0 = Sold out; minus stock = available
  (incoming stock not entered; team confirms on WhatsApp). 20 sold out now (was 46). Newly sold out: Bluzon 6.5" 2-way component
  speaker, Bluzon RCA cable 5 m. Back: Godrej Aer Hanging, Involve Spray, Eagle 244W H1, Tri-Colour 240W H7, MP3 player + 26 minus-stock items.
  Snowy Oudh Hanging and Crystal Dashboard not found in IMS: left sold out. 42 minus-stock + 16 not-in-IMS sent to MIS (IMS-minus-stock-for-MIS.xlsx).

- 24 Nov: Excel of the Product Catalogue (12 tabs) applied: added A246–A253 (Bluzon 2" PJ02X projector Single ₹3,300 / Tri ₹3,600,
  3 Lens LED ₹500, 4 Lens LED ₹600, Hindcart 8G amp kit ₹550, Duratone VIP siren ₹400, Iota siren ₹875, Duratone dual siren ₹850);
  sheet photos for Bluzon DVR 515, 513 (renamed "DVR 513 Full Touch Dash Cam (Dual Camera)") and 3-way 517. 269 cards / 320 items.

- 24 Nov (team via Jayant): Formula 1 Headlight Restorer ₹450, Bluzon 155W H1 and 9012 ₹1,400, Bluzon 2" Grill Projector Tri ₹3,800.
  Team also said "90" (Mint Air?) - asked Jayant to confirm.

## REMIND JAYANT (parked 14 Nov, car accessories from Drive "MDO Image")
1. #20 IPH Polar moment lens: added at ₹3,300 (WhatsApp); sheet said ₹3,500. Confirm.
2. ATM lamps: added "ATM lamp" ₹160 (#12 photo) + "with App" ₹225 (#11 photo). Confirm.
3. SIPL Combo Kit: added 13 car-wise kits from IMS; 8 have no price ("Price on request"). "50% pis" still unclear.
4. Dosoon steering cover: added 10 pcs ₹2,000 / 6 pcs ₹250 / 5 pcs ₹1,300 (IMS sales prices). Photo has CapCut mark (cropped).
Also open: Bluzon catalogue matches (LED 155W model, Tire Inflator ₹1000 = TI-71/72?, 2/4-ch amp models,
DVR 517 3-way vs 4G, MP3 player model). Nothing added to the app yet: waiting for Jayant's final command.

## Rule (Jayant, 21 Nov)
Prices Jayant gives in chat beat the Product Catalogue sheet when they differ.

## Waiting on Jayant (start here next session)
0. **Later task (Jayant):** new prices for the 4 Mint Air dashboards (P078 ₹130, P079 Rally Drift ₹150, P080 ₹90, P100 Rainbow ₹80).
1. **WhatsApp number for orders** (until WATI): put it in `ORDER_WHATSAPP` in `index.html`.
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
1. Put the order WhatsApp number in; later connect WATI.
2. Jayant tests the full app on his phone (`?demo=1` for the payment preview) and sends changes.
3. Before sharing with dealers: merge to `main`, switch GitHub Pages to `main`.
4. Later (from CLAUDE.md): live In stock / Out of stock from the IMS (after clean-up), WATI confirmations,
   New arrivals, connect the app's orders to the new company FMS.
