import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrorMsg("");
  //   setLoading(true);

  //   try {
  //     const response = await fetch("http://localhost:5000/api/admin/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok && data.success) {
        
  //       localStorage.setItem("adminToken", data.token);
  //       localStorage.setItem("adminUsername", data.admin.username);
  //       localStorage.setItem("adminRole", data.admin.role);
  //       navigate("/");
  //     } else {
  //       setErrorMsg(data.error || data.message || "Invalid username or password");
  //     }
  //   } catch (err) {
  //     console.error("Login network error:", err);
  //     setErrorMsg("Server connection failed. Make sure backend is running.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    // Intha line-ah add pannikonga (Render URL Netlify env-la irunthu eduthukkum)
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    try {
      // Inga "http://localhost:5000" ku badhila `${API_URL}`-ah use pannanum
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUsername", data.admin.username);
        localStorage.setItem("adminRole", data.admin.role);
        navigate("/");
      } else {
        setErrorMsg(data.error || data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login network error:", err);
      setErrorMsg("Server connection failed. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0d47a1",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          color: "#ffffff",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#90caf9",
            marginBottom: "15px",
          }}
        >
          PRIMESERVE PLATFORM
        </span>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            lineHeight: "1.2",
            maxWidth: "500px",
            margin: "0 0 20px 0",
          }}
        >
          Unlock intelligent API insights with a secure developer portal.
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#cfd8dc",
            maxWidth: "450px",
            margin: 0,
            lineHeight: "1.5",
          }}
        >
          Manage subscriptions, monitor analytics, and explore integrations in one place.
        </p>
      </div>

      <div
        style={{
          width: "480px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          boxSizing: "border-box",
          boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div
              style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#0d47a1",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                borderRadius: "8px",
                margin: "0 auto 10px auto",
                fontSize: "18px",
              }}
            >
              PS
            </div>
            <div
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                color: "#90caf9",
                letterSpacing: "0.5px",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              Primeserve
            </div>
            <h2
              style={{
                margin: "0 0 6px 0",
                fontSize: "22px",
                fontWeight: "600",
                color: "#111827",
              }}
            >
              Welcome back
            </h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              Sign in to your account
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                padding: "10px",
                borderRadius: "6px",
                fontSize: "13px",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Email or Username
              </label>
              <input
                type="text"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "11px 40px 11px 14px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#64748b",
                  }}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <span style={{ fontSize: "12px", color: "#0284c7", cursor: "pointer" }}>
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: loading ? "#93c5fd" : "#0284c7",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #ffffff",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  ></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username: email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         localStorage.setItem("adminToken", data.token);
//         localStorage.setItem("adminUsername", data.admin.username);
//         localStorage.setItem("adminRole", data.admin.role);
//         navigate("/");
//       } else {
//         setErrorMsg(data.error || data.message || "Invalid username or password");
//       }
//     } catch (err) {
//       console.error("Login network error:", err);
//       setErrorMsg("Server connection failed. Make sure backend is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "#0d47a1",
//         fontFamily: "Arial, sans-serif",
//         boxSizing: "border-box",
//         overflow: "hidden",
//       }}
//     >
//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           padding: "0 80px",
//           color: "#ffffff",
//         }}
//       >
//         <span
//           style={{
//             fontSize: "12px",
//             fontWeight: "700",
//             letterSpacing: "1px",
//             textTransform: "uppercase",
//             color: "#90caf9",
//             marginBottom: "15px",
//           }}
//         >
//           PRIMESERVE PLATFORM
//         </span>
//         <h1
//           style={{
//             fontSize: "42px",
//             fontWeight: "700",
//             lineHeight: "1.2",
//             maxWidth: "500px",
//             margin: "0 0 20px 0",
//           }}
//         >
//           Unlock intelligent API insights with a secure developer portal.
//         </h1>
//         <p
//           style={{
//             fontSize: "15px",
//             color: "#cfd8dc",
//             maxWidth: "450px",
//             margin: 0,
//             lineHeight: "1.5",
//           }}
//         >
//           Manage subscriptions, monitor analytics, and explore integrations in one place.
//         </p>
//       </div>

//       <div
//         style={{
//           width: "480px",
//           backgroundColor: "#ffffff",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "50px",
//           boxSizing: "border-box",
//           boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <div style={{ width: "100%", maxWidth: "360px" }}>
//           <div style={{ textAlign: "center", marginBottom: "30px" }}>
//             <div
//               style={{
//                 width: "45px",
//                 height: "45px",
//                 backgroundColor: "#0d47a1",
//                 color: "#ffffff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: "bold",
//                 borderRadius: "8px",
//                 margin: "0 auto 10px auto",
//                 fontSize: "18px",
//               }}
//             >
//               PS
//             </div>
//             <div
//               style={{
//                 fontSize: "10px",
//                 textTransform: "uppercase",
//                 color: "#90caf9",
//                 letterSpacing: "0.5px",
//                 marginBottom: "15px",
//                 fontWeight: "bold",
//               }}
//             >
//               Primeserve
//             </div>
//             <h2
//               style={{
//                 margin: "0 0 6px 0",
//                 fontSize: "22px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}
//             >
//               Welcome back
//             </h2>
//             <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
//               Sign in to your account
//             </p>
//           </div>

//           {errorMsg && (
//             <div
//               style={{
//                 backgroundColor: "#fee2e2",
//                 color: "#dc2626",
//                 padding: "10px",
//                 borderRadius: "6px",
//                 fontSize: "13px",
//                 marginBottom: "15px",
//                 textAlign: "center",
//               }}
//             >
//               {errorMsg}
//             </div>
//           )}

//           <form onSubmit={handleLogin}>
//             <div style={{ marginBottom: "18px" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "12px",
//                   fontWeight: "600",
//                   color: "#334155",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Username
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter username"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "11px 14px",
//                   border: "1px solid #cbd5e1",
//                   borderRadius: "6px",
//                   fontSize: "14px",
//                   outline: "none",
//                   boxSizing: "border-box",
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: "12px" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "12px",
//                   fontWeight: "600",
//                   color: "#334155",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Password
//               </label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "11px 40px 11px 14px",
//                     border: "1px solid #cbd5e1",
//                     borderRadius: "6px",
//                     fontSize: "14px",
//                     outline: "none",
//                     boxSizing: "border-box",
//                   }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: "absolute",
//                     right: "12px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     fontSize: "14px",
//                     color: "#64748b",
//                   }}
//                 >
//                   {showPassword ? "👁️" : "👁️‍🗨️"}
//                 </button>
//               </div>
//             </div>

//             <div style={{ textAlign: "right", marginBottom: "20px" }}>
//               <span style={{ fontSize: "12px", color: "#0284c7", cursor: "pointer" }}>
//                 Forgot Password?
//               </span>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 width: "100%",
//                 backgroundColor: loading ? "#93c5fd" : "#0284c7",
//                 color: "#ffffff",
//                 border: "none",
//                 borderRadius: "6px",
//                 padding: "12px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 cursor: loading ? "not-allowed" : "pointer",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             >
//               {loading ? (
//                 <>
//                   <span
//                     style={{
//                       width: "16px",
//                       height: "16px",
//                       border: "2px solid #ffffff",
//                       borderTop: "2px solid transparent",
//                       borderRadius: "50%",
//                       animation: "spin 0.8s linear infinite",
//                     }}
//                   ></span>
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminLogin;