import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./product.css";
import swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";

const ProductUpdate = () => {
  const location = useLocation();
  const product = location.state.product; // Get the passed product record

  // Initialize state with the passed product data
  const [productName, setProductName] = useState(product.productname);
  const [unitPrice, setUnitPrice] = useState(product.unitprice);
  const [category, setCategory] = useState(product.category);
  const [vendor, setVendor] = useState(product.vendor);
  const [status, setStatus] = useState(
    product.isactive ? "Active" : "Inactive"
  );
  const [loading, setLoading] = useState(false); // State to control spinner visibility

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!productName || !unitPrice || !category || !vendor || !status) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There are empty fields",
      });
      return;
    }

    setLoading(true); // Show spinner when submitting

    setTimeout(() => {
      // Simulate async process like API call
      swal.fire({
        title: "Good job!",
        text: "Product Updated",
        icon: "success",
      });
      setLoading(false); // Hide spinner after the process
    }, 2000); // Simulate 2-second delay
  };

  return (
    <div>
      <form className="updateProductForm" onSubmit={handleUpdate}>
        <h3>Update Product</h3>

        <label>Product Name</label>
        <input
          className="prodIn"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ width: "auto" }}
        />
        <br />

        <label>Unit Price</label>
        <input
          className="prodIn"
          type="text"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          style={{ width: "auto" }}
        />
        <br />

        <label>Category</label>
        <input
          className="prodIn"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "auto" }}
        />
        <br />

        <label>Vendor</label>
        <input
          className="prodIn"
          type="text"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          style={{ width: "auto" }}
        />
        <br />

        <label>Status</label>
        <br />
        <input
          type="radio"
          value="Active"
          checked={status === "Active"}
          onChange={() => setStatus("Active")}
          name="status"
          style={{ width: "auto", display: "inline" }}
        />
        <label htmlFor="active" style={{ width: "auto", display: "inline" }}>
          Active
        </label>
        <br />
        <input
          type="radio"
          value="Inactive"
          checked={status === "Inactive"}
          onChange={() => setStatus("Inactive")}
          name="status"
          style={{ width: "auto", display: "inline" }}
        />
        <label htmlFor="inactive" style={{ width: "auto", display: "inline" }}>
          Inactive
        </label>
        <br />
        <br />

        <div className="button-container">
          <button className="updateBtn" type="submit" disabled={loading}>
            Update Record
          </button>
          {loading && <CircularProgress size={24} style={{ marginLeft: "20px"}} />} {/* Show spinner next to button */}
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
