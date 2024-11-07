import { JSONContent } from "novel";

type Post = {
  json: JSONContent;
  topics: string[];
  userId: string;
  _id: string;
  heading: string;
  createdAt: string;
  updatedAt: string;
};

export default Post;
