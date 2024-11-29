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
import { getMediaUrl } from '../../../utils/media';

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
      try {
        const response = await getFollowingList();
        const Follwers: Following[] = response.content; // 서버 응답 구조에 맞게 조정
        console.log('팔로우 목록 불러오기', response);

        // 모든 프로필 데이터를 병렬로 가져오기
        const profiles = await Promise.all(
          Follwers.map(async (follower) => {
            const user: UserInfo = await getUserProfile(follower.followerUuid);
            console.log('팔로우 유저 프로필', user);
            return user;
          })
        );

        // 상태 업데이트
        setFollowerProfile(profiles); // 모든 프로필 한 번에 설정
        setFollowers(Follwers); // Follwers 배열 설정
      } catch (error) {
        console.error('Failed to fetch followers:', error);
      }
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
                <AvatarImage
                  src={getMediaUrl(follower.image)}
                  alt={follower.nickname}
                />
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
