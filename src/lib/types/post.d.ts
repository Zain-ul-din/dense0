import { JSONContent } from "novel";

type Post = {
  json: JSONContent;
  topics: string[];
  userId: string;
  _id: string;
  heading: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    _id: string;
    uid: string;
    displayName: string;
    photoURL: string;
  }[];
};

export default Post;
