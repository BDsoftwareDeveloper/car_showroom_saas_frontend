import { useEffect, useState } from "react";
import axios from "../../api/axios";

const fieldRowStyle = { display: "flex", alignItems: "center", marginBottom: 8 };
const labelStyle = { minWidth: 120, fontWeight: "bold", marginRight: 8 };

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFields, setUserFields] = useState({
    email: "",
    username: "",
    role: "",
    password: "",
  });

  // Get tenant_id from current user (adjust as needed)
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tenant_id = user.tenant_id;

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users/"); // Adjust endpoint as needed
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUserFieldChange = (e) => {
    setUserFields({ ...userFields, [e.target.name]: e.target.value });
  };

  const handleUserCreate = async () => {
    if (!tenant_id) {
      alert("No tenant_id found. Please re-login.");
      return;
    }
    try {
      await axios.post("/tenant-users/", {
        ...userFields,
        tenant_id: Number(tenant_id),
      });
      alert("User created!");
      setUserFields({ email: "", username: "", role: "", password: "" });
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      alert("Error creating user");
    }
  };

  const handleUserUpdate = async () => {
    if (!selectedUser) return;
    if (!tenant_id) {
      alert("No tenant_id found. Please re-login.");
      return;
    }
    try {
      await axios.put(`/tenant-users/${selectedUser.id}`, {
        ...userFields,
        tenant_id: Number(tenant_id),
      });
      alert("User updated!");
      fetchUsers();
    } catch (err) {
      alert("Error updating user");
    }
  };

  const handleUserDelete = async () => {
    if (!selectedUser || !window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`/tenant-users/${selectedUser.id}`);
      alert("User deleted!");
      setSelectedUser(null);
      setUserFields({ email: "", username: "", role: "", password: "" });
      fetchUsers();
    } catch (err) {
      alert("Error deleting user");
    }
  };

  return (
    <div style={{ marginTop: 20, padding: 10, border: "1px solid #1976d2" }}>
      <h3>User Management</h3>
      <table style={{ width: "100%", marginBottom: 20, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Username</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Role</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>{user.email}</td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>{user.username}</td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>{user.role}</td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setUserFields({
                      email: user.email || "",
                      username: user.username || "",
                      role: user.role || "",
                      password: "",
                    });
                  }}
                  style={{ marginRight: 8 }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    handleUserDelete();
                  }}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Email:</label>
        <input name="email" value={userFields.email} onChange={handleUserFieldChange} style={{ padding: 8, width: "80%" }} />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Username:</label>
        <input name="username" value={userFields.username} onChange={handleUserFieldChange} style={{ padding: 8, width: "80%" }} />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Role:</label>
        <input name="role" value={userFields.role} onChange={handleUserFieldChange} style={{ padding: 8, width: "80%" }} />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Password:</label>
        <input name="password" value={userFields.password} onChange={handleUserFieldChange} style={{ padding: 8, width: "80%" }} type="password" />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={selectedUser ? handleUserUpdate : handleUserCreate} style={{ marginRight: 10 }}>
          {selectedUser ? "Update User" : "Create User"}
        </button>
        {selectedUser && (
          <button
            onClick={() => {
              setSelectedUser(null);
              setUserFields({ email: "", username: "", role: "", password: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}