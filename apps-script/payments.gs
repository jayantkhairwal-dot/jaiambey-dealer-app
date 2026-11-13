/**
 * Jai Ambey dealer app – orders and payment screenshots
 *
 * Lives inside its own Google Sheet ("Jai Ambey App – Payments"), NOT the FMS.
 * - New order from the cart (paid by UPI): one row in the "Orders" tab with the products,
 *   amount, UTR and the screenshot.
 * - Extra payment for an old order (My orders → Pay): one row in the "Payments" tab.
 * Screenshots are saved in a Drive folder. The script can only ADD rows.
 * It never sends any data back to the app.
 *
 * Setup: see apps-script/SETUP.md
 */

const TAB = "Payments";
const ORDERS_TAB = "Orders";
const ORDERS_HEAD = ["Received at", "Order no.", "Shop", "Name", "City", "Mobile", "GST",
  "Products", "Total qty", "Order total (₹)", "Note", "Amount paid (₹)", "UTR / Ref no.", "Screenshot",
  "Warning", "Confirmed in bank", "Checked by", "Dispatched"];
const FOLDER_NAME = "Jai Ambey App – Payment Screenshots";
const HEAD = ["Received at", "Order no.", "Shop", "Name", "City", "Mobile", "GST",
  "Amount paid (₹)", "UTR / Ref no.", "App order total (₹)", "Screenshot",
  "Warning", "Confirmed in bank", "Checked by", "Note"];
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;   // 4 MB after the app shrinks it
const MAX_PER_HOUR = 10;                    // uploads per mobile number per hour

/** Run this once from the editor (select "setup", press Run) to create the tab and the folder. */
function setup() {
  sheet_();
  ordersSheet_();
  folder_();
}

function doGet() {
  return json_({ ok: true, service: "jai-ambey-payments" });
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    // ---- check what came in ----
    const order = String(d.order || "").trim();
    const utr = String(d.utr || "").replace(/\s/g, "").toUpperCase();
    const amount = Number(d.amount);
    const phone = String(d.phone || "").replace(/\D/g, "").slice(-10);
    if (!/^JA-[A-Z0-9-]{4,30}$/.test(order)) return json_({ ok: false, error: "bad_order" });
    if (!/^[A-Z0-9]{10,35}$/.test(utr)) return json_({ ok: false, error: "bad_utr" });
    if (!(amount >= 1 && amount <= 1000000)) return json_({ ok: false, error: "bad_amount" });
    if (!/^[6-9]\d{9}$/.test(phone)) return json_({ ok: false, error: "bad_phone" });
    if (!/^image\/(jpeg|png|webp)$/.test(d.mime || "")) return json_({ ok: false, error: "bad_image" });
    const bytes = Utilities.base64Decode(String(d.image || ""));
    if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) return json_({ ok: false, error: "bad_image" });

    // ---- stop floods from one number ----
    const cache = CacheService.getScriptCache(), key = "n" + phone;
    const n = Number(cache.get(key) || 0);
    if (n >= MAX_PER_HOUR) return json_({ ok: false, error: "too_many" });
    cache.put(key, String(n + 1), 3600);

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sh = sheet_(), osh = ordersSheet_();

      // ---- same UTR used before, in either tab? (one payment shown for two orders) ----
      const warn = [];
      findUtr_(osh, 13, utr).forEach(r => warn.push(`SAME UTR as Orders row ${r}`));
      findUtr_(sh, 9, utr).forEach(r => warn.push(`SAME UTR as Payments row ${r}`));
      const total = Number(d.orderTotal) || "";
      if (total && amount < total) warn.push("Paid less than order total");

      // ---- save the screenshot ----
      const ext = d.mime === "image/png" ? "png" : d.mime === "image/webp" ? "webp" : "jpg";
      const blob = Utilities.newBlob(bytes, d.mime, `${order}_${utr}.${ext}`);
      const file = folder_().createFile(blob);

      if (Array.isArray(d.items) && d.items.length) {
        // ---- new order placed from the cart ----
        const items = d.items.slice(0, 200).map((x, i) =>
          `${i + 1}. ${clean_(x.name)} (${clean_(x.id)}) × ${Number(x.qty) || 0} @ ₹${Number(x.price) || 0}`).join("\n");
        osh.appendRow([new Date(), order, clean_(d.shop), clean_(d.name), clean_(d.city), phone, clean_(d.gst),
          items, Number(d.qty) || "", total, clean_(d.note), amount, "'" + utr, "",
          warn.join(" · "), false, "", false]);
        const r = osh.getLastRow();
        osh.getRange(r, 8).setWrap(true);
        osh.getRange(r, 14).setFormula(`=HYPERLINK("${file.getUrl()}","View screenshot")`);
        osh.getRange(r, 16).insertCheckboxes();
        osh.getRange(r, 18).insertCheckboxes();
        if (warn.length) osh.getRange(r, 15).setBackground("#F8D7D5").setFontWeight("bold");
        return json_({ ok: true });
      }

      // ---- extra payment for an order placed earlier ----
      sh.appendRow([new Date(), order, clean_(d.shop), clean_(d.name), clean_(d.city), phone,
        clean_(d.gst), amount, "'" + utr, total,
        "", warn.join(" · "), false, "", ""]);
      const row = sh.getLastRow();
      sh.getRange(row, 11).setFormula(`=HYPERLINK("${file.getUrl()}","View screenshot")`);
      sh.getRange(row, 13).insertCheckboxes();
      if (warn.length) sh.getRange(row, 12).setBackground("#F8D7D5").setFontWeight("bold");
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "server" });
  }
}

// ---------- helpers ----------
function ordersSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ORDERS_TAB);
  if (!sh) {
    sh = ss.insertSheet(ORDERS_TAB, 0);
    sh.getRange(1, 1, 1, ORDERS_HEAD.length).setValues([ORDERS_HEAD]).setFontWeight("bold").setBackground("#111").setFontColor("#fff");
    sh.setFrozenRows(1);
    sh.setColumnWidth(8, 360);
    sh.setColumnWidth(15, 260);
  }
  return sh;
}

// Rows (numbers) in sheet sh whose column col holds this UTR
function findUtr_(sh, col, utr) {
  const last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, col, last - 1, 1).getValues()
    .map((r, i) => String(r[0]).toUpperCase() === utr ? i + 2 : 0).filter(Boolean);
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.getRange(1, 1, 1, HEAD.length).setValues([HEAD]).setFontWeight("bold").setBackground("#111").setFontColor("#fff");
    sh.setFrozenRows(1);
    sh.setColumnWidth(12, 260);
  }
  return sh;
}

function folder_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("FOLDER_ID");
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* folder deleted: make a new one */ }
  }
  const f = DriveApp.createFolder(FOLDER_NAME);
  props.setProperty("FOLDER_ID", f.getId());
  return f;
}

// Text from the app: short, single line, and never read as a formula by Sheets
function clean_(v) {
  let s = String(v || "").replace(/[\r\n\t]+/g, " ").trim().slice(0, 120);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
