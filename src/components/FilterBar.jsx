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
    "All",
    "Starter",
    "Main",
    "sides",
    "desert",
  ];

  const diets = [
    "All",
    "Veg",
    "NonVeg",
  ];

  return (
    <div className="space-y-5 mb-8">

      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full border-2 transition font-semibold ${
              category === cat
                ? "bg-red-600 text-white border-red-600"
                : "bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {diets.map((item) => (
          <button
            key={item}
            onClick={() => setDiet(item)}
            className={`px-5 py-2 rounded-full border-2 transition font-semibold ${
              diet === item
                ? "bg-red-600 text-white border-red-600"
                : "bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={onSearch}
          className="bg-yellow-400 hover:bg-yellow-300 px-8 rounded-lg font-bold"
        >
          Search
        </button>
      </div>

    </div>
  );
};

export default FilterBar;