'use client';

import { useState } from 'react';
import InputSection from '../../../../components/pages/chatting/Input';
import MessageSection from '../../../../components/pages/chatting/Message'; // MessageSection에서 데이터 fetch
import CommonHeader from '../../../../components/ui/CommonHeader';

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const chatId = params.chatId;
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      console.log('Sending message:', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 sm:mx-auto sm:max-w-md sm:border-x sm:border-gray-200">
      <CommonHeader title={`Chat Room: ${chatId}`} ismenu={true} />
      <MessageSection chatId={chatId} />
      <InputSection
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
