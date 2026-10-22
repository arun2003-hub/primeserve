import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../pages/users/profilepopup";

interface UserHeaderProps {
  activeTab?: string;
}

export default function UserHeader({ activeTab = "home" }: UserHeaderProps) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Popup bayata click chesinappudu close avvadaniki useEffect
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 5%",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span 
          style={{ fontSize: "20px", fontWeight: "bold", color: "#0b557f", cursor: "pointer" }} 
          onClick={() => navigate("/homepage")}
        >
          PRIMESERVE
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "30px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>
        <span
          style={{
            cursor: "pointer",
            color: activeTab === "home" ? "#0b557f" : "#64748b",
            borderBottom: activeTab === "home" ? "2px solid #0b557f" : "none",
            paddingBottom: "4px",
          }}
          onClick={() => navigate("/homepage")}
        >
          Home
        </span>
        <span
          style={{
            cursor: "pointer",
            color: activeTab === "apis" ? "#0b557f" : "#64748b",
            borderBottom: activeTab === "apis" ? "2px solid #0b557f" : "none",
            paddingBottom: "4px",
          }}
          onClick={() => navigate("/apis")}
        >
          API's
        </span>
        <span
          style={{
            cursor: "pointer",
            color: activeTab === "analytics" ? "#0b557f" : "#64748b",
            borderBottom: activeTab === "analytics" ? "2px solid #0b557f" : "none",
            paddingBottom: "4px",
          }}
          onClick={() => navigate("/user-analytics")}
        >
          Analytics Report
        </span>
      </div>

      {/* User Profile Icon & Popup */}
      <div ref={dropdownRef} style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            backgroundColor: "#e2e8f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          👤
        </div>

        {/* Render ProfilePopup Component */}
        <ProfilePopup isOpen={showDropdown} onClose={() => setShowDropdown(false)} />
      </div>
    </div>
  );
}