'use client';

import {
  checkOneOnOneChatRoom,
  createChatRoom,
} from '../../../actions/chatting/Chatting';

import { Button } from '@repo/ui/components/ui/button';
import { isRoomExist } from '../../../types/chatting/ChattingType';
import { useRouter } from 'next/navigation';

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
}: MessageButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const isLoggedIn = (token: string) => {
    if (!token) {
      router.push('/sign-in');
    }
  };

  const isFollowed = (followState: boolean) => {
    if (!followState) {
    }
  };

  const goToChatRoom = async () => {
    isLoggedIn(token);
    isFollowed(followState);

    if (checkChatRoom.result) {
      router.push(`/chatting/${checkChatRoom.roomId}`);
    } else {
      // const response = await createChatRoom('채팅방입니다',uuid, targetUuid)
    }
  };

  // TODO: 모바일에서 팔로우 버튼 tailwind 안먹음, 채팅 메세지 라우팅
  // 메세지 보내기 버튼 누르면
  // 1. 로그인 여부 확인(로그인이 아니면 로그인 페이지로 이동)
  // 2. 팔로우 상태 확인 (팔로우가 아니면 팔로우하세요)
  // 3. 채팅 방이 존재 하는지 확인(존재하면 채팅룸으로 이동 / 존재하지 않으면 채팅룸 생성 후 이동)
  return (
    <Button
      variant="outline"
      onClick={goToChatRoom}
      className="border-lookids text-lookids hover:bg-lookids w-3/5 rounded-[12px] border py-5 hover:text-white sm:p-2"
    >
      <p className="font-poppins text-base font-semibold leading-6">
        메세지 보내기
      </p>
    </Button>
  );
}

export default MessageButton;
