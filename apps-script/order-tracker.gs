/**
 * Jai Ambey – dealer order tracking (READ ONLY)
 *
 * What it does: a dealer types an order number (e.g. ORD-12) in the app,
 * and this script answers with the 6 dealer steps (done / not done + date).
 *
 * Safety:
 * - It only READS the sheet. There is no code here that writes, deletes or moves anything.
 * - It never returns client names, staff names, payment details, delays or the promise date.
 *
 * Read-only is enforced by Google: appsscript.json (next to this file) only asks for
 * "spreadsheets.readonly" permission, so this project cannot change any sheet.
 *
 * It reads through the "Google Sheets API" service (Services → + → Google Sheets API),
 * because SpreadsheetApp.openById() refuses to run with read-only permission.
 *
 * Setup (standalone project at script.google.com, NOT inside the FMS):
 * 1. Paste this whole file. Add the service: Services → + → Google Sheets API → Add.
 * 2. Put the spreadsheet ID in SHEET_ID below.
 *    For testing: the copy "fms jai ambey app". Later: the real FMS (still read-only).
 * 3. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone → Deploy.
 * 4. Give the Web app URL to Claude to put in the app.
 */

const SHEET_ID   = 'PASTE_SHEET_ID_HERE';
const SHEET_NAME = 'FMS';

// FMS columns (A = 0). Each staff step has 4 columns: Planned, Actual, Status/Yes-No, Time Delay.
// Step 1 "Order Received" uses the Timestamp column (A).
const COL = { timestamp: 0, orderId: 1 };
const STEP_PLANNED = { 2: 6, 3: 10, 4: 14, 5: 18, 6: 22, 7: 26, 8: 30, 9: 34, 10: 38, 11: 42, 12: 46, 13: 50 };

// 13 staff steps → 6 simple dealer steps
const DEALER_STEPS = [
  { key: 'received',  label: 'Order received',        steps: [1] },
  { key: 'confirmed', label: 'Order confirmed',       steps: [2, 3] },
  { key: 'preparing', label: 'Preparing your order',  steps: [4, 5, 6, 7] },
  { key: 'packed',    label: 'Packed',                steps: [8] },
  { key: 'dispatched',label: 'Dispatched',            steps: [9, 10] },
  { key: 'bilty',     label: 'Bilty sent to you',     steps: [11, 12, 13] }
];

function doGet(e) {
  const raw = String((e && e.parameter && e.parameter.order) || '');
  return json(track(raw));
}

function track(raw) {
  const id = normalizeId(raw);
  if (!id) return { ok: false, error: 'bad_id' };

  const cache = CacheService.getScriptCache();
  const hit = cache.get('o:' + id);
  if (hit) return JSON.parse(hit);

  // Read-only read through the Sheets API. Dates come back as serial numbers (days since 30 Dec 1899).
  const res = Sheets.Spreadsheets.Values.get(SHEET_ID, "'" + SHEET_NAME + "'", {
    valueRenderOption: 'UNFORMATTED_VALUE',
    dateTimeRenderOption: 'SERIAL_NUMBER'
  });
  const rows = res.values || [];

  // Data starts after the header row whose column B says "Order ID"
  let start = rows.findIndex(r => String(r[COL.orderId]).trim().toLowerCase() === 'order id');
  start = start < 0 ? 0 : start + 1;

  let row = null;
  for (let i = rows.length - 1; i >= start; i--) {           // newest first
    if (normalizeId(rows[i][COL.orderId]) === id) { row = rows[i]; break; }
  }
  const result = row ? build(id, row) : { ok: false, error: 'not_found', order: id };
  cache.put('o:' + id, JSON.stringify(result), 60);           // 1 minute
  return result;
}

function build(id, r) {
  const actual  = n => n === 1 ? r[COL.timestamp] : r[STEP_PLANNED[n] + 1];
  const planned = n => n === 1 ? r[COL.timestamp] : r[STEP_PLANNED[n]];
  const has = v => v !== '' && v !== null && v !== undefined;

  const steps = DEALER_STEPS.map(d => {
    // A staff step counts only if it applies to this order (it has a Planned or Actual time).
    // Example: steps 6–7 (purchase order) are skipped when no item was short.
    const applies = d.steps.filter(n => has(planned(n)) || has(actual(n)));
    const done = applies.length > 0 && applies.every(n => has(actual(n)));
    const last = applies.map(n => actual(n)).filter(has).pop();
    return { key: d.key, label: d.label, done: done, at: done && last ? isoDate(last) : null };
  });
  // A later step being done means the earlier ones are done too (keeps the timeline clean)
  for (let i = steps.length - 2; i >= 0; i--) if (steps[i + 1].done) steps[i].done = true;

  return { ok: true, order: id, placed: isoDate(r[COL.timestamp]), steps: steps };
}

// "ord 12", "ORD12", "12" → "ORD-12". Other formats are returned uppercased as-is.
function normalizeId(v) {
  const s = String(v || '').trim().toUpperCase().replace(/\s+/g, '');
  if (!s) return '';
  const m = s.match(/^(?:ORD)?-?(\d{1,6})$/);
  return m ? 'ORD-' + Number(m[1]) : s.slice(0, 40);
}

function isoDate(v) {
  if (typeof v === 'number') {
    // Sheet serial date → calendar date (the serial is already in the sheet's own time zone)
    const d = new Date(Math.round((v - 25569) * 86400000));
    return Utilities.formatDate(d, 'UTC', 'yyyy-MM-dd');
  }
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d) ? null : Utilities.formatDate(d, 'Asia/Kolkata', 'yyyy-MM-dd');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor to test: View → Logs shows the answer for ORD-1
function testTrack() {
  Logger.log(JSON.stringify(track('ORD-1'), null, 2));
}
