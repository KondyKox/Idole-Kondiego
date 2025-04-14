const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get all tiers
export const fetchTiers = async () => {
  const res = await fetch(`${API_URL}/tiers`);
  if (!res.ok) throw new Error("Failed to load tiers.");
  const data = await res.json();
  console.log(data);
  return data;
};

// Save tierlist
export const saveTierList = async (data: any) => {
  const res = await fetch(`${API_URL}/tiers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to save tier list.");
  return res.json();
};

// Add new element to tier list
export const addElementToTierlist = async (formData: FormData) => {
  const res = await fetch(`${API_URL}/tiers/add`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Cannot add new element to tier list.");

  const data = await res.json();
  console.log("Idol added successfully", data);
  return data;
};

// Move element from one tier to another
export const moveElement = async (
  elementId: string,
  fromTierId: string,
  toTierId: string
) => {
  const res = await fetch(`${API_URL}/tiers/move-element`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      elementId: elementId,
      fromTierId: fromTierId,
      toTierId: toTierId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("❌ Backend error:", errorData);
    throw new Error("Failed to move element.");
  }
  return res.json();
};

// Delete element from tierlist
export const deleteElement = async (elementId: string) => {
  const res = await fetch(`${API_URL}/tiers/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      elementId: elementId,
    }),
  });

  if (!res.ok) throw new Error("Failed to delete element.");

  const data = await res.json();
  console.log(`Deleted idol with ID: ${elementId}`, data);
  return data;
};
