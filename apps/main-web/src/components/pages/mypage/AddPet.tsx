import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function AddPet() {
  return (
    <Link href="/mypage/add-pet" className="px-5">
      <div className="border-lightGrey flex justify-center rounded-sm border-[1px] border-dashed bg-[#FFEEE5]">
        <div className="flex flex-col items-center gap-2 py-4">
          <p className="text-lookids text-sm">마이펫 추가하기</p>
          <CirclePlus size={44} className="text-white" fill="#FD9340" />
        </div>
      </div>
    </Link>
  );
}
