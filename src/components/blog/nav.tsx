"use client";
import { firebase } from "@/lib/firebase";
import Post from "@/lib/types/post";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { useRef } from "react";
import AreYouSure from "../shared/are-you-sure";
import { useFormState } from "react-dom";
import { deletePostAction } from "@/lib/action/post";

export default function BlogNavigation({ post }: { post: Post }) {
  const [user] = useAuthState(firebase.auth);

  return (
    <>
      {post.user && (
        <nav className="border-b !not-prose not-prose py-4">
          <div className="flex gap-4 items-center">
            <Image
              src={`${post.user[0].photoURL}`}
              alt={post.user[0].displayName}
              width={35}
              height={35}
              className="rounded-full"
            />
            <div className="-space-y-1">
              <h3 className="font-medium">{post.user[0].displayName}</h3>
              <div className="text-xs text-muted-foreground">
                {new Date(post.updatedAt).toDateString()}
              </div>
            </div>

            {user && user.uid === post.user[0]._id && (
              <div className="ml-auto flex ">
                <Link href={`${ROUTES.post}/${post._id}/edit`}>
                  <Button variant={"ghost"}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>

                <DeletePostForm id={post._id} />
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

const DeletePostForm = ({ id }: { id: string }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [, submitForm] = useFormState(deletePostAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={submitForm}>
      <input name="id" value={id} hidden readOnly />
      <AreYouSure
        ref={btnRef}
        onClick={() => {
          formRef.current?.requestSubmit();
        }}
      />
      <Button
        variant={"ghost"}
        className={"text-red-500 hover:text-red-500"}
        onClick={() => btnRef.current?.click()}
        type="button"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </form>
  );
};
