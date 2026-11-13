/**
 * Jai Ambey dealer app – payment screenshots
 *
 * Lives inside its own Google Sheet ("Jai Ambey App – Payments"), NOT the FMS.
 * The app sends: order no., amount, UTR, shop details and the screenshot.
 * This script saves the screenshot in a Drive folder and adds one row to the "Payments" tab.
 * It can only ADD rows. It never sends any data back to the app.
 *
 * Setup: see apps-script/SETUP.md
 */

const TAB = "Payments";
const FOLDER_NAME = "Jai Ambey App – Payment Screenshots";
const HEAD = ["Received at", "Order no.", "Shop", "Name", "City", "Mobile", "GST",
  "Amount paid (₹)", "UTR / Ref no.", "App order total (₹)", "Screenshot",
  "Warning", "Confirmed in bank", "Checked by", "Note"];
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;   // 4 MB after the app shrinks it
const MAX_PER_HOUR = 10;                    // uploads per mobile number per hour

/** Run this once from the editor (select "setup", press Run) to create the tab and the folder. */
function setup() {
  sheet_();
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
      const sh = sheet_();

      // ---- same UTR used before? (one payment shown for two orders) ----
      const warn = [];
      const last = sh.getLastRow();
      if (last > 1) {
        const old = sh.getRange(2, 2, last - 1, 8).getValues();   // Order no. … UTR
        old.forEach((r, i) => {
          if (String(r[7]).toUpperCase() === utr) warn.push(`SAME UTR as row ${i + 2} (order ${r[0]})`);
        });
      }
      const total = Number(d.orderTotal) || "";
      if (total && amount < total) warn.push("Paid less than app total");

      // ---- save the screenshot ----
      const ext = d.mime === "image/png" ? "png" : d.mime === "image/webp" ? "webp" : "jpg";
      const blob = Utilities.newBlob(bytes, d.mime, `${order}_${utr}.${ext}`);
      const file = folder_().createFile(blob);

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
