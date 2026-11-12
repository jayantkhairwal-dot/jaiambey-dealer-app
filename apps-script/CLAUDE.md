# apps-script/ – order tracking (for whoever works on the Google side)

This folder is the Google Apps Script that powers **My orders → Track an order** in the dealer app.
Read `SETUP.md` (setup steps) and `../PROGRESS.md` (project status) first.

## What it does
`order-tracker.gs` is a web app (`doGet`). The app calls `<web app URL>?order=ORD-125` and gets JSON:
`{ ok, order, placed, steps:[{key,label,done,at}] }`, or `{ ok:false, error:"not_found" | "bad_id" }`.
It reads the **FMS** tab and maps 13 staff steps to 6 dealer steps (table in `SETUP.md`).
Each staff step = 4 columns (Planned, Actual, Status/Yes-No, Time Delay); Planned columns start at
G (index 6) and repeat every 4. A step is done when Actual is filled; steps with no Planned and no Actual are skipped.

## Hard rules
- **Never change the main FMS** ("Order to Delivery (staff) - JAA FMS"): no writes, columns, sheets, formulas or scripts in it.
- Test on the copy **"fms jai ambey app"**. Switch to the real FMS only when Jayant says so.
- **Read-only only.** Keep `appsscript.json` scope to `spreadsheets.readonly`. Read with the Sheets advanced
  service (`Sheets.Spreadsheets.Values.get`). Do not use `SpreadsheetApp.openById` (it demands edit permission)
  and never add the full `spreadsheets` scope.
- The response must never include client names, staff names, payment, delays or the promise date.
- **No sheet IDs, URLs with IDs, keys or emails in this repo** (it is public). Keep `SHEET_ID = 'PASTE_SHEET_ID_HERE'`
  here; the real ID lives only in the Apps Script project.
- Work only in `apps-script/`. The app (`index.html`, `data/`, `img/`) is maintained by Jayant's Claude.
  Commit on your own branch (e.g. `mis/order-tracking`), not on Jayant's branch; Jayant merges.
- The app side expects the JSON shape above. If you change it, tell Jayant so `index.html` is updated too.

## Hand-off
When deployed (Execute as: Me, Access: Anyone), send Jayant the `/exec` URL. It goes into `TRACK_URL` in `index.html`.
After code changes: Deploy → Manage deployments → Edit → New version (same URL).
