import FoodCard from "../components/FoodCard";
import { useSavedRecipes } from "../context/SavedRecipeContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const SavedRecipes = () => {
  const { savedRecipes } = useSavedRecipes();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header
        user={user}
        savedCount={savedRecipes.length}
        onLogout={logout}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <Link to="/" className="text-sm text-gray-655 hover:text-red-600 underline">
            &larr; Back to Menu
          </Link>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-gray-850">
            Saved Recipes
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Your personal collection of bookmarked recipes.
          </p>
        </div>

        {savedRecipes.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded p-10 text-center shadow-sm space-y-3">
            <p className="text-gray-600 font-semibold text-lg">
              No saved recipes yet.
            </p>
            <p className="text-gray-500 text-xs max-w-xs mx-auto">
              Find recipes you like on the main menu and save them to keep track of them here.
            </p>
            <Link
              to="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {savedRecipes.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;