import { ReactNode } from "react";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <ProfileTabs />
      <div>{children}</div>
    </div>
  );
}
