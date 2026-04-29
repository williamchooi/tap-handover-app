import { useState } from "react";
import { checklistItems } from "../data/checklistItems";

export default function HandoverForm() {
  const [form, setForm] = useState({
    handoverType: "Onboarding",
    date: "",
    tenantName: "",
    tenantId: "",
    property: "",
    communityManager: "",
    checklist: {},
    tenantAck: false,
    managerAck: false,
  });

  function updateField(field, value) {
    setForm({ ...form, [field]: value });
  }

  function updateChecklist(item, field, value) {
    setForm({
      ...form,
      checklist: {
        ...form.checklist,
        [item]: {
          ...form.checklist[item],
          [field]: value,
        },
      },
    });
  }

function handleSubmit(e) {
  e.preventDefault();

  const newRecord = {
    id: Date.now(),
    ...form,
    submittedAt: new Date().toISOString(),
    status: "Submitted",
  };

  const existingRecords =
    JSON.parse(localStorage.getItem("handoverRecords")) || [];

  localStorage.setItem(
    "handoverRecords",
    JSON.stringify([...existingRecords, newRecord])
  );

  alert("Handover saved locally.");
}

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
      <h2>Onboarding / Offboarding Checklist</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        <select value={form.handoverType} onChange={(e) => updateField("handoverType", e.target.value)}>
          <option>Onboarding</option>
          <option>Offboarding</option>
        </select>

        <input type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} />

        <input placeholder="Tenant Name" value={form.tenantName} onChange={(e) => updateField("tenantName", e.target.value)} />

        <input placeholder="Tenant ID" value={form.tenantId} onChange={(e) => updateField("tenantId", e.target.value)} />

        <input placeholder="Property and Unit Address" value={form.property} onChange={(e) => updateField("property", e.target.value)} />

        <input placeholder="Community Manager" value={form.communityManager} onChange={(e) => updateField("communityManager", e.target.value)} />
      </div>

      {checklistItems.map((section, i) => (
        <div key={i} style={{ marginBottom: "24px" }}>
          <h3>{section.section}</h3>

          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Item</th>
                <th style={{ width: "35%" }}>Condition / Quantity</th>
                <th style={{ width: "35%" }}>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {section.items.map((item) => (
                <tr key={item}>
                  <td>{item}</td>

                  <td>
                    {section.type === "radio" &&
                      section.options.map((option) => (
                        <label key={option} style={{ marginRight: "12px" }}>
                          <input
                            type="radio"
                            name={item}
                            value={option}
                            onChange={(e) => updateChecklist(item, "condition", e.target.value)}
                          />
                          {option}
                        </label>
                      ))}

                    {section.type === "number" && (
                      <input
                        type="number"
                        min="0"
                        placeholder="Qty"
                        onChange={(e) => updateChecklist(item, "quantity", e.target.value)}
                      />
                    )}

                    {section.type === "text" && (
                      <input
                        type="text"
                        placeholder="Enter details"
                        onChange={(e) => updateChecklist(item, "value", e.target.value)}
                      />
                    )}

                    {section.type === "textarea" && (
                      <textarea
                        placeholder="Enter details"
                        onChange={(e) => updateChecklist(item, "value", e.target.value)}
                      />
                    )}
                  </td>

                  <td>
                    <input
                      style={{ width: "95%" }}
                      placeholder="Remarks"
                      onChange={(e) => updateChecklist(item, "remarks", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div style={{ marginTop: "24px" }}>
        <label>
          <input
            type="checkbox"
            checked={form.tenantAck}
            onChange={(e) => updateField("tenantAck", e.target.checked)}
          />
          Tenant acknowledges the room condition
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={form.managerAck}
            onChange={(e) => updateField("managerAck", e.target.checked)}
          />
          Community Manager verified
        </label>
      </div>

      <br />

      <button type="submit">Submit Handover</button>
    </form>
  );
}