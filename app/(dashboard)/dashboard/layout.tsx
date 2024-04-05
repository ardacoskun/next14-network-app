import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/providers/SessionProvider";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
