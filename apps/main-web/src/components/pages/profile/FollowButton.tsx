'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';

import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { deleteChattingRoom } from '../../../actions/chatting/Chatting';
import { isRoomExist } from '../../../types/chatting/ChattingType';
import { putFollowToggle } from '../../../actions/follow/Follow';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FollowButtonProps {
  token: string;
  uuid: string;
  targetUuid: string;
  followState: boolean;
  checkChatRoom: isRoomExist;
}
function FollowButton({
  token,
  uuid,
  targetUuid,
  followState,
  checkChatRoom,
}: FollowButtonProps) {
  const handleFollow = useDebouncedCallback(async () => {
    const response = await putFollowToggle(token, uuid, targetUuid);
  }, 300);
  const [hasToken, setHasToken] = useState(true);
  const router = useRouter();

  // 채팅방 삭제
  const deleteChatRoom = async (roomId: string) => {
    if (!followState) {
      await deleteChattingRoom(roomId);
      console.log('delete chat room', roomId);
    }
  };

  const className = followState
    ? 'bg-lookids hover:bg-lookids/90 text-white'
    : 'border border-lookids bg-white hover:bg-lookids hover:text-white text-lookids';

  return (
    <Button
      key={followState ? 'followed' : 'not-followed'}
      onClick={handleFollow}
      className={cn('w-3/5 rounded-[12px] py-5 flex items-center', className)}
    >
      {followState ? (
        <p className="font-poppins text-base font-semibold leading-6">
          팔로우 취소
        </p>
      ) : (
        <p className="font-poppins text-base font-semibold leading-6">팔로우</p>
      )}
    </Button>
  );
}

export default FollowButton;
