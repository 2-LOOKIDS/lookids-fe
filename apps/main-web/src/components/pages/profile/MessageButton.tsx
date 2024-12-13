'use client';

import { Button } from '@repo/ui/components/ui/button';
import React from 'react';

interface MessageButtonProps {
  followState: boolean;
}

function MessageButton({ followState }: MessageButtonProps) {
  return (
    <Button
      variant="outline"
      // onClick={() => (followState)}
      className="border-lookids text-lookids hover:bg-lookids w-3/5 rounded-[12px] border py-5 hover:text-white sm:p-2"
    >
      <p className="font-poppins text-base font-semibold leading-6">
        메세지 보내기
      </p>
    </Button>
  );
}

export default MessageButton;
