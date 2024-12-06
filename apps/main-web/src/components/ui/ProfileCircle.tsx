import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPetList } from '../../actions/user';
import { useSession } from '../../context/SessionContext';
import { PetInfo } from '../../types/user';
import { getMediaUrl } from '../../utils/media';

export default function ProfileCircle() {
  const session = useSession();
  const [petProfile, setPetProfile] = useState<PetInfo[]>([]);

  useEffect(() => {
    const uuid = session?.uuid;
    if (!uuid) {
      console.error('UUID is missing.');
      return;
    }
    const fetchpetProfile = async () => {
      try {
        const data = await getPetList(uuid);
        setPetProfile(data);
      } catch (error) {
        console.error('Failed to fetch pet profiles:', error);
      }
    };
    fetchpetProfile();
  }, [session]);

  return (
    <div className="mx-auto w-full max-w-screen-sm p-4">
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
        {(petProfile || []).map((pet) => (
          <div
            key={pet.name}
            className="flex min-w-[64px] flex-col items-center"
          >
            <div className="relative mb-1 h-16 w-16 overflow-hidden rounded-full border border-gray-200">
              {/* 부모 컨테이너를 채우는 이미지 */}
              <Image
                src={getMediaUrl(pet.image || '/default-image.png')}
                alt={pet.name || 'Unknown pet'}
                layout="fill" // 부모 컨테이너를 완전히 채움
                objectFit="cover" // 컨테이너 크기를 채우도록 이미지 잘라냄
                className="rounded-full" // 둥근 이미지로 설정
              />
            </div>
            <span className="text-xs text-gray-900">{pet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
