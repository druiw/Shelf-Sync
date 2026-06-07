import { useMemo, useState } from "react";
import { PageHeader, Card, Badge } from "../ui/ui";
import { useInventory } from "../../hooks/useInventory";
import { CATALOG, CATEGORIES } from "../../data/catalog";
import { currency, stockStatus } from "../../lib/format";
import "./Products.css";

const Products = () => {
  const { items } = useInventory();
  const [category, setCategory] = useState("All");

  // Quantities come from the visitor's own inventory; 0 if not stocked.
  const stockById = useMemo(
    () => Object.fromEntries(items.map((p) => [p.id, p.quantity])),
    [items]
  );

  const filtered =
    category === "All"
      ? CATALOG
      : CATALOG.filter((p) => p.category === category);

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="The fixed catalog this dashboard tracks"
      />

      <div className="filter-chips products-filter">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            className={`chip${category === c ? " active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((p) => {
          const qty = stockById[p.id] ?? 0;
          const s = stockStatus(qty);
          return (
            <Card key={p.id} className="product-card">
              <div className="product-card-top">
                <span className="product-thumb">{p.emoji}</span>
                <Badge tone={s.tone}>{s.label}</Badge>
              </div>
              <h3 className="product-card-name">{p.name}</h3>
              <p className="product-card-sku">{p.sku} · {p.category}</p>
              <div className="product-card-foot">
                <span className="product-price">{currency(p.price)}</span>
                <span className="product-stock">{qty} in stock</span>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Products;
