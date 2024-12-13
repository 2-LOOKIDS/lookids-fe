'use client';

import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import React from 'react';
import UserCard from './UserCard';
import { getFollowingList } from '../../../actions/follow/Follow';
import { useSWRConfig } from 'swr';

interface FollowingListProps {
  uuid: string;
}

export default function FollowingList({ uuid }: FollowingListProps) {
  const fetcher = async (url: string) => {
    const response = await getFollowingList(url, uuid);
    return response;
  };

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.length) return null;
    return `/read/following?page=${pageIndex}&size=10`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  console.log(data);
  return (
    <ul>
      {data?.map((item, idx) => {
        return item.content.map((item, idx) => {
          return <UserCard key={idx} uuid={item.followerUuid} />;
        });
      })}
    </ul>
  );
}
