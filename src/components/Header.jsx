import { Link } from "react-router-dom";

const Header = ({ user, savedCount, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-stone-200/40 px-6 sm:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <Link to="/" className="inline-block">
          <h1 className="text-3xl font-black bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition">
            Party Menu
          </h1>
        </Link>
        {user?.name && (
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            Hey, <span className="text-stone-700 font-bold">{user.name}</span>! Ready for some delicious recipes?
          </p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/saved"
          className="flex items-center gap-2.5 font-bold text-stone-700 hover:text-rose-600 transition-colors duration-300 group"
        >
          <span className="text-sm">Saved Recipes</span>
          <span className="bg-rose-50 text-rose-600 border border-rose-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-sm group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 transition-all duration-300">
            {savedCount}
          </span>
        </Link>

        <button
          onClick={onLogout}
          className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md shadow-stone-900/10 hover:shadow-stone-900/20 active:scale-95 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;