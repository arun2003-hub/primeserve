import { useState, useEffect } from "react";
import AddUserModal from "../../subfiles/adduser";

interface User {
  id: number;
  username: string;
  email: string;
  company_name: string;
  company_address: string;
  company_website: string;
  pan_number: string;
  mobile_number: string;
  status: string;
}

export default function Onboarding() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users");
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Status Change Handler (Activate / Reject / De-activate)
  const handleUpdateStatus = async (userId: number, newStatus: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (user.company_name && user.company_name.toLowerCase().includes(searchText.toLowerCase()));

    const matchesStatus = statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#f5f9fc",
        padding: "25px 50px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <h1 style={{ margin: 0, fontSize: "25px", fontWeight: "600", color: "#123b57" }}>
          On Boarding
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ backgroundColor: "#0b557f", color: "#ffffff", border: "none", borderRadius: "4px", padding: "9px 14px", fontSize: "12px", cursor: "pointer" }}>
            ↓ Download Excel
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: "#0b557f", color: "#ffffff", border: "none", borderRadius: "4px", padding: "9px 14px", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}
          >
            + Add User
          </button>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #d6e3eb", borderRadius: "8px", padding: "18px", maxWidth: "100%", boxSizing: "border-box", marginBottom: "25px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.7fr 0.8fr", gap: "15px", alignItems: "end" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", color: "#455a64", marginBottom: "6px" }}>Search</label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by username, email, or company..."
              style={{ width: "100%", height: "34px", boxSizing: "border-box", border: "1px solid #b8ccd8", borderRadius: "4px", padding: "0 10px", fontSize: "11px", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", color: "#455a64", marginBottom: "6px" }}>Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: "100%", height: "34px", border: "1px solid #b8ccd8", borderRadius: "4px", padding: "0 8px", fontSize: "11px", backgroundColor: "#ffffff", outline: "none", cursor: "pointer" }}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="De-active">De-active</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <button style={{ width: "100%", height: "34px", backgroundColor: "#123b57", color: "#ffffff", border: "none", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>
              🔍 Search
            </button>
          </div>
        </div>
      </div>

      {/* USER LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#78909c" }}>Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d6e3eb", borderRadius: "8px", padding: "50px", textAlign: "center", color: "#78909c", fontSize: "13px" }}>
            No users found.
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #d6e3eb",
                borderRadius: "8px",
                padding: "20px 25px",
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr",
                alignItems: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0f172a" }}>{user.username}</div>
                <div style={{ fontSize: "13px", color: "#475569" }}>Mail id: {user.email}</div>
                <div style={{ fontSize: "13px", color: "#475569", display: "flex", alignItems: "center", gap: "6px" }}>
                  Status:{" "}
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      backgroundColor:
                        user.status === "Active" ? "#dcfce7" : user.status === "Pending" ? "#fef3c7" : "#fee2e2",
                      color:
                        user.status === "Active" ? "#166534" : user.status === "Pending" ? "#92400e" : "#991b1b",
                      fontWeight: "600",
                    }}
                  >
                    {user.status}
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "#475569" }}>Company Name: {user.company_name}</div>
                <div style={{ fontSize: "13px", color: "#475569" }}>Company Website: {user.company_website}</div>
                <div style={{ fontSize: "13px", color: "#475569" }}>Company Address: {user.company_address}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "13px", color: "#475569" }}>PAN: {user.pan_number}</div>
                <div style={{ fontSize: "13px", color: "#475569" }}>Mobile: {user.mobile_number}</div>
                <div style={{ fontSize: "13px", color: "#475569" }}>Subscriptions: </div>
              </div>

              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                {/* Pending Status: Activate & Reject buttons show aagum */}
                {user.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(user.id, "Active")}
                      style={{ backgroundColor: "#15803d", color: "#ffffff", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(user.id, "Rejected")}
                      style={{ backgroundColor: "#b91c1c", color: "#ffffff", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* Active Status: Toggle to De-activate */}
                {user.status === "Active" && (
                  <button
                    onClick={() => handleUpdateStatus(user.id, "De-active")}
                    style={{ backgroundColor: "#c2410c", color: "#ffffff", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                  >
                    De-activate
                  </button>
                )}

                {/* De-active or Rejected Status: Re-activate button */}
                {(user.status === "De-active" || user.status === "Rejected") && (
                  <button
                    onClick={() => handleUpdateStatus(user.id, "Active")}
                    style={{ backgroundColor: "#15803d", color: "#ffffff", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                  >
                    Activate
                  </button>
                )}

                {/* 👇 Status 'Active'-aaga irundhaal mattume indha buttons enable aagum */}
                {user.status === "Active" && (
                  <>
                    <button style={{ backgroundColor: "#1d4ed8", color: "#ffffff", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}>
                      + Subscribe
                    </button>
                    <button style={{ backgroundColor: "#475569", color: "#ffffff", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}>
                      Edit
                    </button>
                    <button style={{ backgroundColor: "#0f766e", color: "#ffffff", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}>
                      Manage IPs
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add User Modal Component */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserAdded={fetchUsers}
      />
    </div>
  );
}