'use server';

import { CommonResponse } from '../../types/responseType';
import { UserInfo } from '../../types/user';

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
