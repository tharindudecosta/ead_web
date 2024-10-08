// AllUsers.js
import React, { useState, useEffect } from "react";
import AllUsersSingle from "./AllUsersSingle"; // Updated child component
import { useNavigate } from "react-router-dom";
import "./users.css"; // Updated stylesheet for users

const AllUsers = () => {
  const navigate = useNavigate();

  // Sample data for users (replace with API fetched data later)
  const [users, setUsers] = useState([
    {
      _id: "user1",
      name: "Harsha Perera",
      email: "harsha.perera@gmail.com",
      role: "Admin",
      isActive: true,
    },
    {
      _id: "user2",
      name: "Saman Silva",
      email: "saman.silva@gmail.com",
      role: "Vendor",
      isActive: true,
    },
    {
      _id: "user3",
      name: "Lahiru Fonseka",
      email: "Lahiru.fonseka@gmail.com",
      role: "Vendor",
      isActive: false,
    },
    {
      _id: "user4",
      name: "Kavindu Peries",
      email: "kavindu.peries@gmail.com",
      role: "CSR",
      isActive: true,
    },
    {
      _id: "user5",
      name: "Priyannka Perera",
      email: "priyanka.perera@gmail.com", // Corrected email
      role: "Admin",
      isActive: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Handle search input
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // Handle role filter
  const handleFilter = (filterValue) => {
    setRoleFilter(filterValue);
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Navigate to Add User page
  const handleAddUser = () => {
    navigate("/user/add"); // Navigate to add-user route
  };

  // (Optional) Fetch users from API on component mount
  // useEffect(() => {
  //   fetchUsersFromAPI();
  // }, []);

  return (
    <div className="user-container">
      <h2>All Users</h2>

      {/* Search bar and Filters */}
      <div className="controls">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search users..."
          className="searchBar"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Role Filter */}
        <select
          className="roleFilter"
          value={roleFilter}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Vendor">Admin</option>
          <option value="CSR">Manager</option>
          <option value="Admin">Customer</option>
        </select>

        {/* Add User button */}
        <button className="addUserBtn" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      {/* Users Table */}
      <table id="user_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <AllUsersSingle key={user._id} user={user} />
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
