import { z } from "zod";

export const PostFormSchema = z.object({
  topics: z
    .string()
    .refine((v) => v.split(",").filter((v) => v.trim().length > 0).length > 0, {
      message: "Choose at least one tag."
    }),
  json: z
    .string()
    .refine(
      (v) => {
        try {
          JSON.parse(v);
          return true;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          return false;
        }
      },
      { message: "Content is not valid." }
    )
    .refine(
      (v) => {
        try {
          const json = JSON.parse(v);
          return (
            json.content[0].type === "heading" &&
            json.content[0].attrs.level === 1 &&
            json.content[0].content
              .filter((c: any) => typeof c.text === "string")
              .map((c: any) => c.text)
              .join(" ")
              .trim().length > 0
          );
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          return false;
        }
      },
      { message: "Post title is missing." }
    )
    .refine(
      (v) => {
        try {
          const json = JSON.parse(v);
          return (
            json.content.some((content: any) => content.type === "image") &&
            typeof json.content.filter(
              (content: any) => content.type === "image"
            )[0].attrs.src === "string"
          );
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          return false;
        }
      },
      { message: "Image is missing." }
    )
});
