"use server";

import { redirect } from "next/navigation";
import { createPost } from "../dal/post";
import { PostFormSchema } from "../definitions";
import { getAuthenticatedAppForUser } from "../firebase/server";
import urlSlug from "url-slug";
import { customAlphabet } from "nanoid";

type FormState =
  | {
      errors: {
        topics?: string[] | undefined;
        json?: string[] | undefined;
      };
    }
  | undefined;

export async function createPostAction(state: FormState, formData: FormData) {
  const validateFields = PostFormSchema.safeParse({
    topics: formData.get("topics"),
    json: formData.get("json")
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors
    };
  }

  const { currentUser } = await getAuthenticatedAppForUser();
  const { data } = validateFields;

  if (!currentUser) {
    return undefined;
  }

  const heading = JSON.parse(data.json)
    .content[0].content.filter((c: any) => typeof c.text === "string")
    .map((c: any) => c.text)
    .join(" ")
    .trim();

  const nanoId = customAlphabet("qwertyuiopa1234567890sdfghjklzxcvbnm", 12);
  const slug = urlSlug(`${heading} ${nanoId()}`);

  await createPost({
    topics: data.topics.split(",").map((v) => v.trim()),
    _id: slug,
    json: data.json as any,
    heading: heading,
    userId: currentUser.uid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  redirect(`/post/${slug}`);
}
