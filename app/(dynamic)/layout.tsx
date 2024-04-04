import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import SessionProvider from "@/providers/SessionProvider";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <SessionProvider session={session}>
      <div>{children}</div>
    </SessionProvider>
  );
}
