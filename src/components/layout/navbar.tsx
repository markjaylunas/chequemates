"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-10 flex items-center space-x-2" href="/">
            <span className="font-black text-xl">chequemates</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/collections"
            >
              Collections
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/men"
            >
              Men
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/women"
            >
              Women
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/about"
            >
              About
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/contact"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image
              src={"/images/icon-cart.svg"}
              alt="cart"
              width={18}
              height={18}
              unoptimized
            />
          </Button>
          <Avatar>
            <AvatarImage src="/images/image-avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
