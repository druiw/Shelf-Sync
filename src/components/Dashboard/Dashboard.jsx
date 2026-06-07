import { Link } from "react-router-dom";
import { PageHeader, Card, StatCard, Badge } from "../ui/ui";
import { useInventory } from "../../hooks/useInventory";
import { SAMPLE_ORDERS, SAMPLE_CUSTOMERS } from "../../data/sampleData";
import { CATALOG, CATEGORIES } from "../../data/catalog";
import { currency, number, shortDate, stockStatus, orderTone } from "../../lib/format";
import "./Dashboard.css";

const Dashboard = () => {
  const { items } = useInventory();

  const totalUnits = items.reduce((sum, p) => sum + p.quantity, 0);
  const inventoryValue = items.reduce((sum, p) => sum + p.quantity * p.price, 0);
  const lowStock = items.filter((p) => p.quantity > 0 && p.quantity <= 5);
  const outOfStock = items.filter((p) => p.quantity <= 0);
  const revenue = SAMPLE_ORDERS.reduce((s, o) => s + o.total, 0);

  // Units in stock grouped by category, for a lightweight bar chart.
  const byCategory = CATEGORIES.map((cat) => {
    const units = items
      .filter((p) => p.category === cat)
      .reduce((s, p) => s + p.quantity, 0);
    return { cat, units };
  });
  const maxUnits = Math.max(1, ...byCategory.map((c) => c.units));

  const recentOrders = SAMPLE_ORDERS.slice(0, 5);
  const attention = [...outOfStock, ...lowStock].slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of inventory and recent activity"
        actions={
          <Link to="/inventory" className="btn btn-primary">
            + Add stock
          </Link>
        }
      />

      <div className="stat-grid">
        <StatCard tone="primary" label="Products tracked" value={number(items.length)}
          hint={`of ${CATALOG.length} in catalog`} icon="📦" />
        <StatCard tone="info" label="Units in stock" value={number(totalUnits)}
          hint="across all products" icon="🧮" />
        <StatCard tone="success" label="Inventory value" value={currency(inventoryValue)}
          hint="at list price" icon="💰" />
        <StatCard tone="warning" label="Needs attention" value={number(lowStock.length + outOfStock.length)}
          hint={`${outOfStock.length} out, ${lowStock.length} low`} icon="⚠️" />
      </div>

      <div className="dash-grid">
        <Card
          title="Recent orders"
          action={<Link to="/orders" className="card-link">View all</Link>}
        >
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th className="num">Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="mono">{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{shortDate(o.date)}</td>
                    <td className="num">{currency(o.total)}</td>
                    <td><Badge tone={orderTone(o.status)}>{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Stock by category">
          <ul className="bars">
            {byCategory.map(({ cat, units }) => (
              <li key={cat} className="bar-row">
                <span className="bar-label">{cat}</span>
                <span className="bar-track">
                  <span
                    className="bar-fill"
                    style={{ width: `${(units / maxUnits) * 100}%` }}
                  />
                </span>
                <span className="bar-value">{number(units)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Needs attention"
          action={<Link to="/inventory" className="card-link">Manage</Link>}
        >
          {attention.length === 0 ? (
            <p className="muted">Everything is well stocked. 🎉</p>
          ) : (
            <ul className="attention-list">
              {attention.map((p) => {
                const s = stockStatus(p.quantity);
                return (
                  <li key={p.id} className="attention-item">
                    <span className="product-emoji">{p.emoji}</span>
                    <span className="attention-name">
                      <span className="product-name">{p.name}</span>
                      <span className="product-sku">{p.sku}</span>
                    </span>
                    <Badge tone={s.tone}>{p.quantity} left</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card title="At a glance">
          <ul className="glance">
            <li><span>Total orders</span><strong>{number(SAMPLE_ORDERS.length)}</strong></li>
            <li><span>Revenue (sample)</span><strong>{currency(revenue)}</strong></li>
            <li><span>Customers</span><strong>{number(SAMPLE_CUSTOMERS.length)}</strong></li>
            <li><span>Catalog size</span><strong>{number(CATALOG.length)}</strong></li>
          </ul>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
