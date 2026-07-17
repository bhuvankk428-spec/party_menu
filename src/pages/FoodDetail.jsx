import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/menuServices";
import { useSavedRecipes } from "../context/SavedRecipeContext";

const FoodDetail = () => {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const { saveRecipe, removeRecipe, isSaved } = useSavedRecipes();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(id);
        setFood(response.data);
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
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Food Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-96 object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-6">
        {food.name}
      </h1>

      <p className="mt-4 text-gray-700">
        {food.fullDescription}
      </p>

      <h2 className="mt-8 text-2xl font-bold">
        Ingredients
      </h2>

      <ul className="list-disc ml-6 mt-3">
        {food.ingredients?.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          if (isSaved(food.id)) {
            removeRecipe(food.id);
          } else {
            saveRecipe(food);
          }
        }}
        className="mt-8 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-bold transition"
      >
        {isSaved(food.id) ? "Remove Recipe" : "Save Recipe"}
      </button>
    </div>
  );
};

export default FoodDetail;