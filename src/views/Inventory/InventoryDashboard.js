import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosclient } from "../../api"; // Custom Axios instance
import swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { jsPDF } from "jspdf"; // Import jsPDF for generating PDFs
import "jspdf-autotable"; // Import autoTable plugin for generating tables in PDFs
import "./inventory.css";

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]); // State for storing inventory items
  const [loading, setLoading] = useState(false); // State for showing loading spinner
  const [searchTerm, setSearchTerm] = useState(""); // State for search functionality
  const navigate = useNavigate();

  // Fetch all inventory items on component mount
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const response = await axiosclient.get("/api/Inventory");
        setInventory(response.data); // Store the inventory data in state
      } catch (error) {
        console.error("Error fetching inventory:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch inventory data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleUpdateStock = (inventoryItem) => {
    navigate("/inventory/update", { state: { inventoryItem } });
  };

  const handleRemoveProduct = async (productId) => {
    setLoading(true);
    try {
      await axiosclient.delete(`/api/Inventory/product/${productId}`);
      swal.fire({
        title: "Deleted!",
        text: `Inventory for product ID ${productId} has been removed.`,
        icon: "success",
      });
      setInventory(inventory.filter((item) => item.productId !== productId)); // Remove from state
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the inventory item. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // Function to generate the PDF report
  const handleGeneratePDFReport = () => {
    if (filteredInventory.length === 0) { // Only generate the report if there are filtered items
      swal.fire({
        icon: "error",
        title: "No Data",
        text: "There are no inventory items to generate a report.",
      });
      return;
    }

    // Create a new PDF document
    const doc = new jsPDF();

    // Title for the report
    doc.text("Filtered Inventory Report", 14, 16);

    // Table headers
    const tableColumn = ["Product ID", "Quantity", "Low Stock Threshold", "Last Updated"];

    // Table rows (mapping the filtered inventory data)
    const tableRows = filteredInventory.map((item) => [
      `PROD_${item.productId.slice(0, 4)}`, // Format the Product ID
      item.quantity,
      item.lowStockThreshold,
      new Date(item.lastUpdated).toLocaleString(), // Format the date
    ]);

    // Add autoTable for the inventory data
    doc.autoTable({
      startY: 20, // Start below the title
      head: [tableColumn],
      body: tableRows,
    });

    // Save the PDF
    doc.save("inventory_report.pdf");
  };

  // Filtering inventory items by productId with "PROD_" format
  const filteredInventory = inventory.filter((item) => {
    const formattedProductId = `PROD_${item.productId.slice(0, 4)}`.toLowerCase();
    return formattedProductId.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="inventory-dashboard">
      <h2>Inventory Management</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Product ID (e.g., PROD_1234)..."
        className="searchBar"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Add New Inventory and Generate Report buttons */}
      <div className="inventory-actions">
        <button className="add-inventory-btn" onClick={() => navigate("/inventory/add")}>
          Add New Inventory
        </button>
        <button className="generate-report-btn" onClick={handleGeneratePDFReport}>
          Generate PDF Report
        </button>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Low Stock Threshold</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="loading">
                  <CircularProgress />
                </td>
              </tr>
            ) : filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>PROD_{item.productId.slice(0, 4)}</td> {/* Display formatted Product ID */}
                  <td>{item.quantity}</td>
                  <td>{item.lowStockThreshold}</td>
                  <td>{new Date(item.lastUpdated).toLocaleString()}</td>
                  <td>
                  <div className="action-buttons">
                    <button
                      className="update-stock-btn"
                      onClick={() => handleUpdateStock(item)}
                    >
                      Update Stock
                    </button>
                    <button
                      className="remove-product-btn"
                      onClick={() => handleRemoveProduct(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No inventory items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryDashboard;
