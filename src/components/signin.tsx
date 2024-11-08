"use client";
import { signInServerSide } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { firebase } from "@/lib/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
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

const SignIn = ({ children, provider }: SignInProps) => {
  const [user, loadingUser, error] = useAuthState(firebase.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const signIn = () => {
    signInWithPopup(firebase.auth, providers[provider]).then(
      async ({ user }) => {
        // TODO: fix multiple calls
        setLoading(true);
        const tokenId = await user?.getIdToken();
        await signInServerSide(tokenId);
        setLoading(false);
        router.push(ROUTES.new_post);
      }
    );
  };

  return <>{children(signIn, [user, loadingUser || loading, error])}</>;
};

export default SignIn;
