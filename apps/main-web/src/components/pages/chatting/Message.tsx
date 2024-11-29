'use client';

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
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // 중복 메시지 제거 함수
  const addUniqueMessages = (newMessages: MessageResponse[]) => {
    setMessages((prev) => {
      const existingIds = new Set(prev.map((msg) => msg.id));
      const filteredMessages = newMessages.filter(
        (msg) => !existingIds.has(msg.id)
      );
      return [...newMessages, ...prev];
    });
  };

  // 메시지 불러오기 함수
  const loadMoreMessages = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    // 현재 스크롤 높이 저장
    const container = messagesContainerRef.current;
    const prevScrollHeight = container?.scrollHeight || 0;

    try {
      const newMessages = await fetchInitialMessages(chatId, page + 1);
      if (newMessages.length === 0) {
        setHasMore(false);
      } else {
        addUniqueMessages(newMessages); // 중복 제거 후 추가
        setPage((prevPage) => prevPage + 1);
      }

      // 스크롤 위치 복원
      setTimeout(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - prevScrollHeight;
        }
      }, 0);
    } catch (error) {
      console.error('Failed to load more messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container || isLoading || !hasMore) return;

    // 스크롤이 최상단에 도달했는지 확인
    if (container.scrollTop === 0) {
      loadMoreMessages();
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

        // 초기 메시지 로딩 후 맨 아래로 스크롤
        const container = messagesContainerRef.current;
        setTimeout(() => {
          if (container) container.scrollTop = container.scrollHeight;
        }, 0);
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    };

    initialize();
  }, [chatId, participants]);

  return (
    <section
      ref={messagesContainerRef} // 메시지 컨테이너 참조
      className="flex-1 overflow-y-auto px-4 pb-4 sm:px-5"
      aria-label="Chat messages"
      onScroll={handleScroll} // 스크롤 이벤트
    >
      <ul>
        {messages.map((message) => {
          const senderProfile = participantsProfile[message.senderId];
          const userImageUrl = getMediaUrl(senderProfile?.image || '');

          if (!senderProfile) return null;

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
                        <img
                          src={userImageUrl}
                          alt={`${senderProfile.nickname || 'User'}'s profile`}
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
      </ul>
      {isLoading && <p>Loading more messages...</p>}
    </section>
  );
}
