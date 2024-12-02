'use client';

import { FeedThumbnailList, Thumbnail } from '../../../types/feed/FeedType';
import {
  getLikedThumbnails,
  getPostThumbnails,
} from '../../../actions/feed/FeedList';
import { useEffect, useState } from 'react';

import { CommonResponse } from '../../../types/responseType';
import FeedThumbnail from './FeedThumbnail';
import Link from 'next/link';
import UserLikesTab from './UserLikesTab';
import UserPostsTab from './UserPostsTab';
import { useInView } from 'react-intersection-observer';
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

  const [initialThumbnails, setInitialThumbnails] =
    useState<FeedThumbnailList | null>(null);
  const [list, setList] = useState<Thumbnail[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState<number>(0);

  const [fetchFunction, setFetchFunction] = useState<string>('');
  const { ref, inView } = useInView();

  useEffect(() => {
    if (search === 'post') {
      setFetchFunction('post');
      setInitialThumbnails(postThumbnails);
    } else if (search === 'liked') {
      setFetchFunction('liked');
      setInitialThumbnails(likedThumbnails);
    }
  }, [search]);

  const loadMorePosts = async () => {
    const nextPage = pagesLoaded + 1;
    if (nextPage <= initialThumbnails?.totalPages!) {
      if (fetchFunction === 'post') {
        const response = await getPostThumbnails(uuid, nextPage);
        const newList = response.content;
        setList([...list, ...newList]);
        setPagesLoaded(nextPage);
      } else if (fetchFunction === 'liked') {
        setList([]);
        const response = await getLikedThumbnails(uuid, nextPage);
        const newList = response.content;
        setList([...list, ...newList]);
        setPagesLoaded(nextPage);
      }
    }
  };

  useEffect(() => {
    if (inView) {
      console.log(fetchFunction === 'liked');
      loadMorePosts();
    }
  }, [inView]);

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

          {list?.map((item, idx) => {
            return (
              <FeedThumbnail
                feedCode={item.feedCode}
                key={idx}
                imgUrl={item.mediaUrl}
                imgAlt={item.feedCode}
              />
            );
          })}
          <div ref={ref}></div>
        </div>
      </div>
    </>
  );
}
