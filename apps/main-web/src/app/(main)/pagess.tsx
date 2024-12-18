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

const PAGE_SIZE = 5;

export default function Page() {
  const { isAuth } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFallback, setIsFallback] = useState(false); // Fallback 상태 추가

  const fetcher = async (url: string) => {
    const pageIndex = parseInt(
      new URLSearchParams(url.split('?')[1]).get('page') || '0'
    );

    if (isFallback) {
      return getRandomFeedList(pageIndex); // RandomFeed 요청
    }
    const result = await getMainFeedList(pageIndex);

    // Fallback으로 전환 필요 여부 확인
    if (!result || result.content.length === 0) {
      setIsFallback(true);
      return getRandomFeedList(pageIndex);
    }
    return result;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      console.log(
        'getKey - pageIndex:',
        pageIndex,
        'previousPageData:',
        previousPageData
      );

      if (previousPageData && previousPageData.content.length === 0) {
        console.log('getKey - returning null');
        return null; // 마지막 페이지에 도달했을 경우 요청 중단
      }

      const key = `/api/feed?page=${pageIndex}&size=${PAGE_SIZE}&fallback=${isFallback}`;
      console.log('getKey - returning key:', key);
      return key;
    },
    async (url) => {
      console.log('fetcher - url:', url); // fetcher 호출 확인
      const pageIndex = parseInt(
        new URLSearchParams(url.split('?')[1]).get('page') || '0'
      );

      if (isFallback) {
        console.log('fetcher - calling getRandomFeedList');
        return getRandomFeedList(pageIndex);
      }

      console.log('fetcher - calling getMainFeedList');
      const result = await getMainFeedList(pageIndex);

      if (!result || result.content.length === 0) {
        console.log('fetcher - switching to fallback');
        setIsFallback(true);
        return getRandomFeedList(pageIndex);
      }

      return result;
    },
    { revalidateOnFocus: false }
  );

  const feedList: FeedDetail[] = data
    ? data.flatMap((page) => page.content)
    : [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd =
    data &&
    data[data.length - 1]?.content &&
    data[data.length - 1]?.content.length < PAGE_SIZE;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      !isReachingEnd &&
      !isValidating
    ) {
      setSize((prevSize) => prevSize + 1);
    }
  };

  useEffect(() => {
    console.log('isFallback:', isFallback);
    console.log('feedList:', feedList);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReachingEnd, isValidating]);

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
          feedList.map((feed, index) => (
            <div key={`feed-wrapper-${index}`}>
              <SocialCard isDetail={false} feedCode={feed.feedCode} />
              {(index + 1) % 3 === 0 && <RecommendedPet />}
            </div>
          ))
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
