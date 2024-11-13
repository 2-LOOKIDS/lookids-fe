import Image from "next/image";
export interface PetProfile {
  name: string;
  profileImage: string;
}

export default function ProfileCircle() {
  // 여기서 userUuid로 Pet 프로필 이미지를 가져오는 로직을 작성합니다.

  return (
    <div className="w-full max-w-screen-sm mx-auto p-4">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {/* Friends Story */}
        <div className="flex flex-col items-center min-w-[64px]">
          <div className="w-16 h-16 rounded-full border border-gray-200 overflow-hidden mb-1">
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
