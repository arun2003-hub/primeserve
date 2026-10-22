import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function ProfilePopup({ isOpen, onClose }: ProfilePopupProps) {
  const [username, setUsername] = useState("User");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage-il irunthu current logged-in user name-ai edukirathu
    const storedUser = localStorage.getItem("username") || localStorage.getItem("adminUsername") || "User";
    setUsername(storedUser);
  }, []);

  if (!isOpen) return null;

  const handleSignOutClick = () => {
    setShowLogoutModal(true); 
  };

  const confirmLogout = () => {
    
    localStorage.removeItem("username");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminLoggedIn");
    setShowLogoutModal(false);
    onClose?.();
    navigate("/userlogin"); // User login page-ku pogum
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "65px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "180px",
          zIndex: 1000,
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ padding: "12px 15px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b" }}>Welcome</div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>{username}</div>
        </div>
        
        {/* View Profile Option */}
        <div
          style={{
            padding: "10px 15px",
            fontSize: "13px",
            color: "#334155",
            cursor: "pointer",
            borderBottom: "1px solid #f1f5f9",
          }}
          onClick={() => {
            onClose?.();
            navigate("/view-profile");
          }}
        >
          👤 View Profile
        </div>

        {/* Change Password Option */}
        <div
          style={{
            padding: "10px 15px",
            fontSize: "13px",
            color: "#334155",
            cursor: "pointer",
            borderBottom: "1px solid #f1f5f9",
          }}
          onClick={() => {
            onClose?.();
            navigate("/change-password");
          }}
        >
          🔑 Change Password
        </div>

        {/* Sign Out Option */}
        <div
          style={{
            padding: "10px 15px",
            fontSize: "13px",
            color: "#dc2626",
            cursor: "pointer",
          }}
          onClick={handleSignOutClick} // 👈 Modal-ai trigger seiyum
        >
          🚪 Sign Out
        </div>
      </div>

      {/* 🛑 Confirm to Logout Modal */}
      {showLogoutModal && (
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
            zIndex: 2000,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "25px",
              borderRadius: "8px",
              width: "350px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#1e293b" }}>Confirm to Logout</h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b" }}>
              Are you sure you want to log out of your account?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#cbd5e1",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc2626",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}