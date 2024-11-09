import { connectMongoDB } from "../db";
import Post from "../types/post";

const postsCol = "posts";

export const createPost = async (post: Post) => {
  const db = await connectMongoDB();
  await db.collection(postsCol).insertOne({ ...post, _id: post._id as any });
};

export const updatePost = async (
  post: Pick<Post, "_id" | "json" | "topics" | "imgURL" | "heading">,
  userId: string
) => {
  const db = await connectMongoDB();
  await db.collection(postsCol).updateOne(
    { _id: post._id as any, userId },
    {
      $set: {
        ...post
      }
    }
  );
};

export const deletePost = async (id: string, userId: string) => {
  const db = await connectMongoDB();
  await db.collection(postsCol).updateOne(
    { _id: id as any, userId },
    {
      $set: {
        deleted: true
      }
    }
  );
};

export const getLatestPosts = async () => {
  const db = await connectMongoDB();
  const posts = await db
    .collection(postsCol)
    .aggregate([
      {
        $match: {
          deleted: { $ne: true }
        }
      },
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
          heading: 1,
          imgURL: 1,
          user: {
            _id: 1,
            uid: 1,
            displayName: 1,
            photoURL: 1
          }
        }
      },
      {
        $sort: {
          updatedAt: -1
        }
      },
      { $limit: 20 }
    ])
    .toArray();
  return posts as any as Post[];
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const db = await connectMongoDB();
  const post = await db
    .collection(postsCol)
    .aggregate([
      {
        $match: { _id: id as any } // Match the post by ID
      },
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
          post: "$$ROOT",
          user: {
            _id: 1,
            uid: 1,
            displayName: 1,
            photoURL: 1
          }
        }
      }
    ])
    .toArray();

  // Since we expect only one post, return the first (or null if none found)
  return post.length > 0
    ? ({ ...post[0].post, user: post[0].user } as Post).deleted
      ? null
      : ({ ...post[0].post, user: post[0].user } as Post)
    : null;
};
