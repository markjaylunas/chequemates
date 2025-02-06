"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import Icon from "./icons";
import { Button } from "./ui/button";

type Props = {
  productId: string;
  stock: number;
};

export default function AddToCartForm({ productId, stock }: Props) {
  const [count, setCount] = useState(0);
  console.log({ count });

  const handleAddToCart = () => {
    console.log("add", productId, count);
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
          disabled={count === stock}
          onClick={() => {
            setCount((v) => {
              if (v === stock) {
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
      >
        <ShoppingCart />
        Add to cart
      </Button>
    </div>
  );
}
