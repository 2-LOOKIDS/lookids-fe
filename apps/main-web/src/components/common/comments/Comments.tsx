import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { FileEdit, Trash2 } from "lucide-react";

export default function Component() {
  return (
    <div className="px-4 flex flex-col gap-4 w-full py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/jihunpistol.jpg" alt="User avatar" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">JIHUN_SIN</span>
            <span className="text-[11px] text-muted-foreground">24.11.12</span>
          </div>
        </div>
        <div className="flex items-center gap-4 px-2 py-1.5">
          <button className="opacity-60 hover:opacity-100 transition-opacity">
            <Trash2 className="w-[18px] h-[18px] text-[#FD9340]" />
          </button>
          <button className="opacity-60 hover:opacity-100 transition-opacity">
            <FileEdit className="w-[18px] h-[18px] text-[#FD9340]" />
          </button>
        </div>
      </div>
      <p className="text-[13px] leading-5 text-[#A2A2A2]">
        만키로 떠와는 가격도 그렇고 상황이 달라진 부분도 있고, 또 테슬라
        DC공급도 생긴만큼, 제가 소유하고 있는 가장 큰 전자제품인테슬라 모델Y
        2만키로 후기 공유할게요!
      </p>
      <div className="w-full h-px bg-[#CFCDCD] opacity-50" />
    </div>
  );
}
