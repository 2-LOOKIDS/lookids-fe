import { searchFeedResult } from '../../types/feed/FeedType';
import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforCommon } from '../common/common';

export interface searchUser {
  uuid: string;
  nickname: string;
  tag: string;
  profileImage: string;
}

export async function searchUser(
  searchParam: string,
  page: number
): Promise<responseList<searchUser>> {
  try {
    const data = await fetchDataforCommon<
      CommonResponse<responseList<searchUser>>
    >(
      `search-service/read/search/user?searchParam=${searchParam}&page=${page}&size=10`,
      'GET',
      null,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function searchFeed(
  searchParam: string,
  page: number
): Promise<responseList<searchFeedResult>> {
  try {
    const data = await fetchDataforCommon<
      CommonResponse<responseList<searchFeedResult>>
    >(
      `search-service/read/search/feed?searchParam=${searchParam}&page=${page}&size=10`,
      'GET',
      null,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    throw error;
  }
}
