'use client';

import { useEffect, useState } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import {
  searchFeed,
  searchPet,
  searchUser,
} from '../../../actions/search/search';
import {
  SearchContentFeed,
  SearchContentPet,
  SearchContentUser,
} from '../../../types/search';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { FeedResultList } from './FeedResultList';
import { PetResultList } from './PetResultList';
import { UserResultList } from './UserResultList';

type Tab = 'user' | 'feed' | 'pet';

interface SearchResultProps {
  query: string;
}

export default function SearchResult({ query }: SearchResultProps) {
  const tabs = [
    {
      id: 1,
      label: '유저',
      path: 'user',
    },
    {
      id: 2,
      label: '피드',
      path: 'feed',
    },
    {
      id: 3,
      label: '동물',
      path: 'pet',
    },
  ];
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('user');
  const { ref, inView } = useInView();

  const tab = searchParams.get('tab') as Tab;

  useEffect(() => {
    if (tab && ['user', 'feed', 'pet'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const fetcher = async (url: string): Promise<SearchContent> => {
    if (!query) return { content: [] };
    switch (tab) {
      case 'user': {
        return await searchUser(url);
      }
      case 'feed': {
        return await searchFeed(url);
      }
      case 'pet': {
        return await searchPet(url);
      }
    }
  };

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (!query) return null;
    switch (tab) {
      case 'user': {
        return `/search-service/read/search/user?searchParam=${query}&page=${pageIndex}&size=10`;
      }
      case 'feed': {
        return `/search-service/read/search/feed?searchParam=${query}&page=${pageIndex}&size=15`;
      }
      case 'pet': {
        return `/search-service/read/search/pet?searchParam=${query}&page=${pageIndex}&size=10`;
      }
    }
  };

  interface SearchContent {
    content: SearchContentUser[] | SearchContentFeed[] | SearchContentPet[];
  }
  const { data, size, setSize, isLoading } = useSWRInfinite<SearchContent>(
    getKey,
    fetcher
  );
  const isEmpty = data?.[0]?.content.length === 0;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isReachingEnd =
    isEmpty || (data && (data[data.length - 1]?.content ?? []).length < 10);

  useEffect(() => {
    if (!inView || isLoadingMore || isReachingEnd) return;
    setSize((size) => size + 1);
  }, [inView, isLoadingMore, isReachingEnd]);
  return (
    <section className="pt-4 ">
      <ul className="flex text-center h-8">
        {tabs.map((tab) => (
          <li
            className={`flex-1 ${activeTab === tab.path ? 'border-b-2 border-lookids text-black' : 'text-lightGrey'}`}
            key={tab.id}
          >
            <Link
              href={`/search?tab=${tab.path}&q=${encodeURIComponent(query)}`}
              scroll={false}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>

      {data &&
        data.map((item, idx) => {
          switch (activeTab) {
            case 'user':
              return (
                <UserResultList
                  key={idx}
                  result={item?.content as SearchContentUser[]}
                  query={query}
                />
              );
            case 'feed':
              return (
                <FeedResultList
                  key={idx}
                  result={item?.content as SearchContentFeed[]}
                  query={query}
                />
              );
            case 'pet':
              return (
                <PetResultList
                  key={idx}
                  result={item?.content as SearchContentPet[]}
                  query={query}
                />
              );
            default:
              return null;
          }
        })}
      <div ref={ref} />
    </section>
  );
}
