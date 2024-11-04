"use client";
import { TagInput, Tag } from "emblor";
import { useState } from "react";

export default function TestPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  return (
    <>
      <TagInput
        placeholder="Enter a topic"
        tags={tags}
        className="p-8 not-prose"
        styleClasses={
          {
            // tag: {
            // body: "ml-2"
            // }
          }
        }
        setTags={(newTags) => {
          setTags(newTags);
          // setValue('topics', newTags as [Tag, ...Tag[]]);
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        // autocompleteOptions={[]}
        // enableAutocomplete
      />
    </>
  );
}
