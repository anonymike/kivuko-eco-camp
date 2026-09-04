/**
 * Admin hook — provides authentication state and admin context.
 *
 * AUTHENTICATION STATUS: PENDING.
 *
 * Today this always returns `isAuthenticated: true` so the admin UI
 * can be built and tested. When real auth is connected (Supabase Auth,
 * NextAuth, or similar), replace the body of this hook with the real
 * authentication check. The admin layout and all admin pages consume
 * this hook, so the switch happens in one place.
 *
 * DO NOT deploy this to production without real authentication.
 * The hook carries a visible console warning to make this impossible
 * to overlook.
 */
import { useState } from "react";

export default function useAdmin() {
  const [isAuthenticated] = useState(() => {
    if (import.meta.env.PROD) {
      console.warn(
        "⚠️ Kivuko admin: Authentication is NOT connected. Do not use in production."
      );
    }
    return true;
  });

  return {
    isAuthenticated,
    user: null,
    /** Placeholder — replace with real sign-out when auth is connected. */
    signOut: () => {
      console.warn("Sign-out is not implemented. Connect authentication first.");
    },
  };
}
