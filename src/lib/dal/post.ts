import { connectMongoDB } from "../db";
import Post from "../types/post";

const postsCol = "posts";

export const createPost = async (post: Post) => {
  const db = await connectMongoDB();
  await db.collection(postsCol).insertOne({ ...post, _id: post._id as any });
};

export const getLatestPosts = async () => {
  const db = await connectMongoDB();
  const posts = await db
    .collection(postsCol)
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          _id: 1,
          topics: 1,
          userId: 1,
          user: {
            _id: 1,
            uid: 1,
            displayName: 1,
            photoURL: 1
          }
        }
      },
      { $limit: 20 }
    ])
    .toArray();
  return posts as any as Post[];
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const db = await connectMongoDB();
  const post = await db.collection(postsCol).findOne({ _id: id as any });
  return post as Post | null;
};
