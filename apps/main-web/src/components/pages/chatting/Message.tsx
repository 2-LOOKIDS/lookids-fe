'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSession } from '../../../context/SessionContext';
import {
  MessageResponse,
  MessageSectionProps,
} from '../../../types/chatting/ChattingType';
import { UserInfo } from '../../../types/user';
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
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [participantsProfile, setParticipantsProfile] = useState<
    Record<string, UserInfo>
  >({});
  const eventSourceRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 중복 메시지 제거 함수
  const addUniqueMessages = (newMessages: MessageResponse[]) => {
    setMessages((prev) => {
      const existingIds = new Set(prev.map((msg) => msg.id)); // 기존 메시지의 ID 집합
      const filteredMessages = newMessages.filter(
        (msg) => !existingIds.has(msg.id)
      ); // 중복 제거
      return [...prev, ...filteredMessages];
    });
  };

  // 메시지 불러오기 함수
  const loadMoreMessages = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const newMessages = await fetchInitialMessages(chatId, page + 1);
      if (newMessages.length === 0) {
        setHasMore(false);
      } else {
        addUniqueMessages(newMessages); // 중복 제거 후 추가
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to load more messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기화
  useEffect(() => {
    const initialize = async () => {
      try {
        const profiles = await fetchParticipantsProfile(participants);
        setParticipantsProfile(profiles);

        const initialMessages = await fetchInitialMessages(chatId, 0);
        addUniqueMessages(initialMessages); // 초기 메시지도 중복 제거
        setPage(1);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    };

    initialize();
  }, [chatId, participants]);

  // 옵저버로 상단 감지 및 메시지 로드
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading) {
        loadMoreMessages();
      }
    };

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    const observerTarget = topRef.current;
    if (observerTarget) {
      observerRef.current.observe(observerTarget);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isLoading, hasMore]);

  return (
    <section
      className="flex-1 overflow-y-auto px-4 pb-4 sm:px-5"
      aria-label="Chat messages"
    >
      <ul>
        <div ref={topRef} /> {/* 상단 감지용 div */}
        {messages
          .slice()
          .reverse()
          .map((message) => {
            const senderProfile = participantsProfile[message.senderId];
            const userImageUrl = getMediaUrl(senderProfile?.image || '');

            if (!senderProfile) {
              console.warn(
                `Profile not found for senderId: ${message.senderId}`
              );
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
                    </footer>
                  </article>
                )}
              </li>
            );
          })}
        <div ref={messagesEndRef} /> {/* 하단 참조 */}
      </ul>
      {isLoading && <p>Loading more messages...</p>}
    </section>
  );
}
f;
