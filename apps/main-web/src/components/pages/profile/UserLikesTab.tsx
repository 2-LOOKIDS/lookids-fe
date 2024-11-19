import { Heart } from 'lucide-react';
import React from 'react';
import { cn } from '@repo/ui/lib/utils';

// interface UserLikesTabProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {

// }

interface UserLikesTabProps {
  isActive: boolean;
}

export default function UserLikesTab({ isActive }: UserLikesTabProps) {
  const borderClass = 'border-lookids';
  const fillClass = 'fill-lookids';
  return (
    <div
      className={cn('flex justify-center border-b-2', {
        [borderClass]: isActive,
      })}
    >
      <Heart
        className={cn('fill-lightGrey text-white', { [fillClass]: isActive })}
      />
    </div>
  );
}
