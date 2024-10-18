// AllVendorsSingle.js
import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import "./vendor.css";
import { useNavigate } from "react-router-dom";

const AllVendorsSingle = ({ vendor }) => {

  const navigate = useNavigate();
  const [status, setStatus] = useState(vendor.status);

  useEffect(() => {
    if (status !== vendor.status) {
      console.log(`Status changed to: ${status}`);
    }
  }, [status]);

  const handleCancel = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to deactivate vendor "${vendor.name}"? Please provide a note.`,
        input: "text",
        inputPlaceholder: "Enter deactivation reason...",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, deactivate it!",
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
          setStatus("Inactive")
          
          swal.fire(
            "Deactivate!",
            `Vendor has been deactivateed for reason: ${cancellationNote}`,
            "success"
          );
        }
      });
  };



  const handleUpdate = async (e) => {
    e.preventDefault();
    navigate("/vendor/update", { state: { vendor: vendor } });
  };
  const handleVendorProducts = async (e) => {
    e.preventDefault();
    navigate("/vendor/products", { state: { vendor: vendor } });
  };
  const handleVendorReviews = async (e) => {
    e.preventDefault();
    navigate("/vendor/reviews", { state: { vendor: vendor } });
  };

  return (
    <tr>
      <td>VEND_{vendor.id.slice(- 4)}</td>
      <td>{vendor.name}</td>
      <td>{vendor.contactInfo}</td>
      <td>{vendor.phone}</td>
      <td>{vendor.category}</td>
      <td>{vendor.averageReviewScore}</td>
      <td>{status}</td>
      {/* <td>
        <button className="update-btn" onClick={handleUpdate}>
        Update
        </button>
      </td> */}
      <td>
        <button className="cancelBtn" onClick={handleCancel}>
          Deactivate
        </button>
      </td>

      <td>
        <button className="deliverBtn" onClick={handleVendorProducts}>
          Products
        </button>
      </td>
      <td>
        <button className="deliverBtn" onClick={handleVendorReviews}>
          Reviews
        </button>
      </td>
    </tr>
  );
};

export default AllVendorsSingle;
