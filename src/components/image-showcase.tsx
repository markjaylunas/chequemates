"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { ProductData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type Props = {
  name: string;
  images: ProductData["images"];
};

export function ImageShowcase(props: Props) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <ImageShowcaseMobile {...props} />
  ) : (
    <ImageShowcaseDesktop {...props} />
  );
}

export function ImageShowcaseDesktop({ name, images }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [api, setApi] = useState<CarouselApi>();
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

  useEffect(() => {
    if (!api) {
      return;
    }

    setSelectedImage(images[api.selectedScrollSnap()]);

    api.on("select", () => {
      setSelectedImage(images[api.selectedScrollSnap()]);
    });
  }, [api]);

  return (
    <section className="w-full max-w-96">
      <Dialog>
        <DialogTrigger>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id}>
                  <Image
                    src={selectedImage.image}
                    alt={name}
                    width={900}
                    height={900}
                    className="md:rounded-xl"
                    unoptimized
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </DialogTrigger>
        <DialogContent className="bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <div>
            <div className="relative">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full absolute top-1/2 -left-5 z-10"
                onClick={() => handlePrevious(selectedImage.id)}
              >
                <ChevronLeft size={32} strokeWidth={4} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute rounded-full top-1/2 -right-5 z-10"
                onClick={() => handleNext(selectedImage.id)}
              >
                <ChevronRight size={32} strokeWidth={4} />
              </Button>
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {images.map((image) => (
                    <CarouselItem key={image.id}>
                      <Image
                        src={selectedImage.image}
                        alt={name}
                        width={900}
                        height={900}
                        className="rounded-xl"
                        unoptimized
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
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
        isHidable={true}
      />
    </section>
  );
}
export function ImageShowcaseMobile({ name, images }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [api, setApi] = useState<CarouselApi>();

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

  useEffect(() => {
    if (!api) {
      return;
    }

    setSelectedImage(images[api.selectedScrollSnap()]);

    api.on("select", () => {
      setSelectedImage(images[api.selectedScrollSnap()]);
    });
  }, [api]);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full absolute top-1/2 left-5 z-10"
        onClick={() => handlePrevious(selectedImage.id)}
      >
        <ChevronLeft size={32} strokeWidth={4} />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute rounded-full top-1/2 right-5 z-10"
        onClick={() => handleNext(selectedImage.id)}
      >
        <ChevronRight size={32} strokeWidth={4} />
      </Button>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <Image
                src={selectedImage.image}
                alt={name}
                width={900}
                height={900}
                className="md:rounded-xl"
                unoptimized
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

type OtherImagesProps = Props & {
  onChangeImage: (image: ProductData["images"][0]) => void;
  isHidable?: boolean;
  currentImage: ProductData["images"][0];
};
export function OtherImages({
  currentImage,
  images,
  isHidable,
  name,
  onChangeImage,
}: OtherImagesProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 mt-6",
        isHidable && "hidden sm:flex"
      )}
    >
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
