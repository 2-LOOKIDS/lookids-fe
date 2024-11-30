'use client';

import { useEffect, useRef, useState } from 'react';
import {
  enterChatRoom,
  leaveChattingRoom,
  sendTextMessage,
} from '../../../../actions/chatting/Chatting';
import InputSection from '../../../../components/pages/chatting/Input';
import MessageSection from '../../../../components/pages/chatting/Message';
import CommonHeader from '../../../../components/ui/CommonHeader';
import { useSession } from '../../../../context/SessionContext';
import { MenuItem } from '../../../../types/common/MenuType';
import { scrollToBottom } from '../../../../utils/scroll';

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const session = useSession();
  const chatId = params.chatId;
  const [inputMessage, setInputMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [isRoomInfoLoaded, setIsRoomInfoLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const menuItems: MenuItem[] = [
    { label: '채팅방 나가기', onClick: () => alert('어떻게 할지 고민중') },
    // 채팅방 나가는 API 구현 필요
    {
      label: '대화상대 추가하기',
      onClick: () => alert('대화상대 추가하기.'),
    },
  ];

  useEffect(() => {
    let isMounted = true;

    const handleLeaveChatRoom = () => {
      if (isMounted) {
        leaveChattingRoom(chatId, session?.uuid || '');
      }
    };

    // beforeunload 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleLeaveChatRoom);

    const getRoomInfo = async () => {
      try {
        const data = await enterChatRoom(chatId, session?.uuid || '');
        if (isMounted) {
          setRoomName(data.roomName);
          setParticipants(data.participants);
          setIsRoomInfoLoaded(true);
        }
      } catch (error) {
        console.error('Failed to fetch room info:', error);
        if (isMounted) setIsRoomInfoLoaded(true);
      }
    };

    getRoomInfo();

    // 컴포넌트 언마운트 시 리스너 제거 및 leaveChattingRoom 호출
    return () => {
      isMounted = false;
      leaveChattingRoom(chatId, session?.uuid || '');
      window.removeEventListener('beforeunload', handleLeaveChatRoom);
    };
  }, [chatId, session]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      sendTextMessage({
        roomId: chatId,
        messageType: '텍스트',
        message: inputMessage,
        senderId: session?.uuid || '',
      });
      scrollToBottom(messagesEndRef);
      setInputMessage('');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 sm:mx-auto sm:max-w-md sm:border-x sm:border-gray-200">
      <CommonHeader
        title={`${roomName || 'Loading...'}`}
        ismenu={true}
        menuItems={menuItems}
      />
      {isRoomInfoLoaded && participants.length > 0 ? (
        <MessageSection chatId={chatId} participants={participants} />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>Loading chat room information...</p>
        </div>
      )}
      <InputSection
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
