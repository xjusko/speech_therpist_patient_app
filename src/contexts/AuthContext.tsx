import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Context to keep and save authentication token.

type AuthContext = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<string>("user", "");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
