'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';

import AddPetForm from './AddPetForm';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

export default function AddPet() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="px-5">
          <div className="border-lightGrey flex justify-center rounded-sm border-[1px] border-dashed bg-[#FFEEE5]">
            <div className="flex flex-col items-center gap-2 py-4">
              <p className="text-lookids text-sm">마이펫 추가하기</p>
              <CirclePlus size={44} className="text-white" fill="#FD9340" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[90%] rounded-sm"
      >
        <DialogTitle className="hidden" />
        <AddPetForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
