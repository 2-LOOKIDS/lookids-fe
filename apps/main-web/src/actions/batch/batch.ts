import { CommonResponse } from '../../types/responseType';
import { fetchDataforCommon } from '../common/common';

interface FollowCount {
  followingCount: number;
  followerCount: number;
}
export async function getFollowCount(uuid: string): Promise<FollowCount> {
  try {
    const data = await fetchDataforCommon<CommonResponse<FollowCount>>(
      `batch-service/read/count/follow?uuid=${uuid}`,
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

interface Counting {
  count: number;
}
export async function getFeedCount(uuid: string): Promise<Counting> {
  try {
    const data = await fetchDataforCommon<CommonResponse<Counting>>(
      `batch-service/read/count/feed?uuid=${uuid}`,
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
export async function getCommentFavoriteCount(
  targetCode: string,
  type: string
): Promise<Counting> {
  try {
    const data = await fetchDataforCommon<CommonResponse<Counting>>(
      `batch-service/read/count/comment?targetCode=${targetCode}&type=${type}`,
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
