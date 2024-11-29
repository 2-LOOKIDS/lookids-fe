'use server';

import { CommonResponse } from '../../types/responseType';
import { UserInfo } from '../../types/user';
import { revalidatePath } from 'next/cache';

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

export const updateProfileImage = async (
  uuid: string,
  token: string,
  imgUrl: string
): Promise<null> => {
  const API_URL = `${BASE_URL}/write/userprofile/img`;
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      uuid: uuid,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imgUrl }),
  });

  const result = (await response.json()) as CommonResponse<null>;
  revalidatePath('/mypage');
  return null;
};

export const updateProfileNickname = async (
  uuid: string,
  token: string,
  nickname: string
): Promise<null> => {
  const API_URL = `${BASE_URL}/write/userprofile/nickname`;
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      uuid: uuid,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname: nickname }),
  });

  const result = (await response.json()) as CommonResponse<null>;
  revalidatePath('/mypage');
  return null;
};
