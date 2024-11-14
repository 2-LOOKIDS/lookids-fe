'use server';

import {
  RegisterUserInfo,
  VerificationResponse,
} from '../../types/auth/signup';

import { CommonResponse } from '../../types/responseType';

// auth-service BASE_URL
const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-service/auth`;

// 이메일, 아이디, 비밀번호 유효성 체크
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

// 이메일 인증 코드 발송
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

// 인증 코드 검사
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

// 회원가입
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
