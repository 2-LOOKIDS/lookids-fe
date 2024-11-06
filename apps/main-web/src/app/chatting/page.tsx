"use client";

import { Search } from "lucide-react";
import * as React from "react";

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
      id: "1",
      username: "강아지 키워봐",
      avatar: "/placeholder.svg",
      message: "Image Sent",
      timestamp: "10:42 AM",
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: "2",
      username: "Benkaii",
      avatar: "/placeholder.svg",
      message: "Nice clutch vs Fnatic 👍",
      timestamp: "9:42 AM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "3",
      username: "Aleck",
      avatar: "/placeholder.svg",
      message: "COME SCRIM HERE!!!",
      timestamp: "9:42 AM",
      unreadCount: 999,
      isOnline: true,
    },
  ]);

  return (
    <div className="w-full max-w-md mx-auto bg-[#F8F8F9] h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/50 backdrop-blur-sm border-b">
        <div className="px-5 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#1B1F31]/80">채팅</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-6 h-6 text-[#313737]" />
            </button>
            <Badge
              variant="destructive"
              className="rounded-full h-5 min-w-[20px] px-1.5"
            >
              2
            </Badge>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="divide-y">
          {messages.map((chat) => (
            <div
              key={chat.id}
              className="flex items-start gap-4 p-4 hover:bg-gray-100/50 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} alt={chat.username} />
                  <AvatarFallback>{chat.username[0]}</AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#3BCD23] border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-base truncate">
                    {chat.username}
                  </p>
                  <p className="text-[#869AA9] text-xs whitespace-nowrap">
                    {chat.timestamp}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.message}
                  </p>
                  {chat.unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="rounded-lg px-2 py-0.5 text-xs font-semibold"
                    >
                      {chat.unreadCount > 999 ? "999+" : chat.unreadCount}
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
