import { CommonResponse, PaginationResponse } from '../../types/responseType';
import { Session, getServerSession } from 'next-auth';

import { Following } from '../../types/follow/FollowType';
import { fetchDataforMembers } from '../common/common';
import { options } from '../../app/api/auth/[...nextauth]/options';
import { responseList } from '../../utils/chatting/fetchMessages';
import { revalidatePath } from 'next/cache';

const BASE_URL = `${process.env.BACKEND_URL}/follow-block-service`;
// const BASE_URL = '/api/follow-block-service';

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
  // console.log('🚀 ~ result:', result);
  return result.result;
};

export const putFollowToggle = async (
  // token: string,
  // uuid: string,
  targetUuid: string
): Promise<boolean> => {
  const session: Session | null = await getServerSession(options);
  const token: string = session ? session.user.accessToken : '';

  const API_URL = `${BASE_URL}/write/follow`;
  const followerUuid = { followerUuid: targetUuid };
  console.log('🚀 ~ token:', token);
  console.log('🚀 ~ session:', session?.user.uuid);
  console.log('🚀 ~ followerUuid:', followerUuid);
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'uuid': session?.user.uuid,
    },

    body: JSON.stringify(followerUuid),
  });
  const result = (await response.json()) as CommonResponse<boolean>;
  return result.result;
};

export async function putFollowToggle2(targetUuid: string): Promise<boolean> {
  const followerUuid = { followerUuid: targetUuid };
  try {
    const data = await fetchDataforMembers<CommonResponse<boolean>>(
      `/follow-block-service/write/follow`,
      'PUT',
      followerUuid,
      'no-cache'
    );
    console.log(data);
    return data.result;
  } catch (error) {
    console.error('error', error);
    throw new Error('error');
  }
}
