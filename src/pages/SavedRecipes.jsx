import FoodCard from "../components/FoodCard";
import { useSavedRecipes } from "../context/SavedRecipeContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const SavedRecipes = () => {
  const { savedRecipes } = useSavedRecipes();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-stone-50/50">
      <Header
        user={user}
        savedCount={savedRecipes.length}
        onLogout={logout}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 space-y-8">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-rose-600 font-bold text-sm transition-colors duration-300 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> Back to Menu
        </Link>

        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-850 tracking-tight">
            Saved Recipes
          </h1>
          <p className="text-stone-500 text-sm">
            Your collection of curated recipes for quick access.
          </p>
        </div>

        {savedRecipes.length === 0 ? (
          <div className="bg-white/60 border border-stone-200/50 rounded-3xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-4">
            <span className="text-4xl inline-block animate-bounce">❤️</span>
            <h2 className="text-xl font-bold text-stone-700">No recipes saved yet.</h2>
            <p className="text-stone-400 text-sm max-w-xs mx-auto">
              Find recipes you like on the main menu and click "Save to Favorites" to keep them here.
            </p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-95 transition-all duration-300"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {savedRecipes.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;