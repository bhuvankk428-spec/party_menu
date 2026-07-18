const FilterBar = ({
  category,
  setCategory,
  diet,
  setDiet,
  search,
  setSearch,
  onSearch,
}) => {
  const categories = [
    { label: "All Recipes", value: "All" },
    { label: "Starters", value: "Starter" },
    { label: "Main Course", value: "Main" },
    { label: "Sides", value: "sides" },
    { label: "Desserts", value: "desert" },
  ];

  const diets = [
    { label: "All Diets", value: "All" },
    { label: "Vegetarian", value: "Veg" },
    { label: "Non-Vegetarian", value: "NonVeg" },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-stone-200/50 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer ${
                (category === cat.value || (cat.value === "Main" && category === "Main")) 
                  ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-white text-stone-600 hover:bg-stone-50 border border-stone-200/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diet Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
          Dietary preference
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {diets.map((item) => (
            <button
              key={item.value}
              onClick={() => setDiet(item.value)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer ${
                diet === item.value
                  ? "bg-stone-900 text-white shadow-md shadow-stone-900/10"
                  : "bg-white text-stone-600 hover:bg-stone-50 border border-stone-200/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search recipes (e.g. Biryani, Paneer, Chicken...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-stone-200/80 rounded-2xl pl-5 pr-12 py-3.5 text-stone-700 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 text-sm shadow-sm"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={() => onSearch?.()}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/15 hover:shadow-orange-500/25 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;