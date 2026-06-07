import { useCallback, useEffect, useState } from "react";
import { CATALOG, getProduct, MAX_QTY_PER_ADD } from "../data/catalog";
import { DEFAULT_INVENTORY } from "../data/sampleData";

// Per-visitor inventory store.
//
// Each visitor gets their own sandbox saved in localStorage, so the public demo
// is fully interactive (add / edit / delete stock) without anyone being able to
// affect what other visitors see. This replaces the original Supabase backend,
// which is kept in the repo (src/supabaseClient.js) to show the integration.

const STORAGE_KEY = "order-dashboard:inventory:v1";

// Internally the inventory is a { [productId]: quantity } map.
const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Corrupt/unavailable storage — fall back to defaults below.
  }
  return { ...DEFAULT_INVENTORY };
};

const persist = (map) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Storage may be unavailable (private mode); state still works in-memory.
  }
};

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export function useInventory() {
  const [map, setMap] = useState(load);

  useEffect(() => {
    persist(map);
  }, [map]);

  // Merge the quantity map with the catalog into a list the UI can render.
  const items = CATALOG.map((p) => ({ ...p, quantity: map[p.id] ?? 0 })).filter(
    (p) => map[p.id] != null
  );

  const addStock = useCallback((productId, qty) => {
    const id = Number(productId);
    if (!getProduct(id)) return;
    const amount = clamp(parseInt(qty, 10) || 0, 1, MAX_QTY_PER_ADD);
    setMap((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + amount }));
  }, []);

  const setQuantity = useCallback((productId, qty) => {
    const id = Number(productId);
    const amount = clamp(parseInt(qty, 10) || 0, 0, 9999);
    setMap((prev) => ({ ...prev, [id]: amount }));
  }, []);

  const removeProduct = useCallback((productId) => {
    const id = Number(productId);
    setMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const reset = useCallback(() => setMap({ ...DEFAULT_INVENTORY }), []);

  return { items, addStock, setQuantity, removeProduct, reset };
}
