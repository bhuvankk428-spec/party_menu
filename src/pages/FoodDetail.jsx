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
      <div className="min-h-screen bg-stone-50/50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <h2 className="text-stone-600 font-bold text-lg animate-pulse">
          Fetching details...
        </h2>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-stone-50/50 flex flex-col items-center justify-center gap-4">
        <span className="text-4xl">⚠️</span>
        <h1 className="text-2xl font-black text-rose-500">Food Not Found</h1>
        <Link to="/" className="text-stone-600 font-semibold underline hover:text-stone-800">
          Back to Menu
        </Link>
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

      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-10">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-rose-600 font-bold text-sm mb-6 transition-colors duration-300 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> Back to Menu
        </Link>

        {/* Hero Section */}
        <div className="bg-white border border-stone-200/50 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="relative h-96 sm:h-[480px]">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
            
            {/* Overlay Title */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold tracking-wide backdrop-blur-md shadow-sm border mb-3 inline-block ${
                  food.isVeg 
                    ? "bg-emerald-500/90 text-white border-emerald-400" 
                    : "bg-rose-500/90 text-white border-rose-400"
                }`}
              >
                {food.isVeg ? "Veg" : "Non-Veg"}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{food.name}</h1>
              <div className="flex gap-4 items-center text-xs font-semibold text-stone-200 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-md uppercase tracking-wider text-[10px]">
                  {food.category}
                </span>
                <span>•</span>
                <span>🍽️ {food.servings}</span>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-stone-800">Description</h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {food.fullDescription}
              </p>
            </div>

            <div className="border-t border-stone-100 pt-8 space-y-4">
              <h2 className="text-xl font-extrabold text-stone-800">Ingredients</h2>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {food.ingredients?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-stone-50 border border-stone-150 rounded-2xl p-4 shadow-sm"
                  >
                    <span className="text-emerald-500 font-bold text-lg">✓</span>
                    <div className="flex-1 flex justify-between items-center text-sm font-semibold">
                      <span className="text-stone-700">{item.name}</span>
                      <span className="text-orange-500 font-bold text-xs bg-orange-50 border border-orange-100 rounded-lg px-2 py-0.5">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-stone-100 pt-8 flex items-center justify-between">
              <button
                onClick={() => {
                  if (isSaved(food.id)) {
                    removeRecipe(food.id);
                  } else {
                    saveRecipe(food);
                  }
                }}
                className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md cursor-pointer ${
                  isSaved(food.id)
                    ? "bg-stone-900 hover:bg-stone-800 text-white shadow-stone-900/10"
                    : "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-orange-500/20"
                }`}
              >
                {isSaved(food.id) ? "Remove from Favorites" : "❤️ Save to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;