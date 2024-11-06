export const refreshToken = async (refreshToken: string, uuid: string) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/auth-service/api/v1/auth/refresh-accesstoken?uuid=${uuid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }), // JSON 형식으로 전달
    },
  );

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();

  return data; // 갱신된 토큰 데이터를 반환
};
