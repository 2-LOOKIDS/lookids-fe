import { Ellipsis } from "lucide-react";
import Image from "next/image";

export default function CardTopSection() {
  return (
    <div className="flex flew-row justify-between items-center mb-2">
      <section className="flex flex-row items-center gap-2">
        <div className="relative aspect-square w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="/jihunpistol.jpg"
            alt="지훈지훈피스톨"
            layout="fill" // 이미지가 부모 요소에 맞게 채워지도록 설정
            objectFit="cover" // 이미지를 잘 맞게 채우기
            priority
          />
        </div>
        <div>
          <p className="text-lg bold">KingJihun</p>
          <p className="text-xs text-gray-500">Tokyo-Japan</p>
        </div>
      </section>
      <section className="flex">
        <Ellipsis />
      </section>
    </div>
  );
}
