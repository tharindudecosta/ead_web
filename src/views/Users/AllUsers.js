import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API calls
import AllUsersSingle from "./AllUsersSingle"; // Updated child component
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2"; // Import SweetAlert for notifications
import "./users.css"; // Updated stylesheet for users
import { axiosclient } from "../../api"; // Use the same axiosclient as in AllProducts

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Initially empty, fetched from API
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axiosclient
          .get(`/api/User`)
          .then((response) => {
            const userList = response.data;
            console.log(response.data);

            if (Array.isArray(userList)) {
              setUsers(userList); // Assuming response.data contains the user list
            } else {
              console.error("Expected an array, but got:", response.data);
              setUsers([]); // Handle unexpected response structure
            }
          })
          .catch((err) => {
            console.error("Failed to fetch user details", err);
            swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to fetch users.",
            });
          });
      } catch (error) {
        console.error("Error fetching users:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch users.",
        });
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means it runs once on component mount

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

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      await axiosclient.delete(`/api/User/${userId}`);
      swal.fire({
        title: "Deleted!",
        text: "The user has been removed.",
        icon: "success",
      });

      // Remove the user from the local state after successful deletion
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the user. Please try again.",
      });
    }
  };

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
          <option value="Vendor">Vendor</option>
          <option value="CSR">Customer Support</option>
          <option value="Admin">Admin</option>
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
              <AllUsersSingle
                key={user._id}
                user={user}
                handleDeleteUser={handleDeleteUser} // Pass delete function to child component
              />
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
