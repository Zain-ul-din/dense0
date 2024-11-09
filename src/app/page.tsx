import { Container, Section } from "@/components/craft";
import Posts from "@/components/posts";
import { Button } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/dal/post";
import { unstable_cache } from "next/cache";

export const revalidate = 60;

const getPostsFromCache = unstable_cache(
  async () => {
    const posts = await getLatestPosts();
    return posts;
  },
  [],
  { revalidate: 3600 }
);

export default async function Home() {
  const posts = await getPostsFromCache();

  return (
    <Section>
      <Container className="max-w-screen-xl mx-auto gap-4 sm:px-2 lg:px-0 grid grid-cols-10">
        {/* left side */}
        <main className="col-span-7">
          <Posts posts={posts} />
        </main>
        {/* right side */}

        <aside className="col-span-3 flex">
          <div className="flex flex-col ml-auto">
            <div className="bg-card text-card-foreground p-4 border rounded-xl space-y-4">
              <h4>Denese0 is a open-source blogging platform.</h4>
              <p className="font-bold">Upcoming features:</p>
              <ul className="ml-4">
                {["Profile Details", "Reactions"].map((v, i) => {
                  return (
                    <li key={i} className="list-disc">
                      {v}
                    </li>
                  );
                })}
              </ul>
              <Button>Request New Feature</Button>
            </div>
          </div>
        </aside>
      </Container>
    </Section>
  );
}
