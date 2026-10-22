import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../src/api";

export default function UserRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    companyAddress: "",
    panNumber: "",
    mobileNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validations
    if (!formData.email.includes("@")) {
      setError("Email must contain '@' symbol");
      return;
    }

    const websiteRegex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (formData.companyWebsite && !websiteRegex.test(formData.companyWebsite)) {
      setError("Company website must follow 'www.domain.com' format");
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.panNumber.toUpperCase())) {
      setError("Invalid PAN Number format (e.g., ABCDE1234F)");
      return;
    }

    const mobileRegex = /^\d+$/;
    if (!mobileRegex.test(formData.mobileNumber)) {
      setError("Mobile number must contain only numbers");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Backend-ku request anuppi .env Email_URL moolama OTP send panrathu
      const response = await fetch(`${API_URL}/api/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Otp page-ku data-vha state-la pass seithu navigate panrom
        navigate("/verify-otp", { state: { email: formData.email, formData } });
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f8fafc", fontFamily: "sans-serif", padding: "20px" }}>
      <div style={{ background: "#ffffff", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", width: "750px", maxWidth: "100%" }}>
        
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div style={{ fontWeight: "bold", fontSize: "16px", color: "#1e293b", marginBottom: "2px" }}>PS</div>
          <div style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "8px" }}>PrimeServe</div>
          <h2 style={{ fontSize: "20px", color: "#0f172a", margin: 0 }}>Register to your account</h2>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>Username</label>
              <input type="text" name="username" placeholder="User Name" value={formData.username} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>Email Id</label>
              <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>Company name</label>
              <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>Company Website</label>
              <input type="text" name="companyWebsite" placeholder="www.company.com" value={formData.companyWebsite} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>Company Address</label>
              <input type="text" name="companyAddress" placeholder="Company Address" value={formData.companyAddress} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>PAN Number</label>
              <input type="text" name="panNumber" placeholder="ABCDE1234F" maxLength={10} value={formData.panNumber} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box", textTransform: "uppercase" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>Mobile Number</label>
              <input type="text" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>Password</label>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "5px" }}>Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ background: "#2563eb", color: "white", padding: "12px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "600", marginTop: "10px", width: "100%" }}
          >
            {loading ? "Sending OTP..." : "Generate OTP"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "13px", color: "#64748b" }}>
          Already have an account?{" "}
          <Link to="/userlogin" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "500" }}>
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}