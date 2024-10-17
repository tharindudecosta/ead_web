// AllVendorsSingle.js
import React from "react";
import swal from "sweetalert2";
import "./vendor.css";

const AllVendorsSingle = ({ vendor }) => {
  // const productCategories = vendor.products.map((product) => product.category);
  // const uniqueCategories = [...new Set(productCategories)].join(", ");
  // const totalQuantity = vendor.products.reduce(
  //   (total, product) => total + product.quantity,
  //   0
  // );

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
          console.log(`Vendor "${vendor.name}" marked as delivered.`);

          swal.fire(
            "Delivered!",
            "Vendor has been marked as delivered.",
            "success"
          );
        }
      });
  };

  const handleUpdate = () => {

    console.log(`Navigate to update page for vendor ID: ${vendor._id}`);

  };

  return (
    <tr>
      <td>{vendor.name}</td>
      <td>{vendor.email}</td>
      <td>{vendor.role}</td>
      <td>{vendor.isActive ? "Active" : "Inactive"}</td>
      {/* <td>{uniqueCategories || "N/A"}</td> */}
      {/* <td>{totalQuantity}</td> */}
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
