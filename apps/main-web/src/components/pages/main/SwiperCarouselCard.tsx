"use client";

import { Card } from "@repo/ui/components/ui/card";
import Image from "next/image";

interface Pet {
  name: string;
  type: string;
  breed: string;
  imageUrl: string;
}

export default function SwiperCarouselCard({ pet }: { pet: Pet }) {
  return (
    <div className="p-5">
      <Card className="relative flex flex-row justify-between items-center p-4 bg-[#4F4F4F] border-[#F7FAFC] h-[130px] overflow-hidden">
        <div className="flex flex-col gap-1 z-10">
          <h2 className="text-xl font-semibold text-white font-poppins">
            {pet.name}
          </h2>
          <p className="text-sm text-[#ECEFF2] font-poppins">
            {pet.type} | {pet.breed}
          </p>
        </div>
        <div className="relative w-[100px] h-[100px]">
          {/* Decorative circles */}
          <div className="absolute w-[200px] h-[200px] -left-[50px] -top-[50px]">
            <div className="absolute inset-0 rounded-full bg-white/5" />
            <div className="absolute inset-[20px] rounded-full bg-white/5" />
            <div className="absolute inset-[35px] rounded-full bg-white/10" />
          </div>
          {/* Pet image */}
          <div className="relative w-full h-full rounded-full overflow-hidden">
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
