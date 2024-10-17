import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2"; // Import SweetAlert for notifications
import "./inventory.css";
import { axiosclient } from "../../api"; // Import axiosclient for API calls

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]); // Initially empty, fetched from API
  const navigate = useNavigate();

  // Fetch inventory items from the API when the component loads
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axiosclient.get("/api/Inventory");
        setInventory(response.data); // Assuming response.data contains the inventory list
      } catch (error) {
        console.error("Error fetching inventory:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch inventory data.",
        });
      }
    };

    fetchInventory();
  }, []); // Empty dependency array means it runs once on component mount

  // Handle navigation to update stock page
  const handleUpdateStock = (product) => {
    navigate("/inventory/update", { state: { product } });
  };

  // Handle removing a product from the inventory
  const handleRemoveProduct = async (sku) => {
    try {
      await axiosclient.delete(`/api/Inventory/product/${sku}`);
      swal.fire({
        title: "Deleted!",
        text: "Product has been removed from inventory.",
        icon: "success",
      });

      // Remove the product from the local state after successful deletion
      setInventory(inventory.filter((item) => item.sku !== sku));
    } catch (error) {
      console.error("Error deleting product:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the product. Please try again.",
      });
    }
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
                  <button
                    className="remove-product-btn"
                    onClick={() => handleRemoveProduct(item.sku)}
                  >
                    Remove
                  </button>
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
