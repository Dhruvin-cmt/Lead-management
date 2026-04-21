import type { LinkProps } from "react-router-dom"

type General = {
    title : string,
    url : LinkProps['to'] | (string & {}),
    icon? : React.ElementType
}

type SidebarData = {
    navGroups : General[]
}

export type {SidebarData, General}