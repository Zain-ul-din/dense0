import { getLatestPosts } from "@/lib/dal/post";
import Link from "next/link";

export default async function Home() {
  const posts = await getLatestPosts();
  return (
    <>
      <ul>
        {posts.map((post, idx) => {
          return (
            <li key={idx}>
              <Link href={`/post/${post._id}`}>{post._id}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
