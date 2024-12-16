'use client';

import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import FeedThumbnail from './FeedThumbnail';
import Link from 'next/link';
import UserLikesTab from './UserLikesTab';
import UserPostsTab from './UserPostsTab';
import { getFeedThumbnails } from '../../../actions/feed/FeedList';
import { getMediaUrl } from '../../../utils/media';
import { mutate } from 'swr';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';

interface Tab {
  id: number;
  label: string;
  component: ({ isActive }: { isActive: boolean }) => JSX.Element;
}

interface FeedListProps {
  uuid: string;
}

export default function FeedList({ uuid }: FeedListProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get('tab') ?? 'post';
  const { ref, inView } = useInView();
  const tabs: Tab[] = [
    {
      id: 0,
      label: 'post',
      component: ({ isActive }) => <UserPostsTab isActive={isActive} />,
    },
    {
      id: 1,
      label: 'liked',
      component: ({ isActive }) => <UserLikesTab isActive={isActive} />,
    },
  ];

  const fetcher = async (url: string) => {
    if (search === 'post') {
      const response = await getFeedThumbnails(url, uuid);
      return response;
    } else if (search === 'liked') {
      const response = await getFeedThumbnails(url, uuid);
      return response;
    }
  };

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.length) return null;
    if (search === 'post') {
      return `/feed-read-service/read/feed/thumbnailList?page=${pageIndex}&size=12`;
    } else if (search === 'liked') {
      return `/feed-read-service/read/feed/favoriteList?page=${pageIndex}&size=12`;
    }
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
  });

  const isEmpty = data?.[0]?.content.length === 0;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd =
    isEmpty || (data && (data[data.length - 1]?.content ?? []).length < 10);

  // useEffect(() => {
  //   mutate(() => true, undefined, { revalidate: false });
  // }, [uuid]);

  useEffect(() => {
    if (!inView || isLoadingMore || isReachingEnd) return;
    setSize((size) => size + 1);
    console.log(data);
  }, [inView, isLoadingMore, isReachingEnd]);

  return (
    <>
      <ul className="flex w-full justify-center gap-4">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            <Link href={`?tab=${tab.label}`} scroll={false}>
              <tab.component isActive={search === tab.label} />
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex w-full justify-center pt-4">
        <div className="grid w-full grid-cols-3 gap-1">
          {/* {data &&
            data.map((item) => {
              return item?.content.map((item, idx) => {
                return (
                  <FeedThumbnail
                    feedCode={item.feedCode}
                    key={idx}
                    imgUrl={item.mediaUrl}
                    imgAlt={item.feedCode}
                  />
                );
              });
            })} */}
          {isLoading ? (
            <div>loading</div>
          ) : (
            data?.map((item) => {
              return item?.content?.map((item, idx) => {
                return (
                  <FeedThumbnail
                    feedCode={item.feedCode}
                    key={idx}
                    imgUrl={item.mediaUrl}
                    imgAlt={item.feedCode}
                  />
                );
              });
            })
          )}
          <div ref={ref} />
        </div>
      </div>
    </>
  );
}
