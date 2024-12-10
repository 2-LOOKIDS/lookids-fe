'use client';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { postFcmToken } from '../actions/notification/notification';
import { useSession } from '../context/SessionContext';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 초기화
initializeApp(firebaseConfig);

export function useNotification() {
  const session = useSession();
  const [notificationData, setNotificationData] = useState<any[]>([]);
  const [hasNotification, setHasNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const messaging = getMessaging();

    // Service Worker 등록
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );

        // FCM 토큰 발급
        getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log('FCM Token:', currentToken);
              postFcmToken(currentToken); // 서버로 FCM 토큰 전송
            } else {
              console.warn('No FCM token available.');
            }
          })
          .catch((err) => {
            console.error('Error while retrieving FCM token:', err);
          });
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });

    // FCM 알림 수신 처리
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      setNotificationData((prev) => [...prev, payload.notification]);
      setHasNotification(true);
    });

    // SSE 연결
    const uuid = session?.uuid;
    const myAccessToken = session?.accessToken;
    if (!uuid) return;
    console.log('MYACCESSTOKEN:', myAccessToken);
    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notification-service/read/notification/user/sse/${uuid}`,
      {
        headers: { Authorization: `Bearer ${myAccessToken}` },
      }
    );
    console.log(eventSource);
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
  }, [session]);

  const openModal = () => {
    setIsModalOpen(true);
    setHasNotification(false); // 알림 상태 초기화
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    notificationData,
    isModalOpen,
    hasNotification,
    closeModal,
    openModal,
  };
}
