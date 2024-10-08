// AllVendorsSingle.js
import React from "react";
import swal from "sweetalert2";
import "./vendor.css"; // Ensure styles are consistent

const AllVendorsSingle = ({ vendor }) => {
  // Aggregate product categories and total quantity
  const productCategories = vendor.products.map((product) => product.category);
  const uniqueCategories = [...new Set(productCategories)].join(", ");
  const totalQuantity = vendor.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Handle Cancel Vendor
  const handleCancel = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to cancel vendor "${vendor.name}"? Please provide a note.`,
        input: "text",
        inputPlaceholder: "Enter cancellation reason...",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, cancel it!",
        preConfirm: (note) => {
          if (!note) {
            swal.showValidationMessage("You need to enter a reason!");
          }
          return note;
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          const cancellationNote = result.value;
          // Implement API call to cancel vendor with the note here
          console.log(
            `Vendor "${vendor.name}" cancelled for reason: ${cancellationNote}`
          );

          swal.fire(
            "Cancelled!",
            `Vendor has been cancelled for reason: ${cancellationNote}`,
            "success"
          );
        }
      });
  };

  // Handle Mark as Delivered
  const handleMarkAsDelivered = () => {
    swal
      .fire({
        title: "Mark as Delivered?",
        text: `Do you want to mark vendor "${vendor.name}" as delivered?`,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, mark as delivered",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Implement API call to mark as delivered here
          console.log(`Vendor "${vendor.name}" marked as delivered.`);

          swal.fire(
            "Delivered!",
            "Vendor has been marked as delivered.",
            "success"
          );
        }
      });
  };

  // Handle Update Vendor
  const handleUpdate = () => {
    // Navigate to update vendor page with vendor ID
    // This requires the useNavigate hook or passing navigate as a prop
    // Assuming useNavigate is not available here, you might need to pass it down or use other methods
    // For simplicity, we'll leave it as a console log
    console.log(`Navigate to update page for vendor ID: ${vendor._id}`);
    // Example:
    // navigate(`/vendor/update/${vendor._id}`);
  };

  return (
    <tr>
      <td>{vendor.name}</td>
      <td>{vendor.email}</td>
      <td>{vendor.role}</td>
      <td>{vendor.isActive ? "Active" : "Inactive"}</td>
      <td>{uniqueCategories || "N/A"}</td>
      <td>{totalQuantity}</td>
      <td>
        <button className="cancelBtn" onClick={handleCancel}>
          Cancel
        </button>
      </td>
      <td>
        <button className="deliverBtn" onClick={handleMarkAsDelivered}>
          Mark as Delivered
        </button>
      </td>
    </tr>
  );
};

export default AllVendorsSingle;
