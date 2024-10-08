import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import swal from "sweetalert2";
import "./orderManagement.css";

const OrderUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state; // Get order data from state

  const [customerName, setCustomerName] = useState(order.customerName);
  const [items, setItems] = useState(order.items);
  const [status, setStatus] = useState(order.status);

  // Function to calculate the total price of an item
  const calculateTotalPrice = (quantity, unitPrice) => {
    return (quantity * unitPrice).toFixed(2);
  };

  const handleSaveOrder = async (e) => {
    e.preventDefault();

    if (!customerName || items.length === 0) {
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill all fields before saving.",
      });
      return;
    }

    const updatedOrder = {
      ...order,
      customerName,
      items,
      status,
    };

    try {
      // API call to update the order
      await axios.put(`/api/Order/${order.orderId}`, updatedOrder);

      // Success notification
      swal.fire({
        title: "Order Updated!",
        text: `Order ${order.orderId} has been successfully updated.`,
        icon: "success",
      });

      // Redirect back to the order management page
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (error) {
      console.error("Error updating order:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the order. Please try again.",
      });
    }
  };

  return (
    <div className="order-update-form">
      <h3>Update Order: {order.orderId}</h3>
      <form onSubmit={handleSaveOrder}>
        <label>Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>

        <label>Items</label>
        {items.map((item, index) => (
          <div key={index}>
            <span>{item.productName}</span>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].quantity = e.target.value;
                setItems(newItems);
              }}
              min="1"
            />
            <span>Unit Price: ${item.unitPrice}</span>
            <span>Total: ${calculateTotalPrice(item.quantity, item.unitPrice)}</span> {/* Display total price */}
          </div>
        ))}

        <button type="submit">Save Order</button>
      </form>
    </div>
  );
};

export default OrderUpdate;
