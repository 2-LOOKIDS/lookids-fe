import { Grid2x2 } from 'lucide-react';
import React from 'react';
import { cn } from '@repo/ui/lib/utils';

interface UserPostsTabProps {
  isActive: boolean;
}

export default function UserPostsTab({ isActive }: UserPostsTabProps) {
  const borderClass = 'border-lookids';
  const fillClass = 'fill-lookids';
  return (
    <div
      className={cn('flex justify-center border-b-2', {
        [borderClass]: isActive,
      })}
    >
      <Grid2x2
        className={cn('fill-lightGrey text-white', { [fillClass]: isActive })}
      />
    </div>
  );
}
