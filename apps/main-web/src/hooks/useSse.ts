import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect } from 'react';
import { useSession } from '../context/SessionContext';

export function useSse(
  setNotificationData: (data: ((prev: any[]) => any[]) | any[]) => void,
  setHasNotification: (status: boolean) => void
) {
  const session = useSession();

  useEffect(() => {
    const uuid = session?.uuid;
    const myAccessToken = session?.accessToken;

    if (!uuid) {
      console.warn('유효한 세션 정보가 없습니다.');
      return;
    }

    const connectEventSource = () => {
      const eventSource = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notification-service/read/notification/user/sse/${uuid}`,
        {
          headers: { Authorization: `Bearer ${myAccessToken}` },
        }
      );

      eventSource.onopen = () => {
        console.log('SSE 연결 완료');
      };

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('SSE 메시지 수신:', data);
        setNotificationData((prev) => [...prev, ...data]);
        setHasNotification(true);
      };

      eventSource.onerror = (error) => {
        console.error('SSE 연결 오류:', error);
        eventSource.close();
        setTimeout(() => {
          connectEventSource();
        }, 3000);
      };

      return eventSource;
    };

    const eventSource = connectEventSource();

    return () => {
      if (eventSource) {
        eventSource.close();
        console.log('SSE 연결 종료');
      }
    };
  }, [session, setNotificationData, setHasNotification]);
}
