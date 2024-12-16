'use client';

import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import UserCard from './UserCard';
import { getFollowerList } from '../../../actions/follow/Follow';

interface FollowerListProps {
  uuid: string;
}

export default function FollowerList({ uuid }: FollowerListProps) {
  const fetcher = async (url: string) => {
    const response = await getFollowerList(url, uuid);
    return response;
  };

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.length) return null;
    return `read/follower?page=${pageIndex}&size=10`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  return (
    <ul className="flex flex-col gap-2">
      {data?.map((item, idx) => {
        return item.content.map((item, idx) => {
          return <UserCard key={idx} {...item} />;
        });
      })}
    </ul>
  );
}
