import React, { useState } from "react";
import AllProductsSingle from "./AllProductsSingle";
import { useNavigate } from "react-router-dom";
import "./product.css"; // We'll improve this stylesheet for better visuals

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

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleFilter = (filterValue) => {
    setCategoryFilter(filterValue);
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.productname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || record.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Navigate to Add Product page
  const handleAddProduct = () => {
    navigate("/product/add"); // Navigate to add-product route
  };

  return (
    <div className="product-container">
      <h2>All Products</h2>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="searchBar"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      
      {/* Category Filter */}
      <select
        className="categoryFilter"
        value={categoryFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Accessories">Accessories</option>
      </select>
      
      {/* Add Product button */}
      <button className="addProductBtn" onClick={handleAddProduct}>
        Add Product
      </button>

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
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <AllProductsSingle key={record._id} record={record} />
            ))
          ) : (
            <tr>
              <td colSpan="7">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
