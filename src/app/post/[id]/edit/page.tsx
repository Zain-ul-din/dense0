import PostForm from "@/components/form/post";
import { ROUTES } from "@/lib/constants";
import { getPostById } from "@/lib/dal/post";
import { getAuthenticatedAppForUser } from "@/lib/firebase/server";
import { notFound, redirect } from "next/navigation";

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

  const { currentUser } = await getAuthenticatedAppForUser();

  if (currentUser?.uid !== post.userId) {
    return redirect(`${ROUTES.post}/${post._id}`);
  }

  return (
    <>
      <PostForm post={{ ...post, json: JSON.parse(post.json as any) }} />
    </>
  );
}
