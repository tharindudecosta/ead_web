import React, { useState } from "react";
import swal from "sweetalert2";
import "./product.css";

// https://youtu.be/St3BmJ9bjCs

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState("Active");

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!productName || !unitPrice || !category || !vendor) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

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
