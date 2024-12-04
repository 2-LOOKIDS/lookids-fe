'use server';

import { CommonResponse } from '../../types/responseType';
import { FeedThumbnailList } from '../../types/feed/FeedType';

const BASE_URL = process.env.BACKEND_URL;

export const getFeedThumbnails = async (
  url: string,
  uuid: string
): Promise<FeedThumbnailList> => {
  const API_URL = `${BASE_URL}/${url}`;
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      uuid: uuid,
    },
  });

  const result = (await response.json()) as CommonResponse<FeedThumbnailList>;
  return result.result;
};

export const getLikedThumbnails = async (
  uuid: string,
  page: number = 0,
  size: number = 10
): Promise<FeedThumbnailList> => {
  const API_URL = `${BASE_URL}/favoriteList?page=${page}&size=${size}`;
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      uuid: uuid,
    },
  });

  const result = (await response.json()) as CommonResponse<FeedThumbnailList>;
  return result.result;
};
