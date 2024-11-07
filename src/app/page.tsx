import { Container, Section } from "@/components/craft";
import { getLatestPosts } from "@/lib/dal/post";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <Section>
      <Container className="max-w-screen-xl mx-auto sm:px-2 lg:px-0 grid grid-cols-10">
        <ul className="!min-w-full  flex flex-col gap-4 col-span-7">
          {posts.map((post, idx) => {
            return (
              <li
                key={idx}
                className="bg-card text-card-foreground w-full font-medium border rounded-md p-4 py-6"
              >
                <Link href={`/post/${post._id}`} className="no-underline">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-2xl line-clamp-2">{post._id}</h2>
                      {post.user && (
                        <div className="flex mt-auto gap-2 items-center">
                          <Image
                            src={post.user[0].photoURL}
                            alt={post.user[0].displayName}
                            width={25}
                            height={25}
                            className="object-cover rounded-full"
                          />
                          <h4 className="text-muted-foreground">
                            {post.user[0].displayName}
                          </h4>
                        </div>
                      )}
                    </div>
                    <Image
                      src="/images/cat.webp"
                      alt="cat image"
                      width={200}
                      height={200}
                      className="object-cover ml-auto"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
