export const dynamic = "force-static";

import { ImageShowcase } from "@/components/image-showcase";
import ProductInfo from "@/components/product-info";
import { ProductData } from "@/lib/types";

export const product: ProductData = {
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
      id: "image-1",
      image: "/images/image-product-1.jpg",
      thumbnail: "/images/image-product-1-thumbnail.jpg",
    },
    {
      id: "image-2",
      image: "/images/image-product-2.jpg",
      thumbnail: "/images/image-product-2-thumbnail.jpg",
    },
    {
      id: "image-3",
      image: "/images/image-product-3.jpg",
      thumbnail: "/images/image-product-3-thumbnail.jpg",
    },
    {
      id: "image-4",
      image: "/images/image-product-4.jpg",
      thumbnail: "/images/image-product-4-thumbnail.jpg",
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen container  mx-auto">
      <section className="flex justify-center flex-col items-center sm:flex-row sm:mt-20 md:gap-12 lg:gap-24 w-full">
        <ImageShowcase name={product.name} images={product.images} />

        <div className="sm:mt-10">
          <ProductInfo product={product} />
        </div>
      </section>
    </main>
  );
}
