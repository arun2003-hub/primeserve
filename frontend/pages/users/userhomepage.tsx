import { useNavigate } from "react-router-dom";

export default function UserHomepage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 85px)",
        backgroundColor: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Hero Banner Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "380px",
          backgroundColor: "#0b1329",
          backgroundImage:
            "linear-gradient(rgba(11, 19, 41, 0.85), rgba(11, 19, 41, 0.85)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 8%",
          boxSizing: "border-box",
          color: "#ffffff",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "700",
            margin: "0 0 12px 0",
            letterSpacing: "-0.5px",
          }}
        >
          Welcome to PrimeServe API Portal!
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#cbd5e1",
            margin: "0 0 25px 0",
            maxWidth: "600px",
            lineHeight: "1.5",
          }}
        >
          Manage your API subscriptions and access documentation with confidence.
        </p>

        <div style={{ display: "flex", gap: "15px" }}>
          {/* Explore APIs Button */}
          <button
            onClick={() => navigate("/apis")}
            style={{
              backgroundColor: "#ffffff",
              color: "#0f172a",
              border: "none",
              borderRadius: "20px",
              padding: "10px 22px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            Explore APIs →
          </button>

          {/* View Profile Button */}
          <button
            onClick={() => navigate("/view-profile")} // 👈 Redirects to viewprofile.tsx route
            style={{
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              borderRadius: "20px",
              padding: "10px 22px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          padding: "35px 8%",
          boxSizing: "border-box",
        }}
      >
        {/* News & Updates Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            minHeight: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#1e293b",
                marginBottom: "20px",
              }}
            >
              <span>📰</span> News & Updates
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#94a3b8",
                fontSize: "14px",
                padding: "20px 0",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📅</div>
              No Updates
            </div>
          </div>
        </div>

        {/* API Document Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            minHeight: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#1e293b",
                marginBottom: "12px",
              }}
            >
              <span>📄</span> API Document
            </div>
            <div
              style={{
                color: "#075985",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                marginBottom: "8px",
              }}
              onClick={() => navigate("/apis")}
            >
              Check out the API Details →
            </div>
            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                margin: 0,
                lineHeight: "1.4",
              }}
            >
              Visit the API documents for additional information on the API
              endpoints, request formats, and response structures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}