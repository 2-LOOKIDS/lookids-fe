import { useEffect, useState } from 'react';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications'); // SSE 연결

    eventSource.onmessage = (event) => {
      const newNotification: Notification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, newNotification]);
      setHasNotification(true); // 새 알림 상태 활성화
    };

    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };

    return () => {
      eventSource.close(); // 컴포넌트 언마운트 시 연결 해제
    };
  }, []);

  const handleNotification = (data: Notification) => {
    setNotifications((prev) => [...prev, data]);
    setHasNotification(true);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => {
    setIsModalOpen(true);
    setHasNotification(false); // 모달을 열면 새 알림 상태 초기화
  };

  return {
    notifications,
    isModalOpen,
    hasNotification,
    handleNotification,
    closeModal,
    openModal,
  };
}
