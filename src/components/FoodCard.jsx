import { useNavigate } from "react-router-dom";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/food/${item.id}`)}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer border border-stone-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_24px_48px_rgba(244,63,94,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-bold tracking-wide backdrop-blur-md shadow-sm border ${
            item.isVeg 
              ? "bg-emerald-50/90 text-emerald-700 border-emerald-100" 
              : "bg-rose-50/90 text-rose-700 border-rose-100"
          }`}
        >
          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${item.isVeg ? "bg-emerald-500" : "bg-rose-500"}`} />
          {item.isVeg ? "Veg" : "Non-Veg"}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-orange-500">
          {item.category}
        </p>

        <h2 className="text-xl font-bold mt-2 text-stone-800 group-hover:text-rose-600 transition-colors duration-300 line-clamp-1">
          {item.name}
        </h2>

        <p className="text-stone-500 text-sm mt-2.5 line-clamp-2 leading-relaxed flex-1">
          {item.description}
        </p>

        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-stone-500">
            <span className="text-lg">🍽️</span>
            <span className="text-xs font-semibold text-stone-600">{item.servings}</span>
          </div>
          <span className="text-xs font-bold text-rose-500 group-hover:translate-x-1 transition-transform duration-300">
            View Recipe &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;