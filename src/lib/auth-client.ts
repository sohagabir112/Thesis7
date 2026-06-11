import { createAuthClient } from "better-auth/react";

const authBaseURL =
  import.meta.env.VITE_AUTH_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:4000"
    : typeof window !== "undefined"
      ? window.location.origin
      : "");

export const authClient = createAuthClient({
  baseURL: authBaseURL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
