import { useMemo, useState } from "react";
import { PageHeader, Card, StatCard, EmptyState } from "../ui/ui";
import { SAMPLE_CUSTOMERS } from "../../data/sampleData";
import { currency, number, shortDate } from "../../lib/format";
import "./Customers.css";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Deterministic accent color per customer, so avatars look varied but stable.
const AVATAR_COLORS = ["#6d5efc", "#0ea5e9", "#16a34a", "#f59e0b", "#ec4899", "#8b5cf6"];
const avatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

const Customers = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE_CUSTOMERS;
    return SAMPLE_CUSTOMERS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }, [query]);

  const totalSpent = SAMPLE_CUSTOMERS.reduce((s, c) => s + c.spent, 0);
  const totalOrders = SAMPLE_CUSTOMERS.reduce((s, c) => s + c.orders, 0);

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Sample customer directory for the dashboard demo"
      />

      <div className="stat-grid customers-stats">
        <StatCard tone="primary" label="Customers" value={number(SAMPLE_CUSTOMERS.length)} icon="👥" />
        <StatCard tone="info" label="Total orders" value={number(totalOrders)} icon="🧾" />
        <StatCard tone="success" label="Lifetime value" value={currency(totalSpent)} icon="💎" />
      </div>

      <Card>
        <div className="toolbar">
          <input
            className="input search"
            type="search"
            placeholder="Search customers…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No matching customers" message="Try a different search." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Location</th>
                  <th className="num">Orders</th>
                  <th className="num">Spent</th>
                  <th>Customer since</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="customer-cell">
                        <span className="avatar" style={{ background: avatarColor(c.id) }}>
                          {initials(c.name)}
                        </span>
                        <div>
                          <div className="product-name">{c.name}</div>
                          <div className="product-sku">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{c.location}</td>
                    <td className="num">{c.orders}</td>
                    <td className="num">{currency(c.spent)}</td>
                    <td>{shortDate(c.since)}</td>
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

export default Customers;
