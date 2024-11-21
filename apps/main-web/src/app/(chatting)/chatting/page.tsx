'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Badge } from '@repo/ui/components/ui/badge';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CommonHeader from '../../../components/ui/CommonHeader';
import { ChattingList } from '../../../types/chatting/ChattingType';

// Import EventSourcePolyfill
import { EventSourcePolyfill } from 'event-source-polyfill';

export default function Page() {
  const [messages, setMessages] = useState<ChattingList[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  useEffect(() => {
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
        const newMessage: ChattingList = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      eventSource.onerror = () => {
        console.error('EventSource failed.');
        eventSource.close();

        // Attempt reconnection with exponential backoff
        setTimeout(
          () => {
            setReconnectAttempts((prev) => prev + 1);
            // connectEventSource();
          },
          Math.min(1000 * 2 ** reconnectAttempts, 30000)
        ); // Max 30 seconds delay
      };

      return () => {
        eventSource.close();
      };
    };

    connectEventSource();

    return () => {
      // Clean up on component unmount
      setReconnectAttempts(0);
    };
  }, [reconnectAttempts]);

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col bg-[#F8F8F9]">
      <CommonHeader title={'채팅'} />
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {messages.map((chat) => (
            <Link
              key={chat.id}
              className="flex items-start gap-4 p-4 transition-colors hover:bg-gray-100/50"
              href={`/chatting/${chat.id}`}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} alt={chat.username} />
                  <AvatarFallback>{chat.username[0]}</AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#3BCD23]" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-base font-semibold">
                    {chat.username}
                  </p>
                  <p className="whitespace-nowrap text-xs text-[#869AA9]">
                    {chat.timestamp}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm text-gray-600">
                    {chat.message}
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
    </div>
  );
}
