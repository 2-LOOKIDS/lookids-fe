import { EventSourcePolyfill } from 'event-source-polyfill';
import { MessageResponse } from '../../types/chatting/ChattingType';

/**
 * EventSource를 설정하고 연결하는 유틸 함수
 */
export function connectEventSource(
  chatId: string,
  myAccessToken: string,
  onMessage: (data: MessageResponse) => void
) {
  if (!myAccessToken) {
    console.error('Missing access token');
    return null;
  }

  const eventSource = new EventSourcePolyfill(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/chatting-service/read/chat/reactive/${chatId}`,
    {
      headers: { Authorization: `Bearer ${myAccessToken}` },
    }
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received data from EventSource:', data);
    onMessage(data);
  };

  eventSource.onerror = () => {
    console.error('EventSource error, retrying...');
    eventSource.close();
    setTimeout(() => {
      connectEventSource(chatId, myAccessToken, onMessage);
    }, 1500);
  };

  return eventSource;
}
