import { getPostById } from "@/lib/dal/post";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(decodeURIComponent(id));

  if (!post) {
    notFound();
  }

  return (
    <>
      <h1 className="text-7xl">{post._id}</h1>
    </>
  );
}
