import { ThemeToggle } from "./misc/theme-toggle";

export default function Header() {
  return (
    <header className="px-4 py-6 border-b">
      <div className="max-w-screen-xl flex items-center mx-auto">
        <h2 className="font-mono text-2xl">DENSE0</h2>
        <nav className="flex-1 flex justify-end">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
