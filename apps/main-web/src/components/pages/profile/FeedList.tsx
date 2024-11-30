'use client';

import { useEffect, useState } from 'react';

import FeedThumbnail from './FeedThumbnail';
import Link from 'next/link';
import { Thumbnail } from '../../../types/feed/FeedType';
import UserLikesTab from './UserLikesTab';
import UserPostsTab from './UserPostsTab';
import { getFeedThumbnailList } from '../../../actions/feed/FeedList';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';

interface Tab {
  id: number;
  label: string;
  component: ({ isActive }: { isActive: boolean }) => JSX.Element;
}

interface FeedListProps {
  uuid: string;
  thumbnailList: Thumbnail[];
  totalPages: number;
}

export default function FeedList({
  uuid,
  thumbnailList,
  totalPages,
}: FeedListProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get('tab') ?? 'posts';
  const tabs: Tab[] = [
    {
      id: 0,
      label: 'posts',
      component: ({ isActive }) => <UserPostsTab isActive={isActive} />,
    },
    {
      id: 1,
      label: 'likes',
      component: ({ isActive }) => <UserLikesTab isActive={isActive} />,
    },
  ];

  const [list, setList] = useState<Thumbnail[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState<number>(0);

  const { ref, inView } = useInView();

  const loadMorePosts = async () => {
    const nextPage = pagesLoaded + 1;
    if (nextPage <= totalPages) {
      const response = await getFeedThumbnailList(uuid, nextPage);
      const newList = response.content;
      setList([...list, ...newList]);
      setPagesLoaded(nextPage);
    }
  };

  useEffect(() => {
    if (inView) {
      console.log('무한 스크롤 요청!');
      loadMorePosts();
    }
  }, [inView]);

  console.log(list);
  return (
    <>
      <ul ref={ref} className="flex w-full justify-center gap-4">
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
          {thumbnailList.map((thumbnail) => (
            <FeedThumbnail
              feedCode={thumbnail.feedCode}
              key={thumbnail.feedCode}
              imgAlt={thumbnail.feedCode}
              imgUrl={thumbnail.mediaUrl}
            />
          ))}

          {list?.map((item, idx) => (
            <FeedThumbnail
              feedCode={item.feedCode}
              key={item.feedCode}
              imgUrl={item.mediaUrl}
              imgAlt={item.feedCode}
            />
          ))}
        </div>
      </div>
    </>
  );
}
