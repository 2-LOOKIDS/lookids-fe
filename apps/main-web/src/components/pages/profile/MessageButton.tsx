import { Button } from '@repo/ui/components/ui/button';
import React from 'react';

function MessageButton() {
  return (
    <Button
      variant="outline"
      className="border-lookids text-lookids hover:bg-lookids w-3/5 rounded-[12px] border py-5 hover:text-white sm:p-2"
    >
      <p className="font-poppins text-base font-semibold leading-6">
        메시지 보내기
      </p>
    </Button>
  );
}

export default MessageButton;
