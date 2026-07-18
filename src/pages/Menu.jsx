import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import FoodCard from "../components/FoodCard";

import { useAuth } from "../context/AuthContext";
import { useSavedRecipes } from "../context/SavedRecipeContext";
import { getAllRecipes } from "../services/menuServices";

const Menu = () => {
  const { user, logout } = useAuth();
  const { savedRecipes } = useSavedRecipes();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("All");
  const [diet, setDiet] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getAllRecipes();
        setRecipes(response.recipes || []);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredFoods = useMemo(() => {
    return recipes.filter((item) => {
      const matchesCategory =
        category === "All" ||
        item.category?.toLowerCase() === category.toLowerCase();

      const matchesDiet =
        diet === "All" ||
        (diet === "Veg" && item.isVeg) ||
        (diet === "NonVeg" && !item.isVeg);

      const matchesSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ?? false;

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [recipes, category, diet, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-55">
        <p className="text-gray-600 font-semibold text-lg">
          Loading recipes...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header
        user={user}
        savedCount={savedRecipes.length}
        onLogout={logout}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Discover Recipes
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Browse through our recipes list, filter them, and save your favorites.
          </p>
        </div>

        <FilterBar
          category={category}
          setCategory={setCategory}
          diet={diet}
          setDiet={setDiet}
          search={search}
          setSearch={setSearch}
        />

        {filteredFoods.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded p-10 text-center shadow-sm">
            <h3 className="text-lg font-bold text-gray-700">
              No recipes match your criteria.
            </h3>
            <p className="text-gray-550 text-xs mt-1">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredFoods.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;