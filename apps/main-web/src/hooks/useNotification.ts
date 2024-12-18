'use client';

import { useFcm } from './useFcm';
import { useSse } from './useSse';
import { useState } from 'react';

export function useNotification() {
  const [notificationData, setNotificationData] = useState<any[]>([]);
  const [hasNotification, setHasNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FCM과 SSE 각각에서 데이터를 업데이트하도록 훅을 호출
  useFcm(setNotificationData, setHasNotification);
  useSse(setNotificationData, setHasNotification);

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
