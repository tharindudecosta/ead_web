import React, { useState } from "react";
import AllProductsSingle from "./AllProductsSingle";
import { useNavigate } from "react-router-dom";
import "./product.css";

const AllProducts = () => {
  const navigate = useNavigate();

  // Sample data for products (replace with API fetched data later)
  const [records, setRecords] = useState([
    {
      _id: "64d5a5e68e6a10ff283b7e9a",
      productname: "Wireless Mouse",
      unitprice: "29.99",
      category: "Electronics",
      vendor: "TechCo",
      isactive: true
    },
    {
      _id: "64d5a6f88e6a10ff283b7e9b",
      productname: "Gaming Keyboard",
      unitprice: "89.99",
      category: "Electronics",
      vendor: "ProKey",
      isactive: true
    },
    {
      _id: "64d5a7a28e6a10ff283b7e9c",
      productname: "Office Chair",
      unitprice: "199.99",
      category: "Furniture",
      vendor: "ComfortSeating",
      isactive: false
    },
    {
      _id: "64d5a9c88e6a10ff283b7e9d",
      productname: "Water Bottle",
      unitprice: "12.50",
      category: "Accessories",
      vendor: "HydroLife",
      isactive: true
    },
    {
      _id: "64d5a9c88e6a10ff283b7e9e",
      productname: "Smartphone",
      unitprice: "799.00",
      category: "Electronics",
      vendor: "PhoneInc",
      isactive: false
    }
  ]);

  // Navigate to Add Product page
  const handleAddProduct = () => {
    navigate("/product/add"); // Navigate to add-product route
  };

  return (
    <div>
      <h2>All Products</h2>
      <br />
      {/* Add Product button */}
      <button className="addProductBtn" onClick={handleAddProduct}>
        Add Product
      </button>
      <br />
      <table id="product_table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Category</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record) => (
              <AllProductsSingle key={record._id} record={record} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
