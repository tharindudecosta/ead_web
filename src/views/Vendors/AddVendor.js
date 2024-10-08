// AddVendor.js
import React, { useState } from "react";
import swal from "sweetalert2";
import "./vendor.css"; // Ensure consistent styling

const AddVendor = () => {
  const [vendorName, setVendorName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleAddVendor = (e) => {
    e.preventDefault();

    // Basic validation
    if (!vendorName || !contactEmail || !phoneNumber || !category) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

    // Simulate successful vendor addition (replace with API call)
    swal.fire({
      title: "Success!",
      text: "Vendor has been added.",
      icon: "success",
    });

    // Reset form fields
    setVendorName("");
    setContactEmail("");
    setPhoneNumber("");
    setCategory("");
    setIsActive(true);
  };

  return (
    <div className="vendor-container">
      <form className="addVendorForm" onSubmit={handleAddVendor}>
        <h3>Add Vendor</h3>

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

        {/* Phone Number */}
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
          Add Vendor
        </button>
      </form>
    </div>
  );
};

export default AddVendor;
