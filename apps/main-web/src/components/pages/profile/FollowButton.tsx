'use client';

import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { putFollowToggle } from '../../../actions/follow/Follow';
import { useDebouncedCallback } from 'use-debounce';

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
  const handleFollow = useDebouncedCallback(async () => {
    const response = await putFollowToggle(token, uuid, targetUuid);
  }, 300);

  const className = followState
    ? 'bg-lookids hover:bg-lookids/90 text-white'
    : 'border border-lookids bg-white hover:bg-lookids hover:text-white text-lookids';

  return (
    <Button
      key={followState ? 'followed' : 'not-followed'}
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
