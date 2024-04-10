import { IconDashboard, IconStar, IconUser } from "@tabler/icons-react";

export const navLinks = [
  {
    id: 1,
    href: "/dashboard",
    label: "Dashboard",
    leftSection: IconDashboard,
  },
  {
    id: 2,
    href: "/dashboard/people",
    label: "People",
    leftSection: IconUser,
  },
  {
    id: 3,
    href: "/dashboard/skills",
    label: "Skills",
    leftSection: IconStar,
  },
];

export const colorSchemeButtons = [
  {
    id: 1,
    name: "light",
    title: "Light",
  },
  {
    id: 2,
    name: "dark",
    title: "Dark",
  },
  {
    id: 3,
    name: "auto",
    title: "Auto",
  },
  {
    id: 4,
    name: "clear",
    title: "Clear",
  },
];
