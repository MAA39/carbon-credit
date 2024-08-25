import { Button } from "@/components/ui/button";
import { currentUser } from "@/data/auth";
import Link from "next/link";

export default async function Mypage() {
  const user = await currentUser();
  if (!user) {
    return (
      <div>
        <p>ログインしていません</p>
        <Button variant={"outline"} asChild>
          <Link href="/login">ログイン</Link>
        </Button>
      </div>
    );
  }
  return (
    <div>
      <h1>My Page</h1>
      <p>{user.email}がログインしています</p>
    </div>
  );
}
