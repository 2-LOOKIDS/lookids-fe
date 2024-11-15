'use server';
import { FeedPostType, MediaType, PinType } from '../../types/feed/FeedType';
import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

interface MediaCodes {
  mediaCode: string[];
}
export async function uploadMedia(images: MediaType[]): Promise<MediaCodes> {
  const data = await fetchDataforMembers<CommonResponse<MediaCodes>>(
    `media-service/write/media/list`,
    'POST',
    images,
    'no-cache'
  );
  console.log('uploadMedia', data);
  return data.result;
}

export async function uploadPin(pin: PinType[]): Promise<any> {
  const data = await fetchDataforMembers<CommonResponse<any>>(
    `map-service/write/map`,
    'POST',
    pin,
    'no-cache'
  );
  console.log('핀 잘들어갔나', data);
  return data.result;
}

export async function uploadFeed(feed: FeedPostType): Promise<any> {
  const data = await fetchDataforMembers<CommonResponse<any>>(
    `feed-service/write/feed`,
    'POST',
    feed,
    'no-cache'
  );
  return data;
}

export async function uploadFeedWithMedia({
  feed,
  images,
}: {
  feed: FeedPostType;
  images: MediaType[];
}): Promise<any> {
  const mediaCodesResponse: MediaCodes = await uploadMedia(images);
  console.log('Media올리고 받는값', mediaCodesResponse);
  const mediaCodes = mediaCodesResponse.mediaCode || [];
  const category = '일상';
  const pinImage: PinType[] = mediaCodes.reduce((acc, code, index) => {
    const image = images[index];
    if (image.latitude !== 0 && image.longitude !== 0) {
      acc.push({
        latitude: image.latitude,
        longitude: image.longitude,
        category: '일상',
        locationScore: 0,
        mediaCode: JSON.stringify(code),
      });
    }
    return acc;
  }, [] as PinType[]);
  if (pinImage.length >= 1) {
    for (let i = 0; i < pinImage.length; i++) {
      console.log(pinImage[i]);
      await uploadPin([pinImage[i]]);
    }
  }

  const feedWithMediaCodes: FeedPostType = {
    ...feed,
    mediaCode: mediaCodes, // 여기서 mediaCodes를 feed에 추가
  };
  const data = await uploadFeed(feedWithMediaCodes);
  console.log('피드 끝나고 받는값', data);
  return data;
}
