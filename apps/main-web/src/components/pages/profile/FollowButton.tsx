'use client';

import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { putFollowToggle } from '../../../actions/follow/Follow';

interface FollowButtonProps {
  token: string;
  uuid: string;
  targetUuid: string;
  followStatus: boolean;
}
function FollowButton({
  token,
  uuid,
  targetUuid,
  followStatus,
}: FollowButtonProps) {
  console.log(token);
  const handleFollow = async () => {
    const response = await putFollowToggle(token, uuid, targetUuid);
    console.log('🚀 ~ handleFollow ~ response:', response);
  };

  const className = followStatus
    ? 'bg-lookids hover:bg-lookids/90 text-white'
    : 'border border-lookids bg-white hover:bg-lookids hover:text-white text-lookids';
  return (
    <Button
      onClick={handleFollow}
      className={cn('w-3/5 rounded-[12px] py-5 flex items-center', className)}
    >
      {followStatus ? (
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
