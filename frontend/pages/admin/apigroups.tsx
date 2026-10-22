import React, { useState, useEffect } from "react";
import AddGroupModal from "../../subfiles/addgroup";
import SubgroupsSection from "../../subfiles/addSubgroup";

interface ApiGroup {
  id: number;
  name: string;
  description: string;
  apis: number;
}

const ApiGroups: React.FC = () => {
  // Use an array of numbers to keep track of multiple expanded groups
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
  const [groups, setGroups] = useState<ApiGroup[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/groups");
      if (!response.ok) throw new Error("Failed to fetch groups");
      const data = await response.json();
      
      if (data.groups && data.groups.length > 0) {
        setGroups(data.groups);
      } else {
        setGroups([
          {
            id: 0,
            name: "",
            description: "",
            apis: 0,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<ApiGroup | null>(null);

  // Toggle group expansion without closing others
  const toggleGroup = (id: number) => {
    setExpandedGroups((prev) =>
      prev.includes(id) ? prev.filter((groupId) => groupId !== id) : [...prev, id]
    );
  };

  const handleOpenAddGroup = () => {
    setEditingGroup(null);
    setIsGroupModalOpen(true);
  };

  const handleOpenEditGroup = (group: ApiGroup) => {
    setEditingGroup(group);
    setIsGroupModalOpen(true);
  };

  const handleGroupAdded = () => {
    fetchGroups();
    setEditingGroup(null);
  };

  const handleDeleteGroup = async (groupId: number) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/groups/${groupId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete group");
      fetchGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Error deleting group from database!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 85px)",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "35px 5%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "600",
              color: "#111827",
            }}
          >
            API Groups
          </h1>

          <p
            style={{
              marginTop: "6px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Manage groups and subgroups for user subscriptions and quotas.
          </p>
        </div>

        <button
          style={{
            backgroundColor: "#075985",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            padding: "9px 16px",
            cursor: "pointer",
            fontSize: "14px",
          }}
          onClick={handleOpenAddGroup}
        >
          + Add Group
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          width: "100%",
          border: "1px solid #dbe3ea",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 2fr 0.7fr 0.7fr",
            backgroundColor: "#f1f7fb",
            padding: "12px 18px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#475569",
          }}
        >
          <div>NAME</div>
          <div>DESCRIPTION</div>
          <div>APIS</div>
          <div>ACTIONS</div>
        </div>

        {/* Groups */}
        {groups.map((group) => {
          const isExpanded = expandedGroups.includes(group.id);

          return (
            <div key={group.id}>
              {/* Group Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 2fr 0.7fr 0.7fr",
                  alignItems: "center",
                  padding: "15px 18px",
                  borderTop: "1px solid #e2e8f0",
                  fontSize: "14px",
                  color: "#1e293b",
                }}
              >
                {/* Name + Dropdown */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => toggleGroup(group.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "14px",
                      padding: "0",
                      color: "#334155",
                      width: "20px",
                    }}
                  >
                    {isExpanded ? "▼" : "▶"}
                  </button>

                  <span>{group.name}</span>
                </div>

                <div>{group.description}</div>

                <div>{group.apis}</div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={() => handleOpenEditGroup(group)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#075985",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(group.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#dc2626",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>

              {/* Subgroups Section */}
              {isExpanded && (
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    borderTop: "1px solid #e2e8f0",
                    padding: "18px 35px",
                  }}
                >
                  <SubgroupsSection groupId={group.id} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit Group Modal */}
      <AddGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => {
          setIsGroupModalOpen(false);
          setEditingGroup(null);
        }}
        onGroupAdded={handleGroupAdded}
        initialData={
          editingGroup
            ? { id: editingGroup.id, name: editingGroup.name, description: editingGroup.description }
            : null
        }
      />
    </div>
  );
};

export default ApiGroups;