# Jai Ambey Dealer App

## What this is
A mobile-first ordering app for Jai Ambey Accessories, a 20+ year car accessories wholesaler in Karol Bagh, New Delhi.
Dealers across India open one link, browse the catalog, add items with quantities, register once, and place orders.

## Who uses it
- Dealers and retailers across India, mostly on Android phones, some not very comfortable with apps. Keep it simple, big tap targets, fast on slow 4G.
- Jai Ambey's team receives the orders.

## Current content
- `data/products.json`: 105 car perfumes (id, name, cat, price in INR, unit, img).
  Categories: Dashboard, Hanging, Spray, Solar. `unit` is "per pc" / "per box" or empty.
- `img/`: one 560x560 white-background photo per product.
- `reference/v1-index.html`: first working prototype (catalog, cart, register, WhatsApp order, order history, reorder). Use it for features and flow, not for design.
- More categories (wheel caps, door guards, gear knobs, mobile stands, car care) will be added later.

## Must-have features
- Catalog with category filter, search and sort
- Product detail with big photo and quick quantity buttons
- Cart with editable quantities and total
- One-time dealer registration: name, shop name, city, mobile, GST (optional)
- My orders + one-tap reorder (repeat orders are the main use case)
- About Jai Ambey page

## Coming later (design for it, don't build yet)
- Orders go to a backend (Google Apps Script) that saves them to Google Sheets and triggers the Sales FMS
- Live stock from the "JAI AMBEY - IMS" Google Sheet: show In stock / Out of stock only, never quantities
- WhatsApp order confirmations through WATI on a new company number
- "New arrivals" section

## Design direction (chosen by Jayant)
Inspiration: dark landing pages with glowing blue gradients, and Apple-style bold product headlines.
- Background: near-black / deep navy (around #05070F to #0A1030), never flat grey
- Signature: a glowing electric-blue light effect (blue to cyan, soft white core) behind the top of the app,
  like a curved planet horizon, rising light bars, or a soft aurora wave. Built in CSS/SVG/canvas, not a heavy video.
  Strongest on the home screen hero; quieter on catalog, cart and orders screens so products stay the focus.
- Type: big, bold, tight white headlines (Apple-like geometric sans); small muted grey supporting text
- Buttons: white pill buttons with black text for the main action; outline pills for secondary
- Product photos have white backgrounds: show them in clean rounded white tiles that sit on the dark background
- Motion: one smooth hero entrance and a slow-moving glow; nothing that slows scrolling on cheap Android phones
- Must stay readable outdoors in daylight: high contrast text, no thin grey-on-black body text

## Rules
- Prices are fixed wholesale prices in INR, shown like ₹1,250
- Hosted on GitHub Pages, so keep it a static site
- Product photos must load fast: lazy-load, keep sizes small
