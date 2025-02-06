"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/user-cart-store"; // Zustand cart store
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { CartItem } from "./cart-item";
import { Button } from "./ui/button";

export default function Cart() {
  const { cart, removeFromCart, totalQuantity } = useCartStore();

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* Add cart item count */}
        <div className="relative">
          <ShoppingCart />
          {totalQuantity() > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity()}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="sm:min-w-56 p-4">
        <DropdownMenuLabel>Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {cart.length === 0 ? (
          <p className="text-muted-foreground text-sm">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.product.id}>
                <CartItem
                  cartItem={item}
                  onRemove={() => handleRemove(item.product.id)}
                />
              </div>
            ))}

            <DropdownMenuItem asChild>
              <Link href="/checkout">
                <Button
                  size="lg"
                  variant="default"
                  className="w-full mt-4 text-black font-bold shadow-primary drop-shadow-sm h-12"
                >
                  Checkout
                </Button>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
