"""Update data/sold-out.json from an Excel copy of the IMS (read-only use of the IMS).

Usage:  python3 -I tools/update_stock.py /path/to/ims.xlsx

Rule (Jayant, 24 Nov): stock 0 = Sold out; above 0 or minus = available; blank = unknown (keep current status).
Uses the latest day column (a date in row 1) of the "IMS" tab, and the app id -> IMS name list (MAP)
in apps-script/live-stock.gs, so the scheduled update and the live script always agree.
Prints a short summary. Never writes quantities anywhere.
"""
import datetime
import json
import os
import re
import sys

import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
norm = lambda s: re.sub(r"\s+", " ", str(s or "")).strip().lower()


def load_map():
    src = open(os.path.join(ROOT, "apps-script", "live-stock.gs"), encoding="utf-8").read()
    body = src[src.index("const MAP = {") + len("const MAP = "): src.index("};", src.index("const MAP = {")) + 1]
    return json.loads(body)


def read_stock(path):
    wb = openpyxl.load_workbook(path, data_only=True, read_only=True)
    rows = list(wb["IMS"].iter_rows(values_only=True))
    head = rows[0]
    col, day = 4, None  # fall back to "Closing Stock"
    for c in range(len(head) - 1, -1, -1):
        if isinstance(head[c], datetime.datetime) and any(
                len(r) > c and isinstance(r[c], (int, float)) for r in rows[1:]):
            col, day = c, head[c].date()
            break
    stock = {}
    for r in rows[1:]:
        if len(r) > col and r[1] and isinstance(r[col], (int, float)):
            stock[norm(r[1])] = r[col]
    return stock, day


def main(path):
    m = load_map()
    stock, day = read_stock(path)
    products = {p["id"]: p for p in json.load(open(os.path.join(ROOT, "data", "products.json"), encoding="utf-8"))}
    f = os.path.join(ROOT, "data", "sold-out.json")
    current = json.load(open(f, encoding="utf-8"))
    known, out = set(), set()
    for pid, name in m.items():
        s = stock.get(norm(name))
        if s is None or pid not in products:
            continue
        known.add(pid)
        if s == 0:
            out.add(pid)
    keep = [e for e in current if e["id"] not in known and e["id"] in products]  # unknown: keep as is
    new = keep + [{"id": i, "name": products[i]["name"]} for i in sorted(out)]
    before, after = {e["id"] for e in current}, {e["id"] for e in new}
    open(f, "w", encoding="utf-8").write("[\n" + ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in new) + "\n]\n")
    print(f"IMS day {day} | {len(known)} of {len(m)} products found | sold out {len(after)} (was {len(before)})")
    for i in sorted(after - before):
        print(f"  now sold out: {products[i]['name']}")
    for i in sorted(before - after):
        if i in products:
            print(f"  available again: {products[i]['name']}")
    missing = sorted(set(m) - known)
    if missing:
        print("  not found in IMS: " + ", ".join(products[i]["name"] for i in missing if i in products))


if __name__ == "__main__":
    main(sys.argv[1])
