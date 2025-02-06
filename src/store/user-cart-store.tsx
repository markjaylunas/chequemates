import { CartType, ProductData } from "@/lib/types";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartState = {
  cart: CartType;
  addToCart: (product: ProductData, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: ProductData, quantity: number) => {
        const currentCart = get().cart;

        const existingCartItem = currentCart.find(
          (item) => item.product?.id === product.id
        );

        if (existingCartItem) {
          set({
            cart: currentCart.map((item) =>
              item.product?.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                  }
                : item
            ),
          });
        } else {
          set({
            cart: [...currentCart, { product, quantity }],
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.product.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity,
                }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      totalQuantity: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      totalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

export const useHydratedCartStore = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return {
    hydrated,
    ...useCartStore.getState(),
    ...useCartStore((state) => state),
  };
};
