'use server';

import { CommonResponse } from '../../types/responseType';
import { UserInfo, UserInfoWithUuid } from '../../types/user';
import { fetchDataforMembers } from '../common/common';

const BASE_URL = `${process.env.BACKEND_URL}/user-service`;

export const getUserProfile = async (uuid: string): Promise<UserInfo> => {
  const API_URL = `${BASE_URL}/read/userprofile?userUuid=${uuid}`;
  const response = await fetch(API_URL, {
    method: 'GET',
  });

  const result = (await response.json()) as CommonResponse<UserInfo>;
  console.log('🚀 ~ getUserProfile ~ result:', result);
  return result.result;
};

export const getUserProfileByNicknameTag = async (
  nickname: string,
  tag: string
): Promise<UserInfoWithUuid> => {
  try {
    const data = await fetchDataforMembers<CommonResponse<UserInfoWithUuid>>(
      `${BASE_URL}/read/userprofile/find/${nickname}-${tag}`,
      'GET',
      '',
      'no-cache'
    );
    console.log('🚀 ~ getUserProfileByNicknameTag ~ data', data);
    return data.result;
  } catch (error) {
    console.error('유저 프로필 조회 실패:', error);
    throw new Error(`유저 프로필 조회 실패: ${error}`);
  }
};
