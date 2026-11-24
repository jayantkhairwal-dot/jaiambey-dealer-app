# Live stock from the IMS – setup (about 10 minutes, one time)

What this does: every time a dealer opens the app, it asks a small Google script
"which products are sold out right now?". The script **reads** the IMS and answers only
**Sold out / Available** for each app product. It never sends quantities, and it **cannot change** the IMS.

Rule: stock **0** = Sold out. Stock above 0 = available. **Minus** stock = available
(an "In" entry is missing; your team confirms on WhatsApp). The script looks at the latest day column in the IMS tab.

Nothing is added to the IMS itself: the script is a separate file in your Google Drive.

## 1. Make the script
1. Open **script.google.com** while signed in with the Google account that owns the IMS.
2. **New project**. Rename it (top left) to **Jai Ambey Live Stock**.
3. In **Code.gs**, delete everything and paste the whole of
   [`live-stock.gs`](https://raw.githubusercontent.com/jayantkhairwal-dot/jaiambey-dealer-app/claude/home-screen-design-plan-2bnwgc/apps-script/live-stock.gs).
4. **Gear (Project Settings)** → tick **Show "appsscript.json" manifest file in editor**.
5. Back in the editor (**< >**), open **appsscript.json**, delete everything and paste the whole of
   [`appsscript.json`](https://raw.githubusercontent.com/jayantkhairwal-dot/jaiambey-dealer-app/claude/home-screen-design-plan-2bnwgc/apps-script/appsscript.json).
6. **Save** (disk icon).

## 2. Tell it where the IMS is (kept private, not in the app's code)
1. Open the IMS in Google Sheets. Its address looks like
   `https://docs.google.com/spreadsheets/d/`**`LONG-ID`**`/edit`. Copy the **LONG-ID** part.
2. In the script: **gear (Project Settings)** → **Script properties** → **Add script property**.
   Property: `IMS_ID`  Value: the LONG-ID. **Save**.

## 3. Test it
1. At the top choose the function **test** → **Run**.
2. Google asks for permission → **Review permissions** → your account.
   If it says "Google hasn't verified this app": **Advanced → Go to Jai Ambey Live Stock (unsafe)** (it's your own script).
3. The only permission must be: *See all your Google Sheets spreadsheets* (read only, it can't edit or delete).
   If you see "edit", "create" or "delete", stop and ask Claude.
4. **Allow**. The log at the bottom shows e.g. `IMS day: 2026-11-24 | found 285 of 285 products | sold out: ...`.

## 4. Publish it
1. **Deploy → New deployment** → gear → **Web app**.
2. Description `live stock v1`. **Execute as: Me**. **Who has access: Anyone**.
3. **Deploy** → copy the **Web app URL** (ends with `/exec`) and send it to Claude.
   Claude puts it in the app (`STOCK_URL` in `index.html`).

## Good to know
- The app asks at most every 5 minutes per script (answers are cached), so the IMS is not slowed down.
- If the script can't be reached, the app uses its own list (`data/sold-out.json`), so it never breaks.
- New product in the app: Claude adds one line to `MAP` in `live-stock.gs`; then
  **Deploy → Manage deployments → pencil → Version: New version → Deploy** (the URL stays the same).
- If the IMS tab or the "Item Name" column is renamed or moved, tell Claude.
