import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { USER_ROLES } from "@/constants";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",

  user: {
    additionalFields: {
      role: {
        type: USER_ROLES,
        required: false,
        defaultValue: "student",
        input: true,
      },
      department: {
        type: "string",
        required: false,
        input: true,
      },
      imageCldPubId: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  plugins: [magicLinkClient()],
});
