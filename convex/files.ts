import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getAllPublicFiles = query({
  args: {
    visibility: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("visibility"), args.visibility))
      .collect();
  },
});
export const getRecentFilesForUser = query({
  args: { userId: v.id("users"), quanitity: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(args.quanitity);
  },
});

export const getRecentFileForUserAsType = query({
  args: { userId: v.id("users"), fileType: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("fileType"), args.fileType))
      .order("desc")
      .take(1);
  },
});
export const getFileForUserAsType = query({
  args: { userId: v.id("users"), fileType: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("fileType"), args.fileType))
      .order("desc")
      .collect();
  },
});
export const getFileById = query({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.fileId as unknown as Id<"files">);
  },
});

export const getFilesForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const createFile = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    fileId: v.string(),
    visibility: v.string(),
    fileType: v.string(),
  },
  async handler(ctx, args) {
    return ctx.db.insert("files", {
      userId: args.userId as Id<"users">,
      name: args.name,
      description: args.description,
      fileId: args.fileId,
      visibility: args.visibility,
      fileType: args.fileType,
    });
  },
});

export const deleteFile = mutation({
  args: {
    _id: v.id("files"),
  },
  async handler(ctx, args) {
    return ctx.db.delete(args._id);
  },
});

export const updateFile = mutation({
  args: {
    id: v.id("files"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    visibility: v.optional(v.string()),
    fileType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // Optional: Verify the file exists
    const existingFile = await ctx.db.get(id);
    if (!existingFile) {
      throw new Error("File not found");
    }
    await ctx.db.patch(id, updates);

    return { success: true };
  },
});
