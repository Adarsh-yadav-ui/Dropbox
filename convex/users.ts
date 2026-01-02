import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";
import {
  internalMutation,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const get = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getRecentUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").take(5);
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  async handler(ctx, { data }) {
    const userAttributes = {
      email: data.email_addresses?.[0]?.email_address,
      clerkUserId: data.id,
      firstName: data.first_name ?? undefined,
      lastName: data.last_name ?? undefined,
      imageUrl: data.image_url ?? undefined,
      username: data.username ?? undefined,
    };

    const user = await userByClerkUserId(ctx, data.id);

    if (user === null) {
      await ctx.db.insert("users", {
        ...userAttributes,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.patch(user._id, {
        ...userAttributes,
        updatedAt: Date.now(),
      });
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkUserId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByClerkUserId(ctx, identity.subject);
}

async function userByClerkUserId(
  ctx: QueryCtx | MutationCtx,
  clerkUserId: string
) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
}

// convex/users.ts - MODIFIED store mutation
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const clerkUserId = identity.subject;

    // The concurrent read is the source of the conflict.
    // We rely on the unique index on 'clerkUserId' to prevent the insert.
    // However, to make this safe, we must use an atomic operation.

    // Check if we've already stored this user.
    const user = await userByClerkUserId(ctx, clerkUserId);

    if (user !== null) {
      // If we've seen this user before, do nothing.
      // This is now the ONLY path for subsequent calls.
      return;
    }

    // If it's a new user, attempt to create a new document.
    // Multiple inserts will still fail on a non-unique index if you had one.
    // The conflict happens because the second call reads 'null' but the first call
    // committed a write. We can't avoid the write conflict with this structure.

    // A safer but less performant approach is to use a transaction-like pattern:
    try {
      await ctx.db.insert("users", {
        clerkUserId: clerkUserId,
        email: identity.email,
        firstName: identity.givenName,
        lastName: identity.familyName,
        username: identity.nickname,
        imageUrl: identity.pictureUrl,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } catch (e) {
      // This is a common pattern to handle "already exists" errors
      // that arise from race conditions in an insert-after-query.
      // We can safely ignore the error if it was a race condition insert.
      console.warn("User already stored, ignoring race-condition insert:", e);
      return;
    }
  },
});
