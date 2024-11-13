'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/ui/carousel';
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function RecommendedPet() {
  const cats = [
    {
      name: 'Kitty Cats',
      distance: '5 km',
      background: 'bg-[#FFE8DA]',
      image: 'https://picsum.photos/600/800?random=10',
    },
    {
      name: 'Fuchsia Cats',
      distance: '5 km',
      background: 'bg-[#DBEDFF]',
      image: 'https://picsum.photos/600/800?random=11',
    },
    {
      name: 'Kitty Cats',
      distance: '5 km',
      background: 'bg-[#FFE8DA]',
      image: 'https://picsum.photos/600/800?random=12',
    },
    {
      name: 'Fuchsia Cats',
      distance: '6 km',
      background: 'bg-[#DBEDFF]',
      image: 'https://picsum.photos/600/800?random=13',
    },
    {
      name: 'Kitty Cats',
      distance: '6 km',
      background: 'bg-[#FFE8DA]',
      image: 'https://picsum.photos/600/800?random=14',
    },
    {
      name: 'Fuchsia Cats',
      distance: '6 km',
      background: 'bg-[#DBEDFF]',
      image: 'https://picsum.photos/600/800?random=15',
    },
    {
      name: 'Kitty Cats',
      distance: '7 km',
      background: 'bg-[#FFE8DA]',
      image: 'https://picsum.photos/600/800?random=16',
    },
    {
      name: 'Fuchsia Cats',
      distance: '7 km',
      background: 'bg-[#DBEDFF]',
      image: 'https://picsum.photos/600/800?random=17',
    },
    {
      name: 'Kitty Cats',
      distance: '7 km',
      background: 'bg-[#FFE8DA]',
      image: 'https://picsum.photos/600/800?random=18',
    },
    {
      name: 'Fuchsia Cats',
      distance: '8 km',
      background: 'bg-[#DBEDFF]',
      image: 'https://picsum.photos/600/800?random=19',
    },
    {
      name: 'Kitty Cats',
      distance: '8 km',
      background: 'bg-[#FFE8DA]',
      image: 'https://picsum.photos/600/800?random=20',
    },
    {
      name: 'Fuchsia Cats',
      distance: '8 km',
      background: 'bg-[#DBEDFF]',
      image: 'https://picsum.photos/600/800?random=21',
    },
  ];

  return (
    <div className="w-full px-2 py-8">
      <div className="mb-6 flex items-center justify-between px-4">
        <h2 className="text-xl font-medium">Recommended</h2>
        <Button variant="link" className="font-medium text-[#FCAE83]">
          View all
        </Button>
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {cats.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="border-0">
                <CardContent className="relative aspect-[4/5] p-0">
                  <div
                    className={`absolute inset-0 rounded-lg ${cat.background}`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="rounded-lg object-cover"
                      priority={index < 2}
                    />
                  </div>
                  <div className="absolute inset-0 p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4">
                        <h3 className="text-base font-medium">{cat.name}</h3>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          <span className="text-xs">{cat.distance}</span>
                        </div>
                      </div>
                      <button className="absolute right-3 top-3 rounded-full bg-red-500 p-2">
                        <Heart className="h-4 w-4 text-white" />
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
