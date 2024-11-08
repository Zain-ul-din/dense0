import PostForm from "@/components/form/post";
import { getPostById } from "@/lib/dal/post";
import { notFound } from "next/navigation";

export default async function EditPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(decodeURIComponent(id));

  if (!post) {
    return notFound();
  }

  return (
    <>
      <PostForm post={{ ...post, json: JSON.parse(post.json as any) }} />
    </>
  );
}
