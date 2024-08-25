import { signInWithAnonymously, signOut } from "@/actions/auth";
import { currentUser } from "@/data/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (user) {
    redirect("/mypage");
  }

  return (
    <div className="container p-4 flex flex-col gap-5">
      <p>ログイン画面</p>

      <div>
        {user ? (
          <div className="container flex-col flex gap-3 ">
            <div>ログイン中</div>
            <div className=" ">{JSON.stringify(user)}</div>
            <div className="border-t">ログアウトしますか？</div>
            <form action={signOut}>
              <button>ログアウト</button>
            </form>
          </div>
        ) : (
          <div className="container flex flex-col gap-3">
            <form action={signInWithAnonymously}>
              <button>匿名認証でログイン</button>
            </form>

            {/* <div className="flex flex-col container gap-3">
            <form action={signInWithGithub}>
              <Button asChild>
                <Link href="/login/github-page ">GitHubでログイン</Link>
              </Button>
            </form>
            <form action={signInWithAnonymously}>
              <Button asChild>
                <Link href="/login/anonymus-page">匿名認証でログイン</Link>
              </Button>
            </form> */}
          </div>
        )}
      </div>
    </div>
  );
}
