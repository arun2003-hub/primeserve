import { useState } from "react";
import AddApiModal from "../../subfiles/addApi"; // 👈 Imported separate modal file

interface ApiData {
  id: number;
  menuApi: string;
  groupSubgroup: string;
  method: string;
  requestUrl: string;
}

function ApiGroups() {
  const [apis, setApis] = useState<ApiData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 👈 Modal visibility state

  const handleAddApi = () => {
    setIsModalOpen(true); // 👈 Opens the modal popup window
  };

  const handleSaveNewApi = (newApiData: { menuApi: string; groupSubgroup: string; method: string; requestUrl: string }) => {
    const newApi: ApiData = {
      id: Date.now(),
      ...newApiData,
    };
    setApis((previousApis) => [...previousApis, newApi]);
  };

  const handleEdit = (id: number) => {
    console.log("Edit API:", id);
  };

  const handleDelete = (id: number) => {
    setApis((previousApis) =>
      previousApis.filter((api) => api.id !== id)
    );
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#f5f9fc",
        padding: "28px 50px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* PAGE HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "600",
            color: "#123b57",
          }}
        >
          API Management
        </h1>

        <button
          onClick={handleAddApi}
          style={{
            backgroundColor: "#0b557f",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            padding: "9px 15px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          + Add API
        </button>
      </div>

      {/* API TABLE */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          border: "1px solid #d5e1e8",
          borderRadius: "7px",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1.3fr 1.3fr 0.8fr 1.8fr 0.8fr",
            alignItems: "center",
            backgroundColor: "#eef5f9",
            borderBottom: "1px solid #d5e1e8",
            minHeight: "38px",
            padding: "0 14px",
            boxSizing: "border-box",
            color: "#426275",
            fontSize: "10px",
            fontWeight: "600",
          }}
        >
          <div>MENU / API</div>
          <div>GROUP / SUBGROUP</div>
          <div>METHOD</div>
          <div>REQUEST URL</div>
          <div>ACTIONS</div>
        </div>

        {/* API DATA */}
        {apis.length === 0 ? (
          <div
            style={{
              minHeight: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#607d8b",
              fontSize: "12px",
            }}
          >
            No APIs found
          </div>
        ) : (
          apis.map((api) => (
            <div
              key={api.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1.3fr 1.3fr 0.8fr 1.8fr 0.8fr",
                alignItems: "center",
                minHeight: "48px",
                padding: "0 14px",
                borderBottom: "1px solid #e4edf2",
                fontSize: "12px",
                color: "#263238",
                boxSizing: "border-box",
              }}
            >
              <div>{api.menuApi}</div>

              <div>{api.groupSubgroup}</div>

              <div
                style={{
                  fontWeight: "600",
                  color:
                    api.method === "GET"
                      ? "#087f5b"
                      : "#0b557f",
                }}
              >
                {api.method}
              </div>

              <div>{api.requestUrl}</div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() => handleEdit(api.id)}
                  style={{
                    border: "none",
                    backgroundColor: "#e7f2f8",
                    color: "#0b557f",
                    borderRadius: "4px",
                    padding: "5px 8px",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(api.id)}
                  style={{
                    border: "none",
                    backgroundColor: "#fdeaea",
                    color: "#c62828",
                    borderRadius: "4px",
                    padding: "5px 8px",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL COMPONENT */}
      <AddApiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddApi={handleSaveNewApi}
      />
    </div>
  );
}

export default ApiGroups;