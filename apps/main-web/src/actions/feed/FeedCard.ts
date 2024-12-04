'use server';

import {
  FeedDetail,
  FeedPostType,
  MediaType,
  PinType,
} from '../../types/feed/FeedType';

import { CommonResponse, responseList } from '../../types/responseType';
import { extractCommonUrl } from '../../utils/media';
import { fetchDataforMembers } from '../common/common';

export async function uploadPin(pin: PinType): Promise<any> {
  try {
    console.log('업로드할 핀 데이터:', pin);
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `map-service/write/map`,
      'POST',
      pin,
      'no-cache'
    );
    console.log('핀 업로드 응답:', data);
    return data.result;
  } catch (error) {
    console.error('핀 업로드 중 오류 발생:', error);
    throw new Error(`핀 업로드 실패: ${error}`);
  }
}

export async function uploadFeed(feed: FeedPostType): Promise<any> {
  try {
    console.log('업로드할 피드 데이터:', feed);
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `feed-service/write/feed`,
      'POST',
      feed,
      'no-cache'
    );
    console.log('피드 업로드 응답:', data);
    return data;
  } catch (error) {
    console.error('피드 업로드 중 오류 발생:', error);
    throw new Error(`피드 업로드 실패: ${error}`);
  }
}

export async function uploadFeedWithMedia({
  feed,
  images,
}: {
  feed: FeedPostType;
  images: MediaType[];
}): Promise<any> {
  try {
    // GPS 정보를 포함하는 이미지로 핀 데이터 생성
    const pin: PinType[] = images
      .filter((image) => image.latitude !== 0 && image.longitude !== 0)
      .map((image) => ({
        latitude: image.latitude,
        longitude: image.longitude,
        mediaUrl: extractCommonUrl(image.mediaUrl),
        category: 'FEED',
        locationScore: 0,
      }));

    // 핀 업로드
    for (const pindata of pin) {
      try {
        const pinRes = await uploadPin(pindata);
        console.log('핀 업로드 성공:', pinRes);
      } catch (pinError) {
        console.error('핀 업로드 실패:', pindata, pinError);
      }
    }
    const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || '';

    const feedData: FeedPostType = {
      ...feed,
      mediaUrlList: images.map((image) => extractCommonUrl(image.mediaUrl)),
    };

    // 피드 업로드
    const data = await uploadFeed(feedData);

    return data;
  } catch (error) {
    console.error('uploadFeedWithMedia 실행 중 오류 발생:', error);
    throw new Error(`피드 및 미디어 업로드 실패: ${error}`);
  }
}

export async function getFeedDetail(feedCode: string): Promise<FeedDetail> {
  try {
    const data = await fetchDataforMembers<CommonResponse<FeedDetail>>(
      `feed-read-service/read/feed/detail?feedCode=${feedCode}`,
      'GET',
      null,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('피드 상세 조회 중 오류 발생:', error);
    throw new Error(`피드 상세 조회 실패: ${error}`);
  }
}

export async function getMainFeedList(
  page: number
): Promise<responseList<FeedDetail>> {
  try {
    console.log('페이지:', page);
    const data = await fetchDataforMembers<
      CommonResponse<responseList<FeedDetail>>
    >(
      `feed-read-service/read/feed/feedList?page=${page}&size=10`,
      'GET',
      null,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('메인 피드 조회 중 오류 발생:', error);
    throw new Error(`메인 피드 조회 실패: ${error}`);
  }
}

export async function getRandomFeedList(
  page: number
): Promise<responseList<FeedDetail>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<FeedDetail>>
    >(
      `feed-read-service/read/feed/random?page=${page}&size=10`,
      'GET',
      null,
      'force-cache'
    );
    return data.result;
  } catch (error) {
    console.error('랜덤 피드 조회 중 오류 발생:', error);
    throw new Error(`랜덤 피드 조회 실패: ${error}`);
  }
}
