"use client";

import { useEffect, useState } from "react";

export interface ChatMessageType {
  id: string;
  roomId: string;
  messageType: string;
  message: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
}

export default function ChatView({ roomId }: { roomId: string }) {
  // 이벤트 소스 -> Header에 Token을 못 준다.
  const [chatData, setChatData] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:9000/api/v1/chat/${roomId}",
    );
    eventSource.onmessage = (event) => {
      const newChatData = JSON.parse(event.data);
      setChatData([...chatData, newChatData]);
    };
  }, []);
  return <div>ChatView</div>;
}
