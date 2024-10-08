import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import "./product.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState("Active");

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName || !unitPrice || !category || !vendor) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

    const newProduct = {
      productName,
      unitPrice: parseFloat(unitPrice), // Ensure unit price is a number
      category,
      vendor,
      status,
    };

    try {
      // API call to add the new product
      const response = await axios.post("/api/Product", newProduct);
      
      // Success alert
      swal.fire({
        title: "Success!",
        text: "Product has been added.",
        icon: "success",
      });

      // Reset form fields
      setProductName("");
      setUnitPrice("");
      setCategory("");
      setVendor("");
      setStatus("Active");
    } catch (error) {
      // Error handling
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add product. Please try again.",
      });
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <form className="addProductForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

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

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
