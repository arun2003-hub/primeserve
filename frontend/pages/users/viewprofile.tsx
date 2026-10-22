import { useState, useEffect } from "react";
import { API_URL } from "../../src/api";

interface UserProfile {
  userName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  mobileNumber: string;
  companyWebsite: string;
  panNumber: string;
}

export default function ViewProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // localStorage-l irundhu user login email edukkirom
        const userEmail = localStorage.getItem("userEmail") || localStorage.getItem("username") || "ak@gmail.com";
        
        console.log("Fetching profile for identifier:", userEmail);

        const response = await fetch(`${API_URL}/api/user/profile?email=${encodeURIComponent(userEmail)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        console.log("Backend Response:", result);

        if (result.success && result.data) {
          setProfile(result.data);
        } else {
          setErrorMsg(result.message || "User data not found in database.");
        }
      } catch (error) {
        console.error("Failed to load profile data", error);
        setErrorMsg("Server connection error. Please ensure backend server is running on port 5000.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#0b1329", color: "#ffffff", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Arial, sans-serif" }}>
        Loading Profile...
      </div>
    );
  }

  if (errorMsg || !profile) {
    return (
      <div style={{ backgroundColor: "#0b1329", color: "#ff6b6b", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "Arial, sans-serif", gap: "10px" }}>
        <h2>Profile Error</h2>
        <p>{errorMsg}</p>
      </div>
    );
  }

  const firstLetter = profile.userName ? profile.userName.charAt(0).toUpperCase() : "U";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 85px)",
        backgroundColor: "#0b1329",
        backgroundImage:
          "linear-gradient(rgba(11, 19, 41, 0.85), rgba(11, 19, 41, 0.85)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        padding: "40px 8%",
        boxSizing: "border-box",
        color: "#ffffff",
      }}
    >
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 6px 0" }}>
          User Profile
        </h1>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "30px",
          color: "#1e293b",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "20px", marginBottom: "25px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "#e2e8f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0b557f",
              }}
            >
              {firstLetter}
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0f172a" }}>{profile.userName}</div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>{profile.email}</div>
            </div>
          </div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            {profile.companyName} {profile.companyWebsite ? `- ${profile.companyWebsite}` : ''}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>User Name</div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{profile.userName}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Company Name</div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{profile.companyName}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Company Address</div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{profile.companyAddress}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Mobile Number</div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{profile.mobileNumber}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Email ID</div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{profile.email}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Company Website</div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{profile.companyWebsite}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>PAN Number</div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{profile.panNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}