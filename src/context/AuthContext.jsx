import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const TOKEN_KEY = "party_menu_token";
const USER_KEY = "party_menu_user";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem(TOKEN_KEY)
  );
const [user, setUser] = useState(() => {
  const saved = localStorage.getItem(USER_KEY);

  if (!saved || saved === "undefined") {
    return null;
  }
  try {
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
});
  const isAuthenticated = !!token;

  const login = (tokenData, userData) => {
    localStorage.setItem(TOKEN_KEY, tokenData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));

    setToken(tokenData);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);