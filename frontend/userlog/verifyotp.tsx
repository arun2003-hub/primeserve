import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Fallback email or state check to prevent crashing if accessed directly
  const email = location.state?.email || "";
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("OTP Verified Successfully! Please wait for Admin approval to login.");
        navigate("/userlogin");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", padding: "20px" }}>
      <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", width: "400px", maxWidth: "100%", textAlign: "center" }}>
        
        <div style={{ fontWeight: "bold", fontSize: "16px", color: "#1e293b", marginBottom: "2px" }}>PS</div>
        <div style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "15px" }}>PrimeServe</div>
        <h2 style={{ fontSize: "20px", color: "#0f172a", margin: "0 0 10px 0" }}>Verify OTP</h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
          {email ? `Enter the 6-digit OTP sent to ${email}` : "Enter your OTP to verify account."}
        </p>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <input 
              type="text" 
              placeholder="Enter 6-digit OTP" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              maxLength={6}
              required 
              style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "16px", textAlign: "center", letterSpacing: "4px", boxSizing: "border-box" }} 
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#2563eb", color: "white", padding: "12px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "600", width: "100%" }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}