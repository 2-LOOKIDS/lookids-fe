'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  deleteChattingRoom,
  enterChatRoom,
  leaveChattingRoom,
  sendTextMessage,
  updateChatRoomName,
} from '../../../../actions/chatting/Chatting';
import InputSection from '../../../../components/pages/chatting/Input';
import MessageSection from '../../../../components/pages/chatting/Message';
import CommonHeader from '../../../../components/ui/CommonHeader';
import { useSession } from '../../../../context/SessionContext';
import { MenuItem } from '../../../../types/common/MenuType';

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const session = useSession();
  const chatId = params.chatId;
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [isRoomInfoLoaded, setIsRoomInfoLoaded] = useState(false);
  const MySwal = withReactContent(Swal);

  const menuItems: MenuItem[] = [
    {
      label: '채팅방 나가기',
      onClick: async () => {
        const result = await MySwal.fire({
          title: '채팅방 나가기',
          text: '채팅방을 나갈 경우 상대방의 채팅방도 함께 없어집니다. 나가시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '네, 나가겠습니다',
          cancelButtonText: '취소',
        });

        if (result.isConfirmed) {
          try {
            await deleteChattingRoom(chatId);
            await MySwal.fire({
              title: '완료!',
              text: '채팅방이 성공적으로 삭제되었습니다.',
              icon: 'success',
              confirmButtonText: '확인',
            });
            router.push('/chatting');
          } catch (error) {
            console.error('채팅방 삭제 실패:', error);
            await MySwal.fire({
              title: '오류!',
              text: '채팅방을 삭제하는 중 문제가 발생했습니다.',
              icon: 'error',
              confirmButtonText: '확인',
            });
          }
        }
      },
    },
    {
      label: '대화상대 추가하기',
      onClick: async () => {
        await MySwal.fire({
          text: '아직 구현중인 서비스입니다.',
          icon: 'warning',
          confirmButtonText: '확인',
        });
      },
    },
    {
      label: '채팅방 이름 변경하기',
      onClick: async () => {
        const result = await Swal.fire({
          title: '채팅방 이름 변경하기',
          html: `
          채팅방 이름을 변경할 경우<br>
          상대방의 채팅방 이름도 같이 변경됩니다.
        `,
          input: 'text', // 텍스트 입력 필드 추가
          inputPlaceholder: '변경할 채팅방 이름을 입력하세요',
          showCancelButton: true,
          confirmButtonText: '변경하기',
          cancelButtonText: '취소',
          inputValidator: (value) => {
            if (!value) {
              return '채팅방 이름을 입력하세요!';
            }
          },
        });

        if (result.isConfirmed && result.value) {
          const newChatRoomName = result.value;
          // 여기에 원하는 함수 실행
          // 예: 채팅방 이름 업데이트 API 호출
          await updateChatRoomName(params.chatId, newChatRoomName);
          window.location.reload();
        }
      },
    },
  ];

  useEffect(() => {
    let isMounted = true;

    const handleLeaveChatRoom = () => {
      if (isMounted) {
        leaveChattingRoom(chatId, session?.uuid || '');
      }
    };

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
