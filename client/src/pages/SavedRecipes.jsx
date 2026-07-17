import FoodCard from "../components/FoodCard";
import { useSavedRecipes } from "../context/SavedRecipeContext";

const SavedRecipes = () => {
  const { savedRecipes } = useSavedRecipes();

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">

      <h1 className="text-4xl font-bold text-red-600 mb-8">
        Saved Recipes
      </h1>

      {savedRecipes.length === 0 ? (
        <p>No recipes saved.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {savedRecipes.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
            />
          ))}

        </div>
      )}
    </div>
  );
};

export default SavedRecipes;