import { product } from "@/app/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartItemType, CartType } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Icon from "./icons";
import { Button } from "./ui/button";

export default function Cart() {
  const cart: CartType = [
    {
      product: product,
      quantity: 1,
    },
  ];

  const handleRemove = (id: string) => {
    console.log("remove", id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ShoppingCart />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" sm:min-w-56 p-4">
        <DropdownMenuLabel>Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cart.map((item) => (
          <div key={item.product.id}>
            <CartItem
              cartItem={item}
              onRemove={() => handleRemove(item.product.id)}
            />
          </div>
        ))}
        <div>
          <Button
            size="lg"
            variant="default"
            className="w-full mt-4 text-black font-bold shadow-primary drop-shadow-sm h-12"
          >
            Checkout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type CartItemProps = {
  cartItem: CartItemType;
  onRemove: () => void;
};

export function CartItem({ cartItem, onRemove }: CartItemProps) {
  const { product, quantity } = cartItem;
  return (
    <div className="flex gap-2 items-center justify-between ">
      {/* Product Image */}
      <div className="w-16 h-16 flex-shrink-0">
        <Image
          src={product.images[0].thumbnail}
          alt={product.name}
          width={64}
          height={64}
          className="rounded-lg object-cover"
          unoptimized
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 ml-4">
        <h4 className="text-sm font-semibold text-muted-foreground">
          {product.name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {`$${product.price.toFixed(2)} x ${quantity}`}{" "}
          <span className="font-bold text-black">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label="Remove item"
      >
        <Icon icon="delete" />
      </Button>
    </div>
  );
}
