"use client";

import { defaultExtensions } from "@/components/editor/extensions";
import { EditorContent, EditorRoot } from "novel";

const Page = () => (
  <>
    <h1>Hello World</h1>
    <EditorRoot>
      <EditorContent
        className="bg-white prose"
        immediatelyRender={false}
        extensions={defaultExtensions}
      ></EditorContent>
    </EditorRoot>
  </>
);

export default Page;
