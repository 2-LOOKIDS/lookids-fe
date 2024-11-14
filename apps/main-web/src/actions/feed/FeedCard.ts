'use server';
import { FeedPostType, MediaType } from '../../types/feed/FeedType';
import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export const getFeedCardList = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
};

export async function uploadMedia({
  images,
}: {
  images: MediaType[];
}): Promise<string[]> {
  console.log(images);
  const data = await fetchDataforMembers<CommonResponse<string[]>>(
    `media-service/write/media`,
    'POST',
    images,
    'no-cache'
  );
  return data.result;
}

export async function uploadFeed({
  feed,
}: {
  feed: FeedPostType;
}): Promise<any> {
  const data = await fetchDataforMembers<CommonResponse<any>>(
    `media-service/write/media`,
    'POST',
    feed,
    'no-cache'
  );
  return data.result;
}

export async function uploadFeedWithMedia({
  feed,
  images,
}: {
  feed: FeedPostType;
  images: MediaType[];
}): Promise<any> {
  const mediaCodes: string[] = await uploadMedia({ images });
  console.log(mediaCodes);

  const feedWithMediaCodes = {
    ...feed,
    mediaCodes, // 여기서 mediaCodes를 feed에 추가
  };
  const data = await uploadFeed({ feed: feedWithMediaCodes });

  return data;
}
