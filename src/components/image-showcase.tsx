"use client";

import { ProductData } from "@/lib/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type Props = {
  name: string;
  images: ProductData["images"];
};

export function ImageShowcase({ name, images }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleChangeImage = (image: ProductData["images"][0]) => {
    setSelectedImage(image);
  };
  const handlePrevious = (currentId: string) => {
    const currentIndex = images.findIndex((img) => img.id === currentId);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[previousIndex]);
  };

  const handleNext = (currentId: string) => {
    const currentIndex = images.findIndex((img) => img.id === currentId);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  return (
    <section className="w-full max-w-96">
      <Dialog>
        <DialogTrigger>
          <Image
            src={selectedImage.image}
            alt={name}
            width={900}
            height={900}
            className="rounded-xl"
            unoptimized
          />
        </DialogTrigger>
        <DialogContent className="bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <div>
            <div className="relative">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full absolute top-1/2 -left-5 "
                onClick={() => handlePrevious(selectedImage.id)}
              >
                <ChevronLeft size={32} strokeWidth={4} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute rounded-full top-1/2 -right-5"
                onClick={() => handleNext(selectedImage.id)}
              >
                <ChevronRight size={32} strokeWidth={4} />
              </Button>
              <Image
                src={selectedImage.image}
                alt={name}
                width={900}
                height={900}
                className="rounded-xl"
                unoptimized
              />
            </div>
            <OtherImages
              currentImage={selectedImage}
              images={images}
              name={name}
              onChangeImage={handleChangeImage}
            />
          </div>
        </DialogContent>
      </Dialog>

      <OtherImages
        currentImage={selectedImage}
        images={images}
        name={name}
        onChangeImage={handleChangeImage}
      />
    </section>
  );
}

type OtherImagesProps = Props & {
  onChangeImage: (image: ProductData["images"][0]) => void;

  currentImage: ProductData["images"][0];
};
export function OtherImages({
  currentImage,
  images,
  name,
  onChangeImage,
}: OtherImagesProps) {
  return (
    <div className="flex items-center gap-4 mt-6">
      {images.map((image) => (
        <button
          onClick={() => onChangeImage(image)}
          className="relative"
          key={image.thumbnail}
        >
          {image.id === currentImage.id && (
            <div className="w-full h-full rounded-xl bg-white/60 absolute top-0" />
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
  );
}
