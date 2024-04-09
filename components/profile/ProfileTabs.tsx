"use client";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tabs } from "@mantine/core";

const ProfileTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabList = [
    { id: 1, name: "Profile", value: "" },
    { id: 2, name: "Manage Skills", value: "/skills" },
    { id: 3, name: "Color Scheme", value: "/color-scheme" },
  ];
  return (
    <Tabs value={pathname} onChange={(value) => router.push(`${value}`)}>
      <Tabs.List>
        {tabList.map((item) => (
          <Tabs.Tab key={item.id} value={`/dashboard/profile${item.value}`}>
            {item.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default ProfileTabs;
