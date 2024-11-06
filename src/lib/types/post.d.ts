import { JSONContent } from "novel";

type Post = {
  json: JSONContent;
  topics: string[];
  userId: string;
  _id: string;
};

export default Post;
