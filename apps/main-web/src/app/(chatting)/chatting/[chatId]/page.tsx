'use client';

import { useState } from 'react';
import InputSection from '../../../../components/pages/chatting/Input';
import MessageSection from '../../../../components/pages/chatting/Message';
import CommonHeader from '../../../../components/ui/CommonHeader';
import { Message } from '../../../../types/chatting/ChattingType';

export default function ChatPage() {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: '부산 제임스',
      avatar: '/jihunpistol.jpg',
      message: 'Hahaha, lol 🤣',
      createdAt: '09:27 PM',
      messageType: 'received',
      roomId: '1',
      updatedAt: '',
    },
    {
      id: '2',
      senderId: '부산 제임스',
      avatar: '/jihunpistol.jpg',
      message: 'How are you?',
      createdAt: '09:27 PM',
      messageType: 'received',
      roomId: '1',
      updatedAt: '',
    },
    {
      id: '3',
      senderId: '알렉스',
      avatar: '/alex.jpg',
      message: 'I am good, thank you!',
      createdAt: '09:27 PM',
      messageType: 'sent',
      roomId: '1',
      updatedAt: '',
    },
    {
      id: '4',
      senderId: '알렉스',
      avatar: '/alex.jpg',
      message: 'How about you?',
      createdAt: '09:27 PM',
      messageType: 'sent',
      roomId: '1',
      updatedAt: '',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      console.log('Sending message:', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#F8F8F9] sm:mx-auto sm:max-w-md sm:border-x sm:border-gray-200">
      <CommonHeader title="채팅방 이름 들어감" />
      <MessageSection messages={messages} />
      <InputSection
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
