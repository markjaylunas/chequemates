"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CartItemType } from "@/lib/types";
import { useCartStore } from "@/store/user-cart-store";
import Image from "next/image";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart, totalPrice, totalQuantity } = useCartStore();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleNewOrder = (): void => {
    clearCart();
    setIsDialogOpen(false);
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg">
              <span className="font-medium">Total Items:</span>
              <span>{totalQuantity()}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-medium">Total Price:</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Confirm Order</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Your Order</DialogTitle>
                <DialogDescription>
                  Please review your order details before confirming.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Order Summary</h4>
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="sm:justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleNewOrder}
                    className="border border-destructive text-destructive hover:bg-destructive/90 hover:text-white"
                  >
                    Start New Order
                  </Button>
                  <Button type="submit" onClick={handleNewOrder}>
                    Place Order
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();
  const { product, quantity } = item;

  const handleUpdateQuantity = (newQuantity: number): void => {
    if (newQuantity > 0 && newQuantity <= product.stock) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleRemove = (): void => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 border rounded-lg hover:border-primary/50 transition-colors">
      <div className="w-20 h-20 flex-shrink-0">
        <Image
          src={product.images[0].thumbnail}
          alt={product.name}
          width={80}
          height={80}
          className="rounded-lg object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1 flex flex-col ">
        <h2 className="text-lg font-medium">{product.name}</h2>
        <div className="text-muted-foreground space-y-1">
          <p>
            ${product.price.toFixed(2)} x {quantity}
          </p>
          {product.oldPrice > 0 && (
            <p className="text-sm line-through">
              ${product.oldPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={quantity <= 1}
            onClick={() => handleUpdateQuantity(quantity - 1)}
          >
            -
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={quantity >= product.stock}
            onClick={() => handleUpdateQuantity(quantity + 1)}
          >
            +
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 text-destructive hover:text-destructive/90"
          >
            🗑️
          </Button>
        </div>
      </div>
    </div>
  );
}
