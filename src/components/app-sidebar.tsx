"use client";

import * as React from "react";

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Folder,
  LucideFileImage,
  Clapperboard,
  PieChart,
  Settings,
} from "lucide-react";

import { SearchForm } from "./search-form-private";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../components/ui/sidebar";
import { AnimatedThemeToggler } from "./animated-theme-toggler";
import { api } from "../../convex/_generated/api";

const data = {
  navMain: [
    {
      title: "Navigation",
      url: "/dashboard",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Documents",
          url: "/dashboard/documents",
          icon: Folder,
        },
        {
          title: "Images",
          url: "/dashboard/images",
          icon: LucideFileImage,
        },
        {
          title: "Media",
          url: "/dashboard/media",
          icon: Clapperboard,
        },
        {
          title: "Others",
          url: "/dashboard/others",
          icon: PieChart,
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useQuery(api.users.current);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-start justify-center">
        <Link href="/dashboard">
          <Image
            className="m-2 mb-2 block dark:hidden"
            src="/logo_light_mode.svg"
            alt="logo_light_mode.svg"
            height={175}
            width={175}
          />
        </Link>
        <Link href="/dashboard">
          <Image
            className="m-2 mb-2 hidden dark:block"
            src="/logo_dark_mode.svg"
            alt="logo_dark_mode.svg"
            height={165}
            width={165}
          />
        </Link>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}

        {data.navMain.map((item) => (
          <SidebarGroup key={item?.title}>
            <SidebarGroupLabel className="font-extrabold text-[14px] my-2">
              {item?.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-3">
                {item?.items.map((menuItem, index) => (
                  <SidebarMenuItem key={menuItem?.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={menuItem?.url}
                        className={`
                  flex items-center gap-4 px-6 py-4.5 rounded-full transition-all w-full
                  ${
                    index === 0
                      ? "bg-[#FF6B7A] hover:bg-[#cc5561] text-white shadow-lg "
                      : "text-gray-400 hover:bg-gray-100"
                  }
                `}
                      >
                        <menuItem.icon className="size-6" />
                        <span className="font-semibold text-base">
                          {menuItem?.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
      <div className="flex items-center justify-between gap-4 p-2">
        {/* User Profile Section */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex-1 min-w-0">
          <div className="shrink-0 pt-2">
            <UserButton />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
              {(currentUser?.firstName == undefined && (
                <span className="text-md dark:text-gray-400 truncate">
                  Fetching Name
                </span>
              )) ||
                currentUser?.firstName}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {(currentUser?.email == undefined && (
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  Fetching Email
                </span>
              )) ||
                currentUser?.email}
            </span>
          </div>
        </div>

        {/* Theme Toggle Section */}
        <div className="shrink-0">
          <AnimatedThemeToggler className="hover:border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200 cursor-pointer p-2" />
        </div>
      </div>
    </Sidebar>
  );
}
