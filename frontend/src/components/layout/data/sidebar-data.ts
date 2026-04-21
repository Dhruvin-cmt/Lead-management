import type { SidebarData } from "@/components/types";
import { Layers, User } from "lucide-react";

export const sideData: SidebarData = {
  navGroups: [
    {
      title: "Tech Stack",
      url: "/tech",
      icon: Layers,
    },
    {
      title: "Developer Team",
      url: "devteam",
      icon: User,
    },
  ],
};
