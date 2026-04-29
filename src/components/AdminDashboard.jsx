import { getHandovers, updateHandoverStatus } from "../services/api";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
  async function loadRecords() {
    try {
      const data = await getHandovers();
      setRecords(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load handover records.");
    }
  }

  loadRecords();
}, []);

async function updateStatus(id, newStatus) {
  try {
    await updateHandoverStatus(id, newStatus);

    const updated = records.map((record) =>
      record.id === id ? { ...record, status: newStatus } : record
    );

    setRecords(updated);
  } catch (error) {
    console.error(error);
    alert("Failed to update status.");
  }
}
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
      <h2>Admin Dashboard</h2>

      {records.length === 0 && <p>No submissions yet.</p>}

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Tenant</th>
            <th>Type</th>
            <th>Property</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.tenantName}</td>
              <td>{record.handoverType}</td>
              <td>{record.property}</td>
              <td>{record.status}</td>
              <td>{record.submittedAt}</td>

              <td>
                <button onClick={() => updateStatus(record.id, "Reviewed")}>
                  Reviewed
                </button>

                <button
                  onClick={() => updateStatus(record.id, "Closed")}
                  style={{ marginLeft: "6px" }}
                >
                  Close
                </button>

                <details style={{ marginTop: "6px" }}>
                  <summary>View</summary>

                  {Object.entries(record.checklist || {}).map(
                    ([item, value]) => (
                      <div key={item}>
                        {item}:{" "}
                        {typeof value === "object"
                          ? `${value.condition || value.quantity || value.value || ""} | ${value.remarks || ""}`
                          : value}
                      </div>
                    )
                  )}
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}