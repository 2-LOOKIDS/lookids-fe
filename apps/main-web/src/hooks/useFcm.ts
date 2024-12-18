import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { initializeApp } from 'firebase/app';
import { postFcmToken } from '../actions/notification/notification';
import { useEffect } from 'react';

// Firebase 초기화
const firebaseConfig = {
  apiKey: 'AIzaSyAJq8nnctU9mKdsk8F8y8ug0t4MfmZU4lo',
  authDomain: 'lookids-df03a.firebaseapp.com',
  projectId: 'lookids-df03a',
  storageBucket: 'lookids-df03a.firebasestorage.app',
  messagingSenderId: '841496181567',
  appId: '1:841496181567:web:e8a5e07286e1dadf9d318a',
  measurementId: 'G-CB0BDWD6W7',
};

initializeApp(firebaseConfig);

export function useFcm(
  setNotificationData: (data: any) => void,
  setHasNotification: (status: boolean) => void
) {
  useEffect(() => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      console.warn(
        '푸시 알림 또는 Service Worker를 지원하지 않는 브라우저입니다.'
      );
      return;
    }
    const messaging = getMessaging();

    Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          console.log('알림 권한이 허용되었습니다.');

          navigator.serviceWorker
            .register('/firebase-messaging-sw.js')
            .then((registration) => {
              console.log('Service Worker 등록 성공:', registration.scope);

              const messaging = getMessaging();
              getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                serviceWorkerRegistration: registration,
              })
                .then((currentToken) => {
                  if (currentToken) {
                    console.log('FCM Token:', currentToken);
                    postFcmToken(currentToken); // 서버로 FCM 토큰 전송
                  } else {
                    console.warn('FCM 토큰을 가져올 수 없습니다.');
                  }
                })
                .catch((err) => {
                  console.error('FCM 토큰 요청 중 오류 발생:', err);
                });
            })
            .catch((err) => {
              console.error('Service Worker 등록 실패:', err);
            });
        } else {
          console.warn('알림 권한이 거부되었습니다.');
        }
      })
      .catch((err) => {
        console.error('알림 권한 요청 중 오류 발생:', err);
      });

    // FCM 알림 수신 처리
    onMessage(messaging, (payload) => {
      console.log('Message received: ', payload);
    });
  }, [setNotificationData, setHasNotification]);
}
