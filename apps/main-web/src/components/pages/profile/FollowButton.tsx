'use client';

import {
  putFollowToggle,
  putFollowToggle2,
} from '../../../actions/follow/Follow';

import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';

interface FollowButtonProps {
  token: string;
  uuid: string;
  targetUuid: string;
  followState: boolean;
}
function FollowButton({
  token,
  uuid,
  targetUuid,
  followState,
}: FollowButtonProps) {
  const handleFollow = async () => {
    const response = await putFollowToggle(token, uuid, targetUuid);
  };

  const className = followState
    ? 'bg-lookids hover:bg-lookids/90 text-white'
    : 'border border-lookids bg-white hover:bg-lookids hover:text-white text-lookids';
  return (
    <Button
      onClick={handleFollow}
      className={cn('w-3/5 rounded-[12px] py-5 flex items-center', className)}
    >
      {followState ? (
        <p className="font-poppins text-base font-semibold leading-6">
          팔로우 취소
        </p>
      ) : (
        <p className="font-poppins text-base font-semibold leading-6">팔로우</p>
      )}
    </Button>
  );
}

export default FollowButton;
