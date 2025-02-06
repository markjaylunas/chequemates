"use client";

import Link from "next/link";
import Cart from "../cart";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="mr-4 flex-1 flex justify-start items-center gap-2">
          <MobileMenu />
          <Link className="mr-10 flex items-center space-x-2" href="/">
            <span className="font-black text-xl">chequemates</span>
          </Link>
          <nav className="items-center space-x-6 text-sm font-medium hidden md:flex">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
            >
              Collections
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
            >
              Men
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
            >
              Women
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
            >
              About
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-none items-center justify-between space-x-2 md:justify-end gap-3">
          <Cart />

          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="size-8">
              <AvatarImage src="/images/image-avatar.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
