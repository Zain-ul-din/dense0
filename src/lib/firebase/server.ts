"use server";
import "server-only";

import { initializeServerApp } from "firebase/app";
import { cookies } from "next/headers";
import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";

async function initAuthenticatedAppForUser(idToken?: string) {
  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken
        }
      : {}
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}

export async function getAuthenticatedAppForUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session");
  const idToken = token?.value;
  return initAuthenticatedAppForUser(idToken);
}

export async function serverSideSignIn(idToken: string) {
  const $1HOUR = 1 * 60 * 60 * 1000;
  const expiresIn = 48 * $1HOUR;
  const { currentUser } = await initAuthenticatedAppForUser(idToken);
  if (currentUser) {
    const cookiesStore = await cookies();
    cookiesStore.set("session", idToken, {
      httpOnly: true,
      maxAge: expiresIn,
      secure: true,
      name: "session",
      value: idToken
    });
    // redirect("/");
  } else {
    serverSideSignOut();
  }
}

export async function serverSideSignOut() {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
  redirect("/");
}
