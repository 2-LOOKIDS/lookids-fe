'use server';

import { FeedThumbnailList, Thumbnail } from '../../types/feed/FeedType';

import { CommonResponse } from '../../types/responseType';

const BASE_URL = `${process.env.BACKEND_URL}/feed-read-service/read/feed`;

export const getFeedThumbnailList = async (
  uuid: string,
  page: number = 0,
  size: number = 10
): Promise<FeedThumbnailList> => {
  const API_URL = `${BASE_URL}/thumbnailList?page=${page}&size=${size}`;
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      uuid: uuid,
    },
  });

  const result = (await response.json()) as CommonResponse<FeedThumbnailList>;
  return result.result;
};
