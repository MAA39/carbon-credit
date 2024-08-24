import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Sidebar } from "./sidebar";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="border-b">
      <div className="px-4 h-16 flex items-center flex-1  gap-4">
        <Sidebar />
        <span className="flex-1"></span>
        <Button className="font-bold text-lg" asChild variant={"ghost"}>
          <Link href="/">carbon-credit</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href="/login">ログイン</Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
