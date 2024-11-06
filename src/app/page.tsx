import { getLatestPosts } from "@/lib/dal/post";

export default async function Home() {
  const posts = await getLatestPosts();
  console.log(posts);
  return (
    <>
      <ul>
        {posts.map((post, idx) => {
          return <li key={idx}>{post._id}</li>;
        })}
      </ul>
    </>
  );
}
