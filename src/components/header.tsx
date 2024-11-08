"use client";

import Link from "next/link";
import { ThemeToggle } from "./misc/theme-toggle";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import SignOut from "./signout";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase } from "@/lib/firebase";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

export default function Header() {
  const [user] = useAuthState(firebase.auth);

  return (
    <header className="px-4 py-4 border-b">
      <div className="max-w-screen-xl flex items-center mx-auto">
        <Link href={ROUTES.home}>
          <h2 className="font-mono text-2xl font-bold">DENSE0</h2>
        </Link>
        <nav className="flex-1 flex justify-end gap-2">
          <Link href={ROUTES.new_post}>
            <Button variant={"outline"}>
              <Pencil className="icon" />
              Write
            </Button>
          </Link>
          <ThemeToggle />
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={`${user?.photoURL}`}
                  alt={user.displayName || ""}
                  width={35}
                  height={35}
                  className="object-fill min-w-[35px] min-h-[35px] rounded-[50%] border"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem disabled>Profile</DropdownMenuItem>

                <SignOut>
                  {(signOut) => (
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-400"
                      onClick={signOut}
                    >
                      Sign out
                    </DropdownMenuItem>
                  )}
                </SignOut>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
}
