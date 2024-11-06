"use server";
import "server-only";
import { initializeServerApp } from "firebase/app";
import { cookies } from "next/headers";
import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";
import { cache } from "react";

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

export const getAuthenticatedAppForUser = cache(async (idToken?: string) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session");
  const _idToken = idToken ?? token?.value;
  return initAuthenticatedAppForUser(_idToken);
});
