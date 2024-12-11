'use client';

import useSWRInfinite from 'swr/infinite';
import {
  getMainFeedList,
  getRandomFeedList,
} from '../../actions/feed/FeedCard';

import { useEffect } from 'react';
import SocialCard from '../../components/common/feedcard/socialCard/SocialCard';
import MainSwiper from '../../components/icons/topNavBar/MainSwiper';
import RecommendedPet from '../../components/pages/main/RecommendPet';
import MainSwiperSkeleton from '../../components/ui/Skeletons/MainSwiperSkeleton';
import { SocialCardSkeleton } from '../../components/ui/Skeletons/SocialCardSkeleton';
import { useSession } from '../../context/SessionContext';
import { FeedDetail } from '../../types/feed/FeedType';

const PAGE_SIZE = 10;

export default function Page() {
  const auth = useSession().isAuth;

  const fetcher = (pageIndex: number) =>
    auth ? getMainFeedList(pageIndex) : getRandomFeedList(pageIndex);
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.content.length === 0)
        return null; // 마지막 페이지라면 요청 중단
      return `/api/feed?page=${pageIndex}&size=${PAGE_SIZE}`; // pageIndex와 PAGE_SIZE를 명확히 설정
    },
    (url) => {
      const page = parseInt(
        new URLSearchParams(url.split('?')[1]).get('page') || '0'
      );
      return fetcher(page);
    }
  );

  const feedList: FeedDetail[] = data
    ? data.flatMap((page) => page.content)
    : [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd =
    data && data[data.length - 1]?.content.length < PAGE_SIZE;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      !isReachingEnd &&
      !isValidating
    ) {
      setSize(size + 1); // 다음 페이지 로드
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReachingEnd, isValidating]);

  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <main className="px-4">
      <div className="mb-20 mt-14 flex flex-col gap-4">
        {isLoadingInitialData ? (
          // MainSwiperSkeleton 표시
          <MainSwiperSkeleton />
        ) : (
          // MainSwiper 표시
          <MainSwiper />
        )}
        {feedList.length === 0 ? (
          // 피드가 없을 때 표시할 메시지
          <div className="text-center text-gray-500">
            팔로우중인 유저가 없습니다!
          </div>
        ) : (
          feedList.reduce<React.ReactNode[]>((acc, feed, index) => {
            acc.push(
              <SocialCard
                isDetail={false}
                feedCode={feed.feedCode}
                key={`feed-${index}`}
              />
            );
            // 매 3번째 항목 뒤에 RecommendedPet 삽입
            if ((index + 1) % 3 === 0) {
              acc.push(<RecommendedPet key={`recommended-${index}`} />);
            }
            return acc;
          }, [])
        )}
        {isLoadingMore &&
          Array.from({ length: PAGE_SIZE }, (_, i) => (
            <SocialCardSkeleton key={`loading-skeleton-${i}`} />
          ))}
        {isReachingEnd && feedList.length > 0 && (
          <div>더 이상 불러올 피드가 없습니다.</div>
        )}
      </div>
    </main>
  );
}
