import { useState } from "react";

export default function HandoverForm() {
  const [form, setForm] = useState({
    type: "Onboarding",
    tenantName: "",
    tenantId: "",
    property: "",
    manager: "",
    date: "",
    access: "",
    room: "",
    toilet: "",
    walls: "",
    flooring: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const handleSubmit = async () => {
  try {
    const response = await fetch(
      "https://w8gu2fvcy1.execute-api.ap-southeast-1.amazonaws.com/default/tap-handover-api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(result);
      alert("Error: " + JSON.stringify(result));
      return;
    }

    alert("Submitted successfully!");
  } catch (error) {
    console.error(error);
    alert("Error submitting form. Check console.");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Onboarding / Offboarding Checklist</h2>

      <select name="type" value={form.type} onChange={handleChange}>
        <option>Onboarding</option>
        <option>Offboarding</option>
      </select>

      <input
        name="date"
        placeholder="Date"
        value={form.date}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="tenantName"
        placeholder="Tenant Name"
        value={form.tenantName}
        onChange={handleChange}
      />

      <input
        name="tenantId"
        placeholder="Tenant ID"
        value={form.tenantId}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="property"
        placeholder="Property"
        value={form.property}
        onChange={handleChange}
      />

      <input
        name="manager"
        placeholder="Community Manager"
        value={form.manager}
        onChange={handleChange}
      />

      <h3>Room Access</h3>
      <input
        name="access"
        placeholder="Access card / key / number"
        value={form.access}
        onChange={handleChange}
      />

      <h3>Cleanliness</h3>

      <label>
        Room:
        <select name="room" value={form.room} onChange={handleChange}>
          <option value="">Select</option>
          <option>Clean</option>
          <option>Not Cleaned</option>
        </select>
      </label>

      <br />

      <label>
        Toilet:
        <select name="toilet" value={form.toilet} onChange={handleChange}>
          <option value="">Select</option>
          <option>Clean</option>
          <option>Not Cleaned</option>
        </select>
      </label>

      <br />

      <label>
        Walls:
        <select name="walls" value={form.walls} onChange={handleChange}>
          <option value="">Select</option>
          <option>Clean</option>
          <option>Not Cleaned</option>
        </select>
      </label>

      <br />

      <label>
        Flooring:
        <select name="flooring" value={form.flooring} onChange={handleChange}>
          <option value="">Select</option>
          <option>Clean</option>
          <option>Not Cleaned</option>
        </select>
      </label>

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}