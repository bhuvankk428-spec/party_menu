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
      <div className="min-h-screen bg-stone-50/50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <h2 className="text-stone-600 font-bold text-lg animate-pulse">
          Curating your menu...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50">
      <Header
        user={user}
        savedCount={savedRecipes.length}
        onLogout={logout}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 space-y-10">
        {/* Intro Hero Section */}
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-800 tracking-tight">
            Discover Exquisite Recipes
          </h2>
          <p className="text-stone-500 max-w-2xl text-sm sm:text-base leading-relaxed">
            Browse through our curated list of gourmet recipes, filter by category or dietary preference, and save your favorites for your next big party!
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
          <div className="bg-white/60 border border-stone-200/50 rounded-3xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            <span className="text-4xl">🔍</span>
            <h2 className="text-xl font-bold text-stone-700 mt-4">
              No recipes match your criteria.
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-md mx-auto">
              Try searching for something else, or adjusting your category and dietary filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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