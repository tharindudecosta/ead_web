import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2"; // For alerts
import "./product.css"; // We'll improve this stylesheet for better visuals
import { axiosclient } from "../../api";

const AllProducts = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        axiosclient
          .get(`/api/Product`)
          .then((response) => {
            const user = response.data;
            console.log(response.data);

            if (Array.isArray(response.data)) {
              setRecords(user);

            } else {
              console.error("Expected an array, but got:", response.data);
              setRecords([]);
            }
          })
          .catch((err) => {
            console.error("Failed to fetch user details", err);
          });
      } catch (error) {
        console.error("Error fetching vendors:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch vendors.",
        });
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleFilter = (filterValue) => {
    setCategoryFilter(filterValue);
  };

  // Filtering products by search and category
  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || record.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Navigate to Add Product page
  const handleAddProduct = () => {
    navigate("/product/add"); // Navigate to add-product route
  };

  // Navigate to Update Product page
  const handleUpdate = (id) => {
    navigate(`/product/update/${id}`);
  };

  // Handle product deletion via API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Product/${id}`);
      swal.fire({
        title: "Deleted!",
        text: "Product has been deleted.",
        icon: "success",
      });
      // Remove the product from the records state after deletion
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete product.",
      });
    }
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
            <th>Product Id</th>
            <th>Unit Price ($)</th>
            <th>Category</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Action</th> {/* Action column for Update/Delete buttons */}
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <tr key={record.id}>
                <td>PROD_{record.id.slice(0, 4)}</td>
                <td>{record.productName}</td>
                <td>{record.unitPrice}</td>
                <td>{record.category}</td>
                <td>VEND_{record.vendor.slice(0, 4)}</td>
                <td>
                  <span className={record.isActive ? "status-active" : "status-inactive"}>
                    {record.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button className="actionBtn update" onClick={() => handleUpdate(record._id)}>
                    Update
                  </button>
                  <button className="actionBtn delete" onClick={() => handleDelete(record._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
