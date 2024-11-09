"use client";

import { Container, Section } from "@/components/craft";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { createPostAction, updatePostAction } from "@/lib/action/post";
import Post from "@/lib/types/post";
import { TagInput, Tag } from "emblor";
import { JSONContent } from "novel";
import { useActionState, useEffect, useState } from "react";

export default function PostForm({ post }: { post?: Post }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [content, setContent] = useState<JSONContent | undefined>(
    post ? post.json : undefined
  );

  const [formState, formAction, loading] = useActionState(
    post ? updatePostAction : createPostAction,
    undefined
  );

  useEffect(() => {
    if (!post) return;
    const tags = post.topics.map((text, id) => ({ id: id + "", text: text }));
    setTags(tags);
    setContent(post.json);
  }, [post]);

  return (
    <form action={formAction}>
      <Section className="p-2">
        <Container className="space-y-6 bg-card rounded-xl border">
          <h1 className="text-xl font-medium">
            {post ? "Edit Your Post" : "Create New Post"}
          </h1>

          {post && <input name="id" value={post._id} hidden readOnly />}

          {/* form inputs */}
          <input
            name="topics"
            value={tags.map((t) => t.text).join(",")}
            hidden
            readOnly
          />

          <input
            name="json"
            value={`${JSON.stringify(content)}`}
            hidden
            readOnly
          />

          <Editor content={content} setContent={setContent} />

          <TagInput
            placeholder="Enter a topic"
            tags={tags}
            styleClasses={{
              // input: "p-4 rounded-xl",
              tag: {
                body: "p-2"
              }
            }}
            setTags={(newTags) => {
              setTags(newTags);
              // setValue('topics', newTags as [Tag, ...Tag[]]);
            }}
            inlineTags
            activeTagIndex={activeTagIndex}
            setActiveTagIndex={setActiveTagIndex}
            // autocompleteOptions={[]}
            // enableAutocomplete
          />

          <div className="text-red-500">
            <ul>
              {formState?.errors &&
                formState.errors.json?.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <ul>
              {formState?.errors &&
                formState.errors.topics?.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
            </ul>
          </div>
          <div className="flex">
            <Button
              size={"lg"}
              variant={"outline"}
              className="text-xl ml-auto"
              type="submit"
              loading={loading}
            >
              Publish
            </Button>
          </div>
        </Container>
      </Section>
    </form>
  );
}
