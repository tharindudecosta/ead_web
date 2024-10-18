// AddVendor.js
import React, { useState } from "react";
import swal from "sweetalert2";
import "./vendor.css"; 
import { useLocation, useNavigate } from "react-router-dom";
import { axiosclient } from "../../api";

const UpdateVendor = () => {
  const location = useLocation();
  const vendor = location.state.vendor; 

  const [vendorName, setVendorName] = useState(vendor.name);
  const [contactEmail, setContactEmail] = useState(vendor.contactInfo);
  const [category, setCategory] = useState(vendor.category);
  const [phoneNumber, setPhoneNumber] = useState(vendor.phone);

  const [isActive, setIsActive] = useState(
    vendor.isActive ? "Active" : "Inactive"
  );
  const [status, setStatus] = useState(vendor.isActive ? "Active" : "Inactive");

  const handleUpdateVendor = (e) => {
    e.preventDefault();

    if (!vendorName || !contactEmail || !category) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

    const updatedvendor = {
      id: vendor.id,
      name: vendorName,
      contactInfo: contactEmail,
      phone: phoneNumber,
      category: category,
      status: status,
    };

    try {
      axiosclient
        .post(`/api/Vendor`, updatedvendor)
        .then((response) => {

          swal.fire({
            title: "Success!",
            text: "Vendor has been updated.",
            icon: "success",
          });

          // Reset form fields
          setVendorName("");
          setContactEmail("");
          setPhoneNumber("");
          setCategory("");
          setStatus("Active"); // Reset status to default
        })
        .catch((err) => {
          console.error("Failed to fetch user details", err);
        });
    } catch (error) {
      console.error("Error adding vendor:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add vendor. Please try again.",
      });
    }
  };

  return (
    <div className="vendor-container">
      <form className="addVendorForm" onSubmit={handleUpdateVendor}>
        <h3>Update Vendor</h3>
        <h5>VEND_{vendor.id.slice(- 4)}</h5>

        {/* Vendor Name */}
        <label htmlFor="vendorName">Vendor Name</label>
        <input
          type="text"
          id="vendorName"
          placeholder="Enter vendor name"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
        />

        {/* Contact Email */}
        <label htmlFor="contactEmail">Contact Email</label>
        <input
          type="email"
          id="contactEmail"
          placeholder="Enter contact email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        {/* Category */}
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Accessories">Accessories</option>
          {/* Add more categories as needed */}
        </select>

        {/* Status */}
        <div className="statusContainer">
          <label>Status</label>
          <br />
          <label className="statusLabel">
            <input
              type="radio"
              value={true}
              checked={isActive === true}
              onChange={() => setIsActive(true)}
            />
            Active
          </label>
          <label className="statusLabel">
            <input
              type="radio"
              value={false}
              checked={isActive === false}
              onChange={() => setIsActive(false)}
            />
            Inactive
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submitBtn">
          Update Vendor
        </button>
      </form>
    </div>
  );
};

export default UpdateVendor;
