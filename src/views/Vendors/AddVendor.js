import React, { useState } from "react";
import swal from "sweetalert2";
import "./vendor.css"; // Ensure consistent styling
import axios from "axios";
import { axiosclient } from "../../api";

const AddVendor = () => {
  const [vendorName, setVendorName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");

  const handleAddVendor = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!vendorName || !contactEmail || !phoneNumber || !category) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

    const vendor = {
      name: vendorName,
      contactInfo: contactEmail,
      phone: phoneNumber,
      category: category,
      status: status,
    };

    try {
      axiosclient
        .post(`/api/Vendor`,vendor)
        .then((response) => {
          const vendorlocal = {
            id: response.data.id,
            name: vendorName,
            contactInfo: contactEmail,
            phone: phoneNumber,
            category: category,
            status: status,
          };

          const savedVendors =
            JSON.parse(localStorage.getItem("vendors")) || [];
          savedVendors.push(vendorlocal);
          localStorage.setItem("vendors", JSON.stringify(savedVendors));

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
          className="categoryFilter"
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

        <br />
        <br />
        <br />
        <br />

        {/* Submit Button */}
        <button type="submit" className="submitBtn">
          Add Vendor
        </button>
      </form>
    </div>
  );
};

export default AddVendor;
