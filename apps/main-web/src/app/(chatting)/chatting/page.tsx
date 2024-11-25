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
import { RoomMessage } from '../../../types/chatting/ChattingType';

export default function Page() {
  const [roomInfos, setRoomInfos] = useState<RoomMessage[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const [isFollowerListOpen, setIsFollowerListOpen] = useState(false);

  useEffect(() => {
    const fetchInitialRoomInfos = async () => {
      try {
        const data = await getChattingList(
          'normal-cc56330c-579d-4533-8930-d3ab48ce97e3'
        );
        setRoomInfos(data);
      } catch (error) {
        console.error('Failed to fetch chatting list:', error);
      }
    };

    const connectEventSource = () => {
      const myAccessToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJpc3N1ZWRBdCI6MTczMjE3MDEwMzUyOCwiZXhwaXJhdGlvbiI6MTczMjI1NjUwMzUyOH0.TVN3ej02Apv2EXkeGoTeKdUs8tBCyY8KOgRi4oz1y2_cfQLbmgA7qsP27beaZfHwtA6fxTOai_wcRyswYF4i7w';
      const uuid = 'normal-cc56330c-579d-4533-8930-d3ab48ce97e3';
      if (!myAccessToken || !uuid) {
        console.error('Missing accessToken or uuid');
        return;
      }

      const eventSource = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chatting-service/read/chat/reactive/rooms/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${myAccessToken}`,
          },
        }
      );

      eventSource.onmessage = (event) => {
        console.log('EventSource message:', event.data);
        const newMessage: RoomMessage = JSON.parse(event.data);
        setRoomInfos((prevMessages) => [...prevMessages, newMessage]);
      };

      eventSource.onerror = () => {
        console.error('EventSource failed.');
        eventSource.close();

        setTimeout(
          () => {
            setReconnectAttempts((prev) => prev + 1);
          },
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
  }, [reconnectAttempts]);

  const handleNewChat = () => {
    setIsFollowerListOpen(true);
  };

  const handleSelectFollower = (followerId: string) => {
    // Handle the follower selection here
    console.log(`Selected follower: ${followerId}`);
    // You might want to create a new chat room with this follower
    // and navigate to that chat room
    setIsFollowerListOpen(false);
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col bg-[#F8F8F9]">
      <CommonHeader title={'채팅'} />
      <ScrollArea className="flex-1">
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
                      alt={chat.userId}
                    />
                    <AvatarFallback>{chat.userId}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-base font-semibold">
                      {chat.roomName}
                    </p>
                    <p className="whitespace-nowrap text-xs text-[#869AA9]">
                      {chat.lastChatMessageAt}09:50 A.M.
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="line-clamp-1 truncate text-sm text-gray-600">
                      {chat.lastChatMessage}아야야야야
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
