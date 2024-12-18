'use client';

import throttle from 'lodash/throttle';
import { useCallback, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import {
  getMainFeedList,
  getRandomFeedList,
} from '../../../actions/feed/FeedCard';
import { FeedDetail } from '../../../types/feed/FeedType';
import SocialCard from '../../common/feedcard/socialCard/SocialCard';
import MainSwiper from '../../icons/topNavBar/MainSwiper';
import MainSwiperSkeleton from '../../ui/Skeletons/MainSwiperSkeleton';
import { SocialCardSkeleton } from '../../ui/Skeletons/SocialCardSkeleton';
import RecommendedPet from './RecommendPet';

const PAGE_SIZE = 5;

export default function FeedPage({ initialData }: { initialData: any }) {
  const [isFallback, setIsFallback] = useState(false);

  // 데이터 fetcher 함수
  const fetcher = async (url: string) => {
    const pageIndex = parseInt(
      new URLSearchParams(url.split('?')[1]).get('page') || '0'
    );

    if (isFallback) return getRandomFeedList(pageIndex);

    const result = await getMainFeedList(pageIndex);
    if (!result || result.content.length === 0) {
      setIsFallback(true);
      return getRandomFeedList(pageIndex);
    }
    return result;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.content.length === 0)
        return null;
      return `/api/feed?page=${pageIndex}&size=${PAGE_SIZE}`;
    },
    fetcher,
    { fallbackData: initialData ? [initialData] : [], revalidateOnFocus: false }
  );

  // 피드 리스트 병합
  const feedList: FeedDetail[] = data
    ? data.flatMap((page) => page.content)
    : [];

  // 로딩 및 끝 페이지 상태 계산
  const isLoadingMore =
    !data || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd =
    data &&
    data[data.length - 1]?.content &&
    data[data.length - 1]?.content.length < PAGE_SIZE;

  // 스크롤 핸들러 최적화 (throttle 적용)
  const handleScroll = useCallback(
    throttle(() => {
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
    }, 200),
    [isReachingEnd, isValidating]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 에러 처리
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  // 렌더링
  return (
    <main className="px-4">
      <div className="mb-20 mt-14 flex flex-col gap-4">
        {/* MainSwiper 로드 */}
        {!initialData ? <MainSwiperSkeleton /> : <MainSwiper />}
        {/* 피드 리스트 */}
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
        {/* 로딩 상태 표시 */}
        {isLoadingMore &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SocialCardSkeleton key={`loading-skeleton-${i}`} />
          ))}
        {/* 더 이상 피드가 없을 때 */}
        {isReachingEnd && feedList.length > 0 && (
          <div className="text-center text-gray-500">
            더 이상 불러올 피드가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}
