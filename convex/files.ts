import { v, Validator } from "convex/values";
import {
  internalMutation,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const createFile = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    fileId: v.string(),
  },
  async handler(ctx, args) {
    return ctx.db.insert("files", {
      userId: args.userId as Id<"users">,
      name: args.name,
      description: args.description,
      fileId: args.fileId,
    });
  },
});
