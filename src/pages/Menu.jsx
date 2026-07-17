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

setRecipes(response.data || []);
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
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading recipes...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header
        user={user}
        savedCount={savedRecipes.length}
        onLogout={logout}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <FilterBar
          category={category}
          setCategory={setCategory}
          diet={diet}
          setDiet={setDiet}
          search={search}
          setSearch={setSearch}
        />

        {filteredFoods.length === 0 ? (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold text-gray-600">
              No recipes found.
            </h2>
          </div>
        ) : (
          <div className="grid gap-6 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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