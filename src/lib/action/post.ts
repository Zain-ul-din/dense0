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

  const { heading, imgURL } = extractMetaDataFrom(JSON.parse(data.json));

  const nanoId = customAlphabet("qwertyuiopa1234567890sdfghjklzxcvbnm", 12);
  const slug = urlSlug(`${heading} ${nanoId()}`);

  await createPost({
    topics: data.topics.split(",").map((v) => v.trim()),
    _id: slug,
    json: data.json as any,
    heading: heading,
    userId: currentUser.uid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imgURL
  });

  redirect(`/post/${slug}`);
}

export async function updatePostAction(state: FormState, formData: FormData) {
  const validateFields = PostFormSchema.safeParse({
    topics: formData.get("topics"),
    json: formData.get("json"),
    id: formData.get("id")
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

  console.log(data);

  const { heading, imgURL } = extractMetaDataFrom(JSON.parse(data.json));

  console.log(heading, imgURL);
}

const extractMetaDataFrom = (json: any) => {
  const heading = json.content[0].content
    .filter((c: any) => typeof c.text === "string")
    .map((c: any) => c.text)
    .join(" ")
    .trim();

  const imgURL = json.content.filter(
    (content: any) => content.type === "image"
  )[0].attrs.src;

  return {
    heading,
    imgURL
  };
};
