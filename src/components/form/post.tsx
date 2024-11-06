"use client";

import { Container, Section } from "@/components/craft";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { createPostAction } from "@/lib/action/post";
import { TagInput, Tag } from "emblor";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";

export default function PostForm() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [content, setContent] = useState<JSONContent | undefined>(undefined);

  const [formState, formAction] = useActionState(createPostAction, undefined);

  return (
    <form action={formAction}>
      <Section>
        <Container className="space-y-6">
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
          <Button
            size={"lg"}
            variant={"outline"}
            className="text-xl"
            type="submit"
          >
            Publish
          </Button>
        </Container>
      </Section>
    </form>
  );
}
