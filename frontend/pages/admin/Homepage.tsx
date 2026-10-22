import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  
  // Onboarding Users Stats
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0, 
    deactiveUsers: 0,
  });

  // Admin Portal Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    onboardingAdmins: 0,
    dashboardViewers: 0  
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 👇 "adminLoggedIn"-ku bathilaai "adminToken"-ai check seiyungal
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUsername = localStorage.getItem("adminUsername") || "localadmin";
    const storedRole = localStorage.getItem("adminRole") || "admin";
    
    setUsername(storedUsername);
    setRole(storedRole);

    // Fetch dynamic admin portal user stats & onboarding user stats
    fetchAdminStats();
    fetchUserStats();
  }, [navigate]);

  // Fetch Onboarding Users Count (Total Users, Active Users & De-active Users)
  const fetchUserStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users");
      const data = await response.json();
      
      if (data.success && data.users) {
        const users = data.users;
        const totalUsers = users.length;
        const activeUsers = users.filter((u: any) => u.status === "Active").length; 
        const deactiveUsers = users.filter((u: any) => u.status === "De-active").length;

        setUserStats({
          totalUsers,
          activeUsers,
          deactiveUsers,
        });
      }
    } catch (err) {
      console.error("Error fetching user stats:", err);
    }
  };

  // Fetch Admin Stats
  const fetchAdminStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admins");
      const data = await response.json();
      if (data.success && data.admins) {
        const admins = data.admins;
        const total = admins.length;
        const active = admins.filter((a: any) => a.userType === "admin").length;
        const onboardingAdmins = admins.filter((a: any) => a.userType === "Onboarding_Admins").length;
        const dashboardViewers = admins.filter((a: any) => a.userType === "Dashboard_Viewers").length;

        setStats({
          total,
          active,
          onboardingAdmins,
          dashboardViewers
        });
      }
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f1f5f9", minHeight: "85vh", padding: "30px" }}>
      {/* Main Content Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h1 style={{ fontSize: "20px", color: "#1e293b", margin: 0 }}>Admin Dashboard</h1>
        <div style={{ fontSize: "14px", color: "#475569" }}>
          Welcome, <b>{username}</b> ({role})
        </div>
      </div>

      {/* Top Stats Cards (5 Cards Grid) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginBottom: "30px" }}>
        
        {/* Total Users */}
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 5px 0", fontSize: "13px", color: "#64748b" }}>Total Users</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#0f172a" }}>{userStats.totalUsers}</p>
          </div>
          <div style={{ backgroundColor: "#e0f2fe", padding: "10px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>

        {/* 🟢 Active Users Card (Newly Added) */}
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 5px 0", fontSize: "13px", color: "#64748b" }}>Active Users</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#16a34a" }}>{userStats.activeUsers}</p>
          </div>
          <div style={{ backgroundColor: "#dcfce7", padding: "10px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>

        {/* De-active Users */}
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 5px 0", fontSize: "13px", color: "#64748b" }}>De-active Users</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#dc2626" }}>{userStats.deactiveUsers}</p>
          </div>
          <div style={{ backgroundColor: "#fee2e2", padding: "10px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
        </div>

        {/* Total APIs */}
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 5px 0", fontSize: "13px", color: "#64748b" }}>Total APIs</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#0f172a" }}>0</p>
          </div>
          <div style={{ backgroundColor: "#fef3c7", padding: "10px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Total API Calls */}
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 5px 0", fontSize: "13px", color: "#64748b" }}>Total API Calls</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#0f172a" }}>0</p>
          </div>
          <div style={{ backgroundColor: "#d1fae5", padding: "10px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ fontSize: "16px", color: "#1e293b", marginBottom: "15px" }}>Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          <div 
            onClick={() => navigate("/onboarding")} 
            style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", cursor: "pointer", borderLeft: "4px solid #0284c7" }}
          >
            <h4 style={{ margin: "0 0 8px 0", fontSize: "15px", color: "#0f172a" }}>User Management</h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Approve, Reject and Manage users</p>
          </div>
          <div 
            onClick={() => navigate("/products-apis")} 
            style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", cursor: "pointer", borderLeft: "4px solid #0284c7" }}
          >
            <h4 style={{ margin: "0 0 8px 0", fontSize: "15px", color: "#0f172a" }}>API Management</h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Create and manage APIs</p>
          </div>
          <div 
            onClick={() => navigate("/admin")} 
            style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", cursor: "pointer", borderLeft: "4px solid #0284c7" }}
          >
            <h4 style={{ margin: "0 0 8px 0", fontSize: "15px", color: "#0f172a" }}>Admin Management</h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Manage admin users and roles</p>
          </div>
        </div>
      </div>

      {/* Quick Glance of Admin Portal Users */}
      <div>
        <h3 style={{ fontSize: "16px", color: "#1e293b", marginBottom: "15px" }}>Quick glance of admin portal users</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a" }}>{stats.total}</span>
            <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#64748b" }}>Total</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#22c55e" }}>{stats.active}</span>
            <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "64748b" }}>Admin</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a" }}>{stats.onboardingAdmins}</span>
            <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#64748b" }}>Onboarding Admins</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a" }}>{stats.dashboardViewers}</span>
            <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#64748b" }}>Dashboard Viewers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;