import React, { useState, useEffect } from "react";
import { API_URL } from "../../src/api";

interface AdminUser {
  id: number;
  username: string;
  userType: string;
}

const Admin: React.FC = () => {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserType, setNewUserType] = useState("admin");

  // Fetch admins from backend
  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admins`);
      const data = await response.json();
      if (data.success) {
        setAdmins(data.admins);
      }
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Search filter
  const filteredAdmins = admins.filter((admin) =>
    admin.username.toLowerCase().includes(search.toLowerCase())
  );

  // Add new admin
  const handleAddAdmin = async () => {
    if (!newUsername.trim() || !newPassword.trim()) {
      alert("Please enter username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          userType: newUserType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Admin added successfully!");
        setNewUsername("");
        setNewPassword("");
        setNewUserType("admin");
        setShowForm(false);
        fetchAdmins(); // Refresh table list
      } else {
        alert(data.message || "Failed to add admin");
      }
    } catch (err) {
      console.error("Error adding admin:", err);
      alert("Server connection failed");
    }
  };

  // Delete admin
  const handleDelete = async (id: number) => {
    const admin = admins.find((item) => item.id === id);
    if (!admin) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${admin.username}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admins/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setAdmins(admins.filter((item) => item.id !== id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 85px)",
        backgroundColor: "#ffffff",
        padding: "40px 5%",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "600", color: "#111827" }}>
          Admin
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: "#075985",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            padding: "10px 18px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          + Add new admin
        </button>
      </div>

      {/* ADD ADMIN FORM */}
      {showForm && (
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #dbe3ea",
            borderRadius: "6px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#1e293b" }}>Add New Admin</h3>

          <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Enter username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
                width: "220px",
                outline: "none",
              }}
            />

            <input
              type="password"
              placeholder="Enter password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
                width: "220px",
                outline: "none",
              }}
            />

            <select
              value={newUserType}
              onChange={(e) => setNewUserType(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
              }}
            >
              <option value="admin">admin</option>
              <option value="Onboarding_Admins">Onboarding Admins</option>
              <option value="Dashboard_Viewers">Dashboard Viewers</option>
            </select>

            <button
              onClick={handleAddAdmin}
              style={{
                backgroundColor: "#075985",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 18px",
                cursor: "pointer",
              }}
            >
              Save
            </button>

            <button
              onClick={() => setShowForm(false)}
              style={{
                backgroundColor: "#64748b",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 18px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div
        style={{
          border: "1px solid #dbe3ea",
          borderRadius: "6px",
          padding: "15px 20px",
          backgroundColor: "#ffffff",
          marginBottom: "0",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ fontSize: "13px", color: "#334155" }}>Search:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "160px",
            padding: "8px",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            outline: "none",
          }}
        />
      </div>

      {/* TABLE */}
      <div style={{ border: "1px solid #dbe3ea", borderTop: "none", overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1.5fr 1fr",
            backgroundColor: "#f1f7fb",
            padding: "12px 18px",
            fontSize: "11px",
            fontWeight: "600",
            color: "#475569",
          }}
        >
          <div>USER NAME</div>
          <div>USER TYPE</div>
          <div style={{ textAlign: "right" }}>ACTIONS</div>
        </div>

        {filteredAdmins.length === 0 ? (
          <div style={{ padding: "25px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
            No admins found.
          </div>
        ) : (
          filteredAdmins.map((admin) => (
            <div
              key={admin.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1.5fr 1fr",
                alignItems: "center",
                padding: "13px 18px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "13px",
                color: "#334155",
              }}
            >
              <div>{admin.username}</div>
              <div>{admin.userType}</div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                <button
                  onClick={() => handleDelete(admin.id)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "3px",
                    padding: "5px 10px",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;