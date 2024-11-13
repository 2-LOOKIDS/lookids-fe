import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { FileEdit, Trash2 } from 'lucide-react';

export default function Component() {
  return (
    <div className="flex w-full flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/jihunpistol.jpg" alt="User avatar" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">JIHUN_SIN</span>
            <span className="text-muted-foreground text-[11px]">24.11.12</span>
          </div>
        </div>
        <div className="flex items-center gap-4 px-2 py-1.5">
          <button className="opacity-60 transition-opacity hover:opacity-100">
            <Trash2 className="h-[18px] w-[18px] text-[#FD9340]" />
          </button>
          <button className="opacity-60 transition-opacity hover:opacity-100">
            <FileEdit className="h-[18px] w-[18px] text-[#FD9340]" />
          </button>
        </div>
      </div>
      <p className="text-[13px] leading-5 text-[#A2A2A2]">
        만키로 떠와는 가격도 그렇고 상황이 달라진 부분도 있고, 또 테슬라
        DC공급도 생긴만큼, 제가 소유하고 있는 가장 큰 전자제품인테슬라 모델Y
        2만키로 후기 공유할게요!
      </p>
      <div className="h-px w-full bg-[#CFCDCD] opacity-50" />
    </div>
  );
}
