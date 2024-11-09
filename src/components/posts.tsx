import Post from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <ul className="!min-w-full flex flex-col gap-4">
      {posts.length === 0 && (
        <h2 className="text-center text-xl">No Post Available</h2>
      )}
      {posts.map((post, idx) => (
        <PostCard post={post} key={idx} />
      ))}
    </ul>
  );
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <li className="bg-card text-card-foreground w-full font-medium border rounded-xl p-4">
      <Link href={`/post/${post._id}`} className="no-underline">
        <div className="flex gap-4 md:flex-row flex-col-reverse">
          <div className="flex flex-col gap-4 py-2">
            <div className="space-y-2">
              <h2 className="text-2xl line-clamp-2">{post.heading}</h2>
              <p className="text-muted-foreground line-clamp-3">
                {post.description || ""}
              </p>
            </div>
            {post.user && (
              <div className="flex mt-auto gap-2 items-center">
                <Image
                  src={post.user[0].photoURL}
                  alt={post.user[0].displayName}
                  width={25}
                  height={25}
                  className="object-cover rounded-full"
                  quality={100}
                />
                <h4 className="text-muted-foreground">
                  {post.user[0].displayName}
                </h4>
              </div>
            )}
          </div>
          <Image
            src={post.imgURL}
            alt="cat image"
            width={150}
            height={150}
            className="object-cover ml-auto min-w-full min-h-full rounded-md md:min-w-[150px] md:min-h-[150px] md:max-w-[150px] md:max-h-[150px]"
          />
        </div>
      </Link>
    </li>
  );
};
