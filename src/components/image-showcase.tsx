"use client";

import { ProductData } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

export function ImageShowcase({
  name,
  images,
}: {
  name: string;
  images: ProductData["images"];
}) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleChangeImage = (image: ProductData["images"][0]) => {
    setSelectedImage(image);
  };

  return (
    <section className="max-w-sm">
      <Image
        src={selectedImage.image}
        alt={name}
        width={900}
        height={900}
        className="rounded-xl"
        unoptimized
      />
      <div className="flex items-center gap-4 mt-6">
        {images.map((image) => (
          <button
            onClick={() => handleChangeImage(image)}
            className="relative"
            key={image.thumbnail}
          >
            {image.id === selectedImage.id && (
              <div className="w-full h-full bg-white/60 absolute top-0" />
            )}
            <Image
              src={image.thumbnail}
              alt={name}
              width={200}
              height={200}
              unoptimized
              className="rounded-xl"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
