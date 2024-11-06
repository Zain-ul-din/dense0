"use server";

import { MongoClient } from "mongodb";
import { cache } from "react";

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URL || "");

let count = 0;

export const connectMongoDB = cache(async () => {
  count += 1;
  console.log(`[db]: initialized ${count} times`);
  await client.connect();
  const db = client.db("dense0");
  return db;
});
