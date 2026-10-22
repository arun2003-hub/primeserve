interface UserApiPageProps {
  onNavigate?: (tab: string) => void;
}

export default function UserApiPage({}: UserApiPageProps) {
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
      {/* Catalog Title Section */}
      <div style={{ marginBottom: "25px" }}>
        <div
          style={{
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#94a3b8",
            marginBottom: "6px",
          }}
        >
          PRIMESERVE CATALOG
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>
          Subscribed API Groups
        </h1>
        <p style={{ fontSize: "14px", color: "#cbd5e1", margin: 0 }}>
          Your subscription includes 0 groups.
        </p>
      </div>

      {/* API Collections Box */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#0b557f",
            color: "#ffffff",
            padding: "12px 20px",
            fontSize: "13px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          API COLLECTIONS
        </div>

        {/* Content Body */}
        <div
          style={{
            padding: "30px 20px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px",
            backgroundColor: "#ffffff",
          }}
        >
          No groups available
        </div>
      </div>
    </div>
  );
}