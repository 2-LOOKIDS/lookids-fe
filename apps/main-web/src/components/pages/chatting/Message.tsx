'use client';

import { EventSourcePolyfill } from 'event-source-polyfill';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSession } from '../../../context/SessionContext';
import {
  MessageResponse,
  MessageSectionProps,
} from '../../../types/chatting/ChattingType';
import { UserInfo } from '../../../types/user';
import { connectEventSource } from '../../../utils/chatting/eventSource';
import { fetchInitialMessages } from '../../../utils/chatting/fetchMessages';
import { fetchParticipantsProfile } from '../../../utils/chatting/fetchProfiles';
import { formatDate } from '../../../utils/formatDate';
import { getMediaUrl } from '../../../utils/media';

export default function MessageSection({
  chatId,
  participants,
}: MessageSectionProps) {
  const session = useSession();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState<MessageResponse[] | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const [participantsProfile, setParticipantsProfile] = useState<
    Record<string, UserInfo>
  >({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 스크롤 끝 지점을 참조하기 위한 ref

  // 스크롤을 맨 아래로 내리는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const profiles = await fetchParticipantsProfile(participants);
        setParticipantsProfile(profiles);

        const initialMessages = await fetchInitialMessages(chatId);
        setMessages(initialMessages);
        scrollToBottom(); // 초기 메시지 로딩 후 스크롤 이동

        const myAccessToken = session?.accessToken || '';

        eventSourceRef.current = connectEventSource(
          chatId,
          myAccessToken,
          (newMessage) => {
            setMessages((prev) => {
              const updatedMessages = prev?.some(
                (msg) => msg.id === newMessage.id
              )
                ? prev
                : [...(prev || []), newMessage];
              return updatedMessages;
            });
            scrollToBottom(); // 새로운 메시지 추가 시 스크롤 이동
          },
          () => setReconnectAttempts((prev) => prev + 1)
        );
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    };

    initialize();

    return () => {
      eventSourceRef.current?.close();
    };
  }, [chatId, participants, reconnectAttempts]);

  if (!messages) return <p>Loading messages...</p>;

  return (
    <section
      className="flex-1 overflow-y-auto px-4 pb-4 sm:px-5"
      aria-label="Chat messages"
    >
      <ul>
        {messages.map((message) => {
          const senderProfile = participantsProfile[message.senderId];
          const userImageUrl = getMediaUrl(senderProfile?.image || '');

          if (!senderProfile) {
            console.warn(`Profile not found for senderId: ${message.senderId}`);
            return null;
          }

          const isUserMessage = message.senderId === session.uuid;

          return (
            <li
              key={message.id}
              className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
            >
              {!isUserMessage && (
                <article className="flex max-w-[75%] flex-col gap-2">
                  <header className="flex items-center gap-2">
                    {senderProfile.image && (
                      <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 sm:h-9 sm:w-9">
                        <Image
                          src={userImageUrl}
                          alt={`${senderProfile.nickname || 'User'}'s profile`}
                          priority
                          width={36}
                          height={36}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {senderProfile.nickname || 'Unknown'}
                    </span>
                  </header>
                  <div className="flex flex-col gap-1">
                    <p className="inline-block rounded-lg rounded-tl-none border border-[#E5EBEF] bg-[#FBFBFD] px-3 py-2 text-sm font-medium text-[#161616] sm:px-4 sm:py-3">
                      {message.message}
                    </p>
                    <time className="text-xs text-[#869AA9]">
                      {formatDate(message.createdAt)}
                    </time>
                  </div>
                </article>
              )}

              {isUserMessage && (
                <article className="flex max-w-[75%] flex-col items-end gap-1">
                  <p className="inline-block rounded-lg rounded-tr-none bg-[#FD9340] px-3 py-2 text-sm font-medium text-white sm:px-4 sm:py-3">
                    {message.message}
                  </p>
                  <footer className="flex items-center gap-1">
                    <time className="text-xs text-[#869AA9]">
                      {formatDate(message.createdAt)}
                    </time>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 8L7 11L12 5"
                        stroke="#F1674A"
                        strokeWidth="1"
                      />
                    </svg>
                  </footer>
                </article>
              )}
            </li>
          );
        })}
        <div ref={messagesEndRef} /> {/* 스크롤 끝 지점 */}
      </ul>
    </section>
  );
}
