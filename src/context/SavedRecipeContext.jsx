import { createContext, useContext, useEffect, useState } from "react";

const SavedRecipeContext = createContext();

const STORAGE_KEY = "party_menu_saved_recipes";

export const SavedRecipeProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const recipes = localStorage.getItem(STORAGE_KEY);
    return recipes ? JSON.parse(recipes) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(savedRecipes)
    );
  }, [savedRecipes]);

  const saveRecipe = (recipe) => {
    if (
      !savedRecipes.some((item) => item.id === recipe.id)
    ) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  const removeRecipe = (id) => {
    setSavedRecipes(
      savedRecipes.filter((item) => item.id !== id)
    );
  };

  const isSaved = (id) => {
    return savedRecipes.some((item) => item.id === id);
  };

  return (
    <SavedRecipeContext.Provider
      value={{
        savedRecipes,
        saveRecipe,
        removeRecipe,
        isSaved,
      }}
    >
      {children}
    </SavedRecipeContext.Provider>
  );
};

export const useSavedRecipes = () =>
  useContext(SavedRecipeContext);