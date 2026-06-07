# Order Dashboard

A small inventory & orders dashboard built with **React + Vite**. It started as a
learning project for wiring a React UI up to a **Supabase** (Postgres) backend,
and has been reworked into a polished, self-contained demo suitable for a
portfolio.

## Features

- **Dashboard** – summary stats (units in stock, inventory value, low-stock
  alerts), recent orders, a stock-by-category breakdown, and at-a-glance totals.
- **Inventory** – the interactive part: add stock for catalog products, edit
  quantities inline, and remove items. Everything is validated and bounded.
- **Products** – the fixed product catalog as a filterable card grid.
- **Orders** – sample order history with search and status filtering.
- **Customers** – sample customer directory with search.

## How data works

Because this is a public demo, it does **not** depend on a shared, writable
database that anyone on the internet could fill with junk. Instead:

- Products come from a fixed **catalog** (`src/data/catalog.js`) — visitors can
  only add stock for items that already exist, in small quantities.
- Each visitor's inventory changes are saved to **their own browser**
  (`localStorage`, see `src/hooks/useInventory.js`), so the demo is fully
  interactive but isolated per visitor and always works — even offline.
- Orders and customers use read-only **sample data** (`src/data/sampleData.js`).

### Supabase

The original Supabase integration is kept in `src/supabaseClient.js` for
reference. To run against a live database, add a `.env` file:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

and wire the client back into the inventory hook.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Tech stack

React 19 · Vite · React Router · Supabase JS (reference) · plain CSS
