import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import swal from "sweetalert2";
import "./inventory.css";

const UpdateStock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sku, name, stock } = location.state.product; // Get the passed product data
  const [newStock, setNewStock] = useState(stock);

  const handleUpdateStock = async (e) => {
    e.preventDefault();

    if (newStock < 0) {
      swal.fire({
        icon: "error",
        title: "Invalid Stock",
        text: "Stock cannot be negative.",
      });
      return;
    }

    try {
      // API call to update stock
      await axios.put(`/api/Inventory/product/${sku}`, { stock: newStock });

      swal.fire({
        title: "Stock Updated!",
        text: `${name}'s stock has been updated to ${newStock}`,
        icon: "success",
      });

      // Redirect back to the inventory page after a delay
      setTimeout(() => {
        navigate("/inventory");
      }, 2000);
    } catch (error) {
      console.error("Error updating stock:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update stock. Please try again.",
      });
    }
  };

  return (
    <div className="update-stock-form">
      <h3>Update Stock for {name}</h3>
      <form onSubmit={handleUpdateStock}>
        <label>Product SKU: {sku}</label>
        <br />
        <label>Current Stock: {stock}</label>
        <br />
        <label>New Stock</label>
        <input
          type="number"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          min="0"
        />
        <br />
        <button type="submit">Update Stock</button>
      </form>
    </div>
  );
};

export default UpdateStock;
