// AllVendors.js
import React, { useState } from "react";
import AllVendorsSingle from "./AllVendorsSingle"; // Updated child component
import { useNavigate } from "react-router-dom";
import "./vendor.css"; // Updated stylesheet for vendors

const AllVendors = () => {
  const navigate = useNavigate();

  const [vendors, setvendors] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchvendors = async () => {
      try {
        const response = await axios.get("/api/Vendor");
        setvendors(response.data); // Assuming response.data contains the vendor list
      } catch (error) {
        console.error("Error fetching vendors:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch vendors.",
        });
      }
    };

    fetchvendors();
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleFilter = (filterValue) => {
    setStatusFilter(filterValue);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const isVendor = vendor.role === "Vendor";
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && vendor.isActive) ||
      (statusFilter === "Inactive" && !vendor.isActive);
    return isVendor && matchesSearch && matchesStatus;
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
