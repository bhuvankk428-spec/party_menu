import { apiFetch } from "./api";

export const getAllRecipes = () => {
  return apiFetch("/menu");
};

export const getRecipeById = (id) => {
  return apiFetch(`/menu/${id}`);
};