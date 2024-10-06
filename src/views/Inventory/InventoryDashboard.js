import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inventory.css";

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([
    {
      sku: "PRD001",
      name: "Wireless Mouse",
      category: "Electronics",
      stock: 25,
      reorderLevel: 10,
      price: "29.99",
      vendor: "TechCo",
    },
    {
      sku: "PRD002",
      name: "Gaming Keyboard",
      category: "Electronics",
      stock: 5,
      reorderLevel: 10,
      price: "89.99",
      vendor: "ProKey",
    },
    {
      sku: "PRD003",
      name: "Office Chair",
      category: "Furniture",
      stock: 0,
      reorderLevel: 5,
      price: "199.99",
      vendor: "ComfortSeating",
    }
  ]);

  const navigate = useNavigate();

  const handleUpdateStock = (product) => {
    navigate("/inventory/update", { state: { product } });
  };

  return (
    <div className="inventory-dashboard">
      <h2>Inventory Management</h2>
      <div className="inventory-actions">
        <button className="add-inventory-btn">Add New Product</button>
        <button className="generate-report-btn">Generate Report</button>
      </div>

      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Reorder Level</th>
              <th>Price</th>
              <th>Vendor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>{item.reorderLevel}</td>
                <td>${item.price}</td>
                <td>{item.vendor}</td>
                <td>
                  <button
                    className="update-stock-btn"
                    onClick={() => handleUpdateStock(item)}
                  >
                    Update Stock
                  </button>
                  <button className="remove-product-btn">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryDashboard;
