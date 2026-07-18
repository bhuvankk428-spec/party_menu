import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Menu from "./pages/Menu";
import FoodDetail from "./pages/FoodDetail";
import SavedRecipes from "./pages/SavedRecipes";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }) {
  // Security checks disabled - return children directly
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/food/:id"
          element={
            <ProtectedRoute>
              <FoodDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedRecipes />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;