"use client";

import { getCurrUser } from "@/actions/auth";
import { CartWithCartItem } from "@/types/cart.types";
// TODO: Replace this with react redux
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: number;
  email: string;
  cart: CartWithCartItem;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, id: number, cart: CartWithCartItem) => Promise<void>;
  updateCart: (updatedCart: CartWithCartItem) => void;
  openLogin: () => void;
  closeLogin: () => void;
  logout: () => void;
  isLoginOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const login = async (email: string, id: number, cart: CartWithCartItem) => {
    setUser({
      id,
      email,
      cart,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateCart = (updatedCart: CartWithCartItem) => {
    setUser({
      id: user!.id,
      email: user!.email,
      cart: updatedCart,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { error, data } = await getCurrUser();
        if (error) console.log(error);
        else setUser({ id: data!.id, email: data!.email!, cart: data!.cart! });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        openLogin,
        closeLogin,
        isLoginOpen,
        updateCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
