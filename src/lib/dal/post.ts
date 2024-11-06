import { connectMongoDB } from "../db";
import Post from "../types/post";

const postsCol = "posts";

export const createPost = async (post: Post) => {
  const db = await connectMongoDB();
  await db.collection(postsCol).insertOne({ ...post, _id: post._id as any });
};

export const getLatestPosts = async () => {
  const db = await connectMongoDB();
  const snapShot = db
    .collection(postsCol)
    .find({}, { projection: { _id: 1, topics: 1, userId: 1 } })
    .limit(20);
  const posts = await snapShot.toArray();
  return posts as any as Post[];
};
