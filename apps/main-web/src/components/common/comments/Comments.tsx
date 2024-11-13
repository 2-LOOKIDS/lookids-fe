import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Heart, Trash2 } from 'lucide-react';

export default function Comments({ commentCode }: { commentCode: string }) {
  // 여기서는 commentCode를 받아와서 해당 comment에 대한 정보를 불러올 예정.
  return (
    <div className="flex w-full flex-col gap-4 px-2 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/jihunpistol.jpg" alt="User avatar" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">JIHUN_SIN</span>
            <span className="text-muted-foreground text-[11px]">
              24.11.12 05:22:15
            </span>
          </div>
        </div>
        <button className="opacity-60 transition-opacity hover:opacity-100">
          <Trash2 className="text-lookids " />
        </button>
      </div>
      <section className="flex gap-x-4">
        <p className="text-[13px] leading-5 text-[#A2A2A2]">
          만키로 떠와는 가격도 그렇고 상황이 달라진 부분도 있고, 또 테슬라
          DC공급도 생긴만큼, 제가 소유하고 있는 가장 큰 전자제품인테슬라 모델Y
          2만키로 후기 공유할게요!
        </p>
        <div className="flex flex-col items-center  pt-2">
          <Heart className="text-lookids" strokeWidth={1} />
          <p className="text-gray-300">12</p>
        </div>
      </section>
      <div className="h-px w-full bg-[#CFCDCD] opacity-50" />
    </div>
  );
}
