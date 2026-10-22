import React, { useState, useEffect } from "react";
import { API_URL } from "../src/api";

interface AddApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddApi: (newApi: {
    menuApi: string;
    apiName: string;
    groupSubgroup: string;
    method: string;
    requestUrl: string;
    targetUrl: string;
    requestBody: string;
    responseBody: string;
  }) => void;
}

export default function AddApiModal({ isOpen, onClose, onAddApi }: AddApiModalProps) {
  const [menuApi, setMenuApi] = useState("");
  const [apiName, setApiName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubGroup, setSelectedSubGroup] = useState("");
  const [method, setMethod] = useState("POST");
  const [requestUrl, setRequestUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [responseBody, setResponseBody] = useState("");

  // Groups and Subgroups States
  const [groups, setGroups] = useState<any[]>([]);
  const [subgroups, setSubgroups] = useState<any[]>([]);

  // Modal open aagum pothu groups-ai fetch seiyum
  useEffect(() => {
    if (isOpen) {
      fetchGroups();
    } else {
      // Modal close aagum pothu states-ai reset seiyum
      setSelectedGroup("");
      setSelectedSubGroup("");
      setSubgroups([]);
    }
  }, [isOpen]);

  const fetchGroups = async () => {
    try {
      const response = await fetch(`${API_URL}/api/groups`);
      const data = await response.json();
      if (data.groups) {
        setGroups(data.groups);
      }
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  // Group select pannum pothu, sariyaana subgroups endpoint-ai call panrom
  const handleGroupChange = async (groupName: string) => {
    setSelectedGroup(groupName);
    setSelectedSubGroup("");
    setSubgroups([]);

    const selectedGroupObj = groups.find((g) => g.name === groupName);
    if (!selectedGroupObj) return;

    try {
      const response = await fetch(`${API_URL}/api/groups/${selectedGroupObj.id}/subgroups`);
      const data = await response.json();
      
      if (data.subgroups && Array.isArray(data.subgroups)) {
        setSubgroups(data.subgroups);
      } else if (Array.isArray(data)) {
        setSubgroups(data);
      }
    } catch (err) {
      console.error("Error fetching subgroups:", err);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const groupSubgroup = `${selectedGroup} > ${selectedSubGroup}`;
    
    onAddApi({
      menuApi,
      apiName,
      groupSubgroup,
      method,
      requestUrl,
      targetUrl,
      requestBody,
      responseBody,
    });
    
    // Reset and close
    setMenuApi("");
    setApiName("");
    setSelectedGroup("");
    setSelectedSubGroup("");
    setSubgroups([]);
    setMethod("POST");
    setRequestUrl("");
    setTargetUrl("");
    setRequestBody("");
    setResponseBody("");
    onClose();
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
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "600px",
          padding: "25px 30px",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          boxSizing: "border-box",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", color: "#123b57" }}>Add New API</h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#607d8b" }}
          >
            ✕
          </button>
        </div>
        <p style={{ color: "#607d8b", fontSize: "13px", marginTop: 0, marginBottom: "20px" }}>
          Fill in the details below to create an API.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Row 1: Menu Name & API Name */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>Menu Name (optional)</label>
              <input
                type="text"
                placeholder="Enter menu name"
                value={menuApi}
                onChange={(e) => setMenuApi(e.target.value)}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>API Name *</label>
              <input
                type="text"
                placeholder="Enter API name"
                value={apiName}
                onChange={(e) => setApiName(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px" }}
              />
            </div>
          </div>

          {/* Row 2: Select Group & Select Sub Group */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>Select group *</label>
              <select
                value={selectedGroup}
                onChange={(e) => handleGroupChange(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px", backgroundColor: "#fff" }}
              >
                <option value="">Select group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.name}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>Select sub group *</label>
              <select
                value={selectedSubGroup}
                onChange={(e) => setSelectedSubGroup(e.target.value)}
                required
                disabled={!selectedGroup}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px", backgroundColor: !selectedGroup ? "#f1f5f9" : "#fff" }}
              >
                <option value="">Select sub group</option>
                {subgroups.map((sub, index) => (
                  <option key={sub.id || index} value={sub.name || sub}>
                    {sub.name || sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Method */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px", backgroundColor: "#fff" }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* Request URL */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>Request URL</label>
            <input
              type="text"
              placeholder="https://api.example.com/..."
              value={requestUrl}
              onChange={(e) => setRequestUrl(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px" }}
            />
          </div>

          {/* Target URL */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>Target URL</label>
            <input
              type="text"
              placeholder="Target URL..."
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px" }}
            />
          </div>

          {/* Request Body */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>Request Body (optional)</label>
            <textarea
              placeholder="Enter request body (JSON)"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              rows={2}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px" }}
            />
          </div>

          {/* Response Body */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", marginBottom: "4px", color: "#334155" }}>Response Body</label>
            <textarea
              placeholder="Enter response body..."
              value={responseBody}
              onChange={(e) => setResponseBody(e.target.value)}
              rows={2}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontSize: "12px" }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{ background: "#e2e8f0", color: "#334155", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ background: "#0b557f", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
            >
              Add API
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
