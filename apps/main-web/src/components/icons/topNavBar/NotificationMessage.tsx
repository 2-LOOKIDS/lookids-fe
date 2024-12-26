'use client';

import Link from 'next/link';
import { getMediaUrl } from '../../../utils/media';

export interface NotificationData {
  content: string;
  createdAt: string;
  feedCode: string;
  id: any;
  mediaUrl: string;
  senderUuid: string;
  title: string;
  type: string;
}

interface NotificationMessageProps {
  notification: NotificationData;
}

export function NotificationMessage({
  notification,
}: NotificationMessageProps) {
  const isFeedNotification =
    notification.type === '피드' && notification.feedCode;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-start">
        {notification.mediaUrl && (
          <img
            src={getMediaUrl(notification.mediaUrl)}
            alt="Notification media"
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{notification.title}</h3>
          <p className="text-gray-600 mb-2">{notification.content}</p>
          {isFeedNotification ? (
            <Link
              href={`/feed/${notification.feedCode}`}
              className="text-lookids hover:underline"
            >
              피드 보기
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
