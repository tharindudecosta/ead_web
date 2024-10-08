// AllVendors.js
import React, { useState } from "react";
import AllVendorsSingle from "./AllVendorsSingle"; // Updated child component
import { useNavigate } from "react-router-dom";
import "./vendor.css"; // Updated stylesheet for vendors

const AllVendors = () => {
  const navigate = useNavigate();

  // Unified user data with products (replace with API fetched data later)
  const [users, setUsers] = useState([
    {
      _id: "user1",
      name: "Harsha Perera",
      email: "harsha.perera@gmail.com",
      role: "Admin",
      isActive: true,
      products: [
        {
          productName: "Wireless Mouse",
          category: "Electronics",
          quantity: 150,
        },
        {
          productName: "Gaming Keyboard",
          category: "Electronics",
          quantity: 85,
        },
      ],
    },
    {
      _id: "user2",
      name: "Saman Silva",
      email: "saman.silva@gmail.com",
      role: "Vendor",
      isActive: true,
      products: [
        { productName: "Office Chair", category: "Furniture", quantity: 60 },
        { productName: "Desk Lamp", category: "Accessories", quantity: 120 },
      ],
    },
    {
      _id: "user3",
      name: "Lahiru Fonseka",
      email: "lahiru.fonseka@gmail.com",
      role: "Vendor",
      isActive: false,
      products: [
        { productName: "Water Bottle", category: "Accessories", quantity: 200 },
        { productName: "Smartphone", category: "Electronics", quantity: 75 },
      ],
    },
    {
      _id: "user4",
      name: "Kavindu Peries",
      email: "kavindu.peries@gmail.com",
      role: "CSR",
      isActive: true,
      products: [], // CSR may not have products
    },
    {
      _id: "user5",
      name: "Priyannka Perera",
      email: "priyanka.perera@gmail.com",
      role: "Admin",
      isActive: false,
      products: [
        { productName: "Gaming Chair", category: "Furniture", quantity: 40 },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Handle search input
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // Handle status filter
  const handleFilter = (filterValue) => {
    setStatusFilter(filterValue);
  };

  // Filter users based on search term and status
  const filteredVendors = users.filter((user) => {
    const isVendor = user.role === "Vendor";
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && user.isActive) ||
      (statusFilter === "Inactive" && !user.isActive);
    return isVendor && matchesSearch && matchesStatus;
  });

  // Navigate to Add Vendor page
  const handleAddVendor = () => {
    navigate("/vendor/add"); // Navigate to add-vendor route
  };

  return (
    <div className="vendor-container">
      <h2>All Vendors</h2>

      {/* Search bar and Filters */}
      <div className="controls">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search vendors..."
          className="searchBar"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="statusFilter"
          value={statusFilter}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Add Vendor button */}
        <button className="addVendorBtn" onClick={handleAddVendor}>
          Add Vendor
        </button>
      </div>

      {/* Vendors Table */}
      <table id="vendor_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Product Categories</th>
            <th>Total Quantity</th>
            <th>Cancel</th>
            <th>Mark as Delivered</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <AllVendorsSingle key={vendor._id} vendor={vendor} />
            ))
          ) : (
            <tr>
              <td colSpan="9">No vendors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllVendors;
