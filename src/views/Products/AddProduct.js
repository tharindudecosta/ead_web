import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import "./product.css";
import { axiosclient } from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState("Active");
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false); // State to control spinner visibility
  
  const location = useLocation();
  const productVendor = location && location.state && location.state.productVendor;

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axiosclient.get(`/api/Vendor`);
        console.log(response.data);

        if (Array.isArray(response.data)) {
          setVendors(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
          setVendors([]);
        }

        if(productVendor!=null){
          setVendor(productVendor.id)
        }


      } catch (error) {
        console.error("Error fetching vendors:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch vendors.",
        });
      }
    };

    fetchVendors();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productName || !unitPrice || !category || !vendor) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

    const newProduct = {
      productName:productName,
      unitPrice: unitPrice,
      category:category,
      vendor:vendor,
      isActive:status === "Active",
    };


    try {
      axiosclient
        .post(`/api/Product/`, newProduct)
        .then((response) => {
          swal.fire({
            title: "Success!",
            text: "Product has been added.",
            icon: "success",
          });

          setLoading(false);
          setProductName("");
          setUnitPrice("");
          if(productVendor==null){
            setVendor("");
          }
          setCategory("");
          setStatus("Active");
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
        text: "Failed to add product. Please try again.",
      });
      console.error("Error updating product:", error);
    }

  };

  return (
    <div>
      <form className="addProductForm" onSubmit={handleAddProduct}>
        <h3>Add Product {productVendor ? ` : ${productVendor.name}` : ""}</h3>

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
        <select value={vendor} onChange={(e) => setVendor(e.target.value)}>
          <option value="">Select Vendor</option>
          {vendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} {/* Assuming vendor has a 'name' field */}
            </option>
          ))}
        </select>

        <br></br>
        <br></br>

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
          {loading ? <CircularProgress size={24} /> : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
