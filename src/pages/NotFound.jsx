import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-orange-50">

      <h1 className="text-8xl font-bold text-red-600">
        404
      </h1>

      <p className="text-xl mt-4">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>

    </div>
  );
};

export default NotFound;