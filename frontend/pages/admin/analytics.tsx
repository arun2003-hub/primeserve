import React, { useState } from "react";

const Analytics: React.FC = () => {
  const [fromDate, setFromDate] = useState("07-09-2026");
  const [toDate, setToDate] = useState("07-10-2026");

  const [viewMode, setViewMode] = useState<
    "chart+table" | "chart" | "table"
  >("chart+table");

  const [hasSearched, setHasSearched] = useState(false);

  const reportData = [
    {
      id: 1,
      date: "07-09-2026",
      user: "localadmin",
      api: "/api/v1/users",
      requests: 120,
      status: "200 OK",
    },
    {
      id: 2,
      date: "07-10-2026",
      user: "localadmin",
      api: "/api/v1/groups",
      requests: 45,
      status: "200 OK",
    },
  ];

  const handleSearch = () => {
    setHasSearched(true);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 85px)",
        backgroundColor: "#ffffff",
        padding: "35px 5%",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* PAGE HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "600",
              color: "#111827",
            }}
          >
            Usage Reports
          </h1>

          <p
            style={{
              margin: "5px 0 0",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            Monitor API usage across users and environments.
          </p>
        </div>

        {/* VIEW MODE BUTTONS */}
        <div
          style={{
            display: "flex",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            overflow: "hidden",
            backgroundColor: "#f8fafc",
          }}
        >
          <button
            onClick={() => setViewMode("chart+table")}
            style={{
              backgroundColor:
                viewMode === "chart+table" ? "#075985" : "transparent",
              color:
                viewMode === "chart+table" ? "#ffffff" : "#334155",
              border: "none",
              padding: "7px 12px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Chart + Table
          </button>

          <button
            onClick={() => setViewMode("chart")}
            style={{
              backgroundColor:
                viewMode === "chart" ? "#075985" : "transparent",
              color: viewMode === "chart" ? "#ffffff" : "#334155",
              border: "none",
              borderLeft: "1px solid #cbd5e1",
              borderRight: "1px solid #cbd5e1",
              padding: "7px 12px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Chart
          </button>

          <button
            onClick={() => setViewMode("table")}
            style={{
              backgroundColor:
                viewMode === "table" ? "#075985" : "transparent",
              color: viewMode === "table" ? "#ffffff" : "#334155",
              border: "none",
              padding: "7px 12px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Table
          </button>
        </div>
      </div>

      {/* FILTER BOX */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          border: "1px solid #dbe3ea",
          borderRadius: "6px",
          padding: "20px",
          marginBottom: "25px",
          display: "flex",
          alignItems: "flex-end",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* FROM DATE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <label
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#475569",
            }}
          >
            From Date
          </label>

          <input
            type="text"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              fontSize: "13px",
              outline: "none",
              width: "150px",
            }}
          />
        </div>

        {/* TO DATE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <label
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#475569",
            }}
          >
            To Date
          </label>

          <input
            type="text"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              fontSize: "13px",
              outline: "none",
              width: "150px",
            }}
          />
        </div>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#075985",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            padding: "9px 20px",
            fontSize: "13px",
            cursor: "pointer",
            fontWeight: "500",
            height: "36px",
          }}
        >
          Search
        </button>
      </div>

      {/* RESULTS */}
      <div
        style={{
          border: "1px solid #dbe3ea",
          borderRadius: "6px",
          padding: "30px",
          backgroundColor: "#ffffff",
          minHeight: "200px",
        }}
      >
        {/* BEFORE SEARCH */}
        {!hasSearched ? (
          <div
            style={{
              minHeight: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Select date range and click Search to view usage reports.
            </p>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            {/* TABLE */}
            {(viewMode === "table" ||
              viewMode === "chart+table") && (
              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#f1f7fb",
                        color: "#475569",
                        textAlign: "left",
                      }}
                    >
                      <th
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #dbe3ea",
                        }}
                      >
                        Date
                      </th>

                      <th
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #dbe3ea",
                        }}
                      >
                        User
                      </th>

                      <th
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #dbe3ea",
                        }}
                      >
                        API Endpoint
                      </th>

                      <th
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #dbe3ea",
                        }}
                      >
                        Requests
                      </th>

                      <th
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #dbe3ea",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {reportData.map((row) => (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: "1px solid #e2e8f0",
                          color: "#334155",
                        }}
                      >
                        <td style={{ padding: "10px" }}>
                          {row.date}
                        </td>

                        <td style={{ padding: "10px" }}>
                          {row.user}
                        </td>

                        <td style={{ padding: "10px" }}>
                          {row.api}
                        </td>

                        <td style={{ padding: "10px" }}>
                          {row.requests}
                        </td>

                        <td style={{ padding: "10px" }}>
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CHART */}
            {(viewMode === "chart" ||
              viewMode === "chart+table") && (
              <div
                style={{
                  marginTop:
                    viewMode === "chart+table" ? "20px" : "0",
                  padding: "40px",
                  backgroundColor: "#f8fafc",
                  border: "1px dashed #cbd5e1",
                  borderRadius: "4px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 20px",
                    fontSize: "16px",
                    color: "#334155",
                  }}
                >
                  API Usage Chart
                </h3>

                {/* SIMPLE BAR CHART */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    gap: "60px",
                    height: "180px",
                  }}
                >
                  {/* BAR 1 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        marginBottom: "5px",
                        color: "#334155",
                      }}
                    >
                      120
                    </span>

                    <div
                      style={{
                        width: "60px",
                        height: "120px",
                        backgroundColor: "#075985",
                        borderRadius: "4px 4px 0 0",
                      }}
                    />

                    <span
                      style={{
                        marginTop: "8px",
                        fontSize: "12px",
                      }}
                    >
                      07-09-2026
                    </span>
                  </div>

                  {/* BAR 2 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        marginBottom: "5px",
                        color: "#334155",
                      }}
                    >
                      45
                    </span>

                    <div
                      style={{
                        width: "60px",
                        height: "45px",
                        backgroundColor: "#075985",
                        borderRadius: "4px 4px 0 0",
                      }}
                    />

                    <span
                      style={{
                        marginTop: "8px",
                        fontSize: "12px",
                      }}
                    >
                      07-10-2026
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;