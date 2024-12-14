'use server';

import { CommonResponse, PaginationResponse } from '../../types/responseType';

import { revalidatePath } from 'next/cache';
import { Following } from '../../types/follow/FollowType';
import { responseList } from '../../utils/chatting/fetchMessages';
import { fetchDataforMembers } from '../common/common';

const BASE_URL = `${process.env.BACKEND_URL}/follow-block-service`;
// const BASE_URL = '/api/follow-block-service';

// 팔로잉 목록 조회
export async function getFollowingList(): Promise<
  PaginationResponse<Following>
> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<Following>>
    >(
      `follow-block-service/read/following?page=0&size=10`,
      'GET',
      null,
      'no-cache'
    );
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

// 팔로우 토글 ( 1이랑 동일한 거)
export async function putFollowToggle2(targetUuid: string): Promise<boolean> {
  const followerUuid = { followerUuid: targetUuid };
  try {
    const data = await fetchDataforMembers<CommonResponse<boolean>>(
      `/follow-block-service/write/follow`,
      'PUT',
      followerUuid,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('error', error);
    throw new Error('error');
  }
}

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
  } catch (error) {
    console.error('error', error);
    throw new Error('error');
  }
}
