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
  const [image, setImage] = useState(images[0]);

  return (
    <div>
      <Image
        src={image.image}
        alt={name}
        width={200}
        height={200}
        unoptimized
      />
      <div className="flex items-center gap-4">
        {images.map((image) => (
          <div className="relative" key={image.thumbnail}>
            <Image
              src={image.thumbnail}
              alt={name}
              width={200}
              height={200}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
