// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { MAX_QTY_PER_ADD } from "../data/catalog";
import { useInventory } from "./useInventory";

const STORAGE_KEY = "order-dashboard:inventory:v1";

// Helper: current quantity for a product id, or undefined if it's not listed.
const qty = (result, id) =>
  result.current.items.find((p) => p.id === id)?.quantity;

beforeEach(() => {
  localStorage.clear();
});

describe("useInventory", () => {
  it("starts from the default inventory when storage is empty", () => {
    const { result } = renderHook(() => useInventory());
    expect(result.current.items).toHaveLength(10);
    expect(qty(result, 1)).toBe(42);
  });

  it("falls back to defaults when stored data is corrupt", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    const { result } = renderHook(() => useInventory());
    expect(qty(result, 1)).toBe(42);
  });

  it("addStock adds to the existing quantity", () => {
    const { result } = renderHook(() => useInventory());
    act(() => result.current.addStock(1, 3));
    expect(qty(result, 1)).toBe(45);
  });

  it("addStock clamps the amount between 1 and MAX_QTY_PER_ADD", () => {
    const { result } = renderHook(() => useInventory());
    act(() => result.current.addStock(1, 500));
    expect(qty(result, 1)).toBe(42 + MAX_QTY_PER_ADD);

    act(() => result.current.addStock(1, 0));
    expect(qty(result, 1)).toBe(42 + MAX_QTY_PER_ADD + 1);
  });

  it("addStock ignores products that aren't in the catalog", () => {
    const { result } = renderHook(() => useInventory());
    act(() => result.current.addStock(999, 5));
    expect(result.current.items).toHaveLength(10);
  });

  it("saves changes to localStorage so they survive a reload", () => {
    const first = renderHook(() => useInventory());
    act(() => first.result.current.addStock(2, 4));

    const second = renderHook(() => useInventory());
    expect(qty(second.result, 2)).toBe(12);
  });

  it("setQuantity sets an exact value and never goes below 0", () => {
    const { result } = renderHook(() => useInventory());
    act(() => result.current.setQuantity(1, 7));
    expect(qty(result, 1)).toBe(7);

    act(() => result.current.setQuantity(1, -5));
    expect(qty(result, 1)).toBe(0);
  });

  it("removeProduct takes the product out of the list", () => {
    const { result } = renderHook(() => useInventory());
    act(() => result.current.removeProduct(1));
    expect(qty(result, 1)).toBeUndefined();
    expect(result.current.items).toHaveLength(9);
  });

  it("reset restores the default inventory", () => {
    const { result } = renderHook(() => useInventory());
    act(() => {
      result.current.setQuantity(1, 0);
      result.current.removeProduct(2);
    });
    act(() => result.current.reset());
    expect(qty(result, 1)).toBe(42);
    expect(result.current.items).toHaveLength(10);
  });
});
