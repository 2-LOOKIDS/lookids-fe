'use client';

import { Button } from '@repo/ui/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';

interface MessageButtonProps {
  followState: boolean;
  token: string;
  uuid: string;
  targetUuid: string;
}

function MessageButton({
  followState,
  token,
  uuid,
  targetUuid,
}: MessageButtonProps) {
  const router = useRouter();

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
