import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserLogin() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); 

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("username", data.user?.username || emailOrUsername);
        
        // View Profile 
        if (data.user?.email) {
          localStorage.setItem("userEmail", data.user.email);
        }

        navigate("/homepage");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false); // 👈 Process mudinthathum loading nirkum
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", fontFamily: "sans-serif", margin: 0 }}>
      {/* Left Hero Section */}
      <div style={{ flex: 1, background: "#f8fafc", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px" }}>
        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#64748b", letterSpacing: "1px", marginBottom: "10px" }}>PRIMESERVE PLATFORM</p>
        <h1 style={{ fontSize: "36px", color: "#0f172a", maxWidth: "450px", lineHeight: "1.2", marginBottom: "20px" }}>
          Unlock intelligent API insights with a secure developer portal.
        </h1>
        <p style={{ fontSize: "15px", color: "#475569", maxWidth: "420px", lineHeight: "1.5" }}>
          Manage subscriptions, monitor analytics, and explore integrations in one place.
        </p>
      </div>

      {/* Right Login Form Container */}
      <div style={{ width: "480px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "50px", background: "#ffffff", boxShadow: "-4px 0 15px rgba(0,0,0,0.02)" }}>
        <div style={{ marginBottom: "25px" }}>
          <div style={{ fontWeight: "bold", fontSize: "18px", color: "#1e293b", marginBottom: "5px" }}>PS</div>
          <h2 style={{ fontSize: "22px", color: "#0f172a", margin: "0 0 5px 0" }}>Welcome back</h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Sign in to your account</p>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#334155", display: "block", marginBottom: "6px" }}>Email or Username</label>
            <input
              type="text"
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "11px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#334155" }}>Password</label>
              <a href="#forgot" style={{ fontSize: "12px", color: "#2563eb", textDecoration: "none" }}>Forgot Password?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "11px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading} // 👈 Loading irukkum pothu click seyyathu
            style={{
              backgroundColor: loading ? "#94a3b8" : "#0f172a", // loading irukkum pothu color maarum
              color: "#ffffff",
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {loading ? "Signing in..." : "Sign in"} {/* 👈 Loading text kaatum */}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "13px", color: "#64748b" }}>
          Don't have an account?{" "}
          <Link to="/userregister" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "500" }}>
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}