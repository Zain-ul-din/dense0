import { TextureButton } from "@/components/ui/texture-button";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import Balancer from "react-wrap-balancer";

export default function Home() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-screen h-screen overflow-hidden",
        "bg-gradient-to-tl from-background via-zinc-600/10 to-background"
      )}
    >
      <nav className="my-12 !animate-d0-fade-in">
        <Link href={ROUTES.blogs}>
          <TextureButton
            variant="primary"
            className="font-medium text-xl group"
          >
            JOIN DENSE0
            <ArrowRight className="w-4 h-4 animate-out group-hover:translate-x-1 transition-all" />
          </TextureButton>
        </Link>
      </nav>
      <div className="hidden w-screen h-px !animate-d0-glow md:block !animate-d0-fade-left bg-gradient-to-r from-zinc-300/0 via-muted/50 dark:via-zinc-300/50 to-zinc-300/0" />

      {/* <Particles
        className="absolute inset-0 -z-10 !animate-d0-fade-in"
        quantity={100}
      /> */}
      <h1 className="z-10 text-transparent duration-1000 bg-foreground dark:bg-white cursor-default text-edge-outline !animate-d0-title font-display text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        DENSE0
      </h1>

      <div className="hidden w-screen h-px !animate-d0-glow md:block !animate-d0-fade-right bg-gradient-to-r from-zinc-300/0 via-muted/50 dark:via-zinc-300/50 to-zinc-300/0" />

      <div className="my-12 text-center !animate-d0-fade-in">
        <h2 className="text-sm md:text-lg max-w-screen-lg text-muted-foreground">
          <Balancer>
            Dense0 is an open-source blogging platform that empowers writers and
            developers to create, share, and manage content seamlessly.
          </Balancer>
        </h2>
      </div>

      <div className="rounded-full fixed bottom-6 right-6 md:right-8 md:bottom-8">
        <Link href={`https://github.com/Zain-ul-din/dense0`}>
          <FaGithub className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
}
