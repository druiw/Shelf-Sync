import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Inventory from "./components/Inventory/Inventory";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import Customers from "./components/Customers/Customers";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="content-inner">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
