'use client';
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
import { getFollowingList } from '../../../actions/follow/Follow';
import { getUserProfile } from '../../../actions/user';
import {
  FollowerListModalProps,
  Following,
} from '../../../types/follow/FollowType';
import { UserInfo } from '../../../types/user';

export function FollowerListModal({
  isOpen,
  onClose,
  onSelectFollower,
}: FollowerListModalProps) {
  const [followers, setFollowers] = useState<Following[]>([]);
  const [followerProfile, setFollowerProfile] = useState<UserInfo[]>([]);
  useEffect(() => {
    // Fetch followers list
    // This is a mock implementation. Replace with actual API call.
    const fetchFollowers = async () => {
      const response = await getFollowingList();
      const Follwers: Following[] = response.content; // Adjust according to the actual response structure
      Follwers.map(async (follower) => {
        const user: UserInfo = await getUserProfile(follower.followerUuid);
        setFollowerProfile((prev) => [...(prev || []), user]);
      });
      setFollowers(Follwers);
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
          {followerProfile.map((follower, index) => (
            <div key={index} className="flex items-center space-x-4 py-2">
              <Avatar>
                <AvatarImage src={follower.image} alt={follower.nickname} />
                <AvatarFallback>{follower.nickname}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{follower.nickname}</p>
              </div>
              <Button
                className="text-lookids bg-slate-100"
                onClick={() => onSelectFollower(followers[index].followerUuid)}
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
