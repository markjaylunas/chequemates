export type ProductData = {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  oldPrice: number;
  currency: string;
  discount: number;
  stock: number;

  images: { id: string; image: string; thumbnail: string }[];
};

export type CartItemType = {
  product: ProductData;
  quantity: number;
};

export type CartType = CartItemType[];
