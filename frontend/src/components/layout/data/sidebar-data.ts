import type { SidebarConfig } from "@/components/types";
import { Layers, User } from "lucide-react";

export const sidebarConfig: SidebarConfig = {
  navMain: [
    {
      title: "Tech Stack",
      url: "/tech",
      icon: Layers,
    },
    {
      title: "Developer Team",
      url: "/devteam",
      icon: User,
    },
  ],
};
