import { Link } from "react-router-dom";

const Header = ({ user, savedCount, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div>
        <Link to="/">
          <h1 className="text-2xl font-bold text-red-650 hover:text-red-700">
            Party Menu
          </h1>
        </Link>
        {user?.name && (
          <p className="text-xs text-gray-500 mt-1">
            Welcome, <span className="font-semibold text-gray-700">{user.name}</span>!
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/saved"
          className="text-sm font-medium text-gray-650 hover:text-red-600 flex items-center gap-1.5"
        >
          <span>Saved Recipes</span>
          <span className="bg-red-100 text-red-700 rounded-full px-2 py-0.5 text-xs font-bold">
            {savedCount}
          </span>
        </Link>

        {user ? (
          <button
            onClick={onLogout}
            className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/signin"
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;