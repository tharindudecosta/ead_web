import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./orderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      orderId: "ORD001",
      customerName: "John Doe",
      items: [
        { productName: "Wireless Mouse", quantity: 2, unitPrice: 29.99 },
        { productName: "Keyboard", quantity: 1, unitPrice: 89.99 },
      ],
      status: "Processing",
      date: "2024-10-05",
    },
    {
      orderId: "ORD002",
      customerName: "Jane Smith",
      items: [
        { productName: "Office Chair", quantity: 1, unitPrice: 199.99 },
      ],
      status: "Shipped",
      date: "2024-10-04",
    }
  ]);

  const navigate = useNavigate();

  // Function to calculate total price for each order
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0).toFixed(2);
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId && order.status === "Processing"
        ? { ...order, status: "Cancelled" }
        : order
    );
    setOrders(updatedOrders);
  };

  const handleUpdateOrder = (order) => {
    if (order.status === "Processing") {
      navigate("/orders/update", { state: { order } });
    } else {
      alert("You can only update orders that are in 'Processing' status.");
    }
  };

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Items</th>
              <th>Total Price</th> {/* Add Total Price header */}
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.items.map(item => (
                    <div key={item.productName}>
                      {item.productName} - Qty: {item.quantity} - Unit Price: ${item.unitPrice}
                    </div>
                  ))}
                </td>
                <td>${calculateTotalPrice(order.items)}</td> {/* Display total price */}
                <td>{order.status}</td>
                <td>{order.date}</td>
                <td>
                  {order.status === "Processing" && (
                    <button onClick={() => handleUpdateOrder(order)} className="update-btn">
                      Update
                    </button>
                  )}
                  {order.status === "Processing" && (
                    <button onClick={() => handleCancelOrder(order.orderId)} className="cancel-btn">
                      Cancel
                    </button>
                  )}
                  {order.status !== "Processing" && (
                    <span className="disabled-btn">Cannot Edit</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
