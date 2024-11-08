"use client";
import { Container, Main, Section } from "@/components/craft";
import SignIn from "@/components/signin";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function JoinPage() {
  return (
    <Main className="h-[100svh] flex flex-col justify-center">
      <Section className="my-auto">
        <Container className="text-center max-w-3xl border bg-card rounded-lg">
          <h1>Join Dense0</h1>
          <p>An Open Source blogging site.</p>
          <div className="mt-6 sm:mt-8 space-y-4">
            <SignIn provider="github">
              {(login, [user, loading]) => {
                return (
                  <Button
                    onClick={login}
                    disabled={!!(loading || user)}
                    size={"lg"}
                    variant={"outline"}
                  >
                    <FaGithub />
                    {user
                      ? `Sign in as ${user.displayName}`
                      : "Sign in With Github"}
                  </Button>
                );
              }}
            </SignIn>
            <p className="text-sm">OR</p>
            <SignIn provider="google">
              {(login, [user, loading]) => {
                return (
                  <Button
                    onClick={login}
                    disabled={!!(loading || user)}
                    size={"lg"}
                    variant={"outline"}
                  >
                    <FaGoogle />
                    {user
                      ? `SignIn as ${user.displayName}`
                      : "Sign in With Google"}
                  </Button>
                );
              }}
            </SignIn>
          </div>
        </Container>
      </Section>
    </Main>
  );
}
