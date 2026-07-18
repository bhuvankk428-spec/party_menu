import { useNavigate } from "react-router-dom";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/food/${item.id}`)}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-gray-400 flex flex-col h-full shadow-sm"
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold border ${
            item.isVeg
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-rose-50 text-rose-700 border-rose-200"
          }`}
        >
          {item.isVeg ? "Veg" : "Non-Veg"}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 space-y-2">
        <p className="text-[10px] font-bold uppercase text-orange-650 tracking-wider">
          {item.category}
        </p>

        <h3 className="text-lg font-bold text-gray-800 hover:text-red-650 line-clamp-1">
          {item.name}
        </h3>

        <p className="text-gray-500 text-xs line-clamp-2 leading-normal flex-1">
          {item.description}
        </p>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Servings: {item.servings}</span>
          <span className="text-red-600 font-bold hover:underline">
            View Recipe &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;