import { useState } from 'react';

export function useNotification() {
  const [notificationData, setNotificationData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const handleNotification = (data: any) => {
    setNotificationData(data);
    setHasNotification(true);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return {
    notificationData,
    isModalOpen,
    hasNotification,
    handleNotification,
    closeModal,
    openModal,
  };
}
