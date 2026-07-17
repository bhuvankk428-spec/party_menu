import { apiFetch } from "./api";

export const registerUser = (userData) => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = (email, password) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const getCurrentUser = () => {
  return apiFetch("/auth/me");
};