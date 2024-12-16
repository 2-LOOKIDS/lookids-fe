'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@repo/ui/components/ui/alert';
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
import { useEffect, useState } from 'react';

import { Button } from '@repo/ui/components/ui/button';
import ShowToast from '@repo/ui/utils/ShowToast';
import { Terminal } from 'lucide-react';
import { ToastAction } from '@repo/ui/components/ui/toast';
import { createChatRoom } from '../../../actions/chatting/Chatting';
import { isRoomExist } from '../../../types/chatting/ChattingType';
import { useRouter } from 'next/navigation';
import { useToast } from '../../../../../../packages/ui/src/hooks/use-toast';

// import { useToast } from '@repo/ui/hooks/use-toast';

interface MessageButtonProps {
  followState: boolean;
  token: string;
  nickname: string;
  targetNickname?: string;
  uuid: string;
  targetUuid: string;
  checkChatRoom: isRoomExist;
}

function MessageButton({
  followState,
  token,
  uuid,
  targetUuid,
  checkChatRoom,
  nickname,
  targetNickname,
}: MessageButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = (token: string) => {
    if (!token) {
      router.push('/sign-in');
    }
  };

  const goToChatRoom = async () => {
    isLoggedIn(token);
    if (!followState) {
      return setIsOpen(true);
    }

    if (checkChatRoom.result) {
      router.push(`/chatting/${checkChatRoom.roomId}`);
    } else {
      const response = await createChatRoom(
        `${nickname}님과 ${targetNickname}님의 채팅방`,
        uuid,
        targetUuid
      );
      if (response.isSuccess) {
        router.push(`/chatting/${response.result.roomId}`);
      }
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={goToChatRoom}
        className="border-lookids text-lookids hover:bg-lookids w-3/5 rounded-[12px] border py-5 hover:text-white sm:p-2"
      >
        <p className="font-poppins text-base font-semibold leading-6">
          메세지 보내기
        </p>
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>팔로우를 먼저 해주세요!</AlertDialogTitle>
            <AlertDialogDescription>
              팔로우한 유저에게만 메세지를 보낼 수 있습니다
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!mt-0">
            <AlertDialogAction className="bg-white border-lookids text-lookids hover:bg-lookids w-1/5 rounded-[12px] border py-5 hover:text-white sm:p-2">
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default MessageButton;
