# Order tracking setup – for the MIS team

**Goal:** dealers type their order number (e.g. ORD-125) in the app (My orders → Track an order)
and see 6 simple steps read from the FMS:

| Dealer sees | FMS steps |
|---|---|
| Order received | 1 Order Received (Timestamp, column A) |
| Order confirmed | 2 Payment Collection, 3 Coordinate with customer |
| Preparing your order | 4 Arrange Requirements, 5 PO Decision, 6 PO Sent, 7 PO Item Received |
| Packed | 8 Packaging |
| Dispatched | 9 Arrange Transport, 10 Ready To Dispatch |
| Bilty sent to you | 11 Bilty Received, 12 Client Number to CRM, 13 CRM Sends Bilty |

A dealer step is done when the **Actual** column of every staff step in it is filled.
Staff steps with no Planned and no Actual time (e.g. 6–7 when no item was short) are skipped.
Dealers never see client names, staff, payment, delays or the promise date.

## Safety rules (from Jayant)
- The main FMS ("Order to Delivery (staff) - JAA FMS") must not be changed in any way.
- Testing runs on the copy **"fms jai ambey app"** (same shared drive). Use its ID from its URL:
  `docs.google.com/spreadsheets/d/<THIS PART IS THE ID>/edit`
- The script is read-only and is locked to read-only by Google (`spreadsheets.readonly` permission).
  It must NOT be switched to `SpreadsheetApp.openById` (that needs full edit permission).

## Where things stand (12 Nov 2026)
- A standalone Apps Script project **"jai ambey order tracking"** exists at script.google.com
  (Jayant's account). `appsscript.json` is already set to read-only.
- Its Code.gs still has the first version, which failed with
  "Specified permissions are not sufficient to call SpreadsheetApp.openById". Expected; fixed below.
- Not deployed yet. The app shows "Order tracking is not switched on yet" until it is connected.

## Steps to finish (about 10 minutes)
1. Open the project at script.google.com.
2. **Services → + → Google Sheets API → Add** (identifier `Sheets`).
3. Replace all of **Code.gs** with `apps-script/order-tracker.gs` from this repo.
   Set `SHEET_ID` (line 25) to the ID of "fms jai ambey app". Save.
4. Check `appsscript.json` matches `apps-script/appsscript.json` from this repo
   (scope must be only `https://www.googleapis.com/auth/spreadsheets.readonly`). Save.
5. Pick **testTrack** → **Run**. Allow the permission; it must say only
   "See all your Google Sheets spreadsheets". The log should show `"ok": true` and 6 steps for ORD-1.
6. **Deploy → New deployment → Web app**: Execute as **Me**, Who has access **Anyone** → Deploy.
   Copy the Web app URL (ends with `/exec`).
7. Quick check in a browser: `<Web app URL>?order=ORD-1` shows the JSON answer.
8. Send the URL to Jayant / Claude. It goes into `TRACK_URL` near the top of the script in `index.html`.

## Later: switching to the real FMS
Only after Jayant approves: change `SHEET_ID` to the real FMS ID, save, and
**Deploy → Manage deployments → Edit → New version** (keeps the same URL). Still read-only.
