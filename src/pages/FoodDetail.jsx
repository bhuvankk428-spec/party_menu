import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeById } from "../services/menuServices";
import { useSavedRecipes } from "../context/SavedRecipeContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const FoodDetail = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const { saveRecipe, removeRecipe, isSaved, savedRecipes } = useSavedRecipes();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(id);
        setFood(response.recipe);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-semibold text-lg">
          Loading recipe details...
        </p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-bold text-red-600">Recipe Not Found</h2>
        <Link to="/" className="text-sm text-gray-600 underline hover:text-gray-800">
          Back to Menu
        </Link>
      </div>
    );
  }

  const saved = isSaved(food.id);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-850">
      <Header
        user={user}
        savedCount={savedRecipes.length}
        onLogout={logout}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div>
          <Link to="/" className="text-sm text-gray-600 hover:text-red-600 underline">
            &larr; Back to Menu
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm p-6 space-y-6">
          <div className="h-80 w-full overflow-hidden rounded">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-red-100 text-red-750 text-xs font-bold px-2 py-0.5 rounded">
                {food.isVeg ? "Vegetarian" : "Non-Vegetarian"}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded">
                {food.category}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              {food.name}
            </h1>
            <p className="text-sm text-gray-500">
              Servings: {food.servings}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {food.fullDescription}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Ingredients</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              {food.ingredients?.map((item, index) => (
                <li key={index}>
                  <span className="font-semibold text-gray-750">{item.name}</span> - {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                if (saved) {
                  removeRecipe(food.id);
                } else {
                  saveRecipe(food);
                }
              }}
              className={`px-6 py-2 rounded text-sm font-semibold ${
                saved
                  ? "bg-gray-800 hover:bg-gray-900 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {saved ? "Remove from Favorites" : "Save to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;