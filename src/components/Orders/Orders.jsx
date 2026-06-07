import { useMemo, useState } from "react";
import { PageHeader, Card, Badge, StatCard, EmptyState } from "../ui/ui";
import { SAMPLE_ORDERS } from "../../data/sampleData";
import { currency, number, shortDate, orderTone } from "../../lib/format";
import "./Orders.css";

const STATUSES = ["All", "Delivered", "Shipped", "Processing", "Pending", "Cancelled"];

const Orders = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_ORDERS.filter((o) => {
      const matchesStatus = status === "All" || o.status === status;
      const matchesQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  const revenue = SAMPLE_ORDERS.reduce((s, o) => s + o.total, 0);
  const delivered = SAMPLE_ORDERS.filter((o) => o.status === "Delivered").length;
  const open = SAMPLE_ORDERS.filter((o) =>
    ["Processing", "Pending", "Shipped"].includes(o.status)
  ).length;

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Sample order history for the dashboard demo"
      />

      <div className="stat-grid orders-stats">
        <StatCard tone="primary" label="Total orders" value={number(SAMPLE_ORDERS.length)} icon="🧾" />
        <StatCard tone="success" label="Delivered" value={number(delivered)} icon="✅" />
        <StatCard tone="info" label="Open orders" value={number(open)} icon="🚚" />
        <StatCard tone="warning" label="Revenue" value={currency(revenue)} icon="💵" />
      </div>

      <Card>
        <div className="toolbar">
          <input
            className="input search"
            type="search"
            placeholder="Search by order # or customer…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="filter-chips">
            {STATUSES.map((s) => (
              <button
                key={s}
                className={`chip${status === s ? " active" : ""}`}
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No matching orders" message="Try a different search or filter." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th className="num">Items</th>
                  <th className="num">Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id}>
                    <td className="mono">{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{shortDate(o.date)}</td>
                    <td className="num">{o.items}</td>
                    <td className="num">{currency(o.total)}</td>
                    <td><Badge tone={orderTone(o.status)}>{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
};

export default Orders;
