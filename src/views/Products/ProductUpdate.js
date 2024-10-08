import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios"; // Import Axios
import swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import "./product.css";

const ProductUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Used for redirecting after update
  const product = location.state.product; // Get the passed product record

  // Initialize state with the passed product data
  const [productName, setProductName] = useState(product.productname);
  const [unitPrice, setUnitPrice] = useState(product.unitprice);
  const [category, setCategory] = useState(product.category);
  const [vendor, setVendor] = useState(product.vendor);
  const [status, setStatus] = useState(product.isactive ? "Active" : "Inactive");
  const [loading, setLoading] = useState(false); // State to control spinner visibility

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!productName || !unitPrice || !category || !vendor || !status) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

    setLoading(true); // Show spinner when submitting

    const updatedProduct = {
      productName,
      unitPrice: parseFloat(unitPrice), // Ensure it's a number
      category,
      vendor,
      isactive: status === "Active", // Convert status to boolean
    };

    try {
      // API call to update the product
      await axios.put(`/api/Product/${product._id}`, updatedProduct);

      // Success alert
      swal.fire({
        title: "Success!",
        text: "Product Updated",
        icon: "success",
      });

      setLoading(false); // Hide spinner
      navigate("/product/all"); // Redirect back to All Products page
    } catch (error) {
      setLoading(false); // Hide spinner on error
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the product. Please try again.",
      });
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <form className="addProductForm" onSubmit={handleUpdate}>
        <h3>Update Product</h3>

        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Unit Price</label>
        <input
          type="text"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Vendor</label>
        <input
          type="text"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />

        <div className="statusContainer">
          <label>Status</label>
          <br />
          <input
            type="radio"
            value="Active"
            checked={status === "Active"}
            onChange={() => setStatus("Active")}
          />
          <label className="statusLabel">Active</label>
          <input
            type="radio"
            value="Inactive"
            checked={status === "Inactive"}
            onChange={() => setStatus("Inactive")}
          />
          <label className="statusLabel">Inactive</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductUpdate;
