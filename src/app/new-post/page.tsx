"use client";

import { Container, Section } from "@/components/craft";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { TagInput, Tag } from "emblor";
import { useState } from "react";

const Page = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <>
      <main>
        <Section>
          <Container className="space-y-6">
            <Editor />
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

            <Button size={"lg"} variant={"outline"} className="text-xl">
              Publish
            </Button>
          </Container>
        </Section>
      </main>
    </>
  );
};
export default Page;
