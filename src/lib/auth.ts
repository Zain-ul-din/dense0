"use server";

import { cookies } from "next/headers";
import { getUserById, insertUser } from "./dal/user";
import { getAuthenticatedAppForUser } from "./firebase/server";
import { redirect } from "next/navigation";

export async function signInServerSide(idToken: string) {
  const { currentUser } = await getAuthenticatedAppForUser(idToken);
  if (!currentUser) {
    await removeSession();
    return {
      error: "Server Side Error: Unable to authenticate user"
    };
  }

  const potentialUser = await getUserById({ userId: currentUser.uid });

  if (potentialUser) {
    const idToken = await currentUser.getIdToken();
    setSession(idToken);
  } else {
    const {} = await insertUser({ user: currentUser.toJSON() });
  }
}

export async function signOutServerSide() {
  await removeSession();
}

async function setSession(idToken: string) {
  const $1HOUR = 1 * 60 * 60 * 1000;
  const expiresIn = 48 * $1HOUR;
  const cookiesStore = await cookies();
  cookiesStore.set("session", idToken, {
    httpOnly: true,
    maxAge: expiresIn,
    secure: true,
    name: "session",
    value: idToken
  });
}

async function removeSession() {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
  redirect("/");
}
