import { CommonResponse } from '../../types/responseType';
import { fetchDataforCommon } from '../common/common';
import { formatNumber } from '../../utils/formatNumber';

export interface FollowCount {
  followingCount: number;
  followerCount: number;
}
export async function getFollowCount(uuid: string): Promise<FollowCount> {
  try {
    const data = await fetchDataforCommon<CommonResponse<FollowCount>>(
      `batch-service/read/follow?uuid=${uuid}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('팔로우 수 조회 중 오류 발생:', error);
    throw new Error(`팔로우 수 조회 실패: ${error}`);
  }
}

export interface Counting {
  count: number;
}
export async function getFeedCount(uuid: string): Promise<Counting> {
  console.log('uuid', uuid);
  try {
    const data = await fetchDataforCommon<CommonResponse<Counting>>(
      `batch-service/read/feed?uuid=${uuid}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('피드 수 조회 중 오류 발생:', error);
    throw new Error(`피드 수 조회 실패: ${error}`);
  }
}
//댓글,피드
export async function getFavoriteCount(
  targetCode: string,
  type: string
): Promise<Counting> {
  console.log('targetCode', targetCode);
  try {
    const data = await fetchDataforCommon<CommonResponse<Counting>>(
      `batch-service/read/favorite?targetCode=${targetCode}&type=${type}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('댓글 수 조회 중 오류 발생:', error);
    throw new Error(`댓글 수 조회 실패: ${error}`);
  }
}

export async function getProfileStats(uuid: string) {
  const postData = await getFeedCount(uuid);
  const followerData = await getFollowCount(uuid);

  const stats = [
    {
      id: 0,
      data: formatNumber(postData.count),
      label: '피드 수',
    },
    {
      id: 1,
      uuid: uuid,
      data: formatNumber(followerData.followerCount),
      label: '팔로워',
    },
    {
      id: 2,
      uuid: uuid,
      data: formatNumber(followerData.followingCount),
      label: '팔로잉',
    },
  ];
  return stats;
}
