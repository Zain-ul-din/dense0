"use server";

import { createPost } from "../dal/post";
import { PostFormSchema } from "../definitions";
import { getAuthenticatedAppForUser } from "../firebase/server";

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

  await createPost({
    topics: data.topics.split(",").map((v) => v.trim()),
    _id: heading,
    json: data.json as any,
    userId: currentUser.uid
  });
}
