import { CartItemType } from "@/lib/types";
import Image from "next/image";
import Icon from "./icons";
import { Button } from "./ui/button";

type CartItemProps = {
  cartItem: CartItemType;
  onRemove: () => void;
};

export function CartItem({ cartItem, onRemove }: CartItemProps) {
  const { product, quantity } = cartItem;

  const handleRemoveConfirm = () => {
    onRemove();
  };

  return (
    <div className="flex gap-2 items-center justify-between">
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
          {`${product.price.toFixed(2)} x ${quantity}`}{" "}
          <span className="font-bold text-black">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemoveConfirm}
        aria-label="Remove item"
      >
        <Icon icon="delete" />
      </Button>
    </div>
  );
}
