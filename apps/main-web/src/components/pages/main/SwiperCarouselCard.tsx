'use client';

import { Card } from '@repo/ui/components/ui/card';
import Image from 'next/image';

interface Pet {
  name: string;
  type: string;
  breed: string;
  imageUrl: string;
}

export default function SwiperCarouselCard({ pet }: { pet: Pet }) {
  return (
    <div className="p-5">
      <Card className="relative flex h-[130px] flex-row items-center justify-between overflow-hidden border-[#F7FAFC] bg-[#4F4F4F] p-4">
        <div className="z-10 flex flex-col gap-1">
          <h2 className="font-poppins text-xl font-semibold text-white">
            {pet.name}
          </h2>
          <p className="font-poppins text-sm text-[#ECEFF2]">
            {pet.type} | {pet.breed}
          </p>
        </div>
        <div className="relative h-[100px] w-[100px]">
          <div className="absolute -left-[50px] -top-[50px] h-[200px] w-[200px]">
            <div className="absolute inset-0 rounded-full bg-white/5" />
            <div className="absolute inset-[20px] rounded-full bg-white/5" />
            <div className="absolute inset-[35px] rounded-full bg-white/10" />
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={pet.imageUrl}
              alt={`${pet.name} the ${pet.breed}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
