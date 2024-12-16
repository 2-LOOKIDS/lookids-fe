'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import { Fragment, useState } from 'react';

import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

export default function ProfileStats({
  stats,
}: {
  stats: { id: number; data: string; uuid?: string; label: string }[];
}) {
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);

  const handleFollowerClick = () => {
    setDialogContent(<FollowerList uuid={stats[1].uuid || ''} />);
  };

  const handleFollowingClick = () => {
    setDialogContent(<FollowingList uuid={stats[2].uuid || ''} />);
  };
  return (
    <ul className="flex gap-4">
      {stats.map((item) => (
        <Fragment key={item.id}>
          {item.id > 0 && (
            <li className="h-8 w-[1px] bg-[#D9D9D9]" aria-hidden="true" />
          )}
          {item.label === '팔로워' || item.label === '팔로잉' ? (
            <Dialog>
              <DialogTrigger asChild>
                <li
                  className="flex flex-col items-center cursor-pointer"
                  onClick={
                    item.label === '팔로워'
                      ? handleFollowerClick
                      : handleFollowingClick
                  }
                >
                  <p className="xs:text-base text-sm">{item.data}</p>
                  <p className="xs:text-sm text-xs text-[#838383]">
                    {item.label}
                  </p>
                </li>
              </DialogTrigger>
              <DialogContent
                aria-describedby={undefined}
                className="w-[90%] rounded-sm"
              >
                <DialogHeader>
                  <DialogTitle>
                    <p>{item.label} 목록</p>
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">{dialogContent}</div>
              </DialogContent>
            </Dialog>
          ) : (
            <li className="flex flex-col items-center">
              <p className="xs:text-base text-sm">{item.data}</p>
              <p className="xs:text-sm text-xs text-[#838383]">{item.label}</p>
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
}
