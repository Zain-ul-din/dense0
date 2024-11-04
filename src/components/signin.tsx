"use client";
import { firebase } from "@/lib/firebase";
import { serverSideSignIn } from "@/lib/firebase/server";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";

const providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider()
};

interface SignInProps {
  provider: keyof typeof providers;
  children: (login: () => void, state: AuthStateHook) => ReactNode;
  onLogin?: (user: User) => void;
}

const SignIn = ({ children, provider, onLogin }: SignInProps) => {
  const [user, loadingUser, error] = useAuthState(firebase.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = () => {
    signInWithPopup(firebase.auth, providers[provider]);
  };

  useEffect(() => {
    if (!user) return;

    // prevent multiple calls to server
    if (user.providerData[0].providerId !== providers[provider].providerId)
      return;

    (async () => {
      setLoading(true);
      const tokenId = await user?.getIdToken();
      await serverSideSignIn(tokenId);
      if (onLogin) onLogin(user);
      setLoading(false);
    })();
  }, [user, onLogin, provider]);

  return <>{children(signIn, [user, loadingUser || loading, error])}</>;
};

export default SignIn;