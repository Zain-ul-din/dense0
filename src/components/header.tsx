import Link from "next/link";
import { ThemeToggle } from "./misc/theme-toggle";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function Header() {
  return (
    <header className="px-4 py-6 border-b">
      <div className="max-w-screen-xl flex items-center mx-auto">
        <Link href={ROUTES.home}>
          <h2 className="font-mono text-2xl">DENSE0</h2>
        </Link>
        <nav className="flex-1 flex justify-end gap-2">
          <Link href={ROUTES.new_post}>
            <Button variant={"outline"}>
              <Pencil className="icon" />
              Write
            </Button>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
