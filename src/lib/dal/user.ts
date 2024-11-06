"use server";

import { connectMongoDB } from "../db";
import { User } from "firebase/auth";
import urlSlug from "url-slug";
import { v4 as v4uuid } from "uuid";

const usersCol = "users";

export const getUserById = async ({ userId }: { userId: string }) => {
  const db = await connectMongoDB();
  const data = await db.collection(usersCol).findOne({ _id: userId as any });
  return data;
};

export const insertUser = async ({ user }: { user: Partial<User> }) => {
  const db = await connectMongoDB();
  const slug = urlSlug(user.displayName || v4uuid());

  const isExists = (await db.collection(usersCol).findOne({ slug })) != null;

  const data = await db.collection(usersCol).insertOne({
    _id: user.uid as any,
    ...user,
    name: user.displayName?.toLowerCase(),
    slug: isExists ? `${slug}-${v4uuid()}` : slug
  });

  return data.acknowledged;
};
