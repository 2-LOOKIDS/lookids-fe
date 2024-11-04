import { CommonResType } from "../../types/responseType";
import { VerificationResponse } from "../../types/auth/signup";

export const checkCredentialsAvailability = async (
  value: string,
  type: string,
  uuid?: string,
): Promise<boolean> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-service/api/v1/auth/verify-${type}`;
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
