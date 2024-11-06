import { getPostById } from "@/lib/dal/post";
import { notFound } from "next/navigation";
import { generateHTML } from "@tiptap/html";

import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Container, Section } from "@/components/craft";

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
    <Section>
      <Container>
        <div
          className="prose dark:prose-invert max-w-screen-lg mx-auto"
          dangerouslySetInnerHTML={{
            __html: generateHTML(JSON.parse(post.json as any as string), [
              Bold,
              BulletList,
              Document,
              Heading,
              Link,
              Paragraph,
              ListItem,
              Text
            ])
          }}
        />
      </Container>
    </Section>
  );
}
