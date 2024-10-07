import React from "react";
import { useNavigate } from "react-router-dom";

const AllUsersSingle = ({ user }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    // Implement delete functionality here
    // For example, make an API call to delete the user
    console.log(`Delete user with ID: ${user._id}`);
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
