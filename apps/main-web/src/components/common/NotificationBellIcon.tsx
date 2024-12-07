'use client';

interface NotificationBellIconProps {
  hasNotification: boolean;
  onClick: () => void;
}

export default function NotificationBellIcon({
  hasNotification,
  onClick,
}: NotificationBellIconProps) {
  return (
    <button
      type="button"
      aria-label="Notification bell"
      onClick={onClick}
      className={`relative ${hasNotification ? 'ring ring-red-500' : ''}`}
      style={{
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
      }}
    >
      <NotificationBellSvg hasNotification={hasNotification} />
    </button>
  );
}
