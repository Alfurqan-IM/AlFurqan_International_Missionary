import { createContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getLoginToken, getStoredUser, setLoginToken } from "../storage";
import { getDecodedJWT, isAuthenticated as checkAuth } from "../utils";

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  authenticate: () => {},
  logout: () => {},
  isReady: false,
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(() => getLoginToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [isReady, setIsReady] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (authToken && !user) {
      const decoded = getDecodedJWT();
      if (decoded) {
        setUser(decoded);
        localStorage.setItem("user", JSON.stringify(decoded));
      }
    }
    setIsReady(true);
  }, [authToken, user]);

  function authenticate(token) {
    setLoginToken(token);
    setAuthToken(token);

    const decoded = getDecodedJWT();
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
  }

  function logout() {
    setAuthToken(null);
    setUser(null);
    localStorage.clear();
    queryClient.clear();
  }

  const value = {
    user,
    token: authToken,
    isAuthenticated: checkAuth(),
    isAdmin: user?.role === "admin",
    authenticate,
    logout,
    isReady,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
