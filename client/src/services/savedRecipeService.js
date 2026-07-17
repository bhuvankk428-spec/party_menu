import { apiFetch } from "./api";

export const getSavedRecipes = () => {
  return apiFetch("/saved");
};

export const saveRecipe = (recipeId) => {
  return apiFetch("/saved", {
    method: "POST",
    body: JSON.stringify({
      recipeId,
    }),
  });
};

export const removeSavedRecipe = (recipeId) => {
  return apiFetch(`/saved/${recipeId}`, {
    method: "DELETE",
  });
};