import { menuData } from "../data/menuData";

export const getAllRecipes = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    recipes: menuData,
  };
};

export const getRecipeById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const recipe = menuData.find((item) => item.id === Number(id));
  return {
    recipe,
  };
};