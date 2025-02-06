export const dynamic = "force-static";

import { ImageShowcase } from "@/components/image-showcase";
import ProductInfo from "@/components/product-info";
import { ProductData } from "@/lib/types";

export default function Home() {
  const product: ProductData = {
    id: "1",
    name: "Fall Limited Edition Sneakers",
    brand: "Sneaker Company",
    description:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: 125.0,
    oldPrice: 250.0,
    currency: "$",
    discount: 50,
    stock: 10,
    images: [
      {
        image: "/images/image-product-1.jpg",
        thumbnail: "/images/image-product-1-thumbnail.jpg",
      },
      {
        image: "/images/image-product-2.jpg",
        thumbnail: "/images/image-product-2-thumbnail.jpg",
      },
      {
        image: "/images/image-product-3.jpg",
        thumbnail: "/images/image-product-3-thumbnail.jpg",
      },
      {
        image: "/images/image-product-4.jpg",
        thumbnail: "/images/image-product-4-thumbnail.jpg",
      },
    ],
  };
  return (
    <main className="min-h-screen container mx-auto flex ">
      <ImageShowcase name={product.name} images={product.images} />
      <ProductInfo product={product} />
    </main>
  );
}
