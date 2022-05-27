import { auth } from "@/firebase";
import { createContext } from "@/utils";
import { FC, useState, useContext, useEffect } from "react";

interface AuthContext {
  isAuthenticated: boolean;
  showScreen: boolean;
}

const AuthContext = createContext<AuthContext>();

const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);

        setIsAuthenticated(true);
      }
      setLoading(false);
      setShowScreen(true);
    });
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, showScreen }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
