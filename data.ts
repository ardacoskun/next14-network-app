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
