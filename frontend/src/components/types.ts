import type { LucideIcon } from "lucide-react"
import type { LinkProps } from "react-router-dom"

export interface NavItem {
  title: string
  url: LinkProps["to"]
  icon?: LucideIcon
  items?: NavItem[]
}

export interface SidebarConfig {
  navMain: NavItem[]
}