import React, { useState } from 'react';
import { PaginationParams, PaginationResponse } from '../types/responseType';

// 함수, 함수의 인자
// 함수의 반환 값
// 제네릭으로 필요한것은 함수의 인자와 반환값

interface UseInfiniteScrollProps<
  TParams extends Record<string, any>,
  TResponse extends PaginationResponse,
  TPaginationParams extends PaginationParams<TParams>,
> {
  fn: (params: TPaginationParams) => Promise<TResponse>;
  params: TParams;
  option?: {
    size?: number;
    initialPage?: number;
  };
}

export default function useInfiniteScroll<
  TParams extends Record<string, any>,
  TResponse extends PaginationResponse,
>({
  fn,
  params,
  option = {
    size: 10,
    initialPage: 0,
  },
}: UseInfiniteScrollProps<TParams, TResponse, PaginationParams<TParams>>) {
  const [currentPage, setCurrentPage] = useState(option.initialPage ?? 0);
  const [isLast, setIsLast] = useState(false);

  return {
    fetchNext: async () => {
      if (isLast) {
        return;
      }
      const response = await fn({
        ...params,
        size: option.size,
        page: currentPage,
      });
      setIsLast(response.last);
      setCurrentPage((prev) => prev + 1);
      return response;
    },
    currentPage,
  };
}
