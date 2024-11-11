import { Button } from '@repo/ui/components/ui/button';
import React from 'react';

function MessageButton() {
  return (
    <Button
      variant="outline"
      className="w-2/5 rounded-[12px] border border-[#FD9340] py-5 text-[#FD9340] hover:bg-[#FD9340] hover:text-white sm:p-2"
    >
      <p className="font-poppins text-base font-semibold leading-6">
        메시지 보내기
      </p>
    </Button>
  );
}

export default MessageButton;
