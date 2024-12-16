'use client';

import { Bell, Circle } from 'lucide-react';

interface NotificationBellIconProps {
  hasNotification: boolean;
  onClick: () => void;
}

export default function NotificationBellIcon({
  hasNotification,
  onClick,
}: NotificationBellIconProps) {
  return (
    <div onClick={onClick} className="relative">
      {hasNotification && (
        <Circle size="7" fill="red" className="absolute top-0 right-1" />
      )}
      <Bell color="#ffa200" size={22} />
    </div>
  );
}
