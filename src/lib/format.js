// Small formatting + status helpers shared across pages.

export const currency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number.isFinite(n) ? n : 0
  );

export const number = (n) => new Intl.NumberFormat("en-US").format(n ?? 0);

export const shortDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Stock level → semantic status, used for badges and dashboard counts.
export const LOW_STOCK_THRESHOLD = 5;

export const stockStatus = (qty) => {
  if (qty <= 0) return { label: "Out of stock", tone: "danger" };
  if (qty <= LOW_STOCK_THRESHOLD) return { label: "Low stock", tone: "warning" };
  return { label: "In stock", tone: "success" };
};

// Maps order status strings to badge tones.
export const orderTone = (status) =>
  ({
    Delivered: "success",
    Shipped: "info",
    Processing: "info",
    Pending: "warning",
    Cancelled: "danger",
  }[status] || "neutral");
