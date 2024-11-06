"use server";

import { connectMongoDB } from "../db";
import { User } from "firebase/auth";

const usersCol = "users";

export const getUserById = async ({ userId }: { userId: string }) => {
  const db = await connectMongoDB();
  const data = await db.collection(usersCol).findOne({ _id: userId as any });
  return data;
};

export const insertUser = async ({ user }: { user: Partial<User> }) => {
  try {
    const db = await connectMongoDB();

    const data = await db.collection(usersCol).insertOne({
      _id: user.uid as any,
      ...user,
      name: user.displayName?.toLowerCase()
    });
    return data.acknowledged;
  } catch (err: any) {
    console.log(err);
    // user already exists
    if (err.code === 11000) {
      return true;
    }
    return false;
  }
};
