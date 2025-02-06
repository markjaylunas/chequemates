import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Icon from "../icons";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger className="flex sm:hidden">
        <Icon icon="menu" />
      </SheetTrigger>

      <SheetContent side="left" className="pt-16">
        <nav className="items-start justify-start gap-6 text-sm font-medium flex flex-col">
          <Link
            className="transition-colors hover:text-foreground/70 font-bold text-xl text-foreground/90"
            href="#"
          >
            Collections
          </Link>
          <Link
            className="transition-colors hover:text-foreground/70 font-bold text-xl text-foreground/90"
            href="#"
          >
            Men
          </Link>
          <Link
            className="transition-colors hover:text-foreground/70 font-bold text-xl text-foreground/90"
            href="#"
          >
            Women
          </Link>
          <Link
            className="transition-colors hover:text-foreground/70 font-bold text-xl text-foreground/90"
            href="#"
          >
            About
          </Link>
          <Link
            className="transition-colors hover:text-foreground/70 font-bold text-xl text-foreground/90"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
