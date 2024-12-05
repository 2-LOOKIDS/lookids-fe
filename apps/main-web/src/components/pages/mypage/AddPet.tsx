'use client';

import { CirclePlus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import React, { useState } from 'react';

import AddPetForm from './AddPetForm';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';

export default function AddPet() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)} className="px-5">
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
        <div
          className="flex justify-end hover:cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
        </div>
        <DialogTitle className="hidden" />
        <AddPetForm />
      </DialogContent>
    </Dialog>
  );
}
