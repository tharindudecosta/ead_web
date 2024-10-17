import React, { useState, useEffect } from "react";
import AllVendorsSingle from "./AllVendorsSingle";
import { useNavigate } from "react-router-dom";
import "./vendor.css";
import swal from "sweetalert2";
import { axiosclient } from "../../api"; // Ensure this points to your configured axios client

const AllVendors = () => {
  const navigate = useNavigate();
  const [vendors, setvendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        axiosclient
          .get(`/api/Vendor`)
          .then((response) => {
            const user = response.data;
            console.log(response.data);

            if (Array.isArray(response.data)) {
              const storedVendors = JSON.parse(localStorage.getItem("vendors")) || [];

              // Merge the status from local storage into the DB response
              const mergedVendors = response.data.map((vendor) => {
                // Find the status in local storage
                const storedVendor = storedVendors.find((stored) => stored.id === vendor.id);
                return {
                  ...vendor,
                  status: storedVendor ? storedVendor.status : true,
                  category: storedVendor ? storedVendor.category : "",
                  phone: storedVendor ? storedVendor.phone : "",
                };
              });
      
              // Set the merged vendors to state
              setvendors(mergedVendors);

            } else {
              console.error("Expected an array, but got:", response.data);
              setvendors([]);
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

    fetchVendors();
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleFilter = (filterValue) => {
    setStatusFilter(filterValue);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && vendor.status) ||
      (statusFilter === "Inactive" && !vendor.status);
    return matchesSearch && matchesStatus;
  });

  const handleAddVendor = () => {
    navigate("/vendor/add");
  };

  return (
    <div className="vendor-container">
      <h2>All Vendors</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search vendors..."
          className="searchBar"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <select
          className="statusFilter"
          value={statusFilter}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button className="addVendorBtn" onClick={handleAddVendor}>
          Add Vendor
        </button>
      </div>

      <table id="vendor_table">
        <thead>
          <tr>
            <th>Vendor id</th>
            <th>Name</th>
            <th>Email</th>
            <th>phoneNumber</th>
            <th>Category</th>
            <th>Average Review Score</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Products</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.length > 0 ? (
            filteredVendors &&
            filteredVendors.map((vendor) => (
              <AllVendorsSingle key={vendor.id} vendor={vendor} />
            ))
          ) : (
            <tr>
              <td colSpan="8">No vendors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllVendors;
