"use server";

import { CommonResType } from "../../types/responseType";
import { VerificationResponse } from "../../types/auth/signup";

// auth-service BASE_URL
const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-service/api/v1/auth`;

// 이메일, 아이디, 비밀번호 유효성 체크
export const checkCredentialsAvailability = async (
  value: string,
  type: string,
  uuid?: string,
): Promise<boolean> => {
  const endpoint = `${BASE_URL}/verify-${type}`;
  const body =
    type === "password"
      ? JSON.stringify({ password: value, uuid })
      : JSON.stringify({ key: value });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const result = (await response.json()) as CommonResType<VerificationResponse>;
  return result.result.verification;
};

// 이메일 인증 코드 발송
export const sendVerificationCode = async (email: string): Promise<boolean> => {
  const endpoint = `${BASE_URL}/send-email`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: email }),
  });

  const result = (await response.json()) as CommonResType<VerificationResponse>;
  return result.result.verification;
};
