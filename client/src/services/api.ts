const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchTiers = async () => {
  const res = await fetch(`${API_URL}/tiers`);
  if (!res.ok) throw new Error("Failed to load tiers.");
  const data = await res.json();
  console.log(data);
  return data;
};

export const saveTierList = async (data: any) => {
  const res = await fetch(`${API_URL}/tiers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to save tier list.");
  return res.json();
};
