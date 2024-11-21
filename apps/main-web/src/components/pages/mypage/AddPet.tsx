import { CirclePlus } from 'lucide-react';
import React from 'react';

export default function AddPet() {
  return (
    <div className="flex justify-center rounded-sm border-[1px] border-dashed border-[#EBEBEB] bg-[#FFEEE5]">
      <div className="flex flex-col items-center gap-2 py-4">
        <p className="text-lookids text-sm">마이펫 추가하기</p>
        <CirclePlus size={44} className="text-white" fill="#FD9340" />
      </div>
    </div>
  );
}
