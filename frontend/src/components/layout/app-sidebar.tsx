import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
// import type { SidebarData } from "../types";
import { Link } from "react-router-dom";
import { sideData } from "./data/sidebar-data";
import { Command } from "lucide-react";

export function AppSidebar() {
  return (
    <>
    {/* Header */}
      <Sidebar>
        <SidebarHeader>
          <SidebarMenuButton>
            <Link to="/" className="flex items-start">
              <Command className="size-4" />
              <span className="font-semibold text-xl">Lead-Management</span>
            </Link>
          </SidebarMenuButton>
        </SidebarHeader>

      {/* content  */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {sideData.navGroups.map((item) => {
                const key = `${item.title} - ${item.url}`;

                return (
                  <SidebarMenuButton key={key}>
                    <Link
                      to={item.url}
                      className="flex flex-column w-75 align-items-center"
                    >
                      <item.icon className="flex items-center justify-center" />
                      <span className="pl-3 text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>@2k26</SidebarFooter>
      </Sidebar>
    </>
  );
}
