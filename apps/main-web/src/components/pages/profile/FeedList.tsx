'use client';

import { FeedThumbnailList, Thumbnail } from '../../../types/feed/FeedType';
import {
  getLikedThumbnails,
  getPostThumbnails,
} from '../../../actions/feed/FeedList';
import { useEffect, useState } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import FeedThumbnail from './FeedThumbnail';
import Link from 'next/link';
import UserLikesTab from './UserLikesTab';
import UserPostsTab from './UserPostsTab';
import { initial } from 'lodash';
import { useInView } from 'react-intersection-observer';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';

interface Tab {
  id: number;
  label: string;
  component: ({ isActive }: { isActive: boolean }) => JSX.Element;
}

interface FeedListProps {
  uuid: string;
  postThumbnails: FeedThumbnailList;
  likedThumbnails: FeedThumbnailList;
}

export default function FeedList({
  uuid,
  postThumbnails,
  likedThumbnails,
}: FeedListProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get('tab') ?? 'post';
  const [initialThumbnails, setInitialThumbnails] =
    useState<FeedThumbnailList | null>(null);
  const [list, setList] = useState<Thumbnail[]>([]);
  // const [isLast, setIsLast] = useState(false);
  const [pageLoaded, setPageLoaded] = useState<number>(0);
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

  useEffect(() => {
    if (search === 'post') {
      setInitialThumbnails(postThumbnails);
    } else if (search === 'liked') {
      setInitialThumbnails(likedThumbnails);
    }
    // setList([]);
  }, [search]);

  const fetcher = async () => {
    if (search === 'post') {
      const response = await getPostThumbnails(uuid, size);
      return response;
    } else if (search === 'liked') {
      const response = await getLikedThumbnails(uuid, size);
      return response;
    }
  };

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.last) return null;
    return `/api/users?page=${pageIndex}&size=10`;
  };

  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

  const isLast = data?.[0]?.last;
  useEffect(() => {
    if (!inView || !data || isValidating || isLast) return;
    setSize((size) => size + 1);
    console.log(data[0]?.pageable.pageNumber, data[0]?.content);
  }, [inView, data, isValidating, isLast]);

  // const { data: moreThumbnails } = useSWR(search, fetcher, {
  //   revalidateOnFocus: false,
  //   dedupingInterval: 60000,
  // });

  // const loadMorePosts = async () => {
  //   const nextPage = pageLoaded + 1;
  //   if (nextPage <= initialThumbnails?.totalPages!) {
  //     if (search === 'post') {
  //       const response = await getPostThumbnails(uuid, nextPage);
  //       const newList = response.content;
  //       // const newList = moreThumbnails;
  //       setList((prev) => [...prev, ...(newList ?? [])]);
  //       setPageLoaded(nextPage);
  //     } else if (search === 'liked') {
  //       const response = await getLikedThumbnails(uuid, nextPage);
  //       const newList = response.content;
  //       // const newList = moreThumbnails;
  //       setList((prev) => [...prev, ...(newList ?? [])]);
  //       setPageLoaded(nextPage);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (inView) {
  //     loadMorePosts();
  //   }
  // }, [inView]);

  return (
    <>
      <ul className="flex w-full justify-center gap-4">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            {/* TODO: headers()로 구현해보자! */}
            <Link href={`?tab=${tab.label}`} scroll={false}>
              <tab.component isActive={search === tab.label} />
            </Link>
          </li>
        ))}
      </ul>
      {/* 이니셜 썸네일 리스트 */}
      {/* loadmore 썸네일 리스트 */}
      <div className="flex w-full justify-center pt-4">
        <div className="grid w-full grid-cols-3 gap-1">
          {initialThumbnails?.content.map((thumbnail, idx) => (
            <FeedThumbnail
              feedCode={thumbnail.feedCode}
              key={idx}
              imgAlt={thumbnail.feedCode}
              imgUrl={thumbnail.mediaUrl}
            />
          ))}

          {/* {list?.map((item, idx) => {
            return (
              <FeedThumbnail
                feedCode={item.feedCode}
                key={idx}
                imgUrl={item.mediaUrl}
                imgAlt={item.feedCode}
              />
            );
          })} */}

          {/* {data &&
            data[0]?.content.map((item, idx) => {
              return (
                <FeedThumbnail
                  feedCode={item.feedCode}
                  key={idx}
                  imgUrl={item.mediaUrl}
                  imgAlt={item.feedCode}
                />
              );
            })} */}
          <div ref={ref}></div>
        </div>
      </div>
    </>
  );
}
