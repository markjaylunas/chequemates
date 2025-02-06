"use client";

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
    <>
      <div className="mt-4 flex justify-between bg-secondary w-36 items-center gap-2">
        <Button
          variant="secondary"
          className="w-8 h-8 -mb-3"
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
        variant="default"
        className="w-full mt-4"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </>
  );
}
