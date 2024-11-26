'use client';

import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';
import { getChatList } from '../../../actions/chatting/Chatting';
import { useSession } from '../../../context/SessionContext';
import { MessageResponse } from '../../../types/chatting/ChattingType';
import { responseList } from '../../../types/responseType';

interface MessageSectionProps {
  chatId: string;
}

export default function MessageSection({ chatId }: MessageSectionProps) {
  const session = useSession();
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  // 먼저 채팅방 정보를 가져온다. -> 이 때, PUT /chat/enter/{roomId}/{userId}  API 호출

  // 거기서 Participants 정보를 가져와서 이를 통해 각각 참가자들의 프로필 정보를 가져온다.
  // 그리고 채팅방의 메시지를 useEffe가져온다.
  useEffect(() => {
    const uuid = session?.uuid || '';

    if (!uuid) {
      console.error('UUID is missing.');
      return;
    }
  }, [session]);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const data: responseList<MessageResponse> = await getChatList(chatId);
        setMessages(data.content);
        return data?.content || [];
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        throw new Error(`Failed to fetch messages: ${error}`);
      }
    };

    fetchInitialMessages();

    const connectEventSource = () => {
      const myAccessToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJpc3N1ZWRBdCI6MTczMjE3MDEwMzUyOCwiZXhwaXJhdGlvbiI6MTczMjI1NjUwMzUyOH0.TVN3ej02Apv2EXkeGoTeKdUs8tBCyY8KOgRi4oz1y2_cfQLbmgA7qsP27beaZfHwtA6fxTOai_wcRyswYF4i7w';
      if (!myAccessToken) {
        console.error('Missing access token');
        return;
      }

      const eventSource = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chatting-service/read/chat/reactive/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${myAccessToken}`,
          },
        }
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
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

    fetchInitialMessages();
    connectEventSource();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [chatId, reconnectAttempts]);

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-5">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.senderId === session.uuid ? 'justify-end' : 'justify-start'}`}
        >
          {message.senderId != session.uuid && (
            <div className="flex max-w-[75%] flex-col gap-2">
              <div className="flex items-center gap-2">
                {message.image && (
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 sm:h-9 sm:w-9">
                    <img
                      src={message.image}
                      alt={message.nickname}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <span className="text-sm font-medium">{message.nickname}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-block rounded-lg rounded-tl-none border border-[#E5EBEF] bg-[#FBFBFD] px-3 py-2 sm:px-4 sm:py-3">
                  <p className="text-sm font-medium text-[#161616]">
                    {message.message}
                  </p>
                </div>
                <span className="text-xs text-[#869AA9]">
                  {message.createdAt}
                </span>
              </div>
            </div>
          )}

          {message.senderId === session.uuid && (
            <div className="flex max-w-[75%] flex-col items-end gap-1">
              <div className="inline-block rounded-lg rounded-tr-none bg-[#FD9340] px-3 py-2 sm:px-4 sm:py-3">
                <p className="text-sm font-medium text-white">
                  {message.message}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#869AA9]">
                  {message.createdAt}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 8L7 11L12 5" stroke="#F1674A" strokeWidth="1" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
