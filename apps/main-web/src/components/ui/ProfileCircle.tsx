import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPetList } from '../../actions/user';
import { useSession } from '../../context/SessionContext';
import { PetInfo } from '../../types/user';

export default function ProfileCircle() {
  // 여기서 userUuid로 Pet 프로필 이미지를 가져오는 로직을 작성합니다.
  const session = useSession();
  const [petProfile, setPetProfile] = useState<PetInfo[]>([]);
  useEffect(() => {
    const uuid = session?.uuid;
    if (!uuid) {
      console.error('UUID is missing.');
      return;
    }
    const fetchpetProfile = async () => {
      const data = await getPetList(uuid);
      console.log(data);
    };
    fetchpetProfile();
  });
  return (
    <div className="mx-auto w-full max-w-screen-sm p-4">
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
        {/* Friends Story */}
        <div className="flex min-w-[64px] flex-col items-center">
          <div className="mb-1 h-16 w-16 overflow-hidden rounded-full border border-gray-200">
            <Image
              src="/ppoppi.jfif"
              alt="Friends story"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <span className="text-xs text-gray-900">뽀삐</span>
        </div>
      </div>
    </div>
  );
}
