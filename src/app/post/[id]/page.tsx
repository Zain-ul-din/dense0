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
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import { cn } from "@/lib/utils";

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

  const json = JSON.parse(post.json as any as string);

  const headingContent = {
    ...json,
    content: [json.content[0]]
  };

  const remainingContent = {
    ...json,
    content: json.content.slice(1)
  };

  return (
    <Section>
      <Container>
        <article
          className={cn(
            "prose md:prose-lg prose-img:w-full prose-img:object-cover",
            "prose-img:object-bottom prose-img:rounded-sm dark:prose-pre:bg-transparent",
            "dark:prose-pre:border dark:prose-invert prose-headings:font-title font-default",
            "focus:outline-none max-w-[950px] mx-auto"
          )}
        >
          <Content>{headingContent}</Content>
          <Content>{remainingContent}</Content>
        </article>
      </Container>
    </Section>
  );
}

const Content = ({ children }: { children: any }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateHTML(children, [
          Bold,
          BulletList,
          Document,
          Heading,
          Link,
          Paragraph,
          ListItem,
          Text,
          StarterKit,
          TiptapImage
        ])
      }}
    />
  );
};
