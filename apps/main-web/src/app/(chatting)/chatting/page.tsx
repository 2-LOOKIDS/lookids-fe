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
import { useEffect, useRef, useState } from 'react';
import { getChattingList } from '../../../actions/chatting/Chatting';
import { FollowerListModal } from '../../../components/pages/chatting/FollowerListModal';
import CommonHeader from '../../../components/ui/CommonHeader';
import { useSession } from '../../../context/SessionContext';
import { RoomMessage } from '../../../types/chatting/ChattingType';
import { PaginationResponse } from '../../../types/responseType';

export default function Page() {
  const session = useSession();
  const [roomInfos, setRoomInfos] = useState<RoomMessage[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const [isFollowerListOpen, setIsFollowerListOpen] = useState(false);
  useEffect(() => {
    const uuid = session?.uuid;
    if (!uuid) {
      console.error('UUID is missing.');
      return;
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const fetchInitialRoomInfos = async () => {
      try {
        const data: PaginationResponse<RoomMessage> =
          await getChattingList(uuid);
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

  const handleNewChat = () => {
    setIsFollowerListOpen(true);
  };

  const handleSelectFollower = (followerId: string) => {
    console.log(`Selected follower: ${followerId}`);
    setIsFollowerListOpen(false);
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col bg-[#F8F8F9]">
      <CommonHeader title={'채팅'} ismenu={false} />
      <ScrollArea className="flex-1">
        {roomInfos.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            채팅방이 없습니다
          </div>
        ) : (
          <div className="divide-y">
            {roomInfos
              .slice()
              .reverse()
              .map((chat) => (
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
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-base font-semibold">
                        {chat.roomName}
                      </p>
                      <p className="whitespace-nowrap text-xs text-[#869AA9]">
                        {chat.updatedAt
                          ? chat.updatedAt.toLocaleString()
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
