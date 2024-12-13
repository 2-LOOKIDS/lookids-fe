'use server';

import { CommonResponse, PaginationResponse } from '../../types/responseType';
import {
  FollowerList,
  Following,
  FollowingList,
} from '../../types/follow/FollowType';

import { fetchDataforMembers } from '../common/common';
import { responseList } from '../../utils/chatting/fetchMessages';
import { revalidatePath } from 'next/cache';

const BASE_URL = `${process.env.BACKEND_URL}/follow-block-service`;

// 팔로잉 목록 조회
// export async function getFollowingList(): Promise<
//   PaginationResponse<Following>
// > {
//   try {
//     const data = await fetchDataforMembers<
//       CommonResponse<responseList<Following>>
//     >(
//       `follow-block-service/read/following?page=0&size=10`,
//       'GET',
//       null,
//       'no-cache'
//     );
//     return await data.result;
//   } catch (error) {
//     console.error('팔로잉 목록 조회 중 오류 발생:', error);
//     throw new Error(`팔로잉 목록 조회 실패: ${error}`);
//   }
// }

// export const getFollowerList = async (url: string): Promise<FollowerList> => {
//   try {
//     const response = await fetchDataforMembers<CommonResponse<FollowerList>>(
//       url,
//       'GET',
//       'no-cache'
//     );
//     return response.result;
//   } catch (error) {
//     console.error('팔로워 목록 조회 실패', error);
//     throw new Error(`팔로워 목록 조회 실패 :, ${error}`);
//   }
// };

export const getFollowingList = async (
  url: string,
  uuid: string
): Promise<FollowingList> => {
  const API_URL = `${BASE_URL}/${url}`;
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: 'GET',
    headers: {
      uuid: uuid,
    },
  });
  const result = (await response.json()) as CommonResponse<FollowingList>;
  // console.log('🚀 ~ following:', result);
  console.log('API_URL', API_URL);
  return result.result;
};

export const getFollowerList = async (
  url: string,
  uuid: string
): Promise<FollowerList> => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: 'GET',
    headers: {
      uuid: uuid,
    },
  });
  const result = (await response.json()) as CommonResponse<FollowerList>;
  console.log('🚀 ~ follower:', result);
  return result.result;
};
//

export const getFollowStatus = async (
  uuid: string,
  targetUuid: string
): Promise<boolean> => {
  const API_URL = `${BASE_URL}/read/follow?targetUuid=${targetUuid}`;
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      uuid: uuid,
    },
  });

  const result = (await response.json()) as CommonResponse<boolean>;
  return result.result;
};

// 팔로우 토글
export const putFollowToggle = async (
  token: string,
  uuid: string,
  targetUuid: string
): Promise<boolean> => {
  const API_URL = `${BASE_URL}/write/follow`;
  const followerUuid = { followerUuid: targetUuid };
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'uuid': uuid,
    },

    body: JSON.stringify(followerUuid),
  });
  const result = (await response.json()) as CommonResponse<boolean>;
  revalidatePath('/user/*');
  return result.result;
};

// 차단 관련 API

export interface BlockList {
  uuid: string;
  blockUuid: string;
}
export async function getBlockList(
  page: number
): Promise<responseList<BlockList>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<BlockList>>
    >(`follow-block-service/read/block?page=${page}`, 'GET', '', 'no-cache');
    return data.result;
  } catch (error) {
    console.error('차단 목록 조회 중 오류 발생:', error);
    throw new Error(`차단 목록 조회 실패: ${error}`);
  }
}

export async function putBlockUser(blockedUuid: string): Promise<void> {
  try {
    const data = await fetchDataforMembers<CommonResponse<void>>(
      `follow-block-service/write/block`,
      'PUT',
      { blockedUuid },
      'no-cache'
    );
    console.log(data);
  } catch (error) {
    console.error('error', error);
    throw new Error('error');
  }
}
