import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import HandoverForm from "./components/HandoverForm";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [page, setPage] = useState("form");

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <div style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
            <p>Logged in as: {user?.signInDetails?.loginId}</p>

            <button onClick={signOut}>Sign out</button>

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => setPage("form")}>Handover Form</button>

              <button
                onClick={() => setPage("admin")}
                style={{ marginLeft: "8px" }}
              >
                Admin Dashboard
              </button>
            </div>
          </div>

          {page === "form" && <HandoverForm />}
          {page === "admin" && <AdminDashboard />}
        </div>
      )}
    </Authenticator>
  );
}