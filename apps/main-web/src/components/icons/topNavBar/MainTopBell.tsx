'use client';
import { useEffect } from 'react';
import { onForegroundMessage } from '../../../utils/firebase';

interface NotificationPayload {
  title: string;
  body: string;
  [key: string]: any;
}

export default function BellTest({
  onNotification,
}: {
  onNotification: (data: NotificationPayload) => void;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && onForegroundMessage) {
      onForegroundMessage((payload: NotificationPayload) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('FCM 메시지 수신:', payload);
        }
        onNotification(payload); // 부모 컴포넌트로 알림 데이터 전달
      });
    }
  }, [onNotification]);

  return null; // UI가 필요하지 않음
}
