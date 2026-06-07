// Predefined product catalog.
//
// This is the fixed set of products the app knows about. Because the demo is
// public, visitors can't invent arbitrary products — they can only add stock
// for items that already live here. That keeps the data clean and abuse-free.

export const CATALOG = [
  { id: 1, name: "Wireless Mouse", sku: "WM-001", category: "Electronics", price: 24.99, emoji: "🖱️" },
  { id: 2, name: "Mechanical Keyboard", sku: "KB-002", category: "Electronics", price: 89.99, emoji: "⌨️" },
  { id: 3, name: "USB-C Hub", sku: "HUB-003", category: "Accessories", price: 39.99, emoji: "🔌" },
  { id: 4, name: "Laptop Stand", sku: "LS-004", category: "Accessories", price: 34.99, emoji: "🧱" },
  { id: 5, name: "Noise-Cancelling Headphones", sku: "HP-005", category: "Audio", price: 199.99, emoji: "🎧" },
  { id: 6, name: "1080p Webcam", sku: "WC-006", category: "Electronics", price: 59.99, emoji: "📷" },
  { id: 7, name: "LED Desk Lamp", sku: "DL-007", category: "Home Office", price: 29.99, emoji: "💡" },
  { id: 8, name: '27" 4K Monitor', sku: "MN-008", category: "Electronics", price: 249.99, emoji: "🖥️" },
  { id: 9, name: "Ergonomic Chair", sku: "CH-009", category: "Furniture", price: 329.99, emoji: "🪑" },
  { id: 10, name: "Standing Desk", sku: "SD-010", category: "Furniture", price: 449.99, emoji: "🗄️" },
];

export const CATEGORIES = [...new Set(CATALOG.map((p) => p.category))];

export const getProduct = (id) => CATALOG.find((p) => p.id === Number(id));

// Maximum units that can be added in a single action — keeps the public demo tidy.
export const MAX_QTY_PER_ADD = 10;
