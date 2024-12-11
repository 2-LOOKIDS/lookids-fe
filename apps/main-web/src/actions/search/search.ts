import { CommonResponse, responseList } from '../../types/responseType';
import {
  SearchResultListFeed,
  SearchResultListPet,
  SearchResultListUser,
} from '../../types/search';

import { fetchDataforCommon } from '../common/common';
import { searchFeedResult } from '../../types/feed/FeedType';

export interface searchUser {
  uuid: string;
  nickname: string;
  tag: string;
  profileImage: string;
}

export async function searchUser(url: string): Promise<SearchResultListUser> {
  try {
    const data = await fetchDataforCommon<CommonResponse<SearchResultListUser>>(
      url,
      'GET',
      null,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function searchFeed(url: string): Promise<SearchResultListFeed> {
  try {
    const data = await fetchDataforCommon<CommonResponse<SearchResultListFeed>>(
      url,
      'GET',
      null,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function searchPet(url: string): Promise<SearchResultListPet> {
  try {
    const data = await fetchDataforCommon<CommonResponse<SearchResultListPet>>(
      url,
      'GET',
      null,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    throw error;
  }
}
