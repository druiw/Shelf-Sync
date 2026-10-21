import { describe, expect, it } from "vitest";
import { currency, number, orderTone, shortDate, stockStatus } from "./format";

describe("currency", () => {
  it("formats a number as US dollars", () => {
    expect(currency(1234.5)).toBe("$1,234.50");
  });

  it("falls back to $0.00 for non-numbers", () => {
    expect(currency(NaN)).toBe("$0.00");
    expect(currency(undefined)).toBe("$0.00");
  });
});

describe("number", () => {
  it("adds thousands separators", () => {
    expect(number(1234567)).toBe("1,234,567");
  });

  it("treats null/undefined as 0", () => {
    expect(number(null)).toBe("0");
  });
});

describe("stockStatus", () => {
  it("is out of stock at zero or below", () => {
    expect(stockStatus(0).label).toBe("Out of stock");
    expect(stockStatus(-3).label).toBe("Out of stock");
  });

  it("is low stock up to and including the threshold", () => {
    expect(stockStatus(1).label).toBe("Low stock");
    expect(stockStatus(5).label).toBe("Low stock");
  });

  it("is in stock above the threshold", () => {
    expect(stockStatus(6)).toEqual({ label: "In stock", tone: "success" });
  });
});

describe("orderTone", () => {
  it("maps known statuses to badge tones", () => {
    expect(orderTone("Delivered")).toBe("success");
    expect(orderTone("Cancelled")).toBe("danger");
  });

  it("defaults to neutral for unknown statuses", () => {
    expect(orderTone("Refunded")).toBe("neutral");
  });
});

describe("shortDate", () => {
  // Date-only strings parse as midnight UTC. Without formatting in UTC, this
  // showed "Jun 3, 2026" for anyone west of UTC (e.g. Arizona).
  it("shows the same calendar day as the ISO date, in any time zone", () => {
    expect(shortDate("2026-06-04")).toBe("Jun 4, 2026");
  });
});
