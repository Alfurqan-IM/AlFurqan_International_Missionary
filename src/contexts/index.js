import { createContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getLoginToken, setLoginToken } from "../storage";
import { getDecodedJWT, isAuthenticated as checkAuth } from "../utils";
import { axiosInstance } from "../axios-instance";
import DonationModal from "../components/modal/DonationModal";

export const DonationContext = createContext({
  openDonation: () => {},
  closeDonation: () => {},
});

function DonationContextProvider({ children }) {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  const openDonation = () => setIsDonationOpen(true);
  const closeDonation = () => setIsDonationOpen(false);

  return (
    <DonationContext.Provider value={{ openDonation, closeDonation }}>
      {children}
      <DonationModal open={isDonationOpen} onClose={closeDonation} />
    </DonationContext.Provider>
  );
}

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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const queryClient = useQueryClient();
  useEffect(() => {
    let mounted = true;

    function normalizeUser(payload) {
      // Wrap payload in tokenUser if not already
      return payload.tokenUser ? payload : { tokenUser: payload };
    }

    async function hydrate() {
      // 1️⃣ Cookie-based session (Google OAuth or refreshed login)
      try {
        const res = await axiosInstance.get("/authentication/showme");

        if (!mounted) return;

        setUser(normalizeUser(res.data));
        setIsAuthenticated(true);
        setIsReady(true);
        return;
      } catch {
        // ignore → fallback to localStorage
      }

      // 2️⃣ LocalStorage token fallback (email/password)
      if (authToken && checkAuth()) {
        const decoded = getDecodedJWT();
        if (decoded && mounted) {
          setUser(normalizeUser(decoded));
          setIsAuthenticated(true);
        }
      } else if (mounted) {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsReady(true);
    }

    hydrate();

    return () => {
      mounted = false;
    };
  }, []);

  function authenticate(token) {
    if (!token) return;

    setLoginToken(token);
    setAuthToken(token);

    const decoded = getDecodedJWT();
    if (decoded) {
      setUser(decoded);
      setIsAuthenticated(true);
    }
  }

  function logout() {
    axiosInstance.delete("/authentication/logout", {
      withCredentials: true,
    });

    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.clear();
    queryClient.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token: authToken,
        isAuthenticated,
        isAdmin: user?.role === "admin",
        authenticate,
        logout,
        isReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { DonationContextProvider };
