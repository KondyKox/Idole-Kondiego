const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const tokenKey = import.meta.env.VITE_TOKEN_KEY || "ANOBIBLIA_TOKEN"; // localStorage key

export const registerUser = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Failed to register user.");

  const data = await res.json();
  return data;
};

export const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error("Failed to login user.");

  localStorage.setItem(tokenKey, data.token);
  return data;
};
