import type { AutoLinkOptions, NavGroup } from '@theme-zp-src/shared'
import type { SidebarGroupOptions, SidebarLinkOptions } from '@theme-zp-src/shared/sidebar'


export type NavbarItem = AutoLinkOptions | NavGroup<NavbarItem>

export type SidebarLinkItem = SidebarLinkOptions

export interface SidebarHeaderItem {
  text: string
  link: string
  children?: SidebarHeaderItem[]
}

export interface SidebarGroupItem extends SidebarGroupOptions {
  prefix?: string
  children: (SidebarHeaderItem | SidebarItem)[]
}

export type SidebarItem = SidebarGroupItem | SidebarLinkItem
