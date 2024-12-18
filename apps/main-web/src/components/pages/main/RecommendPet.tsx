'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { getRandomPetList } from '../../../actions/user'; // 데이터 요청 함수
import { PetDetail } from '../../../types/user';
import { getMediaUrl } from '../../../utils/media';

export default function RecommendedPet() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // SWR을 사용하여 데이터 요청 및 캐싱
  const { data: petData = [] } = useSWR<PetDetail[]>(
    '/api/pets/random',
    getRandomPetList,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && petData.length > 0) {
        const nextIndex = (currentIndex + 1) % petData.length;

        const scrollWidth =
          carouselRef.current.scrollWidth /
          carouselRef.current.childElementCount;

        carouselRef.current.scrollTo({
          left: nextIndex * scrollWidth,
          behavior: 'smooth',
        });

        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, petData]);

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
        {petData.map((pet, index) => (
          <div
            key={index}
            className="flex-none basis-[60%]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <Card className="border-0">
              <CardContent className="relative aspect-[4/5] p-0">
                <div className="absolute inset-0 rounded-lg bg-gray-200">
                  <Image
                    src={getMediaUrl(pet.image)} // 동적 데이터 사용
                    alt={pet.name}
                    fill
                    className="rounded-lg object-cover"
                    priority={index < 2}
                  />
                </div>
                <div className="absolute inset-0 p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">{pet.name}</h3>
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs">{pet.type || 'Unknown'}</span>
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
