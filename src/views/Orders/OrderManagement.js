import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "./orderManagement.css";
import { axiosclient } from "../../api"; // Import axiosclient for API calls
import DateFormatter from "../../components/DateFormatter";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // Initially empty, fetched from API
  const navigate = useNavigate();

  // Fetch orders from the API when the component loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosclient.get("/api/Order");
        setOrders(response.data); // Assuming response.data contains the orders list
      } catch (error) {
        console.error("Error fetching orders:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch orders.",
        });
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures the API is called only once on component mount


  useEffect(() => {
    console.log(orders);
    
  }, [orders]);
  // Function to calculate total price for each order
  const calculateTotalPrice = (items) => {
    return items
      .reduce((total, item) => total + item.quantity * item.unitPrice, 0)
      .toFixed(2);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      // Update order status to "Cancelled" using PUT request
      // await axiosclient.put(`/api/Order/${orderId}`, { orderStatus: "Cancelled" });

      // Update local state after successfully canceling the order
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, orderStatus: "Cancelled" } : order
      );
      setOrders(updatedOrders);

      swal.fire({
        title: "Cancelled!",
        text: "The order has been cancelled.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to cancel the order. Please try again.",
      });
    }
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
              <th>Total Price</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>ORD_{order.id.slice(-4)}</td>
                <td>CUS_{order.customerId.slice(-4)}</td>
                <td>
                  {order.productIds.map((item) => (
                    <div key={item}>
                    PROD_{item.slice(-4)}
                    </div>
                  ))}
                </td>
                <td>{order.totalPrice}</td>
                <td>{order.orderStatus}</td>
                <td><DateFormatter dateString= {order.orderDate}></DateFormatter></td>
                <td>
                  {/* {order.orderStatus === "Processing" && (
                    <button
                      onClick={() => handleUpdateOrder(order)}
                      className="update-btn"
                    >
                      Update
                    </button>
                  )} */}
                  {order.orderStatus === "Cancel Requested" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  )}
                  {order.orderStatus !== "Cancel Requested" && (
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
