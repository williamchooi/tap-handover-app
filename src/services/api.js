const API_URL =
  "https://w8gu2fvcy1.execute-api.ap-southeast-1.amazonaws.com/default/tap-handover-api";

export async function createHandover(record) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Failed to create handover");
  }

  return response.json();
}

export async function getHandovers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch handovers");
  }

  return response.json();
}

export async function updateHandoverStatus(id, status) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }

  return response.json();
}