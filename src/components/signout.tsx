"use client";

import { signOutServerSide } from "@/lib/auth";
import { firebase } from "@/lib/firebase";
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
    Promise.all([signOut(firebase.auth), signOutServerSide()]).finally(() => {
      setLoading(false);
    });
  };

  return <>{children(signOutFunc, [user, loadingUser || loading, error])}</>;
};

export default SignOut;
