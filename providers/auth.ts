/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AuthProvider } from "@refinedev/core";
import { SignUpPayload } from "@/types";
import { authClient } from "@/lib/auth-client";

export const authProvider: AuthProvider = {
  register: async ({
    email,
    name,
    role,
    image,
    imageCldPubId,
  }: SignUpPayload) => {
    try {
      // For passwordless auth, send magic link to complete registration
      const { error } = await authClient.signIn.magicLink({
        email,
        callbackURL: "/",
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "Registration failed",
            message:
              error?.message || "Unable to create account. Please try again.",
          },
        };
      }

      // Magic link sent - user will complete registration via email
      return {
        success: true,
        successNotification: {
          message: "Check your email to complete registration",
          type: "success",
        },
      };
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        error: {
          name: "Registration failed",
          message: "Unable to create account. Please try again.",
        },
      };
    }
  },
  login: async ({ email }) => {
    try {
      // Use magic link for passwordless auth
      const { error } = await authClient.signIn.magicLink({
        email: email,
        callbackURL: "/",
      });

      if (error) {
        console.error("Login error from auth client:", error);
        return {
          success: false,
          error: {
            name: "Login failed",
            message: error?.message || "Please try again later.",
          },
        };
      }

      // Magic link sends email - no immediate user data
      // Magic link sent successfully
      return {
        success: true,
        successNotification: {
          message: "Check your email for magic link to login",
          type: "success",
        },
      };
    } catch (error) {
      console.error("Login exception:", error);
      return {
        success: false,
        error: {
          name: "Login failed",
          message: "Please try again later.",
        },
      };
    }
  },
  logout: async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        error: {
          name: "Logout failed",
          message: "Unable to log out. Please try again.",
        },
      };
    }

    localStorage.removeItem("user");

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const { data: session } = await authClient.getSession();
    if (!session) return null;

    return {
      role: (session.user as any).role,
    };
  },
  getIdentity: async () => {
    const { data: session } = await authClient.getSession();
    if (!session) return null;

    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      role: (session.user as any).role,
      imageCldPubId: (session.user as any).imageCldPubId,
    };
  },
};
