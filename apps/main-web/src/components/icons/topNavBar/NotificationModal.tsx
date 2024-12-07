import { Button } from '@repo/ui/components/ui/button';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';

interface NotificationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  notifications: { id: string; message: string; timestamp: string }[];
}

export function NotificationModal({
  isOpen,
  closeModal,
  notifications,
}: NotificationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 z-50"
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden max-h-[80vh]"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">알림</h2>
          <Button variant="ghost" size="icon" onClick={closeModal}>
            닫기
          </Button>
        </div>
        <ScrollArea className="p-4 max-h-[60vh]">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className="mb-2">
                  <div className="text-sm">{notification.message}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              알림이 없습니다.
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t">
          <Button onClick={closeModal} className="w-full">
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
