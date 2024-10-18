import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosclient } from "../../api"; // Import axiosclient for API calls
import swal from "sweetalert2"; // Import SweetAlert for notifications

const AllUsersSingle = ({ user, handleUserUpdate }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(user.isActive);

  useEffect(() => {
    if (status !== user.status) {
      console.log(`Status changed to: ${status}`);
    }
  }, [status]);

  // Handle setting user as inactive
  const handleDeactivate = async () => {
    setStatus(false);
    swal.fire({
      title: "User Inactivated!",
      text: `User ${user.name} has been marked as inactive.`,
      icon: "success",
    });
    // try {
    //   setStatus(false)
    //   await axiosclient.patch(`/api/User/${user._id}`, { isActive: false });
    //   swal.fire({
    //     title: "User Inactivated!",
    //     text: `User ${user.name} has been marked as inactive.`,
    //     icon: "success",
    //   });
    //   handleUserUpdate(user._id); // Update the user list locally if needed
    // } catch (error) {
    //   console.error("Error inactivating user:", error);
    //   swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "Failed to inactivate the user. Please try again.",
    //   });
    // }
  };

  // Handle setting user as active
  const handleActivate = async () => {
    setStatus(true);
    swal.fire({
      title: "User Activated!",
      text: `User ${user.name} has been marked as active.`,
      icon: "success",
    });
    // try {
    //   setStatus(true);
    //   await axiosclient.patch(`/api/User/${user._id}`, { isActive: true });
    //   swal.fire({
    //     title: "User Activated!",
    //     text: `User ${user.name} has been marked as active.`,
    //     icon: "success",
    //   });
    //   handleUserUpdate(user._id); // Update the user list locally if needed
    // } catch (error) {
    //   console.error("Error activating user:", error);
    //   swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "Failed to activate the user. Please try again.",
    //   });
    // }
  };

  const handleUpdate = () => {
    navigate(`/user/update/${user._id}`); // Navigate to update-user route
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{status ? "Active" : "Inactive"}</td>
      <td>
        {status ? (
          <button className="deleteBtn" onClick={handleDeactivate}>
            Inactivate
          </button>
        ) : (
          <button className="activateBtn" onClick={handleActivate}>
            Activate
          </button>
        )}
      </td>
    </tr>
  );
};

export default AllUsersSingle;
