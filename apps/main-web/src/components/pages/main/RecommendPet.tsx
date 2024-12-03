'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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

export default function RecommendedPet() {
  const carouselRef = useRef<HTMLDivElement | null>(null); // Carousel DOM 참조
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스 상태

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        // 다음 인덱스 계산
        const nextIndex = (currentIndex + 1) % cats.length;

        // 스크롤 이동
        const scrollWidth =
          carouselRef.current.scrollWidth /
          carouselRef.current.childElementCount;

        carouselRef.current.scrollTo({
          left: nextIndex * scrollWidth,
          behavior: 'smooth',
        });

        // 인덱스 업데이트
        setCurrentIndex(nextIndex);
      }
    }, 3000); // 3초마다 이동

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 해제
  }, [currentIndex]);

  return (
    <div className="w-full py-8">
      <div className="mb-6 flex items-center justify-between px-2">
        <h2 className="text-md font-bold">Recommended</h2>
        <Button variant="link" className="font-medium text-[#FCAE83] text-xs">
          View all
        </Button>
      </div>
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll no-scrollbar pb-4 gap-4"
      >
        {cats.map((cat, index) => (
          <div
            key={index}
            className="flex-none basis-[60%]"
            style={{ scrollSnapAlign: 'start' }}
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
          </div>
        ))}
      </div>
    </div>
  );
}
