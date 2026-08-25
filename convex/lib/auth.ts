import type { MutationCtx, QueryCtx } from "../_generated/server";

export async function requireAxispepAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Axispep staff authentication is required");

  const claims = identity as Record<string, unknown>;
  const directRoles = Array.isArray(claims.roles) ? claims.roles : [];
  const realmAccess = claims.realm_access && typeof claims.realm_access === "object"
    ? claims.realm_access as Record<string, unknown>
    : undefined;
  const realmRoles = Array.isArray(realmAccess?.roles) ? realmAccess.roles : [];
  const roles = [...directRoles, ...realmRoles].filter((role): role is string => typeof role === "string");

  if (!roles.includes("app_axispep")) throw new Error("The app_axispep staff role is required");
  return identity;
}
