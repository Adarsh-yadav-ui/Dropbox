"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import UserStored from "./UserStored";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-5 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800 border rounded-4xl min-w-[calc(100%-2rem)] mx-4 shadow-xl">
      <nav className="h-16 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <Image
            src="/logo_light_mode.svg"
            alt="Logo"
            height={32}
            width={32}
            className="h-8 w-auto block dark:hidden"
          />
          <Image
            src="/logo_dark_mode.svg"
            alt="Logo"
            height={32}
            width={32}
            className="h-8 w-auto dark:block hidden"
          />
        </Link>

        <div className="hidden md:flex mx-auto mr-3 space-x-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="dark:text-gray-300 dark:hover:text-blue-400 text-sm font-medium text-gray-600 hover:text-blue-600 relative cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-400 before:absolute before:bg-gray-400 before:origin-center before:h-px before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-1px after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          {/* <ModeToggle /> */}

          <div className="flex items-center">
            <Authenticated>
              <UserStored />
              <Button variant="ghost" className="mr-2" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
            </Authenticated>

            <Unauthenticated>
              <Button asChild>
                <SignInButton />
              </Button>
              <Button asChild>
                <SignUpButton />
              </Button>
            </Unauthenticated>
          </div>
        </div>
      </nav>
    </header>
  );
};
