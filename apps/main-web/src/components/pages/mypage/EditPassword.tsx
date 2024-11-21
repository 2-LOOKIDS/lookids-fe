import { Button } from '@repo/ui/components/ui/button';
import React from 'react';

export default function EditPassword() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold">비밀번호 변경</p>
      <div>
        <Button className="border-lookids/50 w-full border-[1px] bg-[#FCAE83] hover:bg-[#FCAE83]/90">
          비밀번호 변경하러 가기
        </Button>
      </div>
    </div>
  );
}
