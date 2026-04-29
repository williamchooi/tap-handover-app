import { useState } from "react";
import HandoverForm from "./components/HandoverForm";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [page, setPage] = useState("form");

  return (
    <div>
      <div style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
        <button onClick={() => setPage("form")}>Handover Form</button>
        <button onClick={() => setPage("admin")} style={{ marginLeft: "8px" }}>
          Admin Dashboard
        </button>
      </div>

      {page === "form" && <HandoverForm />}
      {page === "admin" && <AdminDashboard />}
    </div>
  );
}