import React, { useState, useEffect } from "react";
import { API_URL } from "../src/api";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

const initialFormState = {
  username: "",
  email: "",
  companyName: "",
  companyWebsite: "",
  companyAddress: "",
  panNumber: "",
  mobileNumber: "",
  password: "",
};

export default function AddUserModal({ isOpen, onClose, onUserAdded }: AddUserModalProps) {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // மோடல் ஓபன்/க்ளோஸ் ஆகும்போது அல்லது க்ளோஸ் செய்யும் போது ஃபார்மை ரீசெட் செய்ய
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/adduser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("User added successfully as Active!");
        setFormData(initialFormState); // 👈 ஃபார்மை காலியாக்குகிறது
        onUserAdded(); // Refresh user list
        onClose();     // Close modal
      } else {
        setError(data.message || "Failed to add user");
      }
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          width: "600px",
          maxWidth: "90%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#123b57" }}>Add New User</h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" }}
          >
            ✕
          </button>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px", borderRadius: "6px", fontSize: "12px", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>Username</label>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required style={{ width: "100%", padding: "9px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>Email ID</label>
              <input type="email" name="email" placeholder="user@example.com" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "9px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>Company Name</label>
              <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>Company Website</label>
              <input type="text" name="companyWebsite" placeholder="www.company.com" value={formData.companyWebsite} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>Company Address</label>
              <input type="text" name="companyAddress" placeholder="Address" value={formData.companyAddress} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>PAN Number</label>
              <input type="text" name="panNumber" placeholder="ABCDE1234F" value={formData.panNumber} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box", textTransform: "uppercase" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>Mobile Number</label>
              <input type="text" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} style={{ width: "100%", padding: "9px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>Password</label>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ width: "100%", padding: "9px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{ backgroundColor: "#cbd5e1", color: "#0f172a", border: "none", borderRadius: "4px", padding: "9px 16px", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#0b557f", color: "#ffffff", border: "none", borderRadius: "4px", padding: "9px 16px", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}