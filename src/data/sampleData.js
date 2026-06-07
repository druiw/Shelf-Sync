// Read-only sample data used to make the Orders and Customers pages feel like a
// real, populated dashboard. These are illustrative only — nothing here is
// editable, so there's nothing for public visitors to break.

export const DEFAULT_INVENTORY = {
  1: 42,
  2: 8,
  3: 25,
  4: 3,
  5: 0,
  6: 14,
  7: 6,
  8: 2,
  9: 11,
  10: 0,
};

export const SAMPLE_ORDERS = [
  { id: "ORD-1042", customer: "Avery Thompson", date: "2026-06-04", items: 3, total: 174.97, status: "Delivered" },
  { id: "ORD-1041", customer: "Jordan Lee", date: "2026-06-04", items: 1, total: 449.99, status: "Shipped" },
  { id: "ORD-1040", customer: "Priya Nair", date: "2026-06-03", items: 2, total: 114.98, status: "Processing" },
  { id: "ORD-1039", customer: "Marcus Webb", date: "2026-06-03", items: 5, total: 612.93, status: "Delivered" },
  { id: "ORD-1038", customer: "Sofia Garcia", date: "2026-06-02", items: 1, total: 199.99, status: "Pending" },
  { id: "ORD-1037", customer: "Ethan Carter", date: "2026-06-02", items: 4, total: 289.96, status: "Shipped" },
  { id: "ORD-1036", customer: "Hannah Kim", date: "2026-06-01", items: 2, total: 84.98, status: "Cancelled" },
  { id: "ORD-1035", customer: "Noah Schmidt", date: "2026-05-31", items: 1, total: 329.99, status: "Delivered" },
  { id: "ORD-1034", customer: "Emma Rossi", date: "2026-05-30", items: 3, total: 154.97, status: "Delivered" },
  { id: "ORD-1033", customer: "Daniel Cohen", date: "2026-05-29", items: 2, total: 119.98, status: "Processing" },
];

export const SAMPLE_CUSTOMERS = [
  { id: 1, name: "Avery Thompson", email: "avery.t@example.com", location: "Austin, TX", orders: 12, spent: 1894.32, since: "2024-02-11" },
  { id: 2, name: "Jordan Lee", email: "jordan.lee@example.com", location: "Seattle, WA", orders: 7, spent: 2310.45, since: "2024-05-03" },
  { id: 3, name: "Priya Nair", email: "priya.nair@example.com", location: "Boston, MA", orders: 19, spent: 3421.0, since: "2023-11-20" },
  { id: 4, name: "Marcus Webb", email: "m.webb@example.com", location: "Denver, CO", orders: 5, spent: 982.5, since: "2025-01-08" },
  { id: 5, name: "Sofia Garcia", email: "sofia.g@example.com", location: "Miami, FL", orders: 9, spent: 1456.78, since: "2024-08-14" },
  { id: 6, name: "Ethan Carter", email: "ethan.carter@example.com", location: "Chicago, IL", orders: 3, spent: 612.2, since: "2025-03-22" },
  { id: 7, name: "Hannah Kim", email: "hannah.kim@example.com", location: "Portland, OR", orders: 14, spent: 2789.9, since: "2023-09-05" },
  { id: 8, name: "Noah Schmidt", email: "noah.s@example.com", location: "New York, NY", orders: 6, spent: 1320.6, since: "2024-12-01" },
];
