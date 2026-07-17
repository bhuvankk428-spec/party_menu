import { useNavigate } from "react-router-dom";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/food/${item.id}`)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover"
        />

        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold text-white ${
            item.isVeg ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {item.isVeg ? "Veg" : "Non-Veg"}
        </span>
      </div>

      <div className="p-5">
        <p className="uppercase text-red-600 font-semibold text-sm">
          {item.category}
        </p>

        <h2 className="text-xl font-bold mt-2">{item.name}</h2>

        <p className="text-gray-600 mt-2 line-clamp-2">
          {item.description}
        </p>

        <p className="mt-4 font-semibold text-yellow-500">
          {item.servings}
        </p>
      </div>
    </div>
  );
};

export default FoodCard;