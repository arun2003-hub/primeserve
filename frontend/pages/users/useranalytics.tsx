export default function UserAnalytics() {
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
      {/* Title Section */}
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 6px 0" }}>
          Analytics Report
        </h1>
        <p style={{ fontSize: "14px", color: "#cbd5e1", margin: 0 }}>
          Search usage and visualize API call trends.
        </p>
      </div>

      {/* Filter Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "25px",
          color: "#1e293b",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Top Toggle Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <div style={{ display: "flex", border: "1px solid #cbd5e1", borderRadius: "6px", overflow: "hidden", fontSize: "12px", fontWeight: "600" }}>
            <div style={{ backgroundColor: "#0b557f", color: "#ffffff", padding: "6px 12px", cursor: "pointer" }}>Chart + Table</div>
            <div style={{ backgroundColor: "#f8fafc", color: "#475569", padding: "6px 12px", cursor: "pointer", borderLeft: "1px solid #cbd5e1" }}>Chart</div>
            <div style={{ backgroundColor: "#f8fafc", color: "#475569", padding: "6px 12px", cursor: "pointer", borderLeft: "1px solid #cbd5e1" }}>Table</div>
          </div>
        </div>

        {/* Input Controls Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr auto", gap: "15px", alignItems: "flex-end", marginBottom: "30px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>
              From Date
            </label>
            <input
              type="date"
              defaultValue="2026-09-09"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>
              To Date
            </label>
            <input
              type="date"
              defaultValue="2026-10-09"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "6px" }}>
              Search API
            </label>
            <input
              type="text"
              placeholder="Group, subgroup, or API name"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <button
              style={{
                backgroundColor: "#0b557f",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "9px 20px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Empty Result Section */}
        <div
          style={{
            textAlign: "center",
            padding: "40px 0",
            color: "#64748b",
            fontSize: "14px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          No data found for the selected filters or search
        </div>
      </div>
    </div>
  );
}