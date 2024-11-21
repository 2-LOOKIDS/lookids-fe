'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Badge } from '@repo/ui/components/ui/badge';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { Search } from 'lucide-react';
import * as React from 'react';
interface ChatMessage {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function Component() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      username: '강아지 키워봐',
      avatar: '/placeholder.svg',
      message: 'Image Sent',
      timestamp: '10:42 AM',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: '2',
      username: 'Benkaii',
      avatar: '/placeholder.svg',
      message: 'Nice clutch vs Fnatic 👍',
      timestamp: '9:42 AM',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '3',
      username: 'Aleck',
      avatar: '/placeholder.svg',
      message: 'COME SCRIM HERE!!!',
      timestamp: '9:42 AM',
      unreadCount: 999,
      isOnline: true,
    },
  ]);

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col bg-[#F8F8F9]">
      <header className="sticky top-0 z-10 border-b bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-lg font-bold text-[#1B1F31]/80">채팅</h1>
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-gray-100">
              <Search className="h-6 w-6 text-[#313737]" />
            </button>
            <Badge
              variant="destructive"
              className="h-5 min-w-[20px] rounded-full px-1.5"
            ></Badge>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="divide-y">
          {messages.map((chat) => (
            <div
              key={chat.id}
              className="flex items-start gap-4 p-4 transition-colors hover:bg-gray-100/50"
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
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
