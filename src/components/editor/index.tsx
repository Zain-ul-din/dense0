"use client";
import "./prosemirror.css";
import { defaultExtensions } from "./extensions";
import { EditorContent, EditorRoot } from "novel";

const Editor = () => {
  return (
    <EditorRoot>
      <EditorContent
        className="bg-white prose w-screen"
        immediatelyRender={false}
        extensions={defaultExtensions}
        editorProps={{
          handleDOMEvents: {
            // keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`
          }
        }}
      ></EditorContent>
    </EditorRoot>
  );
};

export default Editor;
