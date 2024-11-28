'use client';

import { useEffect, useRef, useState } from 'react';
import {
  enterChatRoom,
  sendTextMessage,
} from '../../../../actions/chatting/Chatting';
import InputSection from '../../../../components/pages/chatting/Input';
import MessageSection from '../../../../components/pages/chatting/Message'; // MessageSection에서 데이터 fetch
import CommonHeader from '../../../../components/ui/CommonHeader';
import { useSession } from '../../../../context/SessionContext';
import { scrollToBottom } from '../../../../utils/scroll';

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const session = useSession();
  const chatId = params.chatId;
  const [inputMessage, setInputMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [isRoomInfoLoaded, setIsRoomInfoLoaded] = useState(false); // 방 정보 로드 상태 추가
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 스크롤 끝 지점을 참조하기 위한 ref

  useEffect(() => {
    const getRoomInfo = async () => {
      try {
        const data = await enterChatRoom(chatId, session?.uuid || '');
        setRoomName(data.roomName);
        setParticipants(data.participants);
        setIsRoomInfoLoaded(true); // 방 정보 로드 완료 상태 설정
        console.log(roomName, participants);
      } catch (error) {
        console.error('Failed to fetch room info:', error);
        setIsRoomInfoLoaded(true); // 에러 발생 시에도 로드 완료로 설정
      }
    };

    getRoomInfo();
  }, [chatId, session]);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      // 여기서 input Message를 서버로 전송
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
      <CommonHeader title={`${roomName || 'Loading...'}`} ismenu={true} />
      {isRoomInfoLoaded && participants.length > 0 ? ( // 참여자 정보가 로드된 경우에만 MessageSection 렌더링
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
