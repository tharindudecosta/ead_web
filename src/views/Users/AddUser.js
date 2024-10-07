import React, { useState } from "react";
import swal from "sweetalert2";
import "./users.css";

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!userName || !email || !role) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
      });
      return;
    }

    swal.fire({
      title: "Success!",
      text: "User has been added.",
      icon: "success",
    });

    // Reset form fields
    setUserName("");
    setEmail("");
    setRole("");
    setStatus("Active");
  };

  return (
    <div>
      <form className="addUserForm" onSubmit={handleAddUser}>
        <h3>Add User</h3>

        <label>User Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <div className="statusContainer">
          <label>Status</label>
          <br />
          <label className="statusLabel">
            <input
              type="radio"
              value="Active"
              checked={status === "Active"}
              onChange={() => setStatus("Active")}
            />
            Active
          </label>
          <label className="statusLabel">
            <input
              type="radio"
              value="Inactive"
              checked={status === "Inactive"}
              onChange={() => setStatus("Inactive")}
            />
            Inactive
          </label>
        </div>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
