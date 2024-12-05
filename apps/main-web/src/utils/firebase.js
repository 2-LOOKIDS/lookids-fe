import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);

let messaging = null;

// 브라우저 환경에서만 Messaging 초기화
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(firebaseApp);
    }
  });
}

// FCM 메시지 수신 대기 설정
export const onForegroundMessage = (callback) => {
  if (!messaging) {
    console.warn('Messaging is not supported in this environment.');
    return;
  }

  onMessage(messaging, (payload) => {
    callback(payload);
  });
};

export { messaging };
