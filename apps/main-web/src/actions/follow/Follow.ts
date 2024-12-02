import { CommonResponse, responseList } from '../../types/responseType';

import { Following } from '../../types/follow/FollowType';
import { fetchDataforMembers } from '../common/common';
import { revalidatePath } from 'next/cache';

// const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/follow-block-service`;
const BASE_URL = '/api/follow-block-service';

export async function getFollowingList(): Promise<responseList<Following>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<Following>>
    >(`member-service/read/following`, 'GET', null, 'no-cache');
    console.log('팔로잉 목록:', await data.result);
    return await data.result;
  } catch (error) {
    console.error('팔로잉 목록 조회 중 오류 발생:', error);
    throw new Error(`팔로잉 목록 조회 실패: ${error}`);
  }
}

export const getFollowStatus = async (
  uuid: string,
  targetUuid: string
): Promise<boolean> => {
  const API_URL = `${BASE_URL}/read/follow?targetUuid=${targetUuid}`;
  console.log('🚀 ~ BACKEND_URL:', process.env.BACKEND_URL);
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      uuid: uuid,
    },
  });

  const result = (await response.json()) as CommonResponse<boolean>;
  // console.log('🚀 ~ result:', result);
  return result.result;
};

export const putFollowToggle = async (
  token: string,
  uuid: string,
  targetUuid: string
): Promise<boolean> => {
  const API_URL = `${BASE_URL}/write/follow`;
  // const API_URL = `/api/write/follow`;
  console.log('🚀 ~ API_URL:', API_URL);
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'accept': '*/*',
      'uuid': uuid,
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ followerUuid: targetUuid }),
  });

  const result = (await response.json()) as CommonResponse<boolean>;
  revalidatePath('/user/*');
  return result.result;
};
