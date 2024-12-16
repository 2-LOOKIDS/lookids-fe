'use server';

import {
  FeedDetail,
  FeedPostType,
  MediaType,
  PinType,
} from '../../types/feed/FeedType';

import { CommonResponse, responseList } from '../../types/responseType';
import { extractCommonUrl } from '../../utils/media';
import { fetchDataforCommon, fetchDataforMembers } from '../common/common';
import { uploadPin } from '../map/Pin';

// 피드 업로드
export async function uploadFeed(feed: FeedPostType): Promise<any> {
  try {
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `feed-service/write/feed`,
      'POST',
      feed,
      'no-cache'
    );
    return data;
  } catch (error) {
    console.error('피드 업로드 중 오류 발생:', error);
    throw new Error(`피드 업로드 실패: ${error}`);
  }
}

// 피드 삭제
export async function deleteFeed(feedCode: string): Promise<void> {
  try {
    const data = await fetchDataforMembers<CommonResponse<void>>(
      `feed-service/write/feed?feedCode=${feedCode}`,
      'DELETE',
      null,
      'no-cache'
    );
  } catch (error) {
    console.error('피드 삭제 중 오류 발생:', error);
    throw new Error(`피드 삭제 실패: ${error}`);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 피드 업로드 서비스 로직
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Feed Read Service
*/

// 피드 상세조회
export async function getFeedDetail(feedCode: string): Promise<FeedDetail> {
  try {
    const data = await fetchDataforCommon<CommonResponse<FeedDetail>>(
      `feed-read-service/read/feed/detail?feedCode=${feedCode}`,
      'GET',
      null,
      'force-cache'
    );
    return data.result;
  } catch (error) {
    console.error('피드 상세 조회 중 오류 발생:', error);
    throw new Error(`피드 상세 조회 실패: ${error}`);
  }
}

// 메인페이지에서 피드 조회 로직 (회원)
export async function getMainFeedList(
  page: number
): Promise<responseList<FeedDetail>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<FeedDetail>>
    >(
      `feed-read-service/read/feed/feedList?page=${page}&size=10`,
      'GET',
      null,
      'no-store'
    );
    return data.result;
  } catch (error) {
    console.error('메인 피드 조회 중 오류 발생:', error);
    throw new Error(`메인 피드 조회 실패: ${error}`);
  }
}

// 메인페이지에서 피드 조회 (비회원)
export async function getRandomFeedList(
  page: number
): Promise<responseList<FeedDetail>> {
  try {
    const data = await fetchDataforCommon<
      CommonResponse<responseList<FeedDetail>>
    >(
      `feed-read-service/read/feed/random?page=${page}&size=10`,
      'GET',
      null,
      'no-store'
    );
    return data.result;
  } catch (error) {
    console.error('랜덤 피드 조회 중 오류 발생:', error);
    throw new Error(`랜덤 피드 조회 실패: ${error}`);
  }
}

// Feed 작성 여부 확인
export async function getIsMyFeed(feedCode: string) {
  try {
    const data = await fetchDataforMembers<CommonResponse<boolean>>(
      `feed-read-service/read/feed/check?feedCode=${feedCode}`,
      'GET',
      null,
      'force-cache'
    );
    return data.result;
  } catch (error) {
    console.error('내 피드 확인 중 오류 발생:', error);
    throw new Error(`내 피드 확인 실패: ${error}`);
  }
}
