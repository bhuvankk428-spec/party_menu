import { Link } from "react-router-dom";

const Header = ({ user, savedCount, onLogout }) => {
  return (
    <header className="bg-red-600 text-white px-10 py-5 flex justify-between items-center shadow-md">
      <div>
        <h1 className="text-3xl font-bold">Party Menu</h1>
        <p className="text-sm mt-1">
          Welcome, {user?.name}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <Link
          to="/saved"
          className="flex items-center gap-2 font-semibold"
        >
          Saved Recipes

          <span className="bg-yellow-400 text-black rounded-full px-3 py-1 text-sm">
            {savedCount}
          </span>
        </Link>

        <button
          onClick={onLogout}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;