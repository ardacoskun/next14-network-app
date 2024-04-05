"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { AppShell, Avatar, Burger, Menu, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDoorExit,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import { navLinks } from "@/data";

const AppShellContainer = ({ children }: { children: ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <div className="flex justify-between h-full">
          <div className="flex h-full items-center gap-5 p-5">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            Professional Network
          </div>
          <div className="flex justify-end gap-5 h-full items-center p-5">
            <div>Search</div>
            <div>
              <Menu>
                <Menu.Target>
                  <Avatar>
                    <IconUserCircle />
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Menu</Menu.Label>
                  <Menu.Item leftSection={<IconSettings />}>
                    <Link href="/dashboard/profile">Edit Profile</Link>
                  </Menu.Item>
                  <Menu.Item leftSection={<IconDoorExit />}>
                    <button onClick={() => signOut()}>Sign out</button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Navbar>
        {navLinks.map((item) => {
          const IconComponent = item.leftSection;
          return (
            <NavLink
              key={item.id}
              component={Link}
              href={item.href}
              label={item.label}
              leftSection={<IconComponent />}
              active={pathname === item.href}
            />
          );
        })}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppShellContainer;
