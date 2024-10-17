import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosclient } from "../../api"; // Import axiosclient for API calls
import swal from "sweetalert2"; // Import SweetAlert for notifications

const AllUsersSingle = ({ user, handleDeleteUser }) => {
  const navigate = useNavigate();

  // Delete user using Axios
  const handleDelete = async () => {
    try {
      // Make API call to delete the user
      await axiosclient.delete(`/api/User/${user._id}`);

      // Show success notification
      swal.fire({
        title: "Deleted!",
        text: `User ${user.name} has been removed.`,
        icon: "success",
      });

      // Call the parent function to remove the user from state
      handleDeleteUser(user._id);
    } catch (error) {
      console.error("Error deleting user:", error);

      // Show error notification
      swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the user. Please try again.",
      });
    }
  };

  const handleUpdate = () => {
    navigate(`/user/update/${user._id}`); // Navigate to update-user route
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.isActive ? "Active" : "Inactive"}</td>
      <td>
        <button className="deleteBtn" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AllUsersSingle;
