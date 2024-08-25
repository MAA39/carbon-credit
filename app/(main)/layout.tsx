import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1">
      {/* <Link>を使ってサイドバーにdashboardとrecipiesを追加 button形式で aschild , ghost variant */}
      <div className="flex flex-col w-60 py-4 gap-4 border-r items-start justify-start">
        <Button asChild variant="ghost">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/recipies">Recipies</Link>
        </Button>
      </div>
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <Suspense
          fallback={
            <Button size="icon" variant="outline">
              <Loader className="animate-spin" />
            </Button>
          }>
          <Header />
        </Suspense>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
