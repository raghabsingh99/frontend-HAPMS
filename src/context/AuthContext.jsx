import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || "";
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem("refreshToken") || "";
  });

  const updateTokens = ({ accessToken, refreshToken }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const login = ({ accessToken, refreshToken, user }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    updateTokens,
    isAuthenticated: !!accessToken && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}