"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@repo/ui/components/ui/carousel";
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";

export default function RecommendedPet() {
  const cats = [
    {
      name: "Kitty Cats",
      distance: "5 km",
      background: "bg-[#FFE8DA]",
      image: "https://picsum.photos/600/800?random=10",
    },
    {
      name: "Fuchsia Cats",
      distance: "5 km",
      background: "bg-[#DBEDFF]",
      image: "https://picsum.photos/600/800?random=11",
    },
    {
      name: "Kitty Cats",
      distance: "5 km",
      background: "bg-[#FFE8DA]",
      image: "https://picsum.photos/600/800?random=12",
    },
    {
      name: "Fuchsia Cats",
      distance: "6 km",
      background: "bg-[#DBEDFF]",
      image: "https://picsum.photos/600/800?random=13",
    },
    {
      name: "Kitty Cats",
      distance: "6 km",
      background: "bg-[#FFE8DA]",
      image: "https://picsum.photos/600/800?random=14",
    },
    {
      name: "Fuchsia Cats",
      distance: "6 km",
      background: "bg-[#DBEDFF]",
      image: "https://picsum.photos/600/800?random=15",
    },
    {
      name: "Kitty Cats",
      distance: "7 km",
      background: "bg-[#FFE8DA]",
      image: "https://picsum.photos/600/800?random=16",
    },
    {
      name: "Fuchsia Cats",
      distance: "7 km",
      background: "bg-[#DBEDFF]",
      image: "https://picsum.photos/600/800?random=17",
    },
    {
      name: "Kitty Cats",
      distance: "7 km",
      background: "bg-[#FFE8DA]",
      image: "https://picsum.photos/600/800?random=18",
    },
    {
      name: "Fuchsia Cats",
      distance: "8 km",
      background: "bg-[#DBEDFF]",
      image: "https://picsum.photos/600/800?random=19",
    },
    {
      name: "Kitty Cats",
      distance: "8 km",
      background: "bg-[#FFE8DA]",
      image: "https://picsum.photos/600/800?random=20",
    },
    {
      name: "Fuchsia Cats",
      distance: "8 km",
      background: "bg-[#DBEDFF]",
      image: "https://picsum.photos/600/800?random=21",
    },
  ];

  return (
    <div className="w-full py-8 px-2">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-xl font-medium">Recommended</h2>
        <Button variant="link" className="text-[#FCAE83] font-medium">
          View all
        </Button>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {cats.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="border-0">
                <CardContent className="relative p-0 aspect-[4/5]">
                  <div
                    className={`absolute inset-0 rounded-lg ${cat.background}`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover rounded-lg"
                      priority={index < 2}
                    />
                  </div>
                  <div className="absolute inset-0 p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <h3 className="font-medium text-base">{cat.name}</h3>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs">{cat.distance}</span>
                        </div>
                      </div>
                      <button className="absolute top-3 right-3 bg-red-500 rounded-full p-2">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
