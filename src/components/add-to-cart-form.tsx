"use client";

import { toast } from "@/hooks/use-toast";
import { ProductData } from "@/lib/types";
import { useHydratedCartStore } from "@/store/user-cart-store";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import Icon from "./icons";
import { Button } from "./ui/button";

type Props = {
  product: ProductData;
};

export default function AddToCartForm({ product }: Props) {
  const [count, setCount] = useState(1);
  const { hydrated, addToCart, cart } = useHydratedCartStore();

  if (!hydrated) {
    return null;
  }

  const handleAddToCart = () => {
    const existingItem = cart.find(
      (item) => item.product && item.product.id === product.id
    );
    const currentQuantity = existingItem?.quantity || 0;

    if (currentQuantity + count > product.stock) {
      toast({
        description: "Cannot add more items than available in stock",
      });
      return;
    }

    if (!product || !product.id) {
      toast({
        description: "Invalid product data",
      });
      return;
    }

    addToCart(product, count);
    setCount(1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="mt-4 h-12 min-w-32 flex-1 flex justify-between bg-secondary w-full items-center gap-2 rounded-lg">
        <Button
          variant="secondary"
          className="w-8 h-8 -mb-3"
          disabled={count <= 1}
          onClick={() => {
            if (count <= 1) return;
            setCount((v) => v - 1);
          }}
        >
          <Icon icon="minus" />
        </Button>
        <span className="font-medium">{count}</span>
        <Button
          variant="secondary"
          className="w-8 h-8"
          disabled={count === product.stock}
          onClick={() => {
            setCount((v) => {
              if (v === product.stock) {
                return v;
              } else {
                return v + 1;
              }
            });
          }}
        >
          <Icon icon="plus" />
        </Button>
      </div>

      <Button
        size="lg"
        variant="default"
        className="w-full mt-4 text-black font-bold shadow-primary drop-shadow-sm h-12"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        <ShoppingCart className="mr-2" />
        {product.stock === 0 ? "Out of Stock" : "Add to cart"}
      </Button>
    </div>
  );
}
