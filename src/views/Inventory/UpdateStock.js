import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "./inventory.css";

const UpdateStock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sku, name, stock } = location.state.product; // Get the passed product data
  const [newStock, setNewStock] = useState(stock);

  const handleUpdateStock = (e) => {
    e.preventDefault();

    if (newStock < 0) {
      swal.fire({
        icon: "error",
        title: "Invalid Stock",
        text: "Stock cannot be negative.",
      });
      return;
    }

    swal.fire({
      title: "Stock Updated!",
      text: `${name}'s stock has been updated to ${newStock}`,
      icon: "success",
    });

    // You can replace this with API call to update stock in the database
    setTimeout(() => {
      navigate("/inventory"); // Redirect back to the inventory page after updating stock
    }, 2000);
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
