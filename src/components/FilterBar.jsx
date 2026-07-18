const FilterBar = ({
  category,
  setCategory,
  diet,
  setDiet,
  search,
  setSearch,
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
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-5">
      {/* Category Selection */}
      <div>
        <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">
          Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 text-xs font-medium rounded border ${
                  isSelected
                    ? "bg-red-600 text-white border-red-650"
                    : "bg-white text-gray-650 hover:bg-gray-50 border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Diet Selection */}
      <div>
        <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">
          Dietary Type
        </h4>
        <div className="flex flex-wrap gap-2">
          {diets.map((item) => {
            const isSelected = diet === item.value;
            return (
              <button
                key={item.value}
                onClick={() => setDiet(item.value)}
                className={`px-4 py-2 text-xs font-medium rounded border ${
                  isSelected
                    ? "bg-gray-800 text-white border-gray-900"
                    : "bg-white text-gray-650 hover:bg-gray-50 border-gray-300"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-red-500"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="px-3 py-2 text-xs border border-gray-300 rounded hover:bg-gray-100"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;