"use client";

import * as React from "react";

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
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { Spinner } from "./ui/spinner";
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [
        {
          title: "Public files",
          url: "#",
        },
        {
          title: "Private files",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useQuery(api.users.current);
  const recentFiveFiles = useQuery(api.files.getRecentFilesForUser, {
    userId: currentUser?._id,
  });

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
        <SidebarGroup>
          <SidebarGroupLabel>Recent files</SidebarGroupLabel>

          {recentFiveFiles === undefined ? (
            <div className="ml-4 mt-2 mb-1 text-sm text-gray-500 flex items-center">
              <Spinner className="mr-2" />
              Loading recent files...
            </div>
          ) : recentFiveFiles.length === 0 ? (
            <div className="ml-4 mt-2 mb-1 text-sm text-gray-500">
              No files found{"  :("}
            </div>
          ) : (
            recentFiveFiles.map((item) => (
              <SidebarGroupContent key={item._id} className="ml-2">
                <SidebarMenu>
                  <SidebarMenuItem key={item?.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={"/dashboard/files/" + item._id || "Loading..."}
                      >
                        {item?.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            ))
          )}
        </SidebarGroup>
        {data.navMain.map((item) => (
          <SidebarGroup key={item?.title}>
            <SidebarGroupLabel>{item?.title}</SidebarGroupLabel>
            <SidebarGroupContent className="ml-2">
              <SidebarMenu>
                {item?.items.map((item) => (
                  <SidebarMenuItem key={item?.title}>
                    <SidebarMenuButton asChild>
                      <a href={item?.url}>{item?.title}</a>
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
