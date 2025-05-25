import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser();
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{ boxShadow: "0 0 10px 0 rgba(77, 209, 223, .5)" }}
    >
      <SidebarTrigger className="absolute left-2" />
      <Link href="/" className="ml-6 flex items-center gap-2">
        <Image
          src="/quack.jpeg"
          height={70}
          width={70}
          alt="logo"
          className="rounded-full"
          priority
        />
        <h1 className="flex flex-col text-3xl leading-7 font-semibold">
          Quack <span className="text-2xl">Notes AI</span>
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Button asChild className="hidden sm:block">
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button asChild variant={"outline"} className="font-semibold">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
