import { Button } from '@repo/ui/components/ui/button';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { X } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  notificationData: any;
}

export function NotificationModal({
  isOpen,
  closeModal,
  notificationData,
}: NotificationModalProps) {
  if (!isOpen) return null;

  const hasNotification =
    notificationData && Object.keys(notificationData).length > 0;

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
            <X className="h-4 w-4" />
            <span className="sr-only">닫기</span>
          </Button>
        </div>
        <ScrollArea className="p-4 max-h-[60vh]">
          {hasNotification ? (
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {JSON.stringify(notificationData, null, 2)}
            </pre>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              알림이 없습니다.
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t">
          <Button onClick={closeModal} className="w-full bg-lookids">
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
