"use client";

import { firebase } from "@/lib/firebase";
import { serverSideSignOut } from "@/lib/firebase/server";
import { signOut } from "firebase/auth";
import { ReactNode, useState } from "react";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";

interface SignOutProps {
  children: (signOut: () => void, state: AuthStateHook) => ReactNode;
}

const SignOut = ({ children }: SignOutProps) => {
  const [user, loadingUser, error] = useAuthState(firebase.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const signOutFunc = async () => {
    setLoading(true);
    await signOut(firebase.auth);
    await serverSideSignOut();
    setLoading(false);
  };

  return <>{children(signOutFunc, [user, loadingUser || loading, error])}</>;
};

export default SignOut;
