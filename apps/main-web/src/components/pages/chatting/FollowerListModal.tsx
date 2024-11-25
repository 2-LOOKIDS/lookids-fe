import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import {
  FollowerListModalProps,
  Following,
} from '../../../types/follow/FollowType';

export function FollowerListModal({
  isOpen,
  onClose,
  onSelectFollower,
}: FollowerListModalProps) {
  const [followers, setFollowers] = useState<Following[]>([]);

  useEffect(() => {
    // Fetch followers list
    // This is a mock implementation. Replace with actual API call.
    const fetchFollowers = async () => {
      const mockFollowers: Following[] = [
        {
          id: '1',
          name: 'Alice',
          avatar: 'https://picsum.photos/200/300?random=1',
        },
        {
          id: '2',
          name: 'Bob',
          avatar: 'https://picsum.photos/200/300?random=2',
        },
        {
          id: '3',
          name: 'Charlie',
          avatar: 'https://picsum.photos/200/300?random=3',
        },
        // Add more mock followers as needed
      ];
      setFollowers(mockFollowers);
    };

    if (isOpen) {
      fetchFollowers();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lookids">팔로잉 목록</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          {followers.map((follower) => (
            <div key={follower.id} className="flex items-center space-x-4 py-2">
              <Avatar>
                <AvatarImage src={follower.avatar} alt={follower.name} />
                <AvatarFallback>{follower.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{follower.name}</p>
              </div>
              <Button
                className="text-lookids bg-slate-100"
                onClick={() => onSelectFollower(follower.id)}
              >
                메시지 보내기
              </Button>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
