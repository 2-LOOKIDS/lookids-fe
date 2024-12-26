'use server';

import {
  RegisterUserInfo,
  VerificationResponse,
} from '../../types/auth/signup';

import { CommonResponse } from '../../types/responseType';

const BASE_URL = `${process.env.BACKEND_URL}/auth-service/auth`;

export const checkCredentialsAvailabilityApi = async (
  value: string,
  type: string,
  uuid?: string
): Promise<boolean> => {
  const API_URL = `${BASE_URL}/verify-${type}`;
  const body =
    type === 'password'
      ? JSON.stringify({ password: value, uuid })
      : JSON.stringify({ key: value });

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const result =
    (await response.json()) as CommonResponse<VerificationResponse>;
  return result.result?.verification;
};

export const sendVerificationCodeToEmailApi = async (
  email: string
): Promise<boolean> => {
  const API_URL = `${BASE_URL}/send-email`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key: email }),
  });

  const result =
    (await response.json()) as CommonResponse<VerificationResponse>;
  return result.result?.verification;
};

export const verifyEmailCodeApi = async (
  email: string,
  code: string
): Promise<boolean> => {
  const API_URL = `${BASE_URL}/check-verification-code`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, key: code }),
  });

  const result =
    (await response.json()) as CommonResponse<VerificationResponse>;
  return result.result?.verification;
};

export const registerUserApi = async (
  values: RegisterUserInfo
): Promise<CommonResponse<null>> => {
  const API_URL = `${BASE_URL}/sign-up`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId: values.loginId,
      password: values.password,
      email: values.email,
      nickname: values.nickname,
    }),
  });

  const result = (await response.json()) as CommonResponse<null>;
  return result;
};
