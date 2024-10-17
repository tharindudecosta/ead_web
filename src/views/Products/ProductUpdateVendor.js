import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios"; // Import Axios
import swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import "./product.css";
import { axiosclient } from "../../api";

const ProductUpdateVendor = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Used for redirecting after update
  const product = location.state.product; // Get the passed product record
  const productVendor = location.state.productVendor; // Get the passed product record

  // Initialize state with the passed product data
  const [productName, setProductName] = useState(product.productName);
  const [unitPrice, setUnitPrice] = useState(product.unitPrice);
  const [category, setCategory] = useState(product.category);
  const [vendor, setVendor] = useState(product.vendor);
  const [status, setStatus] = useState(
    product.isActive ? "Active" : "Inactive"
  );
  const [loading, setLoading] = useState(false); // State to control spinner visibility

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!productName || !unitPrice || !category || !status) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

    setLoading(true); // Show spinner when submitting

    const updatedProduct = {
      id:product.id ,
      productName:productName,
      unitPrice: unitPrice, 
      category:category,
      vendor:vendor,
      isActive: status === "Active",
    };

    try {
      axiosclient
        .put(`/api/Product/${product.id}`, updatedProduct)
        .then((response) => {
          swal.fire({
            title: "Success!",
            text: "Vendor has been updated.",
            icon: "success",
          });

          setLoading(false);
          navigate("/vendor/products",{ state: { vendor: productVendor } });
        })
        .catch((err) => {
          setLoading(false);
          console.error("Failed to fetch user details", err);
        });
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
        <h3>Update Vendor Product : VEND_{vendor.slice(0, 4)}</h3>

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

        <label>Vendor id</label>
        <h5>VEND_{vendor.slice(0, 4)}</h5>

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

export default ProductUpdateVendor;
