import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert2"; // For alerts
import "./product.css"; // We'll improve this stylesheet for better visuals
import { axiosclient } from "../../api";
import CircularProgress from "@mui/material/CircularProgress";

const AllVendorProducts = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(false); // State to control spinner visibility

  const location = useLocation();
  const vendor = location.state.vendor;

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
    const matchesVendor = record.vendor.toLowerCase()
    .includes(vendor.id.toLowerCase());
    const matchesSearch = record.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || record.category === categoryFilter;
    return matchesSearch && matchesCategory && matchesVendor;
  });

  // Navigate to Add Product page
  const handleAddProduct = () => {
    navigate("/product/add", { state: { productVendor:vendor } }); // Navigate to add-product route
  };

  // Navigate to Update Product page
  const handleUpdate = (product) => {
    navigate("/vendor/product/update", { state: { product: product,productVendor:vendor } });
  };

  // Handle product deletion via API
  const handleDelete = async (id) => {
    setLoading(true);

    try {
      axiosclient
        .delete(`/api/Product/${id}`)
        .then((response) => {
          swal
            .fire({
              title: "Success!",
              text: "Vendor has been updated.",
              icon: "success",
            })
            .then((result) => {
              if (result.isConfirmed) {
                setLoading(false);
                window.location.reload();
              }
            });
        })
        .catch((err) => {
          setLoading(false);

          console.error("Failed to fetch user details", err);
        });
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      setLoading(false);

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
      <h2>All Vendor Products : VEND_{vendor.id.slice(0, 4)}</h2>

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
            <th>Product Id</th>
            <th>Product Name</th>
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
                  <span
                    className={
                      record.isActive ? "status-active" : "status-inactive"
                    }
                  >
                    {record.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button
                    className="actionBtn update"
                    onClick={() => handleUpdate(record)}
                  >
                    Update
                  </button>

                  <button
                    className="actionBtn delete"
                    onClick={() => handleDelete(record.id)}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Delete"}
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

export default AllVendorProducts;
