'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  checkOneOnOneChatRoom,
  createChatRoom,
  getChattingList,
} from '../../../actions/chatting/Chatting';
import { getUserProfile } from '../../../actions/user';
import { FollowerListModal } from '../../../components/pages/chatting/FollowerListModal';
import CommonHeader from '../../../components/ui/CommonHeader';
import { useSession } from '../../../context/SessionContext';
import { RoomMessage } from '../../../types/chatting/ChattingType';
import { MenuItem } from '../../../types/common/MenuType';
import { responseList } from '../../../types/responseType';
import { formatDate } from '../../../utils/formatDate';

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [roomInfos, setRoomInfos] = useState<RoomMessage[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const [isFollowerListOpen, setIsFollowerListOpen] = useState(false);
  const [myNickName, setMyNickName] = useState('');
  useEffect(() => {
    const uuid = session?.uuid;
    if (!uuid) {
      console.error('UUID is missing.');
      return;
    }

    const getMyNickName = async () => {
      try {
        const data = await getUserProfile(uuid);
        setMyNickName(data.nickname);
      } catch (error) {
        console.error('Failed to fetch my nickname:', error);
      }
    };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const fetchInitialRoomInfos = async () => {
      try {
        const data: responseList<RoomMessage> = await getChattingList(uuid, 0);
        setRoomInfos(data?.content || []);
      } catch (error) {
        console.error('Failed to fetch chatting list:', error);
        setRoomInfos([]);
      }
    };

    const connectEventSource = () => {
      const myAccessToken = session?.accessToken;

      if (!myAccessToken) {
        console.error('Missing accessToken');
        return;
      }

      const eventSource = new EventSourcePolyfill(
        `${backendUrl}/chatting-service/read/chat/reactive/rooms/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${myAccessToken}`,
          },
        }
      );

      eventSource.onmessage = (event) => {
        const newMessage: RoomMessage = JSON.parse(event.data);
        setRoomInfos((prevMessages) => [...prevMessages, newMessage]);
      };

      eventSource.onerror = () => {
        console.error('EventSource failed.');
        eventSource.close();

        if (reconnectAttempts >= 10) {
          console.error('Maximum reconnect attempts reached.');
          return;
        }

        setTimeout(
          () => setReconnectAttempts((prev) => prev + 1),
          Math.min(1000 * 2 ** reconnectAttempts, 30000)
        );
      };

      eventSourceRef.current = eventSource;
    };
    getMyNickName();
    fetchInitialRoomInfos();
    connectEventSource();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setReconnectAttempts(0);
    };
  }, [session, reconnectAttempts]);

  // 메시지 보낼 팔로워 선택 시
  const handleSelectFollower = async (
    followerId: string,
    followerNickName: string
  ) => {
    console.log(`Selected follower: ${followerId}`);
    // ToDO : 해당 팔로워와 1:1 채팅방이 있는지 체크
    if (session?.uuid) {
      const response = await checkOneOnOneChatRoom(session.uuid, followerId);

      if (response.result) {
        // 채팅방으로 이동시키기 구현해줘
        console.log('채팅방있음', response.roomId);
        router.push(`/chatting/${response.roomId}`);
      } else {
        console.log('1:1 채팅방이 존재하지 않습니다.');
        await createChatRoom(
          `${followerNickName}과 ${myNickName}의 채팅방`,
          session.uuid,
          followerId
        );

        const response = await checkOneOnOneChatRoom(session.uuid, followerId);
        if (response.result) {
          router.push(`/chatting/${response.roomId}`);
        }
      }
    } else {
      console.error('UUID is missing.');
    }

    // 있으면 해당 채팅방으로 이동
    // 없으면 채팅방 생성 후 이동
    setIsFollowerListOpen(false);
  };
  const handleNewChat = () => {
    console.log('New Chat');
    setIsFollowerListOpen(true);
  };
  const menuItems: MenuItem[] = [
    { label: '피드 신고하기', onClick: () => alert('피드를 신고했습니다.') },
    { label: '피드 삭제하기', onClick: () => alert('피드를 삭제했습니다.') },
  ];

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col ">
      <CommonHeader title={'채팅'} ismenu={true} menuItems={menuItems} />
      <ScrollArea className="flex-1">
        {roomInfos.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            채팅방이 없습니다
          </div>
        ) : (
          <div className="divide-y">
            {roomInfos.map((chat) => (
              <Link
                key={chat.roomId}
                className="flex items-start gap-4 p-4 transition-colors hover:bg-gray-100/50"
                href={`/chatting/${chat.roomId}`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="https://picsum.photos/200/300"
                      alt={chat.roomId}
                    />
                    <AvatarFallback>{chat.roomName}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <p
                      className="text-base font-semibold truncate"
                      title={chat.roomName}
                    >
                      {chat.roomName.length > 16
                        ? `${chat.roomName.slice(0, 16)}...`
                        : chat.roomName}
                    </p>
                    <p className="text-xs text-[#869AA9] text-right">
                      {chat.updatedAt
                        ? formatDate(chat.updatedAt.toLocaleString())
                        : '방 생성일'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="line-clamp-1 truncate text-sm text-gray-600">
                      {chat.lastChatMessageAt ?? '메시지가 없습니다.'}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="rounded-lg px-2 py-0.5 text-xs font-semibold"
                      >
                        {chat.unreadCount > 999 ? '999+' : chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </ScrollArea>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={handleNewChat}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">New Chat</span>
      </Button>
      <FollowerListModal
        isOpen={isFollowerListOpen}
        onClose={() => setIsFollowerListOpen(false)}
        onSelectFollower={handleSelectFollower}
      />
    </div>
  );
}
