import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = String(params.email || "").trim().toLowerCase();
        if (!email || !email.includes("@")) throw new Error("Enter a valid email address");
        const name = String(params.name || "").trim();
        return { email, name: name || email.split("@")[0] };
      },
      validatePasswordRequirements(password) {
        if (password.length < 12) throw new Error("Password must be at least 12 characters");
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
          throw new Error("Password must include uppercase, lowercase, and a number");
        }
      },
    }),
  ],
});
