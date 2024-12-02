'use client';

import { useEffect, useState } from 'react';
import {
  getLikedThumbnails,
  getPostThumbnails,
} from '../../../actions/feed/FeedList';
import { FeedThumbnailList, Thumbnail } from '../../../types/feed/FeedType';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import FeedThumbnail from './FeedThumbnail';
import UserLikesTab from './UserLikesTab';
import UserPostsTab from './UserPostsTab';

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
  const [pagesLoaded, setPagesLoaded] = useState<number>(0);
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
    setList([]);
  }, [search]);

  const loadMorePosts = async () => {
    const nextPage = pagesLoaded + 1;
    if (nextPage <= initialThumbnails?.totalPages!) {
      if (search === 'post') {
        const response = await getPostThumbnails(uuid, nextPage);
        const newList = response.content;
        setList((prev) => [...prev, ...newList]);
        setPagesLoaded(nextPage);
      } else if (search === 'liked') {
        const response = await getLikedThumbnails(uuid, nextPage);
        const newList = response.content;
        setList((prev) => [...prev, ...newList]);
        setPagesLoaded(nextPage);
      }
    }
  };

  useEffect(() => {
    if (inView) {
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
