"use client";
import SignIn from "@/components/signin";
import SignOut from "@/components/signout";

export default function JoinPage() {
  return (
    <>
      Join <br></br>
      <SignIn provider="github">
        {(login, [user, loading]) => {
          return (
            <button onClick={login} disabled={!!(loading || user)}>
              {user ? `SignIn as ${user.displayName}` : "SignIn With Github"}
            </button>
          );
        }}
      </SignIn>
      <br></br>
      <SignIn provider="google">
        {(login, [user, loading]) => {
          return (
            <button onClick={login} disabled={!!(loading || user)}>
              {user ? `SignIn as ${user.displayName}` : "SignIn With Google"}
            </button>
          );
        }}
      </SignIn>
      <br></br>
      <SignOut>
        {(signOut) => <button onClick={signOut}>SignOut</button>}
      </SignOut>
    </>
  );
}
