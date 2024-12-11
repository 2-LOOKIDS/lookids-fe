import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { postFcmToken } from '../actions/notification/notification';

const firebaseConfig = {
  apiKey: 'AIzaSyAJq8nnctU9mKdsk8F8y8ug0t4MfmZU4lo',
  authDomain: 'lookids-df03a.firebaseapp.com',
  projectId: 'lookids-df03a',
  storageBucket: 'lookids-df03a.firebasestorage.app',
  messagingSenderId: '841496181567',
  appId: '1:841496181567:web:e8a5e07286e1dadf9d318a',
  measurementId: 'G-CB0BDWD6W7',
};

// Firebase 초기화
initializeApp(firebaseConfig);

export function useFcm(
  setNotificationData: (data: any) => void,
  setHasNotification: (status: boolean) => void
) {
  useEffect(() => {
    const messaging = getMessaging();

    if ('serviceWorker' in navigator) {
      // 권한 요청
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            // 서비스 워커 등록 및 FCM 토큰 가져오기
            navigator.serviceWorker
              .register('/firebase-messaging-sw.js')
              .then((registration) => {
                getToken(messaging, {
                  vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                  serviceWorkerRegistration: registration,
                })
                  .then((currentToken) => {
                    if (currentToken) {
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
          } else {
            console.warn('알림 권한이 거부되었습니다.');
          }
        })
        .catch((err) => {
          console.error('알림 권한 요청 중 오류 발생:', err);
        });
    }

    // FCM 알림 수신 처리
    onMessage(messaging, (payload) => {
      setNotificationData((prev: any[]) => [...prev, payload.notification]);
      setHasNotification(true);
    });
  }, [setNotificationData, setHasNotification]);
}
