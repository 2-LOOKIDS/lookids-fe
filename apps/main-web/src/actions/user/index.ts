'use server';

import { PetInfo, PetProfileType, UserInfo } from '../../types/user';

import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';
import { revalidatePath } from 'next/cache';

const BASE_URL = `${process.env.BACKEND_URL}/user-service`;

export const getUserProfile = async (uuid: string): Promise<UserInfo> => {
  const API_URL = `${BASE_URL}/read/userprofile?userUuid=${uuid}`;
  const response = await fetch(API_URL, {
    method: 'GET',
  });

  const result = (await response.json()) as CommonResponse<UserInfo>;
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
      'uuid': uuid,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imgUrl }),
  });

  const result = (await response.json()) as CommonResponse<null>;
  revalidatePath('/mypage');
  return null;
};

export const getUserProfileByNicknameTag = async (
  nickname: string,
  tag: string
): Promise<UserInfo> => {
  try {
    const data = await fetchDataforMembers<CommonResponse<UserInfo>>(
      `user-service/read/userprofile/find/${nickname}-${tag}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('유저 프로필 조회 실패:', error);
    throw new Error(`유저 프로필 조회 실패: ${error}`);
  }
};

// pet

export const getPetList = async (uuid: string): Promise<PetInfo[]> => {
  const API_URL = `${BASE_URL}/read/petprofile/all?userUuid=${uuid}`;
  const response = await fetch(API_URL, {
    method: 'GET',
  });
  const result = (await response.json()) as CommonResponse<PetInfo[]>;
  return result.result;
};

// export const registerPetProfile = async (
//   token: string,
//   uuid: string,
//   body: PetProfileType
// ) => {
//   const API_URL = `${BASE_URL}/write/petprofile`;
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'uuid': uuid,
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
//   const result = await response.json();
//   console.log(result);
// };

export const registerPetProfile = async (
  body: PetProfileType
): Promise<any> => {
  try {
    const data = await fetchDataforMembers<CommonResponse<PetProfileType>>(
      `user-service/write/petprofile`,
      'POST',
      body,
      'no-cache'
    );
    console.log(data);
    return data.result;
  } catch (error) {
    console.error('유저 프로필 조회 실패:', error);
    throw new Error(`유저 프로필 조회 실패: ${error}`);
  }
};
