'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import { Fragment, useState } from 'react';
import {
  getFollowerList,
  getFollowingList,
} from '../../../actions/follow/Follow';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

// interface ProfileStatsProps {
//   uuid: string;
// }

// export default function ProfileStats({ uuid }: ProfileStatsProps) {
//   const fetcher = async (url: string) => {
//     const [followerUrl, followingUrl] = url.split('||');
//     const [followerList, followingList] = await Promise.all([
//       getFollowerList(followerUrl, uuid),
//       getFollowingList(followingUrl, uuid),
//     ]);
//     return { followerList, followingList };
//   };

//   const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
//     if (previousPageData && previousPageData.length) return null;
//     const followerUrl = `/read/follower?page=${pageIndex}&size=10`;
//     const followingUrl = `/read/following?page=${pageIndex}&size=10`;
//     return `${followerUrl}||${followingUrl}`;
//   };

//   const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

//   const stats = [
//     { label: '팔로워', count: data?.[0].followerList.totalElements },
//     { label: '팔로잉', count: data?.[0].followingList.totalElements },
//   ];

//   return (
//     <ul className="flex gap-4">
//       {stats.map((stat, idx) => (
//         <li key={idx} className="flex flex-col items-center">
//           <p className="xs:text-base text-sm font-semibold">{stat.count}</p>
//           <p className="xs:text-sm text-xs text-[#838383]">{stat.label}</p>
//         </li>
//       ))}
//     </ul>
//   );
// }

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
          <Dialog>
            <DialogTrigger asChild>
              <li
                className={`flex flex-col items-center ${
                  item.label === '팔로워' || item.label === '팔로잉'
                    ? 'cursor-pointer'
                    : ''
                }`}
                onClick={
                  item.label === '팔로워'
                    ? handleFollowerClick
                    : item.label === '팔로잉'
                      ? handleFollowingClick
                      : undefined
                }
              >
                <p className="xs:text-base text-sm font-semibold">
                  {item.data}
                </p>
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
                  <p className="font-semibold">{item.label} 목록</p>
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">{dialogContent}</div>
            </DialogContent>
          </Dialog>
        </Fragment>
      ))}
    </ul>
  );
}
