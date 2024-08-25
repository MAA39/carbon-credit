import { signOut } from "@/actions/auth";
import { currentUser } from "@/data/auth";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default async function Header() {
  const user = await currentUser();
  console.log("user", user);

  return (
    <header className="border-b">
      <div className="px-4 h-16 flex items-center flex-1 gap-4">
        <span className="flex-1"></span>
        <Button className="font-bold text-lg" asChild variant={"ghost"}>
          <Link href="/">carbon-credit</Link>
        </Button>
        {user ? (
          // ログアウト処理
          <form action={signOut}>
            <Button size={"sm"} variant={"outline"}>
              ログアウト
            </Button>
          </form>
        ) : (
          <Button variant={"outline"} asChild>
            <Link href="/login">ログイン</Link>
          </Button>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
