import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { SavedRecipeProvider } from "./context/SavedRecipeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SavedRecipeProvider>
        <App />
      </SavedRecipeProvider>
    </AuthProvider>
  </React.StrictMode>
);