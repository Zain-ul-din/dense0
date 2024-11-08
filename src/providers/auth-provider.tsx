"use client";
import { signInServerSide } from "@/lib/auth";
import { firebase } from "@/lib/firebase";
import { ReactNode, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useAuthState(firebase.auth);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const tokenId = await user?.getIdToken();
      await signInServerSide(tokenId);
    })();
  }, [user]);

  return <>{children}</>;
}
