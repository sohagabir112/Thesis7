import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: sessionData, isPending: isSessionLoading } = useSession();
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    const { error } = await signIn.email({ email, password });
    if (error) {
      setError(error.message || "Login failed");
      throw new Error(error.message || "Login failed");
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, phone?: string) => {
    setError(null);
    // better-auth doesn't officially support 'phone' in the default schema without plugins,
    // but we can pass it if we extended the schema, or just skip it for now.
    const { error } = await signUp.email({ name, email, password });
    if (error) {
      setError(error.message || "Signup failed");
      throw new Error(error.message || "Signup failed");
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut();
  }, []);

  const user: User | null = sessionData?.user
    ? {
      id: sessionData.user.id,
      name: sessionData.user.name,
      email: sessionData.user.email,
      role: sessionData.user.role || "user",
    }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: isSessionLoading,
        login,
        signup,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
