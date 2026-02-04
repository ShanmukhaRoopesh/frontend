const BASE_URL = "http://localhost:8080/api";

export const initializeEvent = async () => {
  await fetch(`${BASE_URL}/initialize`, { method: "POST" });
};

export const getSeats = async () => {
  const res = await fetch(`${BASE_URL}/seats`);
  return res.json();
};

export const bookSeats = async (seats, user) => {
  const res = await fetch(`${BASE_URL}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seats, user })
  });
  return res.json();
};
