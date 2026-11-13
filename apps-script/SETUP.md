# Payment screenshots – setup (about 15 minutes, one time)

What this does: dealers pay by UPI in the cart, upload the screenshot and tap **Place order**.
The order (products, quantities, shop, amount, UTR) arrives as one row in the **Orders** tab of a new Google Sheet,
and the screenshot is saved in a Google Drive folder. Extra payments for old orders go to the **Payments** tab.
Your team checks the money in the bank and ticks **Confirmed in bank**, then **Dispatched**.

This uses a **new, separate sheet**. It does not touch the FMS, the IMS or the Order Entry sheet.

## 1. Make the sheet
1. Open Google Sheets → **Blank spreadsheet**.
2. Name it **Jai Ambey App – Payments**.

## 2. Add the script
1. In that sheet: **Extensions → Apps Script**.
2. Rename the project (top left) to **Jai Ambey Payments**.
3. In **Code.gs**, delete everything and paste the whole of
   [`payments.gs`](https://raw.githubusercontent.com/jayantkhairwal-dot/jaiambey-dealer-app/claude/home-screen-design-plan-2bnwgc/apps-script/payments.gs).
4. Click the **gear (Project Settings)** on the left → tick **Show "appsscript.json" manifest file in editor**.
5. Back in the editor (**< >** on the left), open **appsscript.json**, delete everything and paste the whole of
   [`appsscript.json`](https://raw.githubusercontent.com/jayantkhairwal-dot/jaiambey-dealer-app/claude/home-screen-design-plan-2bnwgc/apps-script/appsscript.json).
6. Press **Save** (disk icon).

## 3. Run setup once
1. At the top, choose the function **setup** and press **Run**.
2. Google asks for permission → **Review permissions** → pick your account.
   If it says "Google hasn't verified this app": **Advanced → Go to Jai Ambey Payments (unsafe)**. (It's your own script.)
3. The permissions must be only these two:
   - *View and manage spreadsheets that this application has been installed in* (only this sheet)
   - *See, edit, create and delete only the specific Google Drive files you use with this app* (only its own folder)
   If you see "all your Google Drive files" or "all your spreadsheets", stop and ask Claude.
4. Press **Allow**. **Orders** and **Payments** tabs appear in the sheet, and a folder **Jai Ambey App – Payment Screenshots** in your Drive.

## 4. Publish it
1. **Deploy → New deployment** → gear icon → **Web app**.
2. Description: `payments v1`. **Execute as: Me**. **Who has access: Anyone**.
3. **Deploy** → copy the **Web app URL** (ends with `/exec`).
4. Send that URL to Claude. Claude puts it in the app (`PAY_UPLOAD_URL` in `index.html`).

Later changes to the script: **Deploy → Manage deployments → pencil → Version: New version → Deploy**
(the URL stays the same).

## Daily use – the one rule
**Never dispatch on a screenshot alone.** A screenshot can be edited or copied.
For each new row in **Orders** (and **Payments**):
1. Open your bank / UPI business app and find the payment by the **UTR** and **amount**.
2. Only if the money is really there: tick **Confirmed in bank** and write your name in **Checked by**.
3. Rows with a red **Warning** need extra care:
   - *SAME UTR as row …*: the same payment was sent for two orders.
   - *Paid less than order total*: check against the bill.
4. After packing and sending: tick **Dispatched**.

## Good to know
- The script can only **add** rows. It never sends any data back to the app or to anyone.
- One mobile number can upload at most 10 screenshots per hour (stops junk floods).
- Screenshots are shrunk on the dealer's phone, so they take little Drive space.
- The web app URL is visible in the app's public code. That's fine: it only accepts new payment rows.
