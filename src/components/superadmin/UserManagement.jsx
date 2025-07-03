import { useEffect, useState } from "react";
import axios from "../../api/axios";

const fieldRowStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: 8,
};
const labelStyle = {
  minWidth: 120,
  fontWeight: "bold",
  marginRight: 8,
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFields, setUserFields] = useState({
    email: "",
    username: "",
    role: "",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const user = users.find((u) => u.id === parseInt(userId));
    setSelectedUser(user);
    if (user) {
      setUserFields({
        email: user.email || "",
        username: user.username || "",
        role: user.role || "",
        password: "",
      });
    } else {
      setUserFields({ email: "", username: "", role: "", password: "" });
    }
  };

  const handleUserFieldChange = (e) => {
    setUserFields({ ...userFields, [e.target.name]: e.target.value });
  };

  const handleUserCreate = async () => {
    try {
      await axios.post("/users/", userFields);
      alert("User created!");
      setUserFields({ email: "", username: "", role: "", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error creating user", err);
      if (err.response?.data?.detail) {
        alert(JSON.stringify(err.response.data.detail));
      }
    }
  };

  const handleUserUpdate = async () => {
    if (!selectedUser) return;
    try {
      await axios.put(`/users/${selectedUser.id}`, userFields);
      alert("User updated!");
      fetchUsers();
    } catch (err) {
      console.error("Error updating user", err);
      if (err.response?.data?.detail) {
        alert(JSON.stringify(err.response.data.detail));
      }
    }
  };

  const handleUserDelete = async () => {
    if (!selectedUser || !window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/users/${selectedUser.id}`);
      alert("User deleted!");
      setSelectedUser(null);
      setUserFields({ email: "", username: "", role: "", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div style={{ marginTop: 30, padding: 10, border: "1px solid #1976d2" }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{
          background: "#1976d2",
          color: "#fff",
          padding: "2px 10px",
          borderRadius: 8,
          fontWeight: "bold",
          fontSize: 13,
          marginRight: 8
        }}>
          Level: User
        </span>
      </div>

      {/* User List Table */}
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

      {/* User Form */}
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Email:</label>
        <input
          name="email"
          value={userFields.email}
          onChange={handleUserFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Email"
        />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Username:</label>
        <input
          name="username"
          value={userFields.username}
          onChange={handleUserFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Username"
        />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Role:</label>
        <input
          name="role"
          value={userFields.role}
          onChange={handleUserFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Role"
        />
      </div>
      <div style={fieldRowStyle}>
        <label style={labelStyle}>Password:</label>
        <input
          name="password"
          value={userFields.password}
          onChange={handleUserFieldChange}
          style={{ padding: 8, width: "80%" }}
          placeholder="Password"
          type="password"
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <button
          onClick={selectedUser ? handleUserUpdate : handleUserCreate}
          style={{ marginRight: 10 }}
        >
          {selectedUser ? "Update" : "Create"}
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