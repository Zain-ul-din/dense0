"use server";

import { redirect } from "next/navigation";
import { createPost, deletePost, updatePost } from "../dal/post";
import { PostFormSchema } from "../definitions";
import { getAuthenticatedAppForUser } from "../firebase/server";
import urlSlug from "url-slug";
import { customAlphabet } from "nanoid";
import { ROUTES } from "../constants";
import { revalidatePath } from "next/cache";

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

  const { heading, imgURL, description } = extractMetaDataFrom(
    JSON.parse(data.json)
  );

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
    imgURL,
    description
  });

  revalidatePath("/");
  redirect(`${ROUTES.post}/${slug}`);
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

  const { heading, imgURL, description } = extractMetaDataFrom(
    JSON.parse(data.json)
  );

  await updatePost(
    {
      _id: data.id as string,
      json: data.json as any,
      topics: data.topics.split(",").map((v) => v.trim()),
      heading,
      imgURL,
      description
    },
    currentUser.uid
  );

  revalidatePath(`/`);
  revalidatePath(`${ROUTES.post}/${data.id}`);
  redirect(`${ROUTES.post}/${data.id}`);
}

export async function deletePostAction(state: any, formData: FormData) {
  const id = formData.get("id")?.toString();
  const { currentUser } = await getAuthenticatedAppForUser();
  console.log("id: ", id);
  if (!currentUser) return undefined;
  await deletePost(id as string, currentUser?.uid);
  revalidatePath(`${ROUTES.post}/${id}`);
  revalidatePath(`/`);
  redirect(`/`);
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

  const description = json.content
    .filter((content: any) => content.type === "paragraph")[0]
    .content.filter((v: any) => typeof v.text === "string")
    .map((v: any) => v.text)
    .join(" ")
    .trim();

  return {
    heading,
    imgURL,
    description
  };
};
