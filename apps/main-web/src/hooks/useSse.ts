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

    if (!uuid) return;

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
      console.log('THIS IS FROM SSE', data);
      setNotificationData((prev) => [...prev, ...data]);
      setHasNotification(true);
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [session, setNotificationData, setHasNotification]);
}
