import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState("localadmin");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 👈 Logout Modal State
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // LocalStorage-la irunthu login panna username-ah eduthu set panrom
    const storedUser = localStorage.getItem("adminUsername");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutModal(true); // 👈 Click panrum pothu modal open aagum
  };

  const confirmLogout = () => {
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("username");
    setShowLogoutModal(false);
    navigate("/login"); 
  };

  

  // 👈 எந்த லிங்கில் இருக்கிறோமோ அதற்குரிய Active Style-ஐ உருவாக்கும் முறை
  const getLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      textDecoration: "none",
      color: isActive ? "#0066a1" : "#333333",
      fontWeight: isActive ? "bold" : "normal",
      padding: "10px 14px",
      fontSize: "13px",
      borderBottom: isActive ? "2px solid #0066a1" : "none",
      boxSizing: "border-box" as const,
    };
  };

  return (
    <header
      style={{
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          width: "180px",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: "700",
            color: "#0066a1",
          }}
        >
          PRIMESERVE
        </span>
      </Link>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          height: "100%",
        }}
      >
        <Link to="/" style={getLinkStyle("/")}>Home</Link>
        <Link to="/onboarding" style={getLinkStyle("/onboarding")}>On Boarding</Link>
        <Link to="/api-groups" style={getLinkStyle("/api-groups")}>API Groups</Link>
        <Link to="/products-apis" style={getLinkStyle("/products-apis")}>Products & APIs</Link>
        <Link to="/admin" style={getLinkStyle("/admin")}>Admin</Link>
        <Link to="/analytics" style={getLinkStyle("/analytics")}>Analytic Reports</Link>
      </nav>

      {/* User */}
      <div
        style={{
          width: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "14px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#075985",
            fontWeight: "600",
          }}
        >
          {username}
        </span>

        <a
          href="#logout"
          onClick={handleLogoutClick}
          style={{ textDecoration: "none", color: "#333333", padding: "10px 14px", fontSize: "13px", cursor: "pointer" }}
        >
          Logout
        </a>

        {/* 🛑 Logout Confirmation Modal */}
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
      </div>
    </header>
  );
}

export default Header;