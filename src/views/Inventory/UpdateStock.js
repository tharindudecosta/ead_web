import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { axiosclient } from "../../api"; // Import your custom axios client
import "./inventory.css";

const UpdateStock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the passed inventory data (id, productId, name, quantity, and lowStockThreshold)
  const { id, productId, name, quantity, lowStockThreshold } = location.state.inventoryItem; 
  const [newQuantity, setNewQuantity] = useState(quantity); 
  const [newLowStockThreshold, setNewLowStockThreshold] = useState(lowStockThreshold); 

  const handleUpdateStock = async (e) => {
    e.preventDefault();

    if (newQuantity < 0 || newLowStockThreshold < 0) {
      swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Quantity and Low Stock Threshold cannot be negative.",
      });
      return;
    }

    try {
      // API call to update inventory using POST method, passing all fields as per Swagger documentation
      await axiosclient.post(`/api/Inventory`, {
        id: id, // ID is needed for identifying the inventory item to update
        productId: productId, // Required as per Swagger
        quantity: newQuantity,
        lowStockThreshold: newLowStockThreshold,
        lastUpdated: new Date().toISOString() // Auto-generate the current timestamp
      });

      swal.fire({
        title: "Stock Updated!",
        text: `${name}'s stock has been updated to ${newQuantity} and Low Stock Threshold to ${newLowStockThreshold}`,
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
        text: `Failed to update stock. ${error.response?.data?.message || "Please try again."}`,
      });
    }
  };

  return (
    <div className="update-stock-form">
      <h3>Update Stock for {name}</h3>
      <form onSubmit={handleUpdateStock}>
      <br />
        <div style={{ textAlign: "center" }}>
          <label>Product ID: {productId}</label>
          <br />
          <label>Current Quantity: {quantity}</label>
          <br />
        </div>
        <br />
        <label>New Quantity</label>
        <input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          min="0"
        />
        <br />
        <label>Low Stock Threshold</label>
        <input
          type="number"
          value={newLowStockThreshold}
          onChange={(e) => setNewLowStockThreshold(e.target.value)}
          min="0"
        />
        <br />
        <div style={{ textAlign: "center" }}> {/* Centering the button */}
          <button type="submit">Update Stock</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStock;
