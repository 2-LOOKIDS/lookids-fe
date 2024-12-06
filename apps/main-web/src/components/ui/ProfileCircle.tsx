'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPetList } from '../../actions/user';
import { useSession } from '../../context/SessionContext';
import { PetInfo } from '../../types/user';
import { getMediaUrl } from '../../utils/media';

interface ProfileCircleProps {
  onPetSelect: (petCodes: string[] | null) => void;
}

export default function ProfileCircle({ onPetSelect }: ProfileCircleProps) {
  const session = useSession();
  const [petProfile, setPetProfile] = useState<PetInfo[]>([]);
  const [selectedPets, setSelectedPets] = useState<string[]>([]);

  useEffect(() => {
    const uuid = session?.uuid;
    if (!uuid) {
      console.error('UUID is missing.');
      return;
    }
    const fetchPetProfile = async () => {
      try {
        const data = await getPetList(uuid);
        setPetProfile(data);
      } catch (error) {
        console.error('Failed to fetch pet profiles:', error);
      }
    };
    fetchPetProfile();
  }, [session]);

  const handlePetClick = (petCode: string) => {
    setSelectedPets((prev) => {
      const isAlreadySelected = prev.includes(petCode);
      const updatedSelection = isAlreadySelected
        ? prev.filter((code) => code !== petCode) // 제거
        : [...prev, petCode]; // 추가
      onPetSelect(updatedSelection.length > 0 ? updatedSelection : null); // 부모로 배열 전달
      return updatedSelection;
    });
  };

  return (
    <div className="mx-auto w-full max-w-screen-sm p-4 pt-6">
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
        {(petProfile || []).map((pet) => (
          <div
            key={pet.petCode}
            className="flex min-w-[64px] flex-col items-center"
            onClick={() => handlePetClick(pet.petCode)}
          >
            <div
              className={`relative mt-2 mb-1 ml-2 h-20 w-20 p-1 overflow-hidden rounded-full transition-all duration-300 ease-in-out
                ${
                  selectedPets.includes(pet.petCode)
                    ? 'bg-lookids scale-105'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={getMediaUrl(pet.image || '/default-image.png')}
                  alt={pet.name || 'Unknown pet'}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <span
              className={`text-xs mt-1 ${
                selectedPets.includes(pet.petCode)
                  ? 'text-lookids font-semibold'
                  : 'text-gray-900'
              }`}
            >
              {pet.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
