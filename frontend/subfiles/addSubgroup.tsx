import React, { useState, useEffect } from "react";
import { API_URL } from "../src/api";

interface Subgroup {
  id: number;
  name: string;
  description: string;
  apis: number;
}

interface SubgroupsSectionProps {
  groupId: number;
}

export default function SubgroupsSection({ groupId }: SubgroupsSectionProps) {
  const [subgroups, setSubgroups] = useState<Subgroup[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubgroup, setEditingSubgroup] = useState<Subgroup | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubgroups();
  }, [groupId]);

  const fetchSubgroups = async () => {
    try {
      const response = await fetch(`${API_URL}/api/groups/${groupId}/subgroups`);
      if (!response.ok) throw new Error("Failed to fetch subgroups");
      const data = await response.json();
      setSubgroups(data.subgroups || []);
    } catch (error) {
      console.error("Error fetching subgroups:", error);
    }
  };

  const handleOpenAdd = () => {
    setEditingSubgroup(null);
    setName("");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sub: Subgroup) => {
    setEditingSubgroup(sub);
    setName(sub.name);
    setDescription(sub.description);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingSubgroup
        ? `${API_URL}/api/subgroups/${editingSubgroup.id}`
        : `${API_URL}/api/groups/${groupId}/subgroups`;

      const method = editingSubgroup ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) throw new Error("Failed to save subgroup");

      fetchSubgroups();
      setIsModalOpen(false);
      setName("");
      setDescription("");
      setEditingSubgroup(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving subgroup to database!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (subId: number) => {
    if (!window.confirm("Are you sure you want to delete this subgroup?")) return;

    try {
      const response = await fetch(`${API_URL}/api/subgroups/${subId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete subgroup");

      fetchSubgroups();
    } catch (error) {
      console.error("Error deleting subgroup:", error);
      alert("Error deleting subgroup from database!");
    }
  };

  return (
    <div>
      {/* Subgroups Header Row inside expanded dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
          Subgroups
        </span>
        <button
          onClick={handleOpenAdd}
          style={{
            backgroundColor: "#075985",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Add Subgroup
        </button>
      </div>

      {subgroups.length === 0 ? (
        <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>No subgroups yet.</p>
      ) : (
        subgroups.map((sub) => (
          <div
            key={sub.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 2fr 0.7fr 0.7fr",
              alignItems: "center",
              padding: "10px 0",
              borderTop: "1px solid #e2e8f0",
              fontSize: "13px",
              color: "#1e293b",
            }}
          >
            {/* Name without arrow and perfectly aligned */}
            <div style={{ paddingLeft: "10px", fontWeight: "600", color: "#334155" }}>
              {sub.name}
            </div>

            {/* Description */}
            <div style={{ color: "#64748b" }}>{sub.description}</div>

            {/* APIs Count */}
            <div>{sub.apis || 0}</div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => handleOpenEdit(sub)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#075985",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                ✎ Edit
              </button>
              <button
                onClick={() => handleDelete(sub.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#dc2626",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Subgroup Modal */}
      {isModalOpen && (
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
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "400px",
              padding: "20px 25px",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", color: "#123b57" }}>
                {editingSubgroup ? "Edit Subgroup" : "Add Subgroup"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", color: "#607d8b" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>
                  Subgroup name *
                </label>
                <input
                  type="text"
                  placeholder="Subgroup name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>
                  Description (optional)
                </label>
                <textarea
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: "#e2e8f0", color: "#334155", padding: "7px 14px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: "#0b557f", color: "white", padding: "7px 14px", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
                >
                  {loading ? "Saving..." : editingSubgroup ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}