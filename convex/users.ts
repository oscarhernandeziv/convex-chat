import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    createdAt: v.number(),
    profileImage: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const newUser = await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        createdAt: args.createdAt,
        profileImage: args.profileImage,
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("User informated did not insert successfully");
    }
  },
});

export const readUser = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const userInfo = await ctx.db
        .query("users")
        .filter((user) => {
          return user.eq(user.field("userId"), args.userId);
        })
        .first();

      return userInfo;
    } catch (error) {
      console.log(error);
      throw new Error("Reading user did not work");
    }
  },
});

export const updateName = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const updateUser = await ctx.db.patch(user._id, {
      name: args.name,
    });

    return updateUser;
  },
});

export const updateProfileImage = mutation({
  args: {
    userId: v.string(),
    profileImage: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const updateUser = await ctx.db.patch(user._id, {
      profileImage: args.profileImage,
    });

    return updateUser;
  },
});
