import { useState } from "react";
import { PageHeader, Card, Badge, EmptyState } from "../ui/ui";
import { useInventory } from "../../hooks/useInventory";
import { CATALOG, getProduct, MAX_QTY_PER_ADD } from "../../data/catalog";
import { currency, stockStatus } from "../../lib/format";
import "./Inventory.css";

const Inventory = () => {
  const { items, addStock, setQuantity, removeProduct, reset } = useInventory();

  const [selectedId, setSelectedId] = useState(String(CATALOG[0].id));
  const [qty, setQty] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [draftQty, setDraftQty] = useState(0);

  const selected = getProduct(selectedId);

  const handleAdd = (e) => {
    e.preventDefault();
    addStock(selectedId, qty);
    setQty(1);
  };

  const beginEdit = (p) => {
    setEditingId(p.id);
    setDraftQty(p.quantity);
  };
  const saveEdit = (id) => {
    setQuantity(id, draftQty);
    setEditingId(null);
  };

  return (
    <>
      <PageHeader
        title="Inventory"
        subtitle="Add stock for catalog products and manage quantities"
        actions={
          <button className="btn btn-ghost" onClick={reset}>
            ↺ Reset demo data
          </button>
        }
      />

      <div className="inv-layout">
        {/* ---- Add stock form ---- */}
        <Card title="Add stock" className="add-card">
          <form className="add-form" onSubmit={handleAdd}>
            <label className="field">
              <span className="field-label">Product</span>
              <select
                className="input"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {CATALOG.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.emoji}  {p.name} — {p.sku}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">Quantity (1–{MAX_QTY_PER_ADD})</span>
              <div className="stepper">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <input
                  type="number"
                  min="1"
                  max={MAX_QTY_PER_ADD}
                  value={qty}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10) || 1;
                    setQty(Math.min(MAX_QTY_PER_ADD, Math.max(1, v)));
                  }}
                />
                <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY_PER_ADD, q + 1))}>+</button>
              </div>
            </label>

            {selected && (
              <div className="preview">
                <span className="product-emoji">{selected.emoji}</span>
                <div>
                  <div className="product-name">{selected.name}</div>
                  <div className="product-sku">{selected.category} · {currency(selected.price)}</div>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary add-submit">
              Add to inventory
            </button>
            <p className="form-hint">
              Public demo — only catalog items can be added, and only in small quantities.
            </p>
          </form>
        </Card>

        {/* ---- Inventory table ---- */}
        <Card title={`Current inventory (${items.length})`} className="list-card">
          {items.length === 0 ? (
            <EmptyState
              title="No products in inventory"
              message="Add stock from the form to get started."
              action={<button className="btn btn-ghost btn-sm" onClick={reset}>Restore demo data</button>}
            />
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th className="num">Price</th>
                    <th className="num">Qty</th>
                    <th>Status</th>
                    <th className="num">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => {
                    const s = stockStatus(p.quantity);
                    const editing = editingId === p.id;
                    return (
                      <tr key={p.id}>
                        <td>
                          <div className="product-cell">
                            <span className="product-emoji">{p.emoji}</span>
                            <div>
                              <div className="product-name">{p.name}</div>
                              <div className="product-sku">{p.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td>{p.category}</td>
                        <td className="num">{currency(p.price)}</td>
                        <td className="num">
                          {editing ? (
                            <input
                              className="input input-qty"
                              type="number"
                              min="0"
                              value={draftQty}
                              onChange={(e) => setDraftQty(parseInt(e.target.value, 10) || 0)}
                            />
                          ) : (
                            <strong>{p.quantity}</strong>
                          )}
                        </td>
                        <td><Badge tone={s.tone}>{s.label}</Badge></td>
                        <td className="num">
                          <div className="row-actions">
                            {editing ? (
                              <>
                                <button className="btn btn-primary btn-sm" onClick={() => saveEdit(p.id)}>Save</button>
                                <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <button className="btn-icon" onClick={() => beginEdit(p)}>Edit</button>
                                <button className="btn-icon btn-danger-text" onClick={() => removeProduct(p.id)}>Remove</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default Inventory;
