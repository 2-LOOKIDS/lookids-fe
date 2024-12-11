'use client';

import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import {
  getMainFeedList,
  getRandomFeedList,
} from '../../actions/feed/FeedCard';
import SocialCard from '../../components/common/feedcard/socialCard/SocialCard';
import LoginModal from '../../components/common/LoginModal';
import MainSwiper from '../../components/icons/topNavBar/MainSwiper';
import RecommendedPet from '../../components/pages/main/RecommendPet';
import MainSwiperSkeleton from '../../components/ui/Skeletons/MainSwiperSkeleton';
import { SocialCardSkeleton } from '../../components/ui/Skeletons/SocialCardSkeleton';
import { useSession } from '../../context/SessionContext';
import { FeedDetail } from '../../types/feed/FeedType';

const PAGE_SIZE = 10;

export default function Page() {
  const { isAuth } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [isRenderingComplete, setIsRenderingComplete] = useState(false);

  const fetcher = (pageIndex: number) =>
    isAuth ? getMainFeedList(pageIndex) : getRandomFeedList(pageIndex);

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.content.length === 0)
        return null;
      return `/api/feed?page=${pageIndex}&size=${PAGE_SIZE}`;
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
      setSize(size + 1);
    }

    // 페이지 하단 도달 확인
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToEnd(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReachingEnd, isValidating]);

  useEffect(() => {
    // 데이터 렌더링 완료 상태 업데이트
    if (!isLoadingInitialData && !isLoadingMore) {
      setTimeout(() => setIsRenderingComplete(true), 500); // 데이터 렌더링 시간 확보
    }
  }, [isLoadingInitialData, isLoadingMore]);

  useEffect(() => {
    // 스크롤이 하단에 도달하고 렌더링이 완료되었으며, 사용자가 로그인하지 않은 경우 모달 표시
    if (hasScrolledToEnd && isRenderingComplete && !isAuth) {
      setIsLoginModalOpen(true);
    }
  }, [hasScrolledToEnd, isRenderingComplete, isAuth]);

  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <main className="px-4">
      <div className="mb-20 mt-14 flex flex-col gap-4">
        {isLoadingInitialData ? <MainSwiperSkeleton /> : <MainSwiper />}
        {feedList.length === 0 ? (
          <div className="text-center text-gray-500">
            표시할 피드가 없습니다.
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
          <div className="text-center text-gray-500">
            더 이상 불러올 피드가 없습니다.
          </div>
        )}
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </main>
  );
}
