# Order Dashboard

A small inventory dashboard I built with React and Vite. It started as a way to
learn Supabase, then I turned it into a self-contained demo I could put on my
portfolio.

You can add stock for products, edit quantities, and remove items. There are
also Orders, Products, and Customers pages with some sample data so it feels like
a real dashboard.

## Data

It's a public demo, so I didn't want a shared database that anyone could fill
with junk. Instead:

- Products come from a fixed list, so you can only add stock for items that
  already exist.
- Your changes are saved in your own browser (localStorage), so everyone gets
  their own copy and it works even if you're offline.
- Orders and customers are just sample data.

The original Supabase setup is still in `src/supabaseClient.js` if you want to
see how that worked.

## Running it

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

To make a production build:

```bash
npm run build
```

## Built with

React, Vite, and React Router.
